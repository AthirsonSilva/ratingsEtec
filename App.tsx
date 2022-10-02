import { SafeAreaView, Text } from "react-native";
import styles from "./styles";
import React from "react";

// navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// screens
import Restricted from "./screens/Restricted";
import Form from "./screens/Form";

const Stack = createNativeStackNavigator();

export default class App extends React.Component {
    render() {
        return (
        <SafeAreaView style={styles.container}>
              <NavigationContainer>
                <Stack.Navigator initialRouteName="Form">
                  <Stack.Screen 
                    name="Form" 
                    component={Form} 
                    options={{
                    title: 'Avaliação de disciplinas',
                    headerStyle: {
                      backgroundColor: '#fff',
                    },
                    headerTitleStyle: {
                      fontWeight: 'bold',
                      fontSize: 26,
                    },
                    headerTitleAlign: 'center',
                  }} />        
                  <Stack.Screen 
                  name="Restricted" 
                  component={Restricted} 
                  options={{
                    title: 'Área restrita',
                    headerStyle: {
                      backgroundColor: '#fff',
                    },
                    headerTitleStyle: {
                      fontWeight: 'bold',
                      fontSize: 26,
                    },
                    headerTitleAlign: 'center',
                  }}/>    
                </Stack.Navigator>
              </NavigationContainer>
        </SafeAreaView>
        );
    }
}