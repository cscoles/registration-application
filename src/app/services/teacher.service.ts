/* * * ./app/comments/components/comment.service.ts * * */
// Imports
import { Injectable, Inject }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Teacher }           from '../models/teacher';
import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class TeacherService {
  // Resolve HTTP using the constructor
  constructor (
    private http: Http,
    @Inject('api') private api
  ) {}

  private serviceapi = `${this.api}/teacher`;

  // Fetch all existing School Years
  getTeachers() : Observable<Teacher[]>{
    // ...using get request
    let teachers$ = this.http.get(this.serviceapi)
    // ...and calling .json() on the response to return data
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    return teachers$
  }

  getActiveTeachers() : Observable<Teacher[]>{
    // ...using get request
    let teachers$ = this.http.get(`${this.serviceapi}/active`)
    // ...and calling .json() on the response to return data
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    return teachers$
  }

  // Add a new session
  addTeacher (body: Object): Observable<Teacher[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option

    return this.http.post(this.serviceapi, body, options) // ...using post request
      .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
  }


   updateTeacher (body: Object): Observable<Teacher[]> {
   let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
   let options = new RequestOptions({ headers: headers }); // Create a request option

   return this.http.put(`${this.serviceapi}/${body['Teacher_ID']}/`, body, options) // ...using put request
   .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
   .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
   }
  /* Delete a comment - NOT IMPLEMENTED YET
   removeYear (id:string): Observable<Session[]> {
   return this.http.delete(`${this.serviceUrl}/${id}`) // ...using put request
   .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
   .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
   }   */
}
