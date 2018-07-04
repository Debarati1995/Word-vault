import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  QuestionAnswerService
} from '../question-answer.service';
import {
  Subscription
} from 'rxjs/Subscription';


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  @Input() currentQuestion: Object;

  questions;
  constructor(private service: QuestionAnswerService) {}

  ngOnInit() {
    console.log(this.currentQuestion);

  }

}
