import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import * as _ from 'lodash';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  target: string = 'all';
  channels: string[] =  ['freecodecamp',
    'riotgames',
    'noopkat',
    'starladder1',
    'beyondthesummit',
    'shadbasemurdertv',
    'pgl_clean',
    'esltv_cs',
    'esl_csgo',
    'imaqtpie',
    'lirik',
    'lirikk',
    'dyrus',
    'HiRezTV',
    'dota2ti',
    'dotati',
    'ogn_star2',
    'riotgamesturkish',
    'izakooo',
    'dota2ruhub',
    'xangold',
    'ignproleague',
    'ignproleague5',
    'ignproleague6',
    'ESL_SC2',
    'OgamingSC2',
    'cretetion',
    'storbeck',
    'habathcx',
    'RobotCaleb',
    'noobs2ninjas'];

  items: Array<any> = [];
  allItems: Array<any> = [];

  constructor(private theInAppBrowser: InAppBrowser, public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider) {

    this.target = navParams.get('target') || 'all'

    if(this.allItems.length === 0) {
      for (let i = 0; i < this.channels.length; i++) {

        this.restProvider.getUserData(this.channels[i])
          .then(data => {
            this.restProvider.getStreamData(data['name']).then(stream => {
               if(stream['stream']) {
                 data['online'] = true
                 data['status'] = stream['stream']['channel']['status']
               } else {
                 data['online'] = false
               }
              this.allItems.push(data)
              this.filterList();
            })
          });
      }
    }

    this.filterList();

  }

  filterList(){
    if (this.target === 'all'){
      this.items = _.orderBy(this.allItems, ['online'], ['desc']);
    } else if (this.target === 'online') {
      this.items = _.filter(this.allItems, {online:true})
    } else {
      this.items = _.filter(this.allItems, {online:false})
    }
  }

  launch(url) {
    this.theInAppBrowser.create(url,'_blank')
  }
}
