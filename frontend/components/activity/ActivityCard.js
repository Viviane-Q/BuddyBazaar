import * as React from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';

const ActivityCard = ({ activity, imageWidth, imageHeight }) => {
  const startDate = new Date(activity.startDate).toLocaleDateString('fr-FR');
  const endDate = new Date(activity.endDate).toLocaleDateString('fr-FR');
  return (
    <Card style={styles.activityCard}>
      <Image
        source={`https://picsum.photos/700?id=${activity.id}`}
        style={{ ...styles.cover, width: imageWidth, height: imageHeight }}
      />
      <Card.Content style={{ borderRadius: 0 }}>
        <View>
          <Text variant="titleMedium" style={styles.title}>
            {activity.title}
          </Text>
          <Text variant="bodyMedium">
            <Button icon="pin" mode="text" compact="true" style={styles.icon} />
            {activity.place}
          </Text>
          <Text variant="bodyMedium">
            <Button
              icon="calendar"
              mode="text"
              compact="true"
              style={styles.icon}
            />
            {`${startDate} - ${endDate}`}
          </Text>
          <Text variant="bodyMedium">
            <Button
              icon="currency-eur"
              mode="text"
              compact="true"
              style={styles.icon}
            />
            {activity.cost}
          </Text>
          <Text variant="bodyMedium">
            <Button
              icon="account-group"
              mode="text"
              compact="true"
              style={styles.icon}
            />
            {activity.numberPersonMax}
          </Text>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  activityCard: {
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 1 },
    borderRadius: 20,
    overflow: 'hidden',
    width: Dimensions.get('window').width < 500 ? 'auto' : 400,
  },
  title: {
    fontWeight: 'bold',
  },
  icon: { width: 30, borderRadius: 0 },
  cover: {
    borderRadius: 0,
    marginBottom: 10,
    opacity: 0.7,
  },
});
export default ActivityCard;
