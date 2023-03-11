import { Injectable } from '@angular/core';
import { Review } from '../models/review/review';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) { }


  getReviews():Observable<any>{
    return this.http.get('http://api.thelements.games/api/reviews', { responseType: 'json' });
  }

  getReview(reviewId: number):Observable<any>{
    return this.http.get('http://api.thelements.games/api/reviews/'+reviewId, { responseType: 'json' });
  }

  createReview(review: Review){
    return this.http.post('http://api.thelements.games/api/reviews', review, { responseType: 'json' });
  }

  updateReview(reviewId: number, review: Review){
    return this.http.put('http://api.thelements.games/api/reviews/'+reviewId,review, { responseType: 'json' });
  }

  deleteReview(reviewId: number){
    return this.http.delete('http://api.thelements.games/api/reviews/'+reviewId, { responseType: 'json' });
  }
}
