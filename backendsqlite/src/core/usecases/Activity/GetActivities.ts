import Activity from '../../../domain/entities/Activity';
import ActivityRepository from '../../../domain/interfaces/repositories/ActivityRepository';

export default ({
  activityRepository,
  querySearch,
  startDate,
  endDate,
  numberPersonMax,
  cost,
  category,
}: {
  activityRepository: ActivityRepository;
  querySearch?: string;
  startDate?: Date;
  endDate?: Date;
  numberPersonMax?: number;
  cost?: number;
  place?: string;
  category?: string;
}): Promise<Activity[]> => {
  return activityRepository.getAll(querySearch, startDate, endDate, numberPersonMax, cost, category);
};
