import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Astronaut } from 'src/app/models/astronaut.model';
import { LaunchApiService } from 'src/app/services/launch-api.service';

@Component({
  selector: 'app-astronaut-detail',
  templateUrl: './astronaut-detail.page.html',
  styleUrls: ['./astronaut-detail.page.scss'],
})
export class AstronautDetailPage implements OnInit {

  astronaut$: Observable<Astronaut>;
  astronaut: Astronaut;

  constructor(private apiService: LaunchApiService, private route: ActivatedRoute) {
    const id = this.route.snapshot.paramMap.get("id");
    this.astronaut$ = this.apiService.getAstronaut$(id);
    this.apiService.getAstronaut$(id).subscribe(data => {
      this.astronaut = data;
    })
  }

  sliderConfig = {
    slidesPerView: 1.6,
    spaceBetween: 10,
    centeredSlides: true
  };

  ngOnInit() { }
}
