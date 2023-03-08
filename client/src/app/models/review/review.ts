export class Review {
  private _username :string;
  private _profileUrl :string;
  private _comment :string;
  private _rating :number;


  constructor(username:string, profileUrl:string, comment:string, rating:number){
    this._username = username;
    this._comment = comment;
    this._profileUrl = profileUrl;
    this._rating = rating;
  }

  public get username(): string{
    return this._username;
  }

  public get profileUrl(): string{
    return this._profileUrl;
  }

  public get comment(): string{
    return this._comment;
  }

  public get rating(): number{
    return this._rating;
  }
}