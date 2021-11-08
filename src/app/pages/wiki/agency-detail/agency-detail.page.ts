import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Agency } from 'src/app/models/agency.model';
import { LaunchApiService } from 'src/app/services/launch-api.service';

@Component({
  selector: 'app-agency-detail',
  templateUrl: './agency-detail.page.html',
  styleUrls: ['./agency-detail.page.scss'],
})
export class AgencyDetailPage implements OnInit {

  agency$: Observable<Agency>;
  agency: Agency;

  constructor(private apiService: LaunchApiService, private route: ActivatedRoute) {
    const id = this.route.snapshot.paramMap.get("id");
    this.agency$ = this.apiService.getAgency$(id);
    this.apiService.getAgency$(id).subscribe(data => {
      this.agency = data;
    })
  }

  ngOnInit() { }
}
