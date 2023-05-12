import CodeError from '../../util/CodeError';

export enum Category {
  Sport = 'Sport',
  Book = 'Livre',
  Art = 'Art',
  Pub = 'Bar',
  Cinema = 'Cinéma',
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
  private _latitude: number;
  private _longitude: number;
  private _category: Category;
  private _userId: number;
  private _participants: number[] = [];

  constructor(
    id: number | undefined,
    title: string,
    description: string,
    startDate: Date,
    endDate: Date,
    numberPersonMax: number,
    cost: number,
    place: string,
    longitude: number,
    latitude: number,
    category: Category,
    userId: number,
    participants?: number[]
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
    this._longitude = longitude;
    this._latitude = latitude;
    this._category = category;
    this._userId = userId;
    if (participants) {
      this._participants = participants;
    }
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

  get latitude(): number {
    return this._latitude;
  }

  get longitude(): number {
    return this._longitude;
  }

  get userId(): number {
    return this._userId;
  }

  get participants(): number[] {
    return this._participants;
  }

  toObject(): any {
    return {
      id: this._id,
      title: this._title,
      description: this._description,
      startDate: this._startDate.toISOString(),
      endDate: this._endDate.toJSON(),
      numberPersonMax: this._numberPersonMax,
      cost: this._cost,
      place: this._place,
      latitude: this._latitude,
      longitude: this._longitude,
      category: this._category,
      userId: this._userId,
      participants: this._participants,
    };
  }
}

export default Activity;
