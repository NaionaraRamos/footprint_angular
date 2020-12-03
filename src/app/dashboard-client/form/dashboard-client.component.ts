import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
//import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
//import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Chart } from 'chart.js';
//import { ClientServiceService } from './../client-service.service';
import { textSpanIntersectsWithTextSpan } from 'typescript';
import { QuestionRepository } from '../repository/question_repository';
import { AnswerRepository } from '../repository/answer_repository';
import { FormGroup } from '@angular/forms';
import { Question } from '../model/question';
// import {NgbdDropdownManualModule} from './app/dropdown-manual.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/seguranca/auth.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard-client',
  templateUrl: './dashboard-client.component.html',
  styleUrls: ['./dashboard-client.component.css']
})

export class DashboardClientComponent implements OnInit {
  classContents = ["historic", "update", "tips", "configurations", "adm"];
  classTips = ["cat1", "cat2", "cat3", "cat4", "cat5"];
  registerQuestion = {id: null, title: '', answerA: '', weightA: null, answerB: '', weightB: null, answerC: '', weightC: null, answerD: '', weightD: null, status: '', category: ''};
  numberQuestion = 0;
  numberTotalQuestion = 0;
  questionsChecked = [];
 // answers = [];
  allQuestions;
  categoryCurrent = '';
  teste = '';
  public formQuestion: FormGroup;
  public formPersonalInfo: FormGroup;
  questions: Question[] = [];
  activeQuestions: Question[] = [];
  closeResult = '';
  questionToBeDeleted = ''
  questionIdToBeDeleted = ''
  titleQuestionUpdate = ''
  answerAupdate = ''
  weightAupdate = ''
  answerBupdate = ''
  weightBupdate = ''
  answerCupdate = ''
  weightCupdate = ''
  answerDupdate = ''
  weightDupdate = ''
  user: string = '';
  userId: number = null;
  answers = {id: null,
    //user_id: null,
   // user: null,
    monthAnswer: null, yearAnswer: null, sumAlimentacao: null,
    sumAlojamento: null, sumConsumo: null, sumResiduos: null, sumTransporte: null}

  constructor(
    private questionRepository: QuestionRepository,
    private answerRepository: AnswerRepository,
    private modalService: NgbModal,
    private router: Router,
    public service: AuthService) {
          this.user = service.jwtPayload ? service.jwtPayload.user_name : '';
          this.userId = service.jwtPayload ? service.jwtPayload.user_id : null;
    }
  
  ngOnInit(): void {
    this.hiddenContent();
    this.showContent('historic');
    this.hiddenContentCategories();
    this.insertChartAtFirst();
    this.insertQuestion('insert');
    this.getAllQuestions();
    this.getActiveQuestions();
    this.getUser();
    //this.insertChartAfterAnswers();
   // this.getAnswers();
  }

