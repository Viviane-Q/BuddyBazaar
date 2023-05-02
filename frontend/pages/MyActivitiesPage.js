import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, Picker, SafeAreaView } from 'react-native';
import { Button, IconButton, Modal, Text, TextInput } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';

import { useDispatch, useSelector } from 'react-redux';
import { getOwnActivities, postNewActivity } from '../store/thunks/activitiesThunk';

import ActivityCard from '../components/ActivityCard';


const categories = [
    "Sport",
    "Livre",
    "Art",
    "Bar",
    "Cinéma",
    "Jeux de société",
    "Musique",
    "Travaux manuels",
    "Autre"
]
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
    const [category, setCategory] = useState(categories[0]);
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
        console.log('display modal');
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
        text = text.replace(/[^0-9]/g, '');
        if(text < 1)
            text = 1;
        setNumberPersonMax(text);
    };
    const onCostChange = (text) => {
        text = text.replace(/[^0-9]/g, '');
        if(text < 0)
            text = 0;
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
        <View style={{flex: 1}}>
        <ScrollView contentContainerStyle={{flexGrow: 1, backgroundColor: 'white'}}>            
            <Modal visible={modalVisible} style={styles.newActivityForm} onDismiss={hideModal}>
                <Text variant="titleLarge" style={{ textAlign: 'center' , fontWeight: 'bold'}}>Nouvelle activité</Text>
                <TextInput
                    label="Titre"
                    placeholder="Titre"
                    onChangeText={setTitle}
                    value={title}
                    style={styles.textInput}
                />
                <TextInput
                    label="Description"
                    placeholder="Description"
                    onChangeText={setDescription}
                    value={description}
                    multiline={true}
                    numberOfLines={4}
                    style={styles.textInput}

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
                    style={styles.textInput}

                />
                <TextInput
                    label="Nombre de participants maximum"
                    placeholder="Nombre de participants maximum"
                    keyboardType='numeric'
                    onChangeText={onNumberPersonMaxChange}
                    value={numberPersonMax}
                    style={styles.textInput}
                />
                <TextInput
                    label="Coût"
                    placeholder="Coût"
                    keyboardType='numeric'
                    onChangeText={onCostChange}
                    value={cost}
                    style={styles.textInput}
                />
                <TextInput
                    label="Lieu"
                    placeholder="Lieu"
                    onChangeText={setPlace}
                    value={place}
                    style={styles.textInput}
                />
                <Picker
                    label="Catégorie"
                    placeholder="Catégorie"
                    onValueChange={setCategory}
                    selectedValue={category}
                    style={styles.textInput}
                >
                    {categories.map((category, key) => (
                        <Picker.Item label={category} value={category} key={key}/>
                    ))}
                </Picker>
                <View style={styles.modalButtonsContainer}>
                    <Button onPress={hideModal}
                        mode="outlined"
                        icon="close">
                        Annuler
                    </Button>
                    <Button onPress={sendActivity}
                        mode="contained"
                        icon="check"
                    >
                        Valider
                    </Button>
                </View>
            </Modal>
            <Modal visible={!modalVisible} style={{backgroundColor:'white'}}>
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
    },
    modalButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    newActivityForm: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        margin: 20,
        marginTop: 100,
        height: 'fit-content',
    },
    textInput: {
        margin: 10,
    },
});

export default MyActivitiesRoute;
