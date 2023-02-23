export class User {
    private _id:number;
    private _username :string;
    private _password :string;
    private _email :string;

    constructor( id:number,username:string, password:string, email:string="example@example.com",){
        this._id = id;
        this._username=username;
        this._password=password;
        this._email=email;
    }

    public get username(): string{
        return this._username;
    }
    public get password(): string{
        return this._password;
    }

    public get email(): string{
        return this._email;
    }
    public get id(): number{
        return this._id;
    }

}
