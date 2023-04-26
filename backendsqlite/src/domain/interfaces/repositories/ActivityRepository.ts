import Activity from '../../../domain/entities/Activity';

interface ActivityRepository {
    create(activity: Activity): Promise<Activity|null>;
    getAll(): Promise<Activity[]>;
}

export default ActivityRepository;
