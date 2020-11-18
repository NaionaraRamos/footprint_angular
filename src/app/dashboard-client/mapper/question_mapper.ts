import { QuestionEntity } from '../entity/question-entity';
import { Question } from '../model/question';
import { Mapper } from '../../base/mapper';

export class QuestionMapper extends Mapper<QuestionEntity, Question> {
    mapFrom(param: QuestionEntity): Question {
        return {
            id: param.id,
            title: param.title ? param.title : '',
            category: param.category ? param.category : '',
            answerA: param.answerA ? param.answerA : '',
            weightA: param.weightA,
            answerB: param.answerB ? param.answerB : '',
            weightB: param.weightB,
            answerC: param.answerC ? param.answerC : '',
            weightC: param.weightC,
            answerD: param.answerD ? param.answerD : '',
            weightD: param.weightD,
            status: param.status ? param.status : ''
        }
    };

    mapTo(param: Question): QuestionEntity {
        return {
            id: param.id,
            title: param.title,
            category: param.category,
            answerA: param.answerA,
            weightA: param.weightA,
            answerB: param.answerB,
            weightB: param.weightB,
            answerC: param.answerC,
            weightC: param.weightC,
            answerD: param.answerD,
            weightD: param.weightD,
            status: param.status
        }
    }
}