import { AfterContentChecked, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Rocket } from 'src/app/models/rocket.model';
import { LaunchApiService } from 'src/app/services/launch-api.service';
import { SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import SwiperCore, { Pagination } from 'swiper';
import { Storage } from '@capacitor/storage';

SwiperCore.use([Pagination]);

@Component({
  selector: 'app-rocket-detail',
  templateUrl: './rocket-detail.page.html',
  styleUrls: ['./rocket-detail.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RocketDetailPage implements OnInit, AfterContentChecked {
  @ViewChild('swiper') swiper: SwiperComponent;

  rocket$: Observable<Rocket>;
  rocket: Rocket;
  inStorage: boolean = false;
  id = this.route.snapshot.paramMap.get("id");

  constructor(private apiService: LaunchApiService, private route: ActivatedRoute) {
    this.loadContent();
  }
  ngOnInit() { }

  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 60,
    pagination: true,
  }

  ngAfterContentChecked() {
    if (this.swiper) {
      this.swiper.updateSwiper({});
    }
  }

  async loadContent() {
    this.inStorage = await this.checkKeys();

    if (this.inStorage) {
      // Load launch from storage
      this.getRocket();
    }
    else {
      this.rocket$ = this.apiService.getRocket$(this.id);
      this.apiService.getRocket$(this.id).subscribe(data => {
        this.rocket = data;

        // Save to storage
        this.setRocket(data);
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

  async setRocket(data) {
    await Storage.set({
      key: this.id,
      value: JSON.stringify(data),
    });
  }

  async getRocket() {
    const { value } = await Storage.get({
      key: this.id
    });
    this.rocket = JSON.parse(value);
  }
}
