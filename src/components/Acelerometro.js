import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button, Alert } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import Slider from '@react-native-community/slider';
import { Formik } from 'formik';
import axios from 'axios';


export default function Acelerometro({ navigation }) {
    const [{ x, y, z }, setData] = useState({
        x: 0,
        y: 0,
        z: 0,
    });

    const [valuesS, setValues] = useState(0);

    const [subscription, setSubscription] = useState(null);

    const _slow = () => Accelerometer.setUpdateInterval(1000);
    const _fast = () => Accelerometer.setUpdateInterval(16);

    const _subscribe = () => {
        setSubscription(Accelerometer.addListener(setData));
    };

    const _unsubscribe = () => {
        subscription && subscription.remove();
        setSubscription(null);
    };

    useEffect(() => {
        _subscribe();
        return () => _unsubscribe();
    }, []);

    const handleSubmit = async (values) => {
        try {
            const response = await axios.post('http://192.168.1.71:9000/guardar-datos', values);
            console.log(response.data);
            alertConfirm('Datos Guardados :D')
        } catch (error) {
            alertConfirm('Error al guardar los datos,\nError de Red')
            console.error('Error al guardar datos', error);
            console.error('Error de red', error.response);
        }
    }

    const alertConfirm = (message) => {
        Alert.alert(
            message,
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.container1}>
                <Formik
                    initialValues={{ nombreS: '', valNivel: '' }}
                    onSubmit={handleSubmit}
                >
                {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    values,
                    errors,
                    touched,
                    isValid,
                    setFieldValue,
                    setFieldTouched
                    }) => (
                    <>
                        <Text style={styles.text}>Nivelador de Superficies</Text>
                        <TextInput
                            style={styles.textI}
                            placeholder='Nombre de superficie...'
                            onChangeText={handleChange('nombreS')}
                            onBlur={handleBlur('nombreS')}
                            value={values.nombreS}
                            keyboardType='default'
                        />
                        <Slider
                            style={{width: 300, height: 80}}
                            value={values.valNivel = parseFloat(y.toFixed(2))}
                            minimumValue={-1}
                            maximumValue={1}
                            minimumTrackTintColor="#FFFFFF"
                            maximumTrackTintColor="#000000"
                            onValueChange={(itemValue, itemIndex) => setValues(itemValue)}
                            disabled={true}
                            thumbTintColor='black'
                        />
                        <TouchableOpacity
                            style={styles.colorBtn}
                            onPress={handleSubmit}
                        >
                            <Text style={styles.colorTxtBtn}>Aceptar</Text>
                        </TouchableOpacity>
                    </>
                )}
                </Formik>
            </View>
            <Button
                style={{marginTop: 50}}
                title='Ir a Consultas'
                onPress={() => navigation.navigate('AceleromCons')}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0e4c75',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container1: {
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 12},
        shadowOpacity: 0.48,
        shadowRadius: 11.95,
        elevation: 18,
        position: 'relative',
        width: 350,
        height: 'auto',
        backgroundColor: '#3282b5',
        alignItems: 'center',
        padding: 30,
        paddingBottom: 60,
        marginBottom: 50,
        //paddingTop: 30,
    },
    text: {
        fontSize: 28,
        textAlign: 'center',
        color: '#b2e3fa',
        marginBottom: 30,
        //fontFamily: 'Arial'
    },
    textI: {
        fontSize: 16,
        width: 280,
        height: 40,
        backgroundColor: 'white',
        marginBottom: 30,
        marginTop: 10,
    },
    colorBtn: {
        borderWidth: 1,
        borderColor: '#007BFF',
        backgroundColor: '#007BFF',
        padding: 15,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 7,
        marginTop: 30,
    },
    colorTxtBtn: {
        color: '#FFFFFF',
        fontSize: 20,
        textAlign: 'center'
    },
   
});
