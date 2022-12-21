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
    return this.http.get<Array<User>>(`${environment.backendUrl}/user/list${role ? '?role=' + role : ''}`)
  }

  deleteUser(id: number) {
    return this.http.delete(`${environment.backendUrl}/user/delete?id=${id}`)
  }

  editUser(id: number, data: any) {
    return this.http.patch(`${environment.backendUrl}/user/edit?id=${id}`, data)
  }

  addUser(data: any) {
    return this.http.post(`${environment.backendUrl}/user/add`, data)
  }
}
