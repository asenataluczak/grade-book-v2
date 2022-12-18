import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GradeService {

  constructor(private http: HttpClient) { }

  getCourses() {
    if (!localStorage.getItem('courses')) {
      this.http.get(`${environment.backendUrl}/course/list`).subscribe(val => {
        localStorage.setItem('courses', JSON.stringify(val))
      })
    }
    return JSON.parse(localStorage.getItem('courses') as string)
  }
}
