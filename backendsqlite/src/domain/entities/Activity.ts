export enum Category {
    Sport = 'Sport',
    Book = 'Livre',
    Art = 'Art',
    Pub = 'Bar',
    Cinema = 'Cinema',
    BoardGame = 'Jeux de société',
    Musique = 'Musique',
    ManualWork = 'Travaux manuel',
    Other = 'Autre'
}

class Activity {
    private _id?: number;
    private _title: string;
    private _description: string;
    private _dateTime: Date;
    private _numberPersonMax: number;
    private _cost: number;
    private _place: string;
    private _category: Category;
    private _duration: Date;

    constructor(
        id: number | undefined,
        title: string,
        description: string,
        dateTime: Date,
        numberPersonMax: number,
        cost: number,
        place: string,
        category: Category,
        duration: Date,
    ) {
        this._id = id;
        this._title = title;
        this._description = description;
        this._dateTime = dateTime;
        this._numberPersonMax = numberPersonMax;
        this._cost = cost;
        this._place = place;
        this._category = category;
        this._duration = duration;
    }

    get id(): number | undefined {
        return this._id;
    }

    get title(): string {
        return this._title;
    }

    get description(): string {
        return this._description;
    }

    get dateTime(): Date {
        return this._dateTime;
    }

    get numberPersonMax(): number {
        return this._numberPersonMax;
    }

    get cost(): number {
        return this._cost;
    }

    get category(): Category {
        return this._category;
    }

    get duration(): Date {
        return this._duration;
    }
}

export default Activity;
