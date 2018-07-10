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
  answers = [];
  @Input() currentAnswer: any;
  @Input() tryCount: any;
  @Input() correctOption: any;
  resetsubscription: Subscription;
  ansIndex;
  selectedIndex;
  constructor(private service: QuestionAnswerService) { }

  ngOnInit() {
    
  }  

  ngOnChanges() {
    console.log(parseInt(this.correctOption));
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
      this.answers[this.correctOption - 1].isCorrect = true;
      console.log('answer object', this.answers);

    }
  
   
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
    // debugger;
    this.selectedIndex = idx;
    this.resetAnswers();
    this.answers.forEach(answer => {
      answer.isSelected = false;
    });
    
    this.answers[idx].isSelected = true;
    console.log(this.answers);
    if (event.currentTarget.classList.contains('answer')) {
      event.currentTarget.children[0].children[0].classList.add('selected');
    }
    this.ansIndex = { index: idx };
    this.service.index.next(this.ansIndex);
  }

  onKeyDown(event,idx) {
    if (event.keyCode === 13) {
      this.OnAnswerSelected(event,idx);
    }
  }

}
