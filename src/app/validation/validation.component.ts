import { Component, OnInit } from '@angular/core';
import { QuestionAnswerService } from '../question-answer.service';
@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.css']
})
export class ValidationComponent implements OnInit {

  currentIndex=0;
  constructor(private service: QuestionAnswerService) { }

  ngOnInit() {   
  }
  validate() {
    this.currentIndex++;
    const data = {
      index: this.currentIndex,
      round: 'ro'
    }
    this.service.index.next({ index:this.currentIndex});
  }

}
