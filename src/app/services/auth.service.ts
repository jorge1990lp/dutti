import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL_JSON = "assets/json/users.json";

  constructor(private http: HttpClient) { }

  login(username, password): Observable<String> {
    return new Observable ((observer) => {
      this.http.get<Array<User>>(this.URL_JSON).subscribe(users => {
        const user = users.filter( function (user) { return user.username === username});
        if(user.length > 0) {
          const token = btoa(JSON.stringify(user[0]));
          observer.next(token);
          observer.complete();
        } else {
          observer.error('Unregistered user');
        }
      });
    });
  }
}

