import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Acelerometro from './src/components/Acelerometro';
import AceleromCons from './src/components/AceleromCons';
import AceleromEdit from './src/components/AceleromEdit';

const Stack = createStackNavigator();

export default function AppNavigator(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="Acelerometro" component={Acelerometro} />
            <Stack.Screen name="AceleromCons" component={AceleromCons} />
            <Stack.Screen name="AceleromEdit" component={AceleromEdit} />
        </Stack.Navigator>
    );
}