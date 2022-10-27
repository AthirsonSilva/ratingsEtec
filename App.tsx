import React from 'react'
import { SafeAreaView } from 'react-native'
import styles from './styles'

// navigation
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// screens
import Form from './screens/Form'
import Maps from './screens/Map'
import Restricted from './screens/Restricted'

const Stack = createNativeStackNavigator()

export default class App extends React.Component {
	render() {
		return (
			<SafeAreaView style={styles.container}>
				<NavigationContainer>
					<Stack.Navigator initialRouteName='Form'>
						<Stack.Screen
							name='Form'
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
							}}
						/>
						<Stack.Screen
							name='Restricted'
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
							}}
						/>
						<Stack.Screen
							name='Mapa'
							component={Maps}
							options={{
								title: 'Mapinha legal',
								headerStyle: {
									backgroundColor: '#fff',
								},
								headerTitleStyle: {
									fontWeight: 'bold',
									fontSize: 26,
								},
								headerTitleAlign: 'center',
							}}
						/>
					</Stack.Navigator>
				</NavigationContainer>
			</SafeAreaView>
		)
	}
}
