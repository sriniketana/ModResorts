import { Component, ViewChild, Renderer, ChangeDetectorRef,NgModule } from '@angular/core';
import { Nav, Platform, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LiveUpdateProvider } from "../providers/live-update/live-update";
import { HomePage } from '../pages/home/home';
import { LandingPage } from "../pages/landing/landing";
import { ReservationsPage } from "../pages/reservations/reservations";
import { ChatbotPage } from "../pages/chatbot/chatbot";
import { AppDisabled } from './app_disable';
import { ResortslistPage } from "../pages/resortslist/resortslist";

@Component({
  templateUrl: 'app.html'
})

@NgModule({
  providers: [
      LiveUpdateProvider
  ]
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private renderer: Renderer, public modalCtrl: ModalController, private cdr: ChangeDetectorRef,public liveUpdateService: LiveUpdateProvider) {
    renderer.listenGlobal('document', 'mfpjsloaded', () => {
      this.initializeApp(renderer, cdr);
    });
    // used for an example of ngFor and navigation
    this.pages = [
            { title: 'Home', component: HomePage }, { title: 'landing', component: LandingPage }, { title: 'reservations', component: ReservationsPage }, { title: 'chatbot', component: ChatbotPage } ,{title:'resortslist', component: ResortslistPage}
          ];
    renderer.listenGlobal('document', 'mfpjsloaded', () => {
      WL.Analytics.enable();
      var wl_remoteDisableChallengeHandler:
        WL.Client.SecurityCheckChallengeHandler = WL.Client.createSecurityCheckChallengeHandler(
          'wl_remoteDisableRealm'
        );
      var self = this;
      wl_remoteDisableChallengeHandler.handleChallenge = function (obj) {
        var messageId = eval('obj.messageId');
        var challengeAnswer = { messageId: messageId };

        let createModal = self.modalCtrl.create(AppDisabled, { disabled: obj });
        createModal.present();

        wl_remoteDisableChallengeHandler.submitChallengeAnswer(challengeAnswer);
      };
      wl_remoteDisableChallengeHandler.handleFailure = function (err) {
        let createModal = self.modalCtrl.create(AppDisabled, { disabled: err });
        createModal.present();
      };
    });
      renderer.listenGlobal('document', 'mfpjsloaded', () => { WL.Analytics.enable();});

  }

  initializeApp(renderer, cdr) {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.rootPage = HomePage;
      cdr.detectChanges();
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
