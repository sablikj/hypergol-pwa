import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Rocket } from 'src/app/models/rocket.model';
import { LaunchApiService } from 'src/app/services/launch-api.service';

@Component({
  selector: 'app-rockets',
  templateUrl: './rockets.page.html',
  styleUrls: ['./rockets.page.scss'],
})
export class RocketsPage implements OnInit {

  constructor(private apiService: LaunchApiService) {
    this.loadRockets(true, "");
  }
  ngOnInit() { }

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  rockets: Rocket[] = [];
  rockets$: Observable<Rocket[]>;
  searchResults$: Observable<Rocket[]>;
  searchResults: Rocket[] = [];

  RocketsBackup: Rocket[] = [];

  offset = 0;

  loadRockets(isFirstLoad, event) {

    this.rockets$ = this.apiService.getRockets$(this.offset);
    this.apiService.getRockets$(this.offset).subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        this.rockets.push(data[i]);
      }
      // Setting new offset for next call
      this.offset += 30;

      if (!isFirstLoad) {
        event.target.complete();
      }
    })
  }

  // Infinite Scroll
  doInfinite(event) {
    this.loadRockets(false, event);
  }

  // Search
  search(event) {
    this.RocketsBackup = this.rockets;
    const searchTerm = event.srcElement.value;

    if (!searchTerm) {
      return;
    }
    if (searchTerm == "") {
      this.rockets = this.RocketsBackup;
    }

    this.searchResults$ = this.apiService.searchRocket$(searchTerm);
    this.apiService.searchRocket$(searchTerm).subscribe(data => {
      return this.rockets = data;
    })
  }

  clear() {
    this.rockets = this.RocketsBackup;
  }

}
