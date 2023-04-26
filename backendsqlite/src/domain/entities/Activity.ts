import CodeError from '../../util/CodeError';

export enum Category {
  Sport = 'Sport',
  Book = 'Livre',
  Art = 'Art',
  Pub = 'Bar',
  Cinema = 'Cinema',
  BoardGame = 'Jeux de société',
  Musique = 'Musique',
  ManualWork = 'Travaux manuels',
  Other = 'Autre',
}

class Activity {
  private _id?: number;
  private _title: string;
  private _description: string;
  private _startDate: Date;
  private _endDate: Date;
  private _numberPersonMax: number;
  private _cost: number;
  private _place: string;
  private _category: Category;
  private _userId: number;

  constructor(
    id: number | undefined,
    title: string,
    description: string,
    startDate: Date,
    endDate: Date,
    numberPersonMax: number,
    cost: number,
    place: string,
    category: Category,
    userId: number
  ) {
    if (endDate < startDate) {
      throw new CodeError('The end date must be after the start date', 400);
    }
    this._id = id;
    this._title = title;
    this._description = description;
    this._startDate = startDate;
    this._endDate = endDate;
    this._numberPersonMax = numberPersonMax;
    this._cost = cost;
    this._place = place;
    this._category = category;
    this._userId = userId;
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

  get startDate(): Date {
    return this._startDate;
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

  get endDate(): Date {
    return this._endDate;
  }

  get place(): string {
    return this._place;
  }

  get userId(): number {
    return this._userId;
  }
}

export default Activity;
