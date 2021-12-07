import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LaunchDetail } from 'src/app/models/launchDetail.model';
import { LaunchApiService } from 'src/app/services/launch-api.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-launch-detail',
  templateUrl: './launch-detail.page.html',
  styleUrls: ['./launch-detail.page.scss'],
})
export class LaunchDetailPage implements OnInit {

  launch$: Observable<LaunchDetail>;
  launch: LaunchDetail;
  launch_date: any;
  countdownHide: boolean;
  countdown: any;
  id: String;

  loading: HTMLIonLoadingElement;

  constructor(private apiService: LaunchApiService, private storage: StorageService, private loadingController: LoadingController, private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get("id");
    this.loadData();
  }

  async ngOnInit() { }

  async getLaunch() {
    /*
    this.loadingController.create({
      message: 'Please Wait...',
      spinner: 'circular'
    }).then(res => {
      this.loading = res;
      this.loading.present();
    });*/

    // Dismissing loading element when data are loaded
    this.launch$ = this.apiService.getLaunch$(this.id);
    this.launch = await this.apiService.getLaunch$(this.id).toPromise();

    //this.saveToStorage(this.launch, id);
    console.log(this.launch);
    return this.launch;
  }

  /*
  async doRefresh(event) {
    this.launch = await this.storage.refreshLaunch(this.id);
    event.target.complete()
  }*/

  async loadData() {
    this.launch = await this.storage.getLaunch(this.id);

    // Check for an old launch
    if (new Date(this.launch.window_start).getTime() - new Date().getTime() < -10000000) {
      this.countdownHide = true;
    } else {
      this.launch_date = this.launch.window_start;
    }
    console.log(this.launch);
    //return this.launch;
  }

  x = setInterval(() => {
    var now = new Date().getTime();
    var diff = new Date(this.launch_date).getTime() - now;

    var days = Math.floor(diff / (1000 * 60 * 60 * 24));
    var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((diff % (1000 * 60)) / 1000);
    this.countdown = "T -   " + days + "  Days  " + hours + "  Hours  " + minutes + "  Minutes  " + seconds + "  Seconds";

    if (diff < 0) {
      clearInterval(this.x);
      this.countdown = "Launching now!";
    }
  })
}
