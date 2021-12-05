import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Launch } from 'src/app/models/launch.model';
import { LaunchApiService } from 'src/app/services/launch-api.service';

@Component({
  selector: 'app-launches',
  templateUrl: './launches.page.html',
  styleUrls: ['./launches.page.scss'],
})
export class LaunchesPage implements OnInit {

  constructor(private apiService: LaunchApiService, private loadingController: LoadingController) {
    this.loadUpcomingLaunches(true, "");
  }

  ngOnInit() { }

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  launches: Launch[] = [];
  launches$: Observable<Launch[]>;
  searchResults$: Observable<Launch[]>;
  searchResults: Launch[] = [];

  launchesBackup: Launch[] = [];
  loading: HTMLIonLoadingElement;

  offset = 0;

  loadUpcomingLaunches(isFirstLoad, event) {
    if (isFirstLoad) {
      this.loadingController.create({
        message: 'Please Wait...',
        spinner: 'circular'
      }).then(res => {
        this.loading = res;
        this.loading.present();
      });
    }

    this.launches$ = this.apiService.getLaunches$(this.offset);
    this.apiService.getLaunches$(this.offset).pipe(tap(() => {
      this.loading.dismiss();
    })).subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        this.launches.push(data[i]);
      }
      // Setting new offset for next call
      this.offset += 10;

      if (!isFirstLoad) {
        event.target.complete();
      }
    })
  }

  // Infinite Scroll
  doInfinite(event) {
    this.loadUpcomingLaunches(false, event);
  }

  // Search
  search(event) {
    this.launchesBackup = this.launches;
    const searchTerm = event.srcElement.value;

    if (!searchTerm) {
      return;
    }
    if (searchTerm == "") {
      this.launches = this.launchesBackup;
    }

    if (searchTerm.length > 5 || searchTerm.contains(" ")) {
      this.searchResults$ = this.apiService.searchLaunch$(searchTerm);
      this.apiService.searchLaunch$(searchTerm).subscribe(data => {
        return this.launches = data;
      })
    }
  }

  clear() {
    this.launches = this.launchesBackup;
  }
}
