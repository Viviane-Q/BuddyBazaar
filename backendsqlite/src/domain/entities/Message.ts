class Message {
  private _id?: number;
  private _content: string;
  private _userId: number;
  private _activityId: number;
  private _createdAt?: Date;

  constructor(
    content: string,
    userId: number,
    activityId: number,
    createdAt?: Date,
    id?: number
  ) {
    this._content = content;
    this._userId = userId;
    this._activityId = activityId;
    this._createdAt = createdAt;
    this._id = id;
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

  toObject(): any {
    return {
      id: this._id,
      content: this._content,
      userId: this._userId,
      activityId: this._activityId,
      createdAt: this._createdAt,
    };
  }
}

export default Message;
