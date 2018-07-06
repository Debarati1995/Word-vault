import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QuestionComponent } from './question/question.component';
import { AnswerComponent } from './answer/answer.component';
import { ValidationComponent } from './validation/validation.component';
import { ScreenComponent } from './screen/screen.component';
import { QuestionAnswerService } from './question-answer.service';
import { AnimateComponent } from './animate/animate.component';
import { SpritAnimationService } from './sprite-animation-service';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    QuestionComponent,
    AnswerComponent,
    ValidationComponent,
    ScreenComponent,
    AnimateComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: '', component: DashboardComponent}
    ]
    )
  ],
  providers: [QuestionAnswerService, SpritAnimationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
