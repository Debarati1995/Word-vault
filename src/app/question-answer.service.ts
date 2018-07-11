import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class QuestionAnswerService {

  index = new BehaviorSubject<{}>({ index: 0 });
  reset = new BehaviorSubject<{}>({});


  response: any;
  constructor() { }

  getJsonData() {
    this.response = {
      'title': 'Your Turn: Vocabulary',
      'directions': 'Read each sentence. Choose the vocabulary word that best completes the sentence.',
      'directionsAudio': 'dl_vocabulary_completes_sentence_2.mp3',
      'sfxPool': {
         '@value': 'pool1'
      },
      'vaultImage': 'assets/images/Reward-PNG-Photo.png',
      'rounds': {
         'round1': {
            'questions': [
               {
                  'text': {
                     'p': 'The little lost sheep are in ______!'
                  },
                  'answers': [
                     'partner',
                     'special',
                     'danger',
                     'splendid'
                  ],
                  'correctAnswer': '3',
                  'frameRange': {
                    'start': 1,
                    'end': 51
                  }
               },
               {
                  'text': {
                     'p': 'Meg is my ______ in math.'
                  },
                  'answers': [
                     'danger',
                     'partner',
                     'splendid',
                     'special'
                  ],
                  'correctAnswer': '2',
                  'frameRange': {
                    'start': 52,
                    'end': 138
                  }
               }
            ]
         },
         'round2': {
            'questions': [
               {
                  'text': {
                     'p': 'The queen lives in a ______ castle.'
                  },
                  'answers': [
                     'partner',
                     'splendid',
                     'danger',
                     'special'
                  ],
                  'correctAnswer': '2',
                  'frameRange': {
                    'start': 139,
                    'end': 184
                  }
               },
               {
                  'text': {
                     'p': 'My _______ and I will work together as a team.'
                  },
                  'answers': [
                     'special',
                     'danger',
                     'partner',
                     'splendid'
                  ],
                  'correctAnswer': '3',
                  'frameRange': {
                    'start': 185,
                    'end': 230
                  }
               },
               {
                  'text': {
                     'p': 'This hat is _____ because Gran gave it to me.'
                  },
                  'answers': [
                     'danger',
                     'partner',
                     'special',
                     'splendid'
                  ],
                  'correctAnswer': '3',
                  'frameRange': {
                    'start': 231,
                    'end': 276
                  }
               }
            ]
         },
         'round3': {
            'questions': [
               {
                  'text': {
                     'p': 'Small fish may face ______ in the big sea.'
                  },
                  'answers': [
                     'splendid',
                     'special',
                     'danger',
                     'partner'
                  ],
                  'correctAnswer': '3',
                  'frameRange': {
                    'start': 277,
                    'end': 322
                  }
               },
               {
                  'text': {
                     'p': 'I thanked my host for a _____ meal.'
                  },
                  'answers': [
                     'splendid',
                     'danger',
                     'special',
                     'partner'
                  ],
                  'correctAnswer': '1',
                  'frameRange': {
                    'start': 323,
                    'end': 368
                  }
               },
               {
                  'text': {
                     'p': 'He will get ______ glasses to help him see.'
                  },
                  'answers': [
                     'danger',
                     'special',
                     'partner',
                     'splendid'
                  ],
                  'correctAnswer': '2',
                  'frameRange': {
                    'start': 369,
                    'end': 456
                  }
               }
            ]
         }
      }
   };
   return this.response;
  }
}
