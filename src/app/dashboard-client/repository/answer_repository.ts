import { Answer } from '../model/answer';
import { AnswerEntity } from '../entity/answer-entity';
import { AnswerMapper } from '../mapper/answer_mapper';
import { BaseHttpService } from '../../services/http/base-http.services';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})

export class AnswerRepository {
    mapper = new AnswerMapper();

    constructor(public http: BaseHttpService) {}

    postAnswer(param: Answer){
        return this.http
            .post<AnswerEntity>(`${environment.URLSERVIDOR}answer/postanswer`, this.mapper.mapTo(param))
            .pipe(map((x) => this.mapper.mapFrom(x.data)));
    }

    getAnswer(id: number): Observable<Answer>{
        return this.http
            .getAll<Answer>(`${environment.URLSERVIDOR}answer/getanswer/${id}`)
            .pipe(map((x) => this.mapper.mapFrom(x.data)));
    }

    listAllAnswers(): Promise<Answer[]> {
        return this.http
            .getAll<AnswerEntity[]>(`${environment.URLSERVIDOR}answer/listallanswers`)
                .toPromise().then(x => {
                    return x.data.map(this.mapper.mapFrom);
                })
    }
}