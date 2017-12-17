import { Component, NgZone, ViewChild } from '@angular/core';
import { NavController, Content } from 'ionic-angular';

import { TextToSpeech } from '@ionic-native/text-to-speech';

declare var window;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  messages:any[]=[];
  text:string;

  @ViewChild(Content) content:Content;

  constructor(public navCtrl: NavController, private tts:TextToSpeech,private ngZone:NgZone) {
    this.messages.push({
      text:"How may I help you?",
      sender:'api'
    });
  }

  send(){

    let message = this.text;

    this.messages.push({
      text:message,
      sender:'me'
    });

    this.content.scrollToBottom(200);

    this.text = '';

    window["ApiAIPlugin"].requestText(
      {
          query: message
      },
      response => {
          // place your result processing here
          this.ngZone.run(()=>{
            this.messages.push({
              text:response.result.fulfillment.speech,
              sender:'api'
            })
          }) 
          this.content.scrollToBottom(200);
      },
      error => {
          // place your error processing here 
          alert(error);
    });
  }


  sendVoice(){

    window["ApiAIPlugin"].requestVoice({},
      response =>  {
        // alert(JSON.stringify(response));
          // place your result processing here 
          this.tts.speak({
            text:response.result.fulfillment.speech,
            locale:"en-IN",
            rate:1
          })
      },
      error =>  {
          // place your error processing here 
          alert(error);
    });

  }

}
