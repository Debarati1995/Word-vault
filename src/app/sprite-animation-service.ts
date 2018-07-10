import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SpritAnimationService {


    response: any;
    constructor(private http: HttpClient) { }
    getAnimateData() {
        return this.http.get('assets/data/vault_image.json');
    }
    getAudioData() {
        return this.http.get('assets/data/audio.json');
    }
    
}