import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Agency } from 'src/app/models/agency.model';
import { LaunchApiService } from 'src/app/services/launch-api.service';

@Component({
  selector: 'app-agencies',
  templateUrl: './agencies.page.html',
  styleUrls: ['./agencies.page.scss'],
})
export class AgenciesPage implements OnInit {

  constructor(private apiService: LaunchApiService) {
    this.loadAgencies(true, "");
  }
  ngOnInit() { }

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  agencies: Agency[] = [];
  agencies$: Observable<Agency[]>;
  searchResults$: Observable<Agency[]>;
  searchResults: Agency[] = [];

  agenciesBackup: Agency[] = [];

  offset = 0;

  loadAgencies(isFirstLoad, event) {

    this.agencies$ = this.apiService.getAgencies$();
    this.apiService.getAgencies$().subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        this.agencies.push(data[i]);
      }
    })
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

    this.searchResults$ = this.apiService.searchAgency$(searchTerm);
    this.apiService.searchAgency$(searchTerm).subscribe(data => {
      return this.agencies = data;
    })
  }

  clear() {
    this.agencies = this.agenciesBackup;
  }
}
