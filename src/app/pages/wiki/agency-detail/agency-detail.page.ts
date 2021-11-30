import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Agency } from 'src/app/models/agency.model';
import { LaunchApiService } from 'src/app/services/launch-api.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-agency-detail',
  templateUrl: './agency-detail.page.html',
  styleUrls: ['./agency-detail.page.scss'],
})
export class AgencyDetailPage implements OnInit {
  agency: Agency;
  id: String;

  constructor(private apiService: LaunchApiService, private route: ActivatedRoute, private storage: StorageService) {
    this.id = this.route.snapshot.paramMap.get("id");
    this.loadData();
  }

  ngOnInit() { }

  async loadData() {
    this.agency = await this.storage.getAgency(this.id);
  }
}