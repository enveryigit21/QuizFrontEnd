import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { QuestionService } from '../service/question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})



export class QuestionComponent  implements OnInit{




  public name : string = "";
  public questionList : any = [];
  public currentQuestion : number= 0;
  public points: number = 0;
  counter = 60;
  interval$ : any;
  correctAnsver : number = 0 ;
  UncorrectAnsver : number = 0 ;
  progress:any = "0";
  isCompited : boolean = false;

  constructor(private service : QuestionService) {}
  ngOnInit(): void {
     this.name =    localStorage.getItem("name")!;
     this.getAllQuestion();
     this.startCounter();

  }


  getAllQuestion(){
   this.service.getQusestionJson()
   .subscribe((res:any) => {
   this.questionList = res.questions;
   })
  }


  nextQuestion(){
    this.currentQuestion++;
  }
  prevQuestion(){
    this.currentQuestion--;
  }
  answer(currentQuestion : number , option : any) {

    if(currentQuestion === this.questionList.length) {
      this.isCompited = true;
      this.resetCounter();

    }
    if(option.correct) {
      this.points+=10;
      this.correctAnsver++;
      setTimeout(() => {
        this.nextQuestion();
        this.resetCounter();
      this.getProgressPercent();
      },1000)


    }
    else {
      setTimeout(() => {
        this.UncorrectAnsver++;
        this.nextQuestion();
        this.resetCounter();
      this.getProgressPercent();
      },1000)
      this.points -=10;

    }
  }

  startCounter(){
      this.interval$ = interval(1000)
      .subscribe((res:any) => {
        this.counter--;
        if(this.counter===0){

          this.nextQuestion()
          this.counter=60;
          this.points -=10;
        }

      });
      setTimeout(() => {
         this.interval$.unsubscribe();
      },6000000);
  }
  stopCounter(){
      this.interval$.unsubscribe();
      this.counter=0;
  }
  resetCounter(){
   this.stopCounter();
    this.counter=60;
    this.startCounter();
  }

  resetQuiz(){
    this.resetCounter();
    this.getAllQuestion();
    this.points=0;
    this.counter=60;
    this.currentQuestion=0;
    this.progress= '0'
  }

  getProgressPercent(){
    this.progress = ((this.currentQuestion/this.questionList.length)*100)
    return this.progress;
  }
}
