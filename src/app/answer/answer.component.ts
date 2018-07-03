import { Component, OnInit } from '@angular/core';
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
  indexSubscription: Subscription;
  index;
  answers=[];
  responseData;
  constructor(private service: QuestionAnswerService) { }

  ngOnInit() {
    this.indexSubscription = this.service.index.subscribe((data: any) => {
      console.log(data);
      this.index = data.index;
    }
    );
    this.service.getJsonData();
    this.responseData = this.service.response;
    console.log(this.responseData);
    this.answers = [];
    for (let i in this.responseData.rounds) {
      this.answers.push(this.responseData.rounds[i].questions[this.index].answers);
      return this.answers;
      // this.responseData.rounds[i].questions.forEach(e => {
      //   this.answers.push(e.answers);
      //   console.log(this.answers);

      // });
    }
  }


}
