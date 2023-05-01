import * as React from 'react';
import { Avatar, Button, Card, Text } from 'react-native-paper';

const LeftContent = props => <Avatar.Icon {...props} icon="weather-sunny" />

const ActivityCard = ({ activity }) => {
  const startDate = (new Date(activity.startDate)).toLocaleDateString();
  const endDate = (new Date(activity.endDate)).toLocaleDateString();
  return (
    <Card>
      <Card.Title title={activity.title} subtitle={startDate + ' - ' + endDate} left={LeftContent} />
      <Card.Content>
        <Text variant="titleLarge">{activity.title}</Text>
        <Text variant="bodyMedium">{activity.description}</Text>
        <Text variant="bodySmall">{activity.place}</Text>
      </Card.Content>
      <Card.Cover source={{ uri: `https://picsum.photos/700?id=` + activity.id }} />
      <Card.Actions>
        <Button>Cancel</Button>
        <Button>Ok</Button>
      </Card.Actions>
    </Card>
  )
};

export default ActivityCard;