export interface QuestionEntity {
    id?: number;
    category?: string;
	title?: string;
	answerA?: string;
    weightA?: number;
    answerB?: string;
	weightB?: number;
	answerC?: string;
	weightC?: number;
	answerD?: string;
	weightD?: number;
	status?: string;
}