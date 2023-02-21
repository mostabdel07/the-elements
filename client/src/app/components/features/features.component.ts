import { Component, OnInit } from '@angular/core';
import { Review } from 'src/app/models/review/review';
import { ReviewService } from 'src/app/services/review.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css']
})
export class FeaturesComponent implements OnInit{
  reviews!:Review[];
  showAdd!:boolean;
  showGet!:boolean;
  reviewToAdd!:Review;
  reviewToUpdate!:Review;
  reviewToModify!:Review[];
  reviewId!:number;
  reviewUsername!:string;
  reviewProfileUrl!:string;

  ipp!: number;
  cp!: number;

  constructor(private reviewService:ReviewService){}

  addReviewForm=new FormGroup({
 
    username:new FormControl('',[
      Validators.required,
      // Validators.minLength(6)
    ]),

    comment: new FormControl('',[
        Validators.required])
  })

  updateReviewForm=new FormGroup({

    comment: new FormControl('',[
        Validators.required])
  })


  ngOnInit(): void {
    this.showAdd=false;
    this.showGet=false;
    this.ipp = 4;
    this.cp = 1;
    //this.reviews= this.reviewService.getReviews();
    this.reviewService.getReviews().subscribe(data => {
      this.reviews = data;
      console.log('ts'+this.reviews); 
    })
  }

  showAddReview(){
    this.showAdd=true;
    
  }

  getReview(review: any){
    this.showGet=true;
    this.reviewId=review.id;
    console.log(this.reviewId);
    this.reviewService.getReview(this.reviewId).subscribe(data => {
      this.reviews = data;
      console.log('ts'+this.reviews)})
}

  modifyReview(review: any){
      this.reviewId=review.id;
      console.log(this.reviewId);
      this.reviewService.getReview(this.reviewId).subscribe(data => {
        this.reviewToModify = data;
    })
  }

  updateReview(review:any){
    console.log(review);
    this.reviewId=review.id;
    this.reviewUsername=review.username;
    this.reviewProfileUrl=review.profileUrl
    this.reviewToUpdate=new Review(
      this.reviewUsername,
      this.reviewProfileUrl,
      this.updateReviewForm.value.comment!
    );
    console.log(this.reviewToUpdate);
    this.reviewService.updateReview(this.reviewId,this.reviewToUpdate)
  }

  addReview(){
    console.log("añadir entra");
    this.reviewToAdd=new Review(
      this.addReviewForm.value.username!,
      "img",
      this.addReviewForm.value.comment!
    );
    console.log(this.reviewToAdd);
    this.reviewService.createReview(this.reviewToAdd)
}

  deleteReview(review: any){
  this.reviewId=review.id;
  this.reviewService.deleteReview(this.reviewId);
}
}

