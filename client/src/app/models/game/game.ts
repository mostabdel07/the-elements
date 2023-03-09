import { User } from "../user/user";

export class Game {
    private _id:number;
    private _map_name :string;
    private _map_img :string;
    private _score :number;
    private _datetime :string;
    private _players :Array<any>;

    constructor(id:number, map_name:string, map_img:string, score:number, datetime:string, players:Array<any>){
        this._id = id;
        this._map_name = map_name;
        this._map_img = map_img;
        this._score = score;
        this._datetime = datetime;
        this._players = players;
    }

    public get id(): number{
        return this._id;
    }

    public get map_name(): string{
        return this._map_name;
    }


    public get map_img(): string{
        return this._map_img;
    }

    public get score(): number{
        return this._score;
    }

    public get datetime(): string{
        return this._datetime;
    }


    public get players(): Array<any>{
        return this._players;
    }
}
