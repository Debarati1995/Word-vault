import { TestBed, inject } from '@angular/core/testing';

import { QuestionAnswerService } from './question-answer.service';

describe('QuestionAnswerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuestionAnswerService]
    });
  });

  it('should be created', inject([QuestionAnswerService], (service: QuestionAnswerService) => {
    expect(service).toBeTruthy();
  }));
});
