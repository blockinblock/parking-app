import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSort, MatSortable } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { debounceTime, distinctUntilChanged, first } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { ParkingService } from '../parking.service';
import { Parking } from '../models/parking.model';

@Component({
  selector: 'app-parking',
  templateUrl: './parking.component.html',
  styleUrls: ['./parking.component.scss'],
})
export class ParkingComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  columnsToDisplay = ['sessionId', 'vehicleId', 'startTime', 'endTime', 'cost'];
  dataSource = new MatTableDataSource<any>();

  form = this.fb.group({
    searchValue: [''],
  });

  isFetching = false;
  isLarge = false;
  isMedium = false;
  isSmall = false;

  noRecordsMsg = 'No records found!';
  noRecords = false;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 100];

  private currentYear = new Date().getFullYear();
  private defaultSort: MatSortable = {
    id: 'sessionId',
    start: 'asc',
    disableClear: true,
  };

  private formSub!: Subscription;

  private large = '(max-width: 765px)';
  private medium = '(max-width: 435px)';
  private small = '(max-width: 385px)';

  private months = [
    'jan',
    'feb',
    'mar',
    'apr',
    'may',
    'jun',
    'jul',
    'aug',
    'sep',
    'oct',
    'nov',
    'dec',
  ];

  constructor(
    private fb: FormBuilder,
    private parkingService: ParkingService,
    private responsive: BreakpointObserver
  ) {}

  ngOnInit() {
    this.responsive
      .observe([this.large, this.medium, this.small])
      .subscribe((result) => {
        const breakpoints = result.breakpoints;
        this.isLarge = breakpoints[this.large];
        this.isMedium = breakpoints[this.medium];
        this.isSmall = breakpoints[this.small];
      });

    this.formSub = this.form.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((value) => {
        this.applyFilter(value.searchValue || '');
      });

    this.dataSource.filterPredicate = this.filterFunction.bind(this);
    this.fetchData();
  }

  reset() {
    this.form.reset();
    this.dataSource.filter = '';
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    this.formSub.unsubscribe();
  }

  private applyFilter(value: string) {
    this.dataSource.filter = value.toLowerCase().trim();
    this.noRecords = this.dataSource.filteredData.length === 0;
  }

  private fetchData() {
    this.noRecords = false;
    this.isFetching = true;
    this.dataSource.data = [];

    this.parkingService
      .fetchParkingList()
      .pipe(first())
      .subscribe((response: Parking[]) => {
        this.dataSource.data = response;
        this.sort.sort(this.defaultSort);
        this.sort.direction = 'asc';
        this.dataSource.sort = this.sort;
        this.noRecords = response.length === 0;
        this.isFetching = false;
      });
  }

  private filterDefault(data: any, filter: string): boolean {
    return (
      data.sessionId.includes(filter) ||
      data.vehicleId.toLowerCase().includes(filter) ||
      data.startTime.includes(filter) ||
      data.endTime.includes(filter) ||
      data.cost.toString().includes(filter)
    );
  }

  private filterFunction(data: any, filter: string): boolean {
    if (filter.length === 3 && this.months.includes(filter)) {
      const month = this.formatMonth(filter);
      return (
        data.startTime.includes(month) ||
        data.endTime.includes(month) ||
        this.filterDefault(data, filter)
      );
    }
    return this.filterDefault(data, filter);
  }

  private formatMonth(mon: string): string {
    const monNum =
      new Date(Date.parse(`${mon} 1, ${this.currentYear}`)).getMonth() + 1;
    const monStr = monNum.toString().padStart(2, '0');
    return `-${monStr}-`;
  }
}
