import React, {useEffect, useState} from 'react';
import { Text, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {getOwnActivities} from '../store/thunks/activitiesThunk';
import ActivityCard from '../components/ActivityCard';
const mockActivities = [
    {key: 0, title:'Balade en forêt', 'description': 'Une balade en forêt pour découvrir la nature', 'date': '2021-05-01', 'time': '14:00', 'duration': '2h', 'location': 'Forêt de Soignes', 'participants': 5, 'maxParticipants': 10, 'organizer': 'Jean', 'organizerId': 1, 'category': 'Nature', 'tags': ['balade', 'forêt', 'nature']},
    {key: 1, title:'Vélo débutant', 'description': 'Une balade à vélo pour débutants', 'date': '2021-05-02', 'time': '10:00', 'duration': '3h', 'location': 'Bruxelles', 'participants': 3, 'maxParticipants': 5, 'organizer': 'Jean', 'organizerId': 1, 'category': 'Sport', 'tags': ['vélo', 'sport', 'débutant']},
    {key: 2, title:'Karting', 'description': 'Une course de karting... Record à battre !', 'date': '2021-05-03', 'time': '16:00', 'duration': '1h', 'location': 'Bruxelles', 'participants': 2, 'maxParticipants': 5, 'organizer': 'Jean', 'organizerId': 1, 'category': 'Sport', 'tags': ['karting', 'sport']},
];
const MyActivitiesRoute = ()  => {
    const [activities, setActivities] = useState(mockActivities);
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);
    const refreshActivities = () => {
        const res = dispatch(getOwnActivities({token}));
        res.then((res) => {
            if(!res.payload){
                console.log('no payload');
                return;
            }
            if(res.payload.error){
                console.log('error');
                return;
            }
            setActivities(res.payload.res.activities);
        });
    };
    useEffect(() => {
        refreshActivities();
    }, []);

    return( 
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <Text>Mes activités ici</Text>
                {activities.map((activity) => {
                    return <ActivityCard key={activity.id} activity={activity} />;
                })}
            </ScrollView>
    );
};

export default MyActivitiesRoute;
