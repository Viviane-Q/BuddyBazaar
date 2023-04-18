import { StatusBar } from 'expo-status-bar';
import {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import MonBouton from './components/MonBouton';
import LoginPage from "./components/LoginPage";
export default function App() {
    const [compteur, setCompteur] = useState(0);
    return (
        // <View style={styles.container}>
        //     <Text>C'est mon bonjour n° {compteur}</Text>
        //     <MonBouton label={"Re Bonjour?"} onPress={()=>setCompteur(ancienCompteur=>ancienCompteur+1)}/>
        //     <MonBouton label={"Nouveau jour"} onPress={()=>setCompteur(0)}/>
        //     <StatusBar style="auto" />
        // </View>

    <View style={styles.container}>
        <Text>TEST</Text>
        <LoginPage/>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});