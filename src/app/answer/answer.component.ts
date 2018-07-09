import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { QuestionAnswerService } from '../question-answer.service';

import {
  Subscription
} from 'rxjs/Subscription';


@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit, OnChanges {
  @Input() currentAnswer: any;
  @Input() trycount: any;
  @Input() correctOption: any;
  resetsubscription: Subscription;
  ansIndex;

  constructor(private service: QuestionAnswerService) { }

  ngOnInit() {
    // const imgArr = Array.from(document.getElementsByClassName('indicator-img'));
    // imgArr.forEach(img => {
    //   img.classList.remove('selected');
    //     img.classList.add('deselected');
    // });
  }

  ngOnChanges() {
    this.resetAnswers();
    this.resetsubscription = this.service.reset.subscribe((obj: any) => {
      this.ansIndex = obj;
      this.resetAnswers();
    });

  }

  resetAnswers() {
    const imgArr = Array.from(document.getElementsByClassName('indicator-img'));
    imgArr.forEach(img => {
      if (img.classList.contains('selected')) {
        img.classList.remove('selected');
        img.classList.add('deselected');
      }
    });
  }

  OnAnswerSelected(event, idx) {
    this.resetAnswers();

    if (event.currentTarget.classList.contains('answer')) {
      event.currentTarget.children[0].children[0].classList.add('selected');
    }
    this.ansIndex = { index: idx };
    this.service.index.next(this.ansIndex);
  }

}
