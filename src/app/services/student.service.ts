import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http:HttpClient) { }

  addStudent(data:any){
    return this.http.post('link',data);
  }

  getStudentList(){
    return this.http.get('link');
  }

  deleteStudent(id:number): Observable<any>{
    return this.http.delete('link/${id}');
  }

  editStudent(id:number,data:any){
    return this.http.put('link/${id}',data);
  }
}
