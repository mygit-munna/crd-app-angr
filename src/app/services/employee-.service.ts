import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private _http:HttpClient ) { }

  addEmployee(data:any):Observable<any>{
    return this._http.post('https://data-s-time.onrender.com/employees',data)
  }


  getAllEmployeeList(){
    return this._http.get('https://data-s-time.onrender.com/employees')
  }


  deleteEmployee(id:number):Observable<any>{
    return this._http.delete(`https://data-s-time.onrender.com/employees/${id}`);
  }

  updateEmpDetails(id:number,data:any):Observable<any>{
    return this._http.put(`https://data-s-time.onrender.com/employees/${id}`,data)
  }
}
