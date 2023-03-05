import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { ISignUp } from 'src/data-type';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient) { }

  postSignupData(data: ISignUp){
    return this.http.post('http://localhost:3000/signup',data);
  }

  getSignupData(){
    return this.http.get('http://localhost:3000/signup');
  }
}
