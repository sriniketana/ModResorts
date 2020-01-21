import { Component, Renderer, NgZone,NgModule } from '@angular/core';
import {
  NavController,
  ModalController,
  LoadingController
} from 'ionic-angular';
import { DataStore } from '../../app/dataStore';
import { LiveUpdateProvider } from '../../providers/live-update/live-update';

@Component({
  selector: 'page-reservations',
  templateUrl: 'reservations.html'
})

@NgModule({
  providers: [
      LiveUpdateProvider
  ]
})

export class ReservationsPage {
  constructor(public navCtrl: NavController, public dataStore: DataStore,public ngZone:NgZone,public liveUpdateService: LiveUpdateProvider) {
    this.callMicroservice();
  }

  ionViewDidLoad() {
    WL.Analytics.log(
      {
        fromPage: this.navCtrl.getPrevious(this.navCtrl.getActive()).name,
        toPage: this.navCtrl.getActive().name
      },
      'PageTransition '
    );
    WL.Analytics.send();
  }

  resortlist = [];

  callMicroservice() {
    var self = this;
    var resourceRequest = new WLResourceRequest(
      'http://resortsreservation.mybluemix.net/resortlistings',
      WLResourceRequest.GET
    );
    resourceRequest.send().then(
      function(response) {
        // alert('Success: ' + response.responseText);
        self.ngZone.run(()=>{
          self.resortlist = JSON.parse(response.responseText);
        });
      },
      function(response) {
        alert('Failure: ' + JSON.stringify(response));
      }
    );
  }
}
