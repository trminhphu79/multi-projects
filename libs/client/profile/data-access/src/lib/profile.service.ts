import { Injectable } from '@angular/core';
import {
  AddFriendPayload,
  Profile,
  SearchProfilePayload,
  BaseResposne,
  UserFriend,
} from './profile.model';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  http: HttpClient = inject(HttpClient);
  baseUrl = 'http://localhost:3000/profile/';

  search(payload: SearchProfilePayload) {
    return this.http.post<BaseResposne<Profile[]>>(
      `${this.baseUrl}search-friend`,
      payload
    );
  }

  addFriend(payload: AddFriendPayload) {
    return this.http.post(`${this.baseUrl}add-friend`, payload);
  }

  getUserFriends(profileId: number) {
    return this.http.get<BaseResposne<UserFriend>>(
      `${this.baseUrl}user-friend/${profileId}`
    );
  }
}
