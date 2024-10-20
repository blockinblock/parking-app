import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, delay } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Parking } from './models/parking.model';

@Injectable({
  providedIn: 'root',
})
export class ParkingService {
  constructor(private http: HttpClient) {}

  /**
   * "Dummy" endpoint for fetching all parking records.
   * @returns Array of parking records
   */
  fetchParkingList(): Observable<Parking[]> {
    // .5 second delay to simulate fetch from backend
    return this.http.get<Parking[]>(environment.url).pipe(
      delay(500),
      catchError((errorRes) => {
        return throwError(() => {
          new Error(errorRes);
        });
      })
    );
  }

  /**
   * "Dummy" endpoint which returns the parking records where the search string is
   * contained in the vehicle id.
   * @param search search string
   * @returns Arrays of parking records
   */
  fetchParkingListById(search: string): Observable<Parking[]> {
    // .5 second delay to simulate fetch from backend
    return this.http.get<Parking[]>(environment.url).pipe(
      delay(500),
      map((responseData: Parking[]) => {
        return responseData.filter((item) =>
          item.vehicleId.includes(search.toUpperCase())
        );
      }),
      catchError((errorRes) => {
        return throwError(() => {
          new Error(errorRes);
        });
      })
    );
  }
}
