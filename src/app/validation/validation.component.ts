import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { QuestionAnswerService } from '../question-answer.service';
import {
  Subscription
} from 'rxjs/Subscription';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.css']
})
export class ValidationComponent implements OnInit {
  @Output()
  currentIndex: EventEmitter<any> = new EventEmitter();
  @Input() currentQuestion: any;
  @Input() isLastQuestion: boolean;
  responseData;
  index = 0;
  ansIndex: number;
  indexSubscription: Subscription;
  enableOkButton;
  tryCount = 0;
  constructor(private service: QuestionAnswerService) { }

  ngOnInit() {
    this.indexSubscription = this.service.index.subscribe((data: any) => {
      this.ansIndex = data.index;
      this.enableOkButton = true;
    });
    this.enableOkButton = false;
  }
  reset() {
    this.index = 0;
    this.enableOkButton = false;
    this.service.reset.next({});
  }
  validate() {

    // console.log(this.currentQuestion.correctAnswer);
    // debugger;
    if (parseInt(this.currentQuestion.correctAnswer) === this.ansIndex + 1) {
      this.currentIndex.emit({ 'isEmit': true, 'tryCount': this.tryCount });
      this.tryCount = 0;
      this.enableOkButton = false;
    } else {
      this.reset();
      this.tryCount++;
      if (this.tryCount === 1) {
        this.currentIndex.emit({ 'isEmit': false, 'tryCount': this.tryCount });
      }
      if (this.tryCount === 2) {
        // console.log('2 done');
        this.currentIndex.emit({ 'isEmit': false, 'tryCount': this.tryCount });
        this.tryCount = 0;
      }
    }

  }

}
