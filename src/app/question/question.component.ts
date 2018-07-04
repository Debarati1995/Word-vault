import { Component, OnInit } from '@angular/core';
import { QuestionAnswerService } from '../question-answer.service';
import {
  Subscription
} from 'rxjs/Subscription';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  questions = [];
  responseData;
  index = 0;
  round = 'round1';
  indexSubscription: Subscription;
  constructor(private service: QuestionAnswerService) { }

  ngOnInit() {
    this.indexSubscription = this.service.index.subscribe((data: any) => {
      this.index = data.index;
    } 
    );
    this.service.getJsonData();
    this.responseData = this.service.response;
   console.log(this.responseData);
   for (let i in this.responseData.rounds) {
     if (this.round === i) {
       this.responseData.rounds[i].questions.forEach(e => {
         this.questions.push(e.text);
       });
       console.log(this.questions);
      }     
     
    }
  }

}
