export class Developer {
    private _id:number;
    private _name :string;
    private _description :string;
    private _image :string;
    private _type :string;

    constructor(id:number, name:string, description:string, image:string, type:string = 'web'){
        this._id = id;
        this._name = name;
        this._description = description;
        this._image = image;       
        this._type = type;
    }

    public get id(){
        return this._id;
    }

    public get name(): string{
        return this._name;
    }

    public get description(): string{
        return this._description;
    }

    public get image(): string{
        return this._image;
    }

    public get type(): string{
        return this._type;
    }

    public set description(description:string){
        this._description = description;
    }
}
