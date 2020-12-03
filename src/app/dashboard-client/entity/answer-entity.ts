import { User } from 'src/app/register-client/model/user';

export interface AnswerEntity {
    id?: number;
   // user?: any;
	monthAnswer?: number;
    yearAnswer?: number;
    sumAlimentacao?: number;
    sumConsumo?: number;
    sumMoradia?: number;
    sumResiduos?: number;
    sumTransporte?: number;
}