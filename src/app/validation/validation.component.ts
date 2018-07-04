import { Component, OnInit } from '@angular/core';
import { QuestionAnswerService } from '../question-answer.service';
@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.css']
})
export class ValidationComponent implements OnInit {

  currentIndex = 0;
  responseData;
  round = '';
  page = 1;
  constructor(private service: QuestionAnswerService) { }

  ngOnInit() {
    this.service.getJsonData();
    this.responseData = this.service.response;
    this.round = 'round' + this.page;
    console.log(this.round);
  }
  validate() {
    this.currentIndex++;
    for (const i in this.responseData.rounds) {
      if (this.round === i) {
        if (this.responseData.rounds[i].questions.length === this.currentIndex) {
          this.page++;
          this.round = i;
          return this.round;
        }
        // console.log(this.answers);
      } else {
      }
    }
    // this.responseData.rounds.
    const data = {
      index: this.currentIndex,
      round: this.round
    };
    this.service.index.next(data);
  }

}
