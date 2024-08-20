import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../utils/user';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(
      'https://66bf066442533c403144c5e7.mockapi.io/api/v1/users'
    );
  }

  getUserDetails(userId: string): Observable<User> {
    return this.http.get<User>(
      `https://66bf066442533c403144c5e7.mockapi.io/api/v1/users/${userId}`
    );
  }

  createUser(payload: User): Observable<User> {
    return this.http.post<User>(
      'https://66bf066442533c403144c5e7.mockapi.io/api/v1/users',
      payload
    );
  }

  updateUser(userId: string, payload: User): Observable<User> {
    return this.http.put<User>(
      `https://66bf066442533c403144c5e7.mockapi.io/api/v1/users/${userId}`,
      payload
    );
  }

  deleteUser(userId: string) {
    return this.http.delete(
      `https://66bf066442533c403144c5e7.mockapi.io/api/v1/users/${userId}`
    );
  }
}
