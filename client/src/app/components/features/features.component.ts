import { Component, OnInit } from '@angular/core';
import { Review } from 'src/app/models/review/review';
import { ReviewService } from 'src/app/services/review.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

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
  isLoggedIn = false;
  ipp!: number;
  cp!: number;


  constructor(private reviewService:ReviewService, private authService: AuthService, private storageService: StorageService){}

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
    this.ipp = 4;
    this.cp = 1;
    this.showAdd=false;
    this.showGet=false;
    //this.reviews= this.reviewService.getReviews();
    this.reviewService.getReviews().subscribe(data => {
      this.reviews = data;
      console.log('ts'+this.reviews); 
    })    // Check the obserbable status
    this.authService.isLoggedIn.subscribe((status) => {
      this.isLoggedIn = status;
    });
    // Check if user is in localStorage
    this.isLoggedIn = this.storageService.isLoggedIn();
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
    this.reviewService.updateReview(this.reviewId,this.reviewToUpdate).subscribe();
  }

  addReview(){
    console.log("añadir entra");
    this.reviewToAdd=new Review(
      this.addReviewForm.value.username!,
      "anonymous.png",
      this.addReviewForm.value.comment!
    );
    console.log(this.reviewToAdd);
    this.reviewService.createReview(this.reviewToAdd).subscribe();
}

  deleteReview(review: any){
  this.reviewId=review.id;
  this.reviewService.deleteReview(this.reviewId).subscribe();
}
}

