import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as global from '../global.variables';
import {RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class PostService {

  constructor(private http: HttpClient ){
  }


   public getQuestionsData(): Observable<any> {
    return this.http.get('./assets/data/questions.json', {responseType: 'text'});
  }


}
