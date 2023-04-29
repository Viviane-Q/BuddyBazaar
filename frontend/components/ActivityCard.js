import * as React from 'react';
import { Avatar, Button, Card, Text } from 'react-native-paper';

const LeftContent = props => <Avatar.Icon {...props} icon="weather-sunny" />

const ActivityCard = ({activity}) => (
  <Card>
    <Card.Title title={activity.title} subtitle={activity.date + ' - ' + activity.time} left={LeftContent} />
    <Card.Content>
      <Text variant="titleLarge">{activity.title}</Text>
      <Text variant="bodyMedium">{activity.description}</Text>
    </Card.Content>
    <Card.Cover source={{ uri: `https://picsum.photos/700?id=`+activity.key }} />
    <Card.Actions>
      <Button>Cancel</Button>
      <Button>Ok</Button>
    </Card.Actions>
  </Card>
);

export default ActivityCard;