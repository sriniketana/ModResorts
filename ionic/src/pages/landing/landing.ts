import { Component,Renderer,NgZone,NgModule } from '@angular/core';
import { NavController,ModalController, LoadingController } from 'ionic-angular';
import { DataStore } from '../../app/dataStore';
import { ReservationsPage } from "../reservations/reservations";
import { ChatbotPage } from "../chatbot/chatbot";
import { LiveUpdateProvider } from "../../providers/live-update/live-update";
import { ResortslistPage } from "../resortslist/resortslist";

@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html'
})

@NgModule({
  providers: [
      LiveUpdateProvider
  ]
})

export class LandingPage {

  constructor(public navCtrl: NavController, public dataStore:DataStore,public liveUpdateService: LiveUpdateProvider) {

  }

    landing_Image_4159_clickHandler() {
        this.navCtrl.push( ResortslistPage, {
                data: {"a":"a"}
              });
    }

    landing_Image_9739_clickHandler() {
        this.navCtrl.push( ChatbotPage, {
                data: {"a":"a"}
              });
    }

    ionViewDidLoad() {
        WL.Analytics.log({ fromPage: this.navCtrl.getPrevious(this.navCtrl.getActive()).name, toPage: this.navCtrl.getActive().name }, 'PageTransition ');
        WL.Analytics.send();
    }

    logout() {
      var self = this;
      WLAuthorizationManager.logout('UserLogin').then(
        () => {
          WL.Logger.debug('logout onSuccess');
          self.navCtrl.pop();
        },
        response => {
          WL.Logger.error('logout onFailure: ' + JSON.stringify(response));
        }
      );
    }
}