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


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    QuestionComponent,
    AnswerComponent,
    ValidationComponent,
    ScreenComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: '', component: DashboardComponent}
    ]
    )
  ],
  providers: [QuestionAnswerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
