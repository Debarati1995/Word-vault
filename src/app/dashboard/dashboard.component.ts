import { Component, OnInit } from '@angular/core';
import { QuestionComponent } from '../question/question.component';
import { AnswerComponent } from '../answer/answer.component';
import { ValidationComponent } from '../validation/validation.component';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  screenIndicators = [];
  constructor() { }

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
  }

}
