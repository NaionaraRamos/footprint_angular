import { Answer } from '../model/answer';
import { AnswerEntity } from '../entity/answer-entity';
import { Mapper } from '../../base/mapper';

export class AnswerMapper extends Mapper<AnswerEntity, Answer> {
    mapFrom(param: AnswerEntity): Answer {
        return {
            id: param.id,
           // user: param.user,
            monthAnswer: param.monthAnswer,
            yearAnswer: param.yearAnswer,
            sumAlimentacao: param.sumAlimentacao,
            sumConsumo: param.sumConsumo,
            sumMoradia: param.sumMoradia,
            sumResiduos: param.sumResiduos,
            sumTransporte: param.sumTransporte
        }
    }

    mapTo(param: Answer): AnswerEntity {
        return {
            id: param.id,
           // user: param.user,
            monthAnswer: param.monthAnswer,
            yearAnswer: param.yearAnswer,
            sumAlimentacao: param.sumAlimentacao,
            sumConsumo: param.sumConsumo,
            sumMoradia: param.sumMoradia,
            sumResiduos: param.sumResiduos,
            sumTransporte: param.sumTransporte
        }
    }
}