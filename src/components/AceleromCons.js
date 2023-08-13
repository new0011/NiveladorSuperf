import React, { useEffect, useState, useContext } from 'react';
import {View, Text, StyleSheet, Button, ScrollView, RefreshControl, Alert } from 'react-native';
import axios from 'axios';
import { DataTable } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';

//import FormsE from './formEdit';

export default function AceleromCons({ navigation }){
    const [datos, setDatos] = useState([]);
    const route = useRoute();
    const [isRefreshing, setIsRefreshing] = useState(false);

    const obtenerDatos = async () => {
        try {
            const response = await axios.get('http://192.168.1.71:9000/obtenerD');
            setDatos(response.data);
        } catch (error) {
            console.error('Error al obtener los datos', error);
            console.error('Error de red', error.response);
        }
    };

    const onRefresh = () => {
        setIsRefreshing(true);
        obtenerDatos();
        setIsRefreshing(false);
    };

    useEffect(() => {
        obtenerDatos();
    }, []);

    const alertConfirm = (message) => {
        Alert.alert(
            message,
        )
    }

    const handleDelete = (id) => {
        console.log(id)
        Alert.alert(
            'Confirmar Eliminación',
            '¿Estás seguro que deseas eliminar este dato?',
            [
              {
                text: 'Cancelar',
                style: 'cancel' // Opcional: Estilo para el botón de cancelar
              },
              {
                text: 'Eliminar',
                onPress: async () => {
                    try{
                        const response = await axios.delete(`http://192.168.1.71:9000/delete-datos/${parseInt(id)}`)
                        console.log(response.data);
                        alertConfirm('Datos Eliminado :D')
                    }catch (error) {
                        alertConfirm('Error al eliminar los datos\nError de Red')
                        console.error('Error al eliminar datos', error);
                        console.error('Error de red', error.response);
                    }    
                },
                style: 'destructive' // Opcional: Estilo para el botón de eliminar
              }
            ],
            { cancelable: false } // Impide que se cierre la alerta al tocar fuera de ella
        );
    } 

    return(
        <View style={estilos.container1}>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
            <View style={estilos.containerTable}>
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title textStyle={estilos.textT}>ID</DataTable.Title>
                        <DataTable.Title textStyle={estilos.textT}>Superficie</DataTable.Title>
                        <DataTable.Title textStyle={estilos.textT}>Valores</DataTable.Title>
                        <DataTable.Title textStyle={estilos.textT}></DataTable.Title>      
                        <DataTable.Title textStyle={estilos.textT}></DataTable.Title>      
                    </DataTable.Header>
                    {datos.map((dato) => (
                        <DataTable.Row key={dato.id} style={estilos.row}>
                            <DataTable.Cell style={estilos.cell}>{dato.id}</DataTable.Cell>
                            <DataTable.Cell style={estilos.cell}>{dato.Superficie}</DataTable.Cell>
                            <DataTable.Cell style={estilos.cell}>{dato.Valor}</DataTable.Cell>
                            <DataTable.Cell style={estilos.cell} onPress={() => navigation.navigate('AceleromEdit', dato)}>Editar</DataTable.Cell>
                            <DataTable.Cell style={estilos.cell} onPress={() => handleDelete(dato.id)}>Eliminar</DataTable.Cell>
                        </DataTable.Row>
                    ))}
                </DataTable>
            </View>
                <Button 
                    title="Volver"
                    onPress={() => navigation.goBack()}
                />
            </ScrollView>
            
        </View>
    );
}

const estilos = StyleSheet.create({
    container1: {
      flex: 1,
      backgroundColor: '#0e4c75',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 60,
    },
    containerTable: {
      backgroundColor: '#0e4c75',
      marginBottom: 50,
      alignItems: 'center',
      width: 300,
      height: 'auto',
      shadowColor: 'black',
      shadowOffset: {width: 0, height: 12},
      shadowOpacity: 0.48,
      shadowRadius: 11.95,
      elevation: 18,
      backgroundColor: '#3282b5',
      alignItems: 'center',
      justifyContent: 'center',
    },
    cell: {
      flex: 1,
      paddingTop: 15,
      flexWrap: 'wrap',
      height: 'auto',
      overflow: 'visible',
      justifyContent: 'center',
      textOverflow: 'clip',
      whiteSpace: 'normal',
    },
    row: {
      flex: 1,
      flexWrap: 'wrap', 
      paddingLeft: 1, 
    },
    container: {
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
      //paddingTop: 30,
    },
    text: {
      fontSize: 28,
      textAlign: 'center',
      color: '#b2e3fa',
      fontWeight: 500,
      marginBottom: 30,
      //fontFamily: 'Arial'
    },
    textT: {
      fontSize: 14,
      fontWeight: 200,
      color: '#b2e3fa'
    },
    textI: {
      fontSize: 16,
      width: 280,
      height: 40,
      backgroundColor: 'white',
      marginBottom: 15,
      marginTop: 10,
    },
    selectF: {
      fontSize: 16,
      width: 280,
      height: 40,
      backgroundColor: 'white',
      marginBottom: 15
    },
    button1: {
      backgroundColor: '#b2e3fa',
      width: 280,
      marginBottom: 15,
    },
    colorBtn: {
      borderWidth: 1,
      borderColor: '#007BFF',
      backgroundColor: '#007BFF',
      padding: 15,
      marginLeft: 20,
      marginRight: 20,
      borderRadius: 7,
    }, 
    colorTxtBtn: {
      color: '#FFFFFF',
      fontSize: 20,
      textAlign: 'center'
    },
  });
  