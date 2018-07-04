import { Component, OnInit, Input, Output,  EventEmitter } from '@angular/core';
import { QuestionComponent } from '../question/question.component';
import { AnswerComponent } from '../answer/answer.component';
import { ValidationComponent } from '../validation/validation.component';
import {
  QuestionAnswerService
} from '../question-answer.service';
import {
  Subscription
} from 'rxjs/Subscription';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  questions = [];
  answers = [];
  currentQuesObj = [];
  responseData;
  index = 0;
  round = 'round1';
  screenIndicators = [];
  constructor(private service: QuestionAnswerService) { }

  ngOnInit() {
    this.screenIndicators = [
      {
        screenNo: 1,
        isActive: true
      },
      {
        screenNo: 2,
        isActive: false
      },
      {
        screenNo: 3,
        isActive: false
      }
    ];
    this.service.getJsonData();
    this.responseData = this.service.response;
    console.log(this.responseData);
    for (const i in this.responseData.rounds) {
      if (this.round === i) {
        this.responseData.rounds[i].questions.forEach(e => {
          this.questions.push(e.text);
          this.answers.push(e.answers);
          this.currentQuesObj.push(e);
        });
        console.log(this.questions);
      } else {
        this.round = i;
        return this.questions;
      }
    }
  }
  updateIndex(idx) {
    this.index = idx;
  }

}
