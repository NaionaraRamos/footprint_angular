import { UserEntity} from '../entity/user-entity';
import { BaseHttpService } from '../../services/http/base-http.services';
import { UserMapper } from '../mapper/user_mapper';
import { User } from '../model/user';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, merge } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})

export class UserRepository {

    mapper = new UserMapper();

    constructor(public http: BaseHttpService) {}

    getUser(id: number): Observable<User> {

        return this.http
            .getAll<User>(`${environment.URLSERVIDOR}user/${id}`)
            .pipe(map((x) => this.mapper.mapFrom(x.data)));
    }

    postUser(param: User){

        return this.http
            .post<UserEntity>(`${environment.URLSERVIDOR}user/register`, this.mapper.mapTo(param))
            .pipe(map((x) => this.mapper.mapFrom(x.data)));
    }

    putUser(param: User){
        
        return this.http
            .put<void>(`${environment.URLSERVIDOR}user/update/${param.id}`, 
            this.mapper.mapTo(param))
            .pipe(map((x) => x.data));
    }

    deleteUser(id: number): Observable<void>{

        return this.http
            .delete<void>(`${environment.URLSERVIDOR}user/delete/${id}`, id)
            .pipe(map((x) => x.data));
    }
}