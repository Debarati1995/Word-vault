import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class QuestionAnswerService {

  index = new BehaviorSubject<{}>({ index: 0 });

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
      'vaultImage': 'photo_ring.jpg',
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
                  'correctAnswer': '3'
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
                  'correctAnswer': '2'
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
                  'correctAnswer': '2'
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
                  'correctAnswer': '3'
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
                  'correctAnswer': '3'
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
                  'correctAnswer': '3'
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
                  'correctAnswer': '1'
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
                  'correctAnswer': '2'
               }
            ]
         }
      }
   };
   return this.response;
  }
}
