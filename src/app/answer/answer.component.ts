import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { QuestionAnswerService } from '../question-answer.service';

import {
  Subscription
} from 'rxjs/Subscription';


@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {
  @Input() currentAnswer: any;

  constructor(private service: QuestionAnswerService) { }

  ngOnInit() {
  
  
  }

  checkAnswer(idx) {
    const ansIndex = { index: idx };
    this.service.index.next(ansIndex);
  }

}
