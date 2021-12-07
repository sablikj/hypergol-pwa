import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Rocket } from 'src/app/models/rocket.model';
import { LaunchApiService } from 'src/app/services/launch-api.service';

@Component({
  selector: 'app-rockets',
  templateUrl: './rockets.page.html',
  styleUrls: ['./rockets.page.scss'],
})
export class RocketsPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  rockets: Rocket[] = [];
  rockets$: Observable<Rocket[]>;
  searchResults$: Observable<Rocket[]>;
  searchResults: Rocket[] = [];
  rocketsBackup: Rocket[] = [];
  loading: HTMLIonLoadingElement;
  offset = 0;

  constructor(private apiService: LaunchApiService, private loadingController: LoadingController) {
    this.loadRockets(true, "");
  }
  ngOnInit() { }

  loadRockets(isFirstLoad, event) {
    if (isFirstLoad) {
      this.loadingController.create({
        message: 'Please Wait...',
        spinner: 'circular',
        cssClass: 'customLoading'
      }).then(res => {
        this.loading = res;
        this.loading.present();
      });
    }

    this.rockets$ = this.apiService.getRockets$(this.offset);
    this.apiService.getRockets$(this.offset).pipe(tap(() => {
      this.loading.dismiss();
    })).subscribe(data => {
      this.rockets = this.rockets.concat(data);

      // Setting new offset for next call
      this.offset += 15;
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
    this.rocketsBackup = this.rockets;
    const searchTerm = event.srcElement.value;

    if (!searchTerm) {
      return;
    }
    if (searchTerm == "") {
      this.rockets = this.rocketsBackup;
    }

    if (searchTerm.length > 5 || searchTerm.includes(" ")) {
      this.searchResults$ = this.apiService.searchRocket$(searchTerm);
      this.apiService.searchRocket$(searchTerm).subscribe(data => {
        return this.rockets = data;
      })
    }
  }

  clear() {
    this.rockets = this.rocketsBackup;
  }
}
