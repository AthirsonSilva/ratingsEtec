import { useJsApiLoader } from '@react-google-maps/api'
import React from 'react'
import { Text, View } from 'react-native'
import MapView from 'react-native-maps'
import styles from '../styles'

export default function MapsScreen() {
	const center = {
		lat: -23.552990263455296,
		lng: -46.39968223122055,
	}

	const { isLoaded } = useJsApiLoader({
		id: global.MAPS_ID,
		googleMapsApiKey: global.GOOGLE_MAPS_APIKEY,
	})

	const [map, setMap] = React.useState(null)

	const onLoad = React.useCallback(function callback(map: any) {
		const bounds = new window.google.maps.LatLngBounds(center)
		map.fitBounds(bounds)
		setMap(map)
	}, [])

	const onUnmount = React.useCallback(function callback(map: any) {
		setMap(null)
	}, [])

	return isLoaded ? (
		<View style={styles.container}>
			<View style={styles.container}>
				<MapView
					style={styles.map}
					zoomEnabled={true}
					initialRegion={{
						latitude: -23.552990263455296,
						longitude: -46.39968223122055,
						latitudeDelta: 0.0922,
						longitudeDelta: 0.0421,
					}}
				>
					<MapView.Marker
						coordinate={{
							latitude: -23.5506507,
							longitude: -46.6333824,
						}}
						title={'Hospício'}
						description={'Só tem maluco nessa bagaça'}
					/>
				</MapView>
			</View>
		</View>
	) : (
		<View>
			<Text>Oops</Text>
		</View>
	)
}
