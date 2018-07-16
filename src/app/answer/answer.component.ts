import { Component, OnInit, Input, Output, EventEmitter, OnChanges, ViewChild, ElementRef} from '@angular/core';
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
  answers = [];
  @Input() currentAnswer: any;
  @Input() tryCount: any;
  @Input() correctOption: any;
  @Input() currentIndex: any;
  @ViewChild('answerContainer') answerContainer: any;
  @ViewChild('dynamicdata') dynamicdata: ElementRef;
  previousIndex = 0;
  resetsubscription: Subscription;
  ansIndex;

  constructor(private service: QuestionAnswerService) { }

  ngOnInit() {}

  ngOnChanges(changes: any) {
    this.correctOption = parseInt(this.correctOption);
    this.answers = [];
    if (this.currentAnswer) {
      this.currentAnswer.forEach(ans => {
        this.answers.push({
          ansText: ans,
          isSelected: false,
          isCorrect: false
        });

      });
      if (this.tryCount > 1 && this.currentIndex === this.previousIndex) {
        this.answers[this.correctOption - 1].isCorrect = true;
      } else {
        this.answers.forEach(ans => {
          ans.isSelected = false;
        });
      }
      this.previousIndex = this.currentIndex;

    }
    this.resetAnswers();
    this.resetsubscription = this.service.reset.subscribe((obj: any) => {
      this.ansIndex = obj;
      this.resetAnswers();
    });

  }

  resetAnswers() {
    this.answers.forEach(img => {
      img.isSelected = false;
    });
  }

  OnAnswerSelected(event, idx) {
    this.resetAnswers();
    this.answers[idx].isSelected = true;
    // this.answerContainer.nativeElement.setAttribute('aria-label', this.answers[idx].ansText + ' is selected');
    this.dynamicdata.nativeElement.innerHTML = this.answers[idx].ansText + ' is selected';
    // console.log(this.answers[idx].ansText);
    this.ansIndex = { index: idx };
    this.service.index.next(this.ansIndex);
  }

  onKeyDown(event, idx) {
    if (event.keyCode === 13) {
      this.OnAnswerSelected(event, idx);
    }
  }
}
