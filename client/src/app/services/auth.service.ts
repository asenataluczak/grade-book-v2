import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, tap } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser$ = new BehaviorSubject<User | null>(null)

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post(`${environment.backendUrl}/auth/login`, { email, password, sessionId: this.getSessionId() }, {
      withCredentials: true
    }).pipe(tap((data: any) => {
      localStorage.setItem('fullname', data[0].fullname)
      localStorage.setItem('role', data[0].role)
      localStorage.setItem('userId', data[0].id)
      this.currentUser$.next(data['0'])
    }))
  }

  logout() {
    return this.http.delete(`${environment.backendUrl}/auth/logout`, {
      withCredentials: true
    }).pipe(tap((data: any) => {
      localStorage.removeItem('fullname')
      localStorage.removeItem('role')
      localStorage.removeItem('userId')
      this.currentUser$.next(null)
    }))
  }

  checkIfLoggedIn() {
    return this.http.get(`${environment.backendUrl}/auth/status`, {
      withCredentials: true
    })
  }

  private getSessionId() {
    return document.cookie;
  }
}
