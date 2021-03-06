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
// import { constants } from 'fs';
import { SoundService } from '../sound.service';
import { element } from 'protractor';
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
  showCorrectAns = false;
  tryCount = 0;
  audio;
  src = '';
  audios = [];
  showReward = false;
  disableReset = false;
  @ViewChild('sprImage') sprImage: any;
  @ViewChild('closeButton') closeButton: any;
  @ViewChild('content') content: any;


  constructor(private service: QuestionAnswerService, private animationService: SpritAnimationService, private soundService: SoundService) { }

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
    this.animationService.getAudioData().subscribe(audio => {
      this.audio = audio['audios'];
      this.audio.forEach(aud => {
        this.audios.push(aud.path);
      });
      this.soundService.fetchAudios(this.audios);

    });
  }

  ngOnChanges() {

  }


  getQuestionData() {
    this.questions = [];
    this.answers = [];
    this.currentQuesObj = [];
    this.service.getJsonData();
    this.responseData = this.service.response;
    for (const i in this.responseData.rounds) {
      if ((this.round + this.currentRound) === i) {
        this.responseData.rounds[i].questions.forEach(e => {
          this.questions.push(e.text);
          this.frames.push(e.frameRange);
          this.answers.push(e.answers);
          this.currentQuesObj.push(e);
        });
        this.currentRoundAnswer.push(this.questions);
      } else {
        if (this.questions.length) {
          return this.questions;
        }
      }
    }
  }


  updateIndex(obj: any) {
    this.tryCount = obj.tryCount;
    if (obj.isEmit || obj.tryCount >= 2) {
      if (this.index < (this.questions.length - 1)) {
        if (obj.isEmit) {
          this.getVaultAnimation(this.frames[this.vaultIndex].start, this.frames[this.vaultIndex].end);
          if (obj.tryCount === 2 && obj.isEmit) {
            this.soundService.play(this.audios[6]);
          } else {
            this.soundService.play(this.audios[0]);
          }
        } else {
          this.showCorrectAns = true;
          this.soundService.play(this.audios[5]);
        }
        setTimeout(() => {
          this.index++;
          this.tryCount = 0;
        }, 2000);
      } else {
        if ((Object.keys(this.responseData.rounds).length === this.currentRound) && (this.index === this.questions.length - 1)) {
          setTimeout(() => {
            this.showReward = true;
            this.soundService.play(this.audios[3]);
          }, 1800);
          this.disableReset = true;
        } else {
          setTimeout(() => {
            this.index = 0;
            this.tryCount = 0;
          this.getQuestionData();
          }, 2000);
          this.soundService.play(this.audios[1]);
          this.currentRound += 1;
        }
        if (obj.isEmit) {
          this.getVaultAnimation(this.frames[this.vaultIndex].start, this.frames[this.vaultIndex].end);
        }
      }

      this.vaultIndex++;
      this.screenIndicators.forEach(round => {
        if (round.screenNo === this.currentRound) {
          round.isActive = true;
        } else {
          round.isActive = false;
        }
      });
    }
    if (this.tryCount === 1 && !obj.isEmit) {
      this.soundService.play(this.audios[2]);
    }
  }

  close_window() {
  window.open('your current page URL', '_self', '');
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
      this.startAnimation(i);
      if (i++ === end) {
        clearInterval(animateImg);
      }
    }, 25);
  }

  openModal() {
    // this.content.nativeElement.setAttribute('aria-hidden', true);
    setTimeout(() => {
      this.closeButton.nativeElement.focus();
    }, 500);

  }

  startAnimation(a: number) {

    console.log(a);

    this.sprImage.nativeElement['style'].backgroundPositionX = -this.spriteImage.frames[this.images].frame.x + 'px';
    this.sprImage.nativeElement['style'].backgroundPositionY = -this.spriteImage.frames[this.images].frame.y + 'px';
  }

  playDirectionAudio() {
    this.soundService.play(this.audios[4]);
  }
}
