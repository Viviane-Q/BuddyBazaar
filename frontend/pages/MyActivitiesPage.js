import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { IconButton, Modal } from 'react-native-paper';

import { useDispatch, useSelector } from 'react-redux';
import { getOwnActivities } from '../store/thunks/activitiesThunk';

import ActivityCard from '../components/activity/ActivityCard';
import ActivityForm from '../components/activity/ActivityForm';



const MyActivitiesRoute = () => {
    const [activities, setActivities] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);
    const refreshActivities = () => {
        const res = dispatch(getOwnActivities({ token }));
        res.then((res) => {
            if (!res.payload) {
                return;
            }
            if (res.payload.error) {
                return;
            }
            setActivities(res.payload.res.activities);
        });
    };
    useEffect(() => {
        refreshActivities();
    }, []);
    
    const displayActivityModal = () => {
        setModalVisible(true);
    };
    return (
        <View style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: 'white' }}>
                <ActivityForm
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    refreshActivities={refreshActivities}
                />
                <Modal visible={!modalVisible} style={{ backgroundColor: 'white' }}>
                    {activities.map((activity) => {
                        return <ActivityCard key={activity.id} activity={activity} />;
                    })}
                </Modal>
            </ScrollView>
            <IconButton
                icon="plus"
                size={30}
                onPress={displayActivityModal}
                style={styles.newActivityButton}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    newActivityButton: {
        position: 'absolute',
        backgroundColor: 'white',
        bottom: 10,
        right: 10,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 1 },
    }
});

export default MyActivitiesRoute;
