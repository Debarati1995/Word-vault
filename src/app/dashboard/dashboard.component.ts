import { Component, OnInit, Input, Output,  EventEmitter, OnChanges } from '@angular/core';
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
export class DashboardComponent implements OnInit, OnChanges {
  questions = [];
  answers = [];
  currentQuesObj = [];
  responseData;
  index = 0;
  round = 'round';
  currentRound = 1;
  screenIndicators = [];
  currentRoundAnswer = [];
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
    this.getQuestionData();
    localStorage.setItem('last_question', 'false');
  }

  ngOnChanges() {
    // if (this.index < this.currentRoundAnswer.length) {
    //   this.currentRoundAnswer.splice(0, 1);
    // }
  }

  getQuestionData() {
    this.questions = [];
    this.answers = [];
    this.currentQuesObj = [];
    this.service.getJsonData();
    this.responseData = this.service.response;
    console.log(this.responseData);
    for (const i in this.responseData.rounds) {
      if ((this.round + this.currentRound) === i) {
        this.responseData.rounds[i].questions.forEach(e => {
          this.questions.push(e.text);
          // this.currentRoundAnswer.push(e);
          this.answers.push(e.answers);
          this.currentQuesObj.push(e);
        });
        this.currentRoundAnswer.push(this.questions);
        console.log(this.questions);
      } else {
        // this.round = i;
        if (this.questions.length) {
          return this.questions;
        }
      }
    }
  }
  updateIndex(flag: boolean) {
    if (flag) {
      if (this.index < (this.questions.length - 1)) {
        // console.log(this.questions);
        this.index++;
      } else {
        if (( Object.keys(this.responseData.rounds).length === this.currentRound) && (this.index === this.questions.length - 1)) {
          localStorage.setItem('last_question', 'true');
        } else {
          this.index = 0;
        this.currentRound += 1;
        this.getQuestionData();
        }
      }
      this.screenIndicators.forEach(round => {
        if (round.screenNo === this.currentRound) {
          round.isActive = true;
        } else {
          round.isActive = false;
        }
      });
    }
    }

close_window() {
  window.close();
    }
}
