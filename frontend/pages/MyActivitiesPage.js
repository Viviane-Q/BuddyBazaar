import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, Picker } from 'react-native';
import { Button, IconButton, Modal, Text, TextInput } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';

import { useDispatch, useSelector } from 'react-redux';
import { getOwnActivities, postNewActivity } from '../store/thunks/activitiesThunk';

import ActivityCard from '../components/ActivityCard';

const MyActivitiesRoute = () => {
    const [activities, setActivities] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);


    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [numberPersonMax, setNumberPersonMax] = useState(1);
    const [cost, setCost] = useState();
    const [place, setPlace] = useState('');
    const [category, setCategory] = useState('');

    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);
    const refreshActivities = () => {
        const res = dispatch(getOwnActivities({ token }));
        res.then((res) => {
            if (!res.payload) {
                console.log('no payload');
                return;
            }
            if (res.payload.error) {
                console.log('error');
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

    const hideModal = () => {
        setModalVisible(false);
    };

    const [open, setOpen] = React.useState(false);

    const onDismiss = React.useCallback(() => {
        setOpen(false);
    }, [setOpen]);

    const onConfirm = React.useCallback(
        ({ startDate, endDate }) => {
            setOpen(false);
            setStartDate(startDate);
            setEndDate(endDate);
        },
        [setOpen, setStartDate, setEndDate]
    );
    const onNumberPersonMaxChange = (text) => {
        setNumberPersonMax(
            text.replace(/[^0-9]/g, '')
        );
    };
    const onCostChange = (text) => {
        text = text.replace(/[^0-9]/g, '');
        setCost(text);
    };

    const sendActivity = () => {
        const activity = {
            title,
            description,
            startDate,
            endDate,
            numberPersonMax,
            cost,
            place,
            category
        };
        if (!activity.title || !activity.description || !activity.startDate || !activity.endDate || !activity.numberPersonMax || !activity.cost || !activity.place || !activity.category) {
            console.log('missing fields');
            return;
        }
        const res = dispatch(postNewActivity({ token, activity }));
        res.then((res) => {
            if (!res.payload) {
                console.log('no payload');
                return;
            }
            if (res.payload.error) {
                console.log('error');
                return;
            }
            console.log('activity created');
            hideModal();
            refreshActivities();
        });
    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <Text>Mes activités ici</Text>
            {activities.map((activity) => {
                return <ActivityCard key={activity.id} activity={activity} />;
            })}
            <IconButton
                icon="plus"
                size={30}
                onPress={displayActivityModal}
                style={styles.newActivityButton}
            />
            <Modal visible={modalVisible} style={{ backgroundColor: 'white' }}>
                <Text variant="titleLarge" style={{ textAlign: 'center' }}>Nouvelle activité</Text>
                <TextInput
                    label="Titre"
                    placeholder="Titre"
                    onChangeText={setTitle}
                    value={title}
                />
                <TextInput
                    label="Description"
                    placeholder="Description"
                    onChangeText={setDescription}
                    value={description}
                />
                <Button onPress={() => setOpen(true)} uppercase={false} mode="outlined" icon='calendar'>
                    {!!startDate && !!endDate ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}` : 'Choissisez une date'}
                </Button>
                <DatePickerModal
                    locale="fr"
                    mode="range"
                    visible={open}
                    onDismiss={onDismiss}
                    startDate={startDate}
                    endDate={endDate}
                    onConfirm={onConfirm}
                    saveLabel="Confirmer"
                    startLabel='Début'
                    endLabel='Fin'
                    label="Sélectionnez deux dates"
                />
                <TextInput
                    label="Nombre de participants maximum"
                    placeholder="Nombre de participants maximum"
                    keyboardType='numeric'
                    onChangeText={onNumberPersonMaxChange}
                    value={numberPersonMax}
                />
                <TextInput
                    label="Coût"
                    placeholder="Coût"
                    keyboardType='numeric'
                    onChangeText={onCostChange}
                    value={cost}
                />
                <TextInput
                    label="Lieu"
                    placeholder="Lieu"
                    onChangeText={setPlace}
                    value={place}
                />
                <Picker
                    label="Catégorie"
                    placeholder="Catégorie"
                    onValueChange={setCategory}
                    selectedValue={category}
                >
                    <Picker.Item label="Sport" value="Sport" />
                    <Picker.Item label="Livre" value="Livre" />
                    <Picker.Item label="Art" value="Art" />
                    <Picker.Item label="Bar" value="Bar" />
                    <Picker.Item label="Cinéma" value="Cinéma" />
                    <Picker.Item label="Jeux de société" value="Jeux de société" />
                    <Picker.Item label="Musique" value="Musique" />
                    <Picker.Item label="Travaux manuels" value="Travaux manuels" />
                    <Picker.Item label="Autre" value="Autre" />
                </Picker>
                <View style={styles.modalButtonsContainer}>
                    <Button onPress={hideModal}
                        mode="outlined"
                        icon="cancel">
                        Annuler
                    </Button>
                    <Button onPress={sendActivity}
                        mode="contained"
                        icon="login"
                    >
                        Valider
                    </Button>
                </View>
            </Modal>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    newActivityButton: {
        position: 'sticky',
        backgroundColor: 'white',
        bottom: 10,
        right: 10,
        alignSelf: 'flex-end',
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 1 },
    },
    modalButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },

});

export default MyActivitiesRoute;
