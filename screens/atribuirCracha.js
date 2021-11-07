import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

import config from '../config/config.json';

export default function BarCodeReader({ route, navigation }) {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [cracha, setCracha] = useState('');

    const { imagem } = route.params;
    const { nome } = route.params;
    const { id } = route.params;

    async function sendForm({ data }) {
        await fetch(config.urlRoot + 'create-uso', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userId: id,
            nome: nome,
            badge: data
          })
        });
      }

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        //alert(`O código do tipo ${type} com os seguintes dados: ${data} foi escaneado!`);
        sendForm({data});
        navigation.navigate('Perfil', { cracha: data, nome: nome, imagem: imagem, id: id })
    };

    if (hasPermission === null) {
        return <Text style={styles.text}>Solicitando permissão para usar a câmera</Text>;
    }
    if (hasPermission === false) {
        return <Text style={styles.text}>Sem acesso a câmera</Text>;
    }

    return (
        <View style={styles.container}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject} />
            <Text style={styles.text}></Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    text: {
        textAlign: "center",
        top: 280,
        fontSize: 18,
        fontWeight: "400",
    },
});