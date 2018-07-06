import { Component, OnInit, Input, Output, EventEmitter, OnChanges, ViewChild } from '@angular/core';
import { QuestionComponent } from '../question/question.component';
import { AnswerComponent } from '../answer/answer.component';
import { ValidationComponent } from '../validation/validation.component';
import { SpritAnimationService } from '../sprite-animation-service';
import {
  QuestionAnswerService
} from '../question-answer.service';
import {
  Subscription
} from 'rxjs/Subscription';
import { constants } from 'fs';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnChanges {
  questions = [];
  answers = [];
  currentQuesObj = [];
  images = '';
  responseData;
  index = 0;
  k = 0;
  frames = [];
  countToChangeImage = 1;
  round = 'round';
  currentRound = 1;
  img: any;
  screenIndicators = [];
  currentRoundAnswer = [];
  spriteImage;
  spriteArr = [];
  vaultIndex = 0;
  @ViewChild('sprImage') sprImage: any;
  constructor(private service: QuestionAnswerService, private animationService: SpritAnimationService) { }

  ngOnInit() {
    this.screenIndicators = [
      {
        screenNo: 1,
        isActive: true
      },
      {
        screenNo: 2,
        isActive: false
      },
      {
        screenNo: 3,
        isActive: false
      }
    ];
    this.getQuestionData();
    localStorage.setItem('last_question', 'false');
    this.animationService.getAnimateData().subscribe(data => {
      this.spriteImage = data;
    });

    // this.img = 'assets/fl/lock0001.png';
  }

  ngOnChanges() {

  }

  getQuestionData() {
    this.questions = [];
    this.answers = [];
    this.currentQuesObj = [];
    this.service.getJsonData();
    this.responseData = this.service.response;
    console.log(this.responseData);
    for (const i in this.responseData.rounds) {
      if ((this.round + this.currentRound) === i) {
        this.responseData.rounds[i].questions.forEach(e => {
          this.questions.push(e.text);
          this.frames.push(e.frameRange);
          this.answers.push(e.answers);
          this.currentQuesObj.push(e);
        });
        this.currentRoundAnswer.push(this.questions);
        console.log(this.questions);
      } else {
        // this.round = i;
        if (this.questions.length) {
          return this.questions;
        }
      }
    }
  }
  updateIndex(flag: boolean) {
    if (flag) {
      if (this.index < (this.questions.length - 1)) {
        // console.log(this.questions);
        this.getVaultAnimation(this.frames[this.vaultIndex].start, this.frames[this.vaultIndex].end);
        // this.animate(this.spriteArr);
        this.index++;

      } else {
        if ((Object.keys(this.responseData.rounds).length === this.currentRound) && (this.index === this.questions.length - 1)) {
          localStorage.setItem('last_question', 'true');
        } else {
          this.getVaultAnimation(this.frames[this.vaultIndex].start, this.frames[this.vaultIndex].end);
          this.index = 0;
          this.currentRound += 1;
          this.getQuestionData();

        }
      }

      this.vaultIndex++;

      // for sprite animation

      // let loadImage = setInterval(() => {
      //   this.img = this.images[this.k];
      //   if (++this.k === this.images.length)
      //     clearInterval(loadImage);
      // }, 200);

      this.screenIndicators.forEach(round => {
        if (round.screenNo === this.currentRound) {
          round.isActive = true;
        } else {
          round.isActive = false;
        }
      });
    }
  }

  close_window() {
    window.close();
  }
  // function for getting the lock numbers and x y position
  getVaultAnimation(start, end) {
    let i = start;
    const animateImg = setInterval(() => {
      switch (true) {
        case i < 10:
          this.images = 'lock000' + i;

          break;
        case i < 100:
          this.images = 'lock00' + i;

          break;
        default:
          this.images = 'lock0' + i;

      }
      // this.spriteArr.push({ x: -this.spriteImage.frames[this.images].frame.x, y: -this.spriteImage.frames[this.images].frame.y });
      this.startAnimation(i);
      i++ === end ? clearInterval(animateImg) : '';
    }, 50);

    // let lockNumber;
    // console.log('spritearray', );

  }

  // return this.spriteArr;

  startAnimation(a: number) {

    console.log(a);

    this.sprImage.nativeElement['style'].backgroundPositionX = -this.spriteImage.frames[this.images].frame.x + 'px';
    this.sprImage.nativeElement['style'].backgroundPositionY = -this.spriteImage.frames[this.images].frame.y + 'px';
  }
}
