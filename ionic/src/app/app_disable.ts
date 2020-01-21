import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  template: `
  <ion-header>
 <ion-toolbar>
   <ion-title>
     Mod Resorts
   </ion-title>
   <ion-buttons start>
     <button ion-button (click)="dismiss()">
       <ion-icon name="md-close"></ion-icon>
     </button>
   </ion-buttons>
 </ion-toolbar>
</ion-header>
  <ion-content padding>

  <ion-card>
  <img src="build/assets/imgs/disabled.png"/>
  <ion-card-content>
    <ion-card-title style="text-align:center;">
      App Management
      </ion-card-title>
      <p style="text-align:center;">
        {{err.message}}
      </p>
      
    </ion-card-content>
  </ion-card>

  </ion-content>
  `
})
export class AppDisabled {
  err = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {
    this.err = navParams.get('disabled');
    
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
