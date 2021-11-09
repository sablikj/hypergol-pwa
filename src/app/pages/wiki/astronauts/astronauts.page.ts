import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Astronaut } from 'src/app/models/astronaut.model';
import { LaunchApiService } from 'src/app/services/launch-api.service';

@Component({
  selector: 'app-astronauts',
  templateUrl: './astronauts.page.html',
  styleUrls: ['./astronauts.page.scss'],
})
export class AstronautsPage implements OnInit {

  constructor(private apiService: LaunchApiService) {
    this.loadAstronauts(true, "");
  }
  ngOnInit() { }

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  astronauts: Astronaut[] = [];
  astronauts$: Observable<Astronaut[]>;
  searchResults$: Observable<Astronaut[]>;
  searchResults: Astronaut[] = [];

  astronautsBackup: Astronaut[] = [];

  offset = 0;

  loadAstronauts(isFirstLoad, event) {

    this.astronauts$ = this.apiService.getAstronauts$(this.offset);
    this.apiService.getAstronauts$(this.offset).subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        this.astronauts.push(data[i]);
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
    this.loadAstronauts(false, event);
  }

  // Search
  search(event) {
    this.astronautsBackup = this.astronauts;
    const searchTerm = event.srcElement.value;

    if (!searchTerm) {
      return;
    }
    if (searchTerm == "") {
      this.astronauts = this.astronautsBackup;
    }

    this.searchResults$ = this.apiService.searchAstronaut$(searchTerm);
    this.apiService.searchAstronaut$(searchTerm).subscribe(data => {
      return this.astronauts = data;
    })
  }

  clear() {
    this.astronauts = this.astronautsBackup;
  }
}
