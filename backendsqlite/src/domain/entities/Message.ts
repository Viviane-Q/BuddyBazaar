import User from './User';

class Message {
  private _id?: number;
  private _content: string;
  private _userId: number;
  private _activityId: number;
  private _createdAt?: Date;
  private _user?: User;

  constructor(
    content: string,
    userId: number,
    activityId: number,
    createdAt?: Date,
    id?: number,
    user?: User
  ) {
    this._content = content;
    this._userId = userId;
    this._activityId = activityId;
    this._createdAt = createdAt;
    this._id = id;
    this._user = user;
  }

  get id(): number | undefined {
    return this._id;
  }

  get content(): string {
    return this._content;
  }

  get userId(): number {
    return this._userId;
  }

  get activityId(): number {
    return this._activityId;
  }

  get createdAt(): Date | undefined {
    return this._createdAt;
  }

  get user(): User | undefined {
    return this._user;
  }

  toObject(): any {
    return {
      id: this._id,
      content: this._content,
      userId: this._userId,
      activityId: this._activityId,
      createdAt: this._createdAt,
      user: this._user?.toObject(),
    };
  }
}

export default Message;
