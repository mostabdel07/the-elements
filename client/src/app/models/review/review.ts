export class Review {
  private _username :string;
  private _profileUrl :string;
  private _comment :string;


  constructor(username:string, profileUrl:string, comment:string){
    this._username = username;
    this._comment = comment;
    this._profileUrl=profileUrl;
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
}