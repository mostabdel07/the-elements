import { Component, OnInit } from '@angular/core';
import { Review } from 'src/app/models/review/review';
import { ReviewService } from 'src/app/services/review.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserdbService } from 'src/app/services/userdb.service';


@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css']
})
export class FeaturesComponent implements OnInit{
  reviews!:Review[];
  reviewToAdd!:Review;
  reviewToUpdate!:Review;
  reviewToModify!:Review[];
  reviewId!:number;
  reviewUsername!:string;
  reviewProfileUrl!:string;
  isLoggedIn = false;
  ipp!: number;
  cp!: number;
  data_to_add!: any;


  constructor(private reviewService:ReviewService, private authService: AuthService, private storageService: StorageService, private userService: UserdbService){}

  addReviewForm=new FormGroup({

    comment: new FormControl('',[
        Validators.required]),
    
    rating: new FormControl(),
  })


  ngOnInit(): void {
    this.ipp = 3;
    this.cp = 1;
    this.getReviews();
    
    

   // Check the obserbable status
    this.authService.isLoggedIn.subscribe((status) => {
      this.isLoggedIn = status;
    });
    // Check if user is in localStorage
    this.isLoggedIn = this.storageService.isLoggedIn();
  }

  getReviews(){
    //this.reviews= this.reviewService.getReviews();
    this.reviewService.getReviews().subscribe(data => {
    this.reviews = data;
   })    
 }

  getUser(){
    this.userService.getUser().subscribe( {
      next: (data) => {
        this.data_to_add=data;
        //this.user_to_add= new User(this.data_to_add.id,this.data_to_add.name,this.data_to_add.password,this.data_to_add.email)
      },
      error: (err) => {
      },
     });
  }


  modifyReview(review: any){
      this.reviewId=review.id;
      this.reviewService.getReview(this.reviewId).subscribe(data => {
        this.reviewToModify = data;
    })
  }

  addReview(){
    this.reviewToAdd=new Review(
      this.data_to_add.name,
      this.data_to_add.profile_img,
      this.addReviewForm.value.comment!,
      this.addReviewForm.value.rating,
    );
    this.reviewService.createReview(this.reviewToAdd).subscribe();
    this.ngOnInit();
}

  deleteReview(review: any){
  this.reviewId=review.id;
  this.reviewService.deleteReview(this.reviewId).subscribe();
  this.ngOnInit();
}

ratingCounter(i: number) {
  return new Array(i);
}
}

