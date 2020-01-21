import { Component,Renderer,NgZone,NgModule } from '@angular/core';
import { NavController,ModalController, LoadingController } from 'ionic-angular';
import { DataStore } from '../../app/dataStore';
import WatsonChat from "../../componentScripts/chat";
import { Platform } from "ionic-angular";
import { ElementRef } from "@angular/core";
import { LiveUpdateProvider } from "../../providers/live-update/live-update";

@Component({
  selector: 'page-chatbot',
  templateUrl: 'chatbot.html'
})

@NgModule({
  providers: [
      LiveUpdateProvider
  ]
})

export class ChatbotPage {

  constructor(public navCtrl: NavController, public dataStore:DataStore, renderer: Renderer, private zone: NgZone, public platform: Platform, public elem: ElementRef,public liveUpdateService: LiveUpdateProvider) {
      this.watsonChat.init(this.url,this.iam_apikey,this.workspaceId,eval('this.shouldSendWatsonAssistantAnalytics'));
      platform.ready().then(() => {this.message()});

  }

    messages = [];
    input: any;
    watsonChat = new WatsonChat();
    pageTagName: any;

    message() {
        this.watsonChat.sendMessage(this.messages, this.input,(err,msgs)=>{ this.zone.run(() => { this.messages = msgs; }); });this.input='';
    }

    ionViewDidLoad() {
        this.pageTagName = this.elem.nativeElement.tagName.toLowerCase();const scrollContentSelector = this.pageTagName + ' .scroll-content';const scrollElement:HTMLElement =  document.querySelector(scrollContentSelector) as HTMLElement;scrollElement.style.overflow = 'hidden';
        WL.Analytics.log({ fromPage: this.navCtrl.getPrevious(this.navCtrl.getActive()).name, toPage: this.navCtrl.getActive().name }, 'PageTransition ');
        WL.Analytics.send();
    }

    url = "https://gateway-syd.watsonplatform.net/assistant/api";
    iam_apikey = "6YhME2v8FtKRhq1z21RJbdO5Onmwf4ViZvX6CvLQp1ht";
    workspaceId = "31f6d67c-46ec-4222-9d5a-0a704930ca7b";
    shouldSendWatsonAssistantAnalytics = true;
}