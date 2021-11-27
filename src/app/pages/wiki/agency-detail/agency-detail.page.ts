import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Agency } from 'src/app/models/agency.model';
import { LaunchApiService } from 'src/app/services/launch-api.service';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-agency-detail',
  templateUrl: './agency-detail.page.html',
  styleUrls: ['./agency-detail.page.scss'],
})
export class AgencyDetailPage implements OnInit {

  agency$: Observable<Agency>;
  agency: Agency;
  inStorage: boolean = false;
  id = this.route.snapshot.paramMap.get("id");

  constructor(private apiService: LaunchApiService, private route: ActivatedRoute) {
    this.loadContent();
  }

  ngOnInit() { }

  async loadContent() {
    this.inStorage = await this.checkKeys();

    if (this.inStorage) {
      // Load agency from storage
      this.getAgency();
    }
    else {
      this.agency$ = this.apiService.getAgency$(this.id);
      this.apiService.getAgency$(this.id).subscribe(data => {
        this.agency = data;

        // Save to storage
        this.setAgency(data);
      })
    }
  }

  async checkKeys() {
    const keys = (await Storage.keys()).keys;

    if (keys.includes(this.id)) {
      return true;
    } else {
      return false;
    }
  }

  async setAgency(data) {
    await Storage.set({
      key: this.id,
      value: JSON.stringify(data),
    });
  }

  async getAgency() {
    const { value } = await Storage.get({
      key: this.id
    });
    this.agency = JSON.parse(value);
  }
}
