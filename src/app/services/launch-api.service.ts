import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Launch } from '../models/launch.model';
import { LaunchDetail } from '../models/launchDetail.model';
import { Rocket } from '../models/rocket.model';
import { Agency } from '../models/agency.model';
import { Astronaut } from '../models/astronaut.model';

@Injectable({
  providedIn: 'root'
})
export class LaunchApiService {

  //apiBase = "https://ll.thespacedevs.com/2.2.0" // PROD version of the API | 15 calls/ hour
  apiBase = "https://lldev.thespacedevs.com/2.2.0";  // DEV version of the API


  constructor(private http: HttpClient) { }

  // Launches
  getUpcomingLaunches$(offset): Observable<Launch[]> {
    return this.http.get<Launch>(this.apiBase + "/launch/upcoming/?mode=detailed&format=json&limit=15&offset=" + offset).pipe(map(res => res['results']))
  }

  getLaunches$(offset): Observable<Launch[]> {
    return this.http.get<Launch>(this.apiBase + "/launch/?mode=detailed&format=json&limit=30&offset=" + offset).pipe(map(res => res['results']));
  }

  getLaunch$(id) {
    return this.http.get<LaunchDetail>(this.apiBase + "/launch/" + id + "/?mode=detailed&format=json");
  }

  searchLaunch$(searchTerm): Observable<Launch[]> {
    return this.http.get<Launch>(this.apiBase + "/launch/?mode=detailed&format=json&search=" + searchTerm).pipe(map(res => res['results']));
  }

  // Rockets
  getRockets$(offset): Observable<Rocket[]> {
    return this.http.get<Rocket>(this.apiBase + "/config/launcher/?mode=detailed&format=json&limit=30&offset=" + offset).pipe(map(res => res['results']));
  }

  searchRocket$(searchTerm): Observable<Rocket[]> {
    return this.http.get<Rocket>(this.apiBase + "/config/launcher/?mode=detailed&format=json&search=" + searchTerm).pipe(map(res => res['results']));
  }

  //REWORK to pass data from wiki page -> no need for another API call
  getRocket$(id) {
    return this.http.get<Rocket>(this.apiBase + "/config/launcher/" + id + "/?mode=detailed&format=json");
  }

  //Agencies
  getAgencies$(): Observable<Agency[]> {
    return this.http.get<Agency>(this.apiBase + "/agencies/?mode=detailed&format=json&featured=true&limit=50").pipe(map(res => res['results']));
  }

  searchAgency$(searchTerm): Observable<Agency[]> {
    return this.http.get<Rocket>(this.apiBase + "/agencies/?mode=detailed&format=json&featured=true&search=" + searchTerm).pipe(map(res => res['results']));
  }

  getAgency$(id) {
    return this.http.get<Agency>(this.apiBase + "/agencies/" + id + "/?mode=detailed&format=json");
  }

  //Astronauts
  getAstronauts$(offset): Observable<Astronaut[]> {
    return this.http.get<Astronaut>(this.apiBase + "/astronaut/?mode=detailed&format=json&order=status&limit=15&offset=" + offset).pipe(map(res => res['results']));
  }

  searchAstronaut$(searchTerm): Observable<Astronaut[]> {
    return this.http.get<Astronaut>(this.apiBase + "/astronaut/?mode=detailed&format=json&featured=true&search=" + searchTerm).pipe(map(res => res['results']));
  }

  getAstronaut$(id) {
    return this.http.get<Astronaut>(this.apiBase + "/astronaut/" + id + "/?mode=detailed&format=json");
  }
}
