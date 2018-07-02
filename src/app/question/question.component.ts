import { Component, OnInit } from '@angular/core';
import { QuestionAnswerService } from '../question-answer.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  constructor(private service: QuestionAnswerService) { }

  ngOnInit() {
    this.service.getJsonData();
    console.log(this.service.response);
  }

}
