import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { LaunchDetail } from 'src/app/models/launchDetail.model';
import { LaunchApiService } from 'src/app/services/launch-api.service';
import { Agency } from '../models/agency.model';
import { Astronaut } from '../models/astronaut.model';
import { Launch } from '../models/launch.model';
import { Rocket } from '../models/rocket.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  rocket$: Observable<Rocket>;
  rocket: Rocket;
  astronaut$: Observable<Astronaut>;
  astronaut: Astronaut;
  launch$: Observable<LaunchDetail>;
  launch: LaunchDetail;
  agency$: Observable<Agency>;
  agency: Agency;
  launches: Launch[] = [];
  launches$: Observable<Launch[]>;

  offset = 0;

  loading: HTMLIonLoadingElement;

  constructor(private apiService: LaunchApiService, private loadingController: LoadingController) { }

  async loadUpcomingLaunches(isFirstLoad, event) {
    if (isFirstLoad) {
      await this.loadingController.create({
        message: 'Please Wait...',
        spinner: 'circular',
        cssClass: 'customLoading'
      }).then(res => {
        this.loading = res;
        this.loading.present();
      });
    }

    this.launches$ = this.apiService.getUpcomingLaunches$(this.offset);
    this.launches = await this.apiService.getUpcomingLaunches$(this.offset).toPromise();

    if (isFirstLoad) {
      setTimeout(() => {
        this.loading.dismiss()
      }, 350);
    }

    this.offset += 8;
    return this.launches;
  }

  async getLaunch(id) {
    this.launch = await this.checkStorage(id);

    if (this.launch == null) {
      this.loadingController.create({
        message: 'Please Wait...',
        spinner: 'circular',
        cssClass: 'customLoading'
      }).then(res => {
        this.loading = res;
        this.loading.present();
      });

      this.launch$ = this.apiService.getLaunch$(id);
      this.launch = await this.apiService.getLaunch$(id).pipe(
        tap(() => {
          this.loading.dismiss()
        })).toPromise();

      this.saveToStorage(this.launch, id);
    }
    return this.launch;
  }

  async getRocket(id) {
    this.rocket = await this.checkStorage("R" + id);

    if (this.rocket == null) {
      this.loadingController.create({
        message: 'Please Wait...',
        spinner: 'circular',
        cssClass: 'customLoading'
      }).then(res => {
        this.loading = res;
        this.loading.present();
      });


      this.rocket$ = this.apiService.getRocket$(id);
      this.rocket = await this.apiService.getRocket$(id).pipe(
        tap(() => {
          this.loading.dismiss()
        })).toPromise();

      this.saveToStorage(this.rocket, "R" + id);
    }

    return this.rocket;
  }

  async getAstronaut(id) {
    this.astronaut = await this.checkStorage("A" + id);

    if (this.astronaut == null) {
      this.loadingController.create({
        message: 'Please Wait...',
        spinner: 'circular',
        cssClass: 'customLoading'
      }).then(res => {
        this.loading = res;
        this.loading.present();
      });

      this.astronaut$ = this.apiService.getAstronaut$(id);
      this.astronaut = await this.apiService.getAstronaut$(id).pipe(
        tap(() => {
          this.loading.dismiss()
        })).toPromise();

      this.saveToStorage(this.astronaut, "A" + id);
    }
    return this.astronaut;
  }

  async getAgency(id) {
    this.agency = await this.checkStorage("Ag" + id);

    if (this.agency == null) {
      this.loadingController.create({
        message: 'Please Wait...',
        spinner: 'circular',
        cssClass: 'customLoading'
      }).then(res => {
        this.loading = res;
        this.loading.present();
      });

      this.agency$ = this.apiService.getAgency$(id);
      this.agency = await this.apiService.getAgency$(id).pipe(
        tap(() => {
          this.loading.dismiss()
        })).toPromise();

      this.saveToStorage(this.agency, "Ag" + id);
      this.agency;
    }
    return this.agency;
  }

  // Storage methods

  clear() {
    Storage.clear();
  }

  async checkStorage(id) {
    const keys = (await Storage.keys()).keys;

    if (keys.includes(id)) {
      const { value } = await Storage.get({
        key: id
      });
      return JSON.parse(value);
    }
    return null;
  }

  async saveToStorage(data, id) {
    await Storage.set({
      key: id,
      value: JSON.stringify(data),
    });
  }
}
