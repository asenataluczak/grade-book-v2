import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(role?: number): Observable<Array<User>> {
    return this.http.get<Array<User>>(`${environment.backendUrl}/user/list${role || ''}`)
  }
}
