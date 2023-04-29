import Activity from '../../../domain/entities/Activity';

interface ActivityRepository {
    getById(activityId: number): Promise<Activity|null>;
    create(activity: Activity): Promise<Activity|null>;
    getAll(): Promise<Activity[]>;
    getAllByUserId(userId: number): Promise<Activity[]>;
    update(activity: Activity): Promise<Activity|null>;
}

export default ActivityRepository;
