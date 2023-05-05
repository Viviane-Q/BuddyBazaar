import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { Button, Card } from 'react-native-paper';
import TitleSmall from '../shared/typography/TitleSmall';
import theme from '../../theme';
import BodyMedium from '../shared/typography/BodyMedium';

const ActivityCard = ({ activity, imageWidth, imageHeight, width }) => {
  const styled = styles(activity.category, imageWidth, imageHeight, width);
  const startDate = new Date(activity.startDate).toLocaleDateString('fr-FR');
  const endDate = new Date(activity.endDate).toLocaleDateString('fr-FR');

  return (
    <Card style={styled.activityCard}>
      <View style={styled.cardImageContent}>
        <View style={styled.numberPersonMaxChip}>
          <Button
            icon="account-group"
            mode="text"
            compact="true"
            style={styled.icon}
          />
          <BodyMedium>{activity.numberPersonMax}</BodyMedium>
        </View>
        <View style={styled.categoryChip}>
          <BodyMedium style={{ color: 'white' }}>
            {activity.category}
          </BodyMedium>
        </View>
        <Image
          source={`https://picsum.photos/700?id=${activity.id}`}
          style={styled.cover}
        />
      </View>
      <Card.Content style={styled.cardContent}>
        <View style={styled.cardContentTitle}>
          <TitleSmall>{activity.title}</TitleSmall>
          <BodyMedium variant="bodyMedium" style={{ fontWeight: 'bold' }}>
            {activity.cost} €
          </BodyMedium>
        </View>
        <View style={styled.cardContentLine}>
          <Button icon="pin" mode="text" compact="true" style={styled.icon} />
          <BodyMedium>{activity.place}</BodyMedium>
        </View>
        <View style={styled.cardContentLine}>
          <Button
            icon="calendar"
            mode="text"
            compact="true"
            style={styled.icon}
          />
          <BodyMedium>{`${startDate} - ${endDate}`}</BodyMedium>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = (category, imageWidth, imageHeight, width) =>
  StyleSheet.create({
    activityCard: {
      shadowRadius: 5,
      shadowOffset: { width: 0, height: 1 },
      borderRadius: 20,
      overflow: 'hidden',
      width: width,
      backgroundColor: theme.colors.primaryContainer,
    },
    icon: { width: 30, borderRadius: 0 },
    cover: {
      borderRadius: 0,
      marginBottom: 10,
      opacity: 1,
      width: imageWidth,
      height: imageHeight,
    },
    cardContent: {
      borderRadius: 0,
      gap: 8,
      flexDirection: 'column',
    },
    numberPersonMaxChip: {
      flexDirection: 'row',
      alignItems: 'center',
      position: 'absolute',
      top: 8,
      right: 8,
      zIndex: 1,
      backgroundColor: theme.colors.primaryContainer,
      borderRadius: 16,
      paddingHorizontal: 8,
      height: 28,
    },
    categoryChip: {
      flexDirection: 'row',
      alignItems: 'center',
      position: 'absolute',
      top: 8,
      left: 8,
      zIndex: 1,
      backgroundColor: theme.colors.categories[category],
      borderRadius: 16,
      paddingHorizontal: 8,
      height: 28,
      borderColor: theme.colors.primaryContainer,
      borderWidth: 1,
    },
    cardImageContent: { position: 'relative' },
    cardContentLine: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 18,
    },
    cardContentTitle: { flexDirection: 'row', justifyContent: 'space-between' },
  });
export default ActivityCard;