  open(content, title, id) {
    this.questionToBeDeleted = title
    this.questionIdToBeDeleted = id

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  getActiveQuestions(){
    this.activeQuestions = [];
    this.questionRepository.getActiveQuestions().then(resposta => {
      this.activeQuestions = resposta;
    })

  //  this.getAnswers();
  }

  getAllQuestions(){
    this.questions = [];
    this.questionRepository.getAllQuestions().then(resposta => {
      this.questions = resposta;
    })
  }


  getUser(){
    if(this.user == 'nramosmaceda@gmail.com'){
      console.log(1234567890);

      document.getElementById('area_user').style.display = "none";
      document.getElementById('hist').style.display = "none";
      document.getElementById('non-user').style.display = "block";
     /*  document.getElementById('atualizacao').style.display = "none";
      document.getElementById('historico').style.display = "none";
      document.getElementById('dicas').style.display = "none";
      document.getElementById('at').style.display = "none";
      document.getElementById('hist').style.display = "none";
      document.getElementById('tip').style.display = "none"; */
    /*   document.getElementById('admin').style.alignContent = "center";
      document.getElementById('conf').style.alignSelf = "center"; */

    }
    else{
      console.log('Não é admin...')

      document.getElementById('area_admin').style.display = "none";
      //document.getElementById('hist').style.display = "none";

     /*  document.getElementById('admin').style.display = "none";
      document.getElementById('non-user').style.display = "none";
      document.getElementById('at').style.display = "none"; */
    }
  }
 /*  getAnswers(){
    this.answers = [];
    this.answerRepository.listAllAnswers().then(resposta => {
      this.answers = resposta;
    })

    for (let a in this.answers){
      console.log("Resposta: " + a)
    }
  } */

  insertChartAtFirst(){

   /*  this.answers = [];
    this.answerRepository.getAllAnswers().then(resposta => {
      this.answers = resposta;
    }) */

    var myChart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: ['Janeiro', 'Fevereiro', 'Março','Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        datasets: [

          {
            label: 'Alojamento',
            //data: [5, 2, 5, 1, 3, 1, 0.25, 4, 9, 7, 3, 2],
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            backgroundColor: '#F94144',
          },
          {
            label: 'Alimentação',
            //data: [7, 0.25, 3, 4, 0.25, 2, 0.25, 1, 1, 1, 2, 3],
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            backgroundColor: '#F3722C',
          },
          {
            label: 'Transporte',
           // data: [1, 2, 8, 1, 0.1, 0.25, 0.25, 0.25, 0.5, 2, 3, 3],
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            backgroundColor: '#F9C74F',
          },
          {
            label: 'Consumo',
            //data: [0.75, 2, 2, 3, 3, 0.75, 0.75, 4, 2, 2, 1, 4],
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            backgroundColor: '#90BE6D',
          },
          {
            label: 'Resíduos',
          //  data: [2, 0.5, 3.5, 4, 5, 0.1, 0.5, 4.5, 4, 2, 5, 1],
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            backgroundColor: '#577590',
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [{ 
                    stacked: true,
                    scaleLabel:{
                      display: true,
                      labelString: "Mês" 
                    },
                    gridLines:{
                      display: false
                    }
                  }],
          yAxes: [{ 
                    stacked: true,
                    scaleLabel:{
                      display: true,
                      labelString: "Hectares Globais (gha)"
                    },
                    gridLines:{
                      display: false
                    }
                  }]
        }
      }
    });
  }



  insertChartAfterAnswers(){

    /*  this.answers = [];
     this.answerRepository.getAllAnswers().then(resposta => {
       this.answers = resposta;
     }) */
 
     var myChart = new Chart('canvas', {
       type: 'bar',
       data: {
         labels: ['Janeiro', 'Fevereiro', 'Março','Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
         datasets: [
 
           {
             label: 'Alojamento',
             //data: [5, 2, 5, 1, 3, 1, 0.25, 4, 9, 7, 3, 2],
             data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 30],
             backgroundColor: '#F94144',
           },
           {
             label: 'Alimentação',
             //data: [7, 0.25, 3, 4, 0.25, 2, 0.25, 1, 1, 1, 2, 3],
             data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12],
             backgroundColor: '#F3722C',
           },
           {
             label: 'Transporte',
            // data: [1, 2, 8, 1, 0.1, 0.25, 0.25, 0.25, 0.5, 2, 3, 3],
             data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18],
             backgroundColor: '#F9C74F',
           },
           {
             label: 'Consumo',
             //data: [0.75, 2, 2, 3, 3, 0.75, 0.75, 4, 2, 2, 1, 4],
             data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8],
             backgroundColor: '#90BE6D',
           },
           {
             label: 'Resíduos',
           //  data: [2, 0.5, 3.5, 4, 5, 0.1, 0.5, 4.5, 4, 2, 5, 1],
             data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
             backgroundColor: '#577590',
           }
         ]
       },
       options: {
         responsive: true,
         maintainAspectRatio: false,
         scales: {
           xAxes: [{ 
                     stacked: true,
                     scaleLabel:{
                       display: true,
                       labelString: "Mês" 
                     },
                     gridLines:{
                       display: false
                     }
                   }],
           yAxes: [{ 
                     stacked: true,
                     scaleLabel:{
                       display: true,
                       labelString: "Hectares Globais (gha)"
                     },
                     gridLines:{
                       display: false
                     }
                   }]
         }
       }
     });
   }

  hiddenContent(){
      this.classContents.forEach(iten => {
          $('.row.'+iten).hide()
      })
  }

  showContent(nameRowToShow){
    this.hiddenContent()
    $('.row.'+nameRowToShow).show()
  }
  
  hiddenContentCategories(){
      this.classTips.forEach(iten => {
          $('.row.'+iten).hide()
      })
  }
  
  showContentTips(tipCategory){
    this.hiddenContentCategories()
    $('.row.'+tipCategory).show()
  }

  analyzeQuestions(form){
    this.numberTotalQuestion = $('.questionToAnalyze').length
    this.questionAnalyze()
    console.log(this.questionsChecked)
  }

  loadQuestion(idQuestion: number){
      this.questionRepository.getQuestion(idQuestion).subscribe(resposta => {
      this.formQuestion.controls.id.setValue(resposta.id);
      this.formQuestion.controls.title.setValue(resposta.title);
      this.formQuestion.controls.category.setValue(resposta.category);
      this.formQuestion.controls.status.setValue(resposta.status);
      this.formQuestion.controls.answerA.setValue(resposta.answerA);
      this.formQuestion.controls.weightA.setValue(resposta.weightA);
      this.formQuestion.controls.answerB.setValue(resposta.answerB);
      this.formQuestion.controls.weightB.setValue(resposta.weightB);
      this.formQuestion.controls.answerC.setValue(resposta.answerC);
      this.formQuestion.controls.weightC.setValue(resposta.weightC);
      this.formQuestion.controls.answerD.setValue(resposta.answerD);
      this.formQuestion.controls.weightD.setValue(resposta.weightD);
    })
  }
  
  insertQuestion(form){
    let titleInput = $('#question').val()
    let answerAinput = $('#answerA').val()
    let weightAinput = $('#answerWeightA').val()
    let answerBinput = $('#answerB').val()
    let weightBinput = $('#answerWeightB').val()
    let answerCinput = $('#answerC').val()
    let weightCinput = $('#answerWeightC').val()
    let answerDinput = $('#answerD').val()
    let weightDinput = $('#answerWeightD').val()
    let statusInput = $('#selectStatusQuestion').val()
    let categoryInput = $('#selectCategory').val()
    let actionSendForm = false;


    $('#btnUpdateOrInsert').on('click', function(){
      
      if (
        titleInput == '' || 
        answerAinput == '' || 
        weightAinput == '' || 
        answerBinput == '' || 
        weightBinput == '' || 
        answerCinput == '' || 
        weightCinput == '' || 
        answerDinput == ''
        
      ){
        
        $('#warningFieldsInsertQuestion').css('display', 'flex')
        return;  
      }
      
    } )

    if (
      titleInput == '' || 
      answerAinput == '' || 
      weightAinput == '' || 
      answerBinput == '' || 
      weightBinput == '' || 
      answerCinput == '' || 
      weightCinput == '' || 
      answerDinput == '' || 
      weightDinput == ''
    )
    {
      return;
    }


    this.registerQuestion = {
      id:  '',
      title: '' + titleInput,
      answerA: '' + answerAinput,
      weightA: weightAinput,
      answerB: '' + answerBinput,
      weightB: weightBinput,
      answerC: '' + answerCinput,
      weightC: weightCinput,
      answerD: '' + answerDinput,
      weightD: weightDinput,
      status: '' + statusInput,
      category: '' + categoryInput 
    }

    // console.log(this.registerQuestion)
    // console.log(this.registerQuestion.title)

    this.questionRepository.postQuestion(this.registerQuestion).subscribe(resposta => {
      this.registerQuestion = {
        id: null, title: '', category: '', status: '',
        answerA: '', weightA: null,
        answerB: '', weightB: null,
        answerC: '', weightC: null,
        answerD: '', weightD: null,
      };

      $('#warningFieldsInsertQuestion').css('display', 'none')
      this.getAllQuestions();
    })

  }
    
  questionAnalyze (){
    
      let questionOptions = {
          number: 0,
          letter: '',
          questionID: '',
          weightChoice:'',
          category:'',
      }
      
      if (this.numberQuestion > this.numberTotalQuestion){
          return
      }

      this.numberQuestion++
      let question = $(".question"+this.numberQuestion)

      for (let i = 0; i < question.length; i++){
        let stateCurrent = question[i]['checked']
        
        if (stateCurrent){
          let weigth = question[i]['value']
          let categoryNow = question[i].dataset.category
          let letterChoose = question[i].id.substring(0,1)
          let questionID = question[i].id.substring(9)
          questionOptions.number = this.numberQuestion
          questionOptions.letter = letterChoose
          questionOptions.questionID = questionID
          questionOptions.weightChoice = weigth
          questionOptions.category = categoryNow
          this.questionsChecked.push(questionOptions);
        }
      }

      this.questionAnalyze()


      let mes = new Date().getMonth() + 1;
      let ano = new Date().getFullYear();

      var pesoAlimentacao = 0;
      var pesoAlojamento = 0;
      var pesoConsumo = 0;
      var pesoResiduos = 0;
      var pesoTransporte = 0;

      this.answers.sumResiduos = pesoResiduos;
      this.answers.sumConsumo = pesoConsumo;
      this.answers.sumAlojamento = pesoAlojamento;
      this.answers.sumAlimentacao = pesoAlimentacao;
      this.answers.sumTransporte = pesoTransporte;
      this.answers.monthAnswer = mes;
      this.answers.yearAnswer = ano;


      this.answers = {
        id:  null,
      //  user_id: this.userId,
      //  user: this.user,
        monthAnswer: this.answers.monthAnswer,
        yearAnswer: this.answers.yearAnswer,
        sumAlimentacao: this.answers.sumAlimentacao,
        sumAlojamento: this.answers.sumAlojamento,
        sumConsumo: this.answers.sumConsumo,
        sumResiduos: this.answers.sumResiduos,
        sumTransporte: this.answers.sumTransporte,
      }

      /* this.router.navigate(['/dashboard']); */
      
      this.answerRepository.postAnswer(this.answers).subscribe(resposta => {
        this.answers = {
          id: null,
        //  user_id: null,
        //  user: null,
          monthAnswer: null, yearAnswer: null, sumAlimentacao: null, sumAlojamento: null,
          sumConsumo: null, sumResiduos: null, sumTransporte: null
        }

      this.insertChartAfterAnswers();
      })

  }

  loadAllQuestions(){
    this.questions = [];
    this.questionRepository.getAllQuestions().then(resposta => {
      this.questions = resposta;
    })
  }

  deleteQuestion(questionIdDelete){
    
    this.questionRepository.deleteQuestion(questionIdDelete).subscribe(resposta => {
      this.loadAllQuestions();
    })
    this.modalService.dismissAll()
    this.questionToBeDeleted = ''
    this.questionIdToBeDeleted = ''
  }

  prepareToUpdateFields(title,answerA,answerB,answerC,answerD,weightA,weightB,weightC,weightD){
    this.titleQuestionUpdate = title
    this.answerAupdate = answerA
    this.weightAupdate = weightA
    this.answerBupdate = answerB
    this.weightBupdate = weightB
    this.answerCupdate = answerC
    this.weightCupdate = weightC
    this.answerDupdate = answerD
    this.weightDupdate = weightD

    // this.questionRepository.putQuestion(nquestionIdDelete).subscribe(resposta => {
    //   this.loadAllQuestions();
    // })
  }
}