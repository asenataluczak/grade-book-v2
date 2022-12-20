import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Grade } from '../interfaces/grade.interface';

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

  getGradesPerCourse(courseId: number) {
    return this.http.get(`${environment.backendUrl}/grade/list?course=${courseId}`)
  }

  deleteGrade(id: number) {
    return this.http.delete(`${environment.backendUrl}/grade/delete?id=${id}`)
  }

  addGrade(data: Partial<Grade>) {
    return this.http.post(`${environment.backendUrl}/grade/add`, data)
  }
}
