import { AfterContentChecked, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Astronaut } from 'src/app/models/astronaut.model';
import { LaunchApiService } from 'src/app/services/launch-api.service';

import { SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import SwiperCore, { Pagination } from 'swiper';
import { Storage } from '@capacitor/storage';

SwiperCore.use([Pagination]);
@Component({
  selector: 'app-astronaut-detail',
  templateUrl: './astronaut-detail.page.html',
  styleUrls: ['./astronaut-detail.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AstronautDetailPage implements OnInit, AfterContentChecked {
  @ViewChild('swiper') swiper: SwiperComponent;

  astronaut$: Observable<Astronaut>;
  astronaut: Astronaut;
  inStorage: boolean = false;
  id = this.route.snapshot.paramMap.get("id");

  constructor(private apiService: LaunchApiService, private route: ActivatedRoute) {
    this.loadContent();
  }

  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 60,
    pagination: true,
  }

  ngOnInit() { }

  ngAfterContentChecked() {
    if (this.swiper) {
      this.swiper.updateSwiper({});
    }
  }

  async loadContent() {
    this.inStorage = await this.checkKeys();

    if (this.inStorage) {
      // Load launch from storage
      this.getAstronaut();
    }
    else {
      this.astronaut$ = this.apiService.getAstronaut$(this.id);
      this.apiService.getAstronaut$(this.id).subscribe(data => {
        this.astronaut = data;

        // Save to storage
        this.setAstronaut(data);
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

  async setAstronaut(data) {
    await Storage.set({
      key: this.id,
      value: JSON.stringify(data),
    });
  }

  async getAstronaut() {
    const { value } = await Storage.get({
      key: this.id
    });
    this.astronaut = JSON.parse(value);
  }
}
