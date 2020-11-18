import { QuestionEntity } from '../entity/question-entity';
import { Question } from '../model/question';
import { QuestionMapper } from '../mapper/question_mapper';
import { BaseHttpService } from '../../services/http/base-http.services';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})

export class QuestionRepository {
    mapper = new QuestionMapper();

    constructor(public http: BaseHttpService) {}

    getQuestion(id: number): Observable<Question> {

        console.log("Recuperando pergunta...")
        return this.http
            .getAll<Question>(`${environment.URLSERVIDOR}dashboard/getquestion/${id}`)
            .pipe(map((x) => this.mapper.mapFrom(x.data)));
    }

    /* getAllQuestions(): Observable<Question> {

        console.log("Listando perguntas...")
        return this.http
            .getAll<QuestionEntity[]>(`${environment.URLSERVIDOR}dashboard`)
            .pipe(mergeMap((x) => x.data))
            .pipe(map((x) => this.mapper.mapFrom(x)));
    } */

    getAllQuestions(): Promise<Question[]> {
        console.log("Listando perguntas...")
        //console.log("QUESTÕES: " + this.getAllQuestions());
        return this.http
            .getAll<QuestionEntity[]>(`${environment.URLSERVIDOR}dashboard`)
            .toPromise().then(x => {
                return x.data.map(this.mapper.mapFrom);
            })
    }

    postQuestion(param: Question){

        console.log("Postando pergunta...")
        return this.http
            .post<QuestionEntity>(`${environment.URLSERVIDOR}dashboard/postquestion`, this.mapper.mapTo(param))
            .pipe(map((x) => this.mapper.mapFrom(x.data)));            
    }

    putQuestion(param: Question){
        
        console.log("Atualizando pergunta...")
        return this.http
            .put<void>(`${environment.URLSERVIDOR}dashboard/updatequestion/${param.id}`, this.mapper.mapTo(param))
            .pipe(map((x) => x.data));
    }

    deleteQuestion(id: number): Observable<void>{

        console.log("Deletando pergunta...")
        return this.http
            .delete<void>(`${environment.URLSERVIDOR}dashboard/deletequestion/${id}`, id)
            .pipe(map((x) => x.data));
    }
}
