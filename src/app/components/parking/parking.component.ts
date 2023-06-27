import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSort, MatSortable } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { first } from 'rxjs/operators';

import { AuthService } from '../../services/auth.service';
import { ParkingService } from '../../services/parking.service';
import { Parking } from '../../models/parking.model';

@Component({
  selector: 'app-parking',
  templateUrl: './parking.component.html',
  styleUrls: ['./parking.component.scss']
})
export class ParkingComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('f', { static: false }) signupForm: NgForm;

  public columnsToDisplay = [ 'sessionId', 'vehicleId', 'startTime', 'endTime', 'cost' ];
  public dataSource = new MatTableDataSource<any>();
  public isFetching = false;
  public noRecordsDefault = 'No records found for vehicle id ';
  public noRecordsMsg = '';
  public noRecords = false;

  private large = '(max-width: 765px)';
  private medium = '(max-width: 410px)';
  private small = '(max-width: 385px)';
  public isLarge = false;
  public isMedium = false;
  public isSmall = false;

  private defaultSort: MatSortable = {
    id: 'sessionId',
    start: 'asc',
    disableClear: true
  };

  constructor(
    private parkingService: ParkingService,
    private router: Router,
    private authService: AuthService,
    private responsive: BreakpointObserver
  ) { }

  ngOnInit(): void {
    this.responsive.observe([this.large, this.medium, this.small]).subscribe(result => {
      const breakpoints = result.breakpoints;
      this.isLarge = breakpoints[this.large];
      this.isMedium = breakpoints[this.medium];
      this.isSmall = breakpoints[this.small];
    });

    this.fetchData();
  }

  private fetchData(): void {
    this.noRecords = false;
    this.isFetching = true;
    this.dataSource.data = [];

    const sub = this.parkingService.fetchParkingList()
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

  public logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  public resetList(): void {
    this.fetchData();
  }

  public submitForm(form: NgForm): void {
    if (form.form?.value?.vehicleId !== null) {
      const filterValue = form.form.value.vehicleId.trim();

      if (filterValue.length > 0) {
        this.dataSource.data = [];
        this.isFetching = true;
        this.noRecordsMsg = '';

        const sub = this.parkingService.fetchParkingListById(filterValue)
          .pipe(first())
          .subscribe((response: Parking[]) => {
            this.dataSource.data = response;
            this.noRecords = response.length === 0;
            this.noRecordsMsg = `${this.noRecordsDefault}${filterValue}`;
            this.isFetching = false;
          });

        this.signupForm.reset();
      }
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}
