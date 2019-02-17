import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from './user';
import { Config } from 'src/constant';

@Injectable()
export class UserService { 
    constructor(private http: HttpClient) { }
	getUsers(searchText:string): Observable<User[]> {
	    return this.http.get<User[]>(`${Config.API_ENDPOINT}/user/search/${searchText}`);
	}
} 