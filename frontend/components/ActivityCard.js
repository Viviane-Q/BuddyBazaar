import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';

const ActivityCard = ({ activity }) => {
  const startDate = (new Date(activity.startDate)).toLocaleDateString();
  const endDate = (new Date(activity.endDate)).toLocaleDateString();
  return (
    <Card style={styles.card}>
      <Card.Content>
        <View>
        <Text variant="titleLarge">{activity.title}</Text>
        <Text variant="bodyMedium" style={{position: 'absolute', right:0, bottom:0}}>{startDate + ' - ' + endDate}</Text>
        <Text variant="bodyMedium">{activity.place}</Text>
        </View>
      </Card.Content>
      <Card.Cover source={{ uri: `https://picsum.photos/700?id=` + activity.id }} />
    </Card>
  )
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    marginLeft: 20,
    marginRight: 20,
    padding: 10,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 1 },
  },
});
export default ActivityCard;