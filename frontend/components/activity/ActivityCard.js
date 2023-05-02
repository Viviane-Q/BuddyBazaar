import * as React from 'react';
import { View, StyleSheet, Image, Dimensions} from 'react-native';
import { Card, Text } from 'react-native-paper';

const ActivityCard = ({ activity }) => {
  const startDate = (new Date(activity.startDate)).toLocaleDateString('fr-FR');
  const endDate = (new Date(activity.endDate)).toLocaleDateString('fr-FR');
  return (
    <Card style={styles.activityCard}>
      <Image source={`https://picsum.photos/700?id=` + activity.id } style={styles.cover}/>
      <Card.Content>
        <View>
          <Text variant="titleLarge" style={styles.title}>{activity.title}</Text>
          <Text variant="bodyMedium" style={{position: 'absolute', right:0, bottom:0}}>{startDate + ' - ' + endDate}</Text>
          <Text variant="bodyMedium">{activity.place}</Text>
        </View>
      </Card.Content>
    </Card>
  )
};

const styles = StyleSheet.create({
  activityCard: {
    margin: 10,
    marginLeft: 30,
    marginRight: 30,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 1 },
    borderRadius: 20,
    overflow: 'hidden',
  },
  title: {
    fontWeight: 'bold',
  },
  cover: {
    borderRadius:0,
    width: '100%',
    // get width from parent
    height: (Dimensions.get('window').width - 60) * 0.4,
    marginBottom: 10,
    opacity: 0.7    
  }
});
export default ActivityCard;