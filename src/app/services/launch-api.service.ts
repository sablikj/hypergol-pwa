import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Launch } from '../models/launch.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LaunchApiService {

  //apiBase = "https://ll.thespacedevs.com/2.2.0/launch" // PROD version of the API
  apiBase = "https://lldev.thespacedevs.com/2.2.0/launch";  // DEV version of the API

  constructor(private http: HttpClient) { }

  // $ - for methods returning observable obj
  getUpcomingLaunches$(): Observable<Launch[]> {
    return this.http.get<Launch>(this.apiBase + "/upcoming/?mode=detailed&format=json").pipe(map(res => res['results']))
  }

  getUpcomingLaunch$(id) {
    return this.http.get<Launch>(this.apiBase + "/upcoming/" + id);
  }
}
