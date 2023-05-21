import Activity from '../../../domain/entities/Activity';

interface ActivityRepository {
  getById(activityId: number): Promise<Activity | null>;
  create(activity: Activity): Promise<Activity | null>;
  getAll(
    querySearch?: string,
    startDate?: Date,
    endDate?: Date,
    numberPersonMax?: number,
    cost?: number,
    category?: string
  ): Promise<Activity[]>;
  getAllByUserId(userId: number): Promise<Activity[]>;
  getAllRegisteredByUserId(userId: number): Promise<Activity[]>;
  update(activity: Activity): Promise<boolean>;
  delete(activityId: number): Promise<boolean>;
  getByUserIdAndActivityId(activityId: number, userId: number): Promise<Activity | null>;
}

export default ActivityRepository;
