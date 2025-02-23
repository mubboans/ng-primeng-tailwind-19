import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private apollo: Apollo) { }
  getUsers(query: any): Observable<any> {
    return this.apollo
      .watchQuery({
        query: query,
        context: {
          uri: environment.endpoint,
        },
      })
      .valueChanges.pipe(map((result: any) => result.data.users));
  }
}
