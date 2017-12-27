import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class RestProvider {

  apiUrl = 'https://wind-bow.glitch.me/twitch-api';

  constructor(public http: HttpClient) {
  }

  getUserData(user) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/users/' + user).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  getStreamData(user) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/streams/' + user).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

}
