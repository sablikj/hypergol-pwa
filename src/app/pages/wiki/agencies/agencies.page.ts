import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Agency } from 'src/app/models/agency.model';
import { LaunchApiService } from 'src/app/services/launch-api.service';

@Component({
  selector: 'app-agencies',
  templateUrl: './agencies.page.html',
  styleUrls: ['./agencies.page.scss'],
})
export class AgenciesPage implements OnInit {

  constructor(private apiService: LaunchApiService, private loadingController: LoadingController) {
    this.loadAgencies(true, "");
  }
  ngOnInit() { }

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  agencies: Agency[] = [];
  agencies$: Observable<Agency[]>;
  searchResults$: Observable<Agency[]>;
  searchResults: Agency[] = [];
  agenciesBackup: Agency[] = [];
  loading: HTMLIonLoadingElement;

  offset = 0;

  loadAgencies(isFirstLoad, event) {
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

    this.agencies$ = this.apiService.getAgencies$(this.offset);
    this.apiService.getAgencies$(this.offset).pipe(tap(() => {
      this.loading.dismiss();
    })).subscribe(data => {
      this.agencies = this.agencies.concat(data);

      // Setting new offset for next call
      this.offset += 5;

      if (!isFirstLoad) {
        event.target.complete();
      }
    })
  }

  // Infinite Scroll
  doInfinite(event) {
    if (this.offset > 14) {
      event.target.complete();
    } else {
      this.loadAgencies(false, event);
    }
  }

  // Search
  search(event) {
    this.agenciesBackup = this.agencies;
    const searchTerm = event.srcElement.value;

    if (!searchTerm) {
      return;
    }
    if (searchTerm == "") {
      this.agencies = this.agenciesBackup;
    }

    if (searchTerm.length > 5 || searchTerm.includes(" ")) {
      this.searchResults$ = this.apiService.searchAgency$(searchTerm);
      this.apiService.searchAgency$(searchTerm).subscribe(data => {
        return this.agencies = data;
      })
    }
  }

  clear() {
    this.agencies = this.agenciesBackup;
  }
}
