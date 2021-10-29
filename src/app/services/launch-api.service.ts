import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Launch } from '../models/launch.model';
import { LaunchDetail } from '../models/launchDetail.model';

@Injectable({
  providedIn: 'root'
})
export class LaunchApiService {

  //apiBase = "https://ll.thespacedevs.com/2.2.0" // PROD version of the API
  apiBase = "https://lldev.thespacedevs.com/2.2.0";  // DEV version of the API


  constructor(private http: HttpClient) { }

  getUpcomingLaunches$(offset): Observable<Launch[]> {
    return this.http.get<Launch>(this.apiBase + "/launch/upcoming/?mode=detailed&format=json&limit=15&offset=" + offset).pipe(map(res => res['results']))
  }

  getUpcomingLaunch$(id) {
    return this.http.get<LaunchDetail>(this.apiBase + "/launch/upcoming/" + id + "/?mode=detailed&format=json");
  }

  getLaunches$(offset): Observable<Launch[]> {
    return this.http.get<Launch>(this.apiBase + "/launch/?mode=detailed&format=json&limit=30&offset=" + offset).pipe(map(res => res['results']))
  }

  getLaunch$(id) {
    return this.http.get<LaunchDetail>(this.apiBase + "/launch/" + id + "/?mode=detailed&format=json");
  }

  searchLaunch$(searchTerm): Observable<Launch[]> {
    return this.http.get<Launch>(this.apiBase + "/launch/?mode=detailed&format=json&search=" + searchTerm).pipe(map(res => res['results']))
  }
}
