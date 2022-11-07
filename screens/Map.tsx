import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'
import React from 'react'
import { ActivityIndicator, View } from 'react-native'
import styles from '../styles'

export default function MapsScreen() {
	const data: Array<Object> = Array()
	const [map, setMap] = React.useState(null)
	const center = {
		lat: -23.552990263455296,
		lng: -46.39968223122055
	}

	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: 'AIzaSyCmrE9qeUQP20VEA6AT53UKRDNqbywCvYw'
	})

	const onLoad = React.useCallback(function callback(map: any) {
		const bounds = new window.google.maps.LatLngBounds(center)
		map.fitBounds(bounds)
		setMap(map)

		data.forEach((item: any) => {
			const marker = new window.google.maps.Marker({
				position: item.position,
				map,
				title: item.title
			})
		})
	}, [])

	const onUnmount = React.useCallback(function callback(map: any) {
		setMap(null)
	}, [])

	return isLoaded ? (
		<View style={styles.container}>
			<GoogleMap
				mapContainerStyle={{
					width: '100%',
					height: '100%'
				}}
				center={center}
				zoom={10}
				onLoad={onLoad}
				onUnmount={onUnmount}
				onClick={(e) => {
					console.log(e)

					const marker = new global.google.maps.Marker({
						position: e.latLng,
						map: map,
						title: 'Hello World!'
					})

					const infoWindow = new google.maps.InfoWindow()

					marker.addListener('click', ({ domEvent, latLng }: any) => {
						const { target } = domEvent

						infoWindow.close()
						infoWindow.setContent('Hello World!')
						infoWindow.open(map, marker)
					})
				}}
				{...data.map((item: any) => () => (
					<Marker
						key={item.id}
						position={{
							lat: item.lat,
							lng: item.lng
						}}
						title={item.name}
					/>
				))}
			>
				{/* Child components, such as markers, info windows, etc. */}
				<>
					<Marker
						label={'Teste'}
						position={center}
						onClick={() => window.alert('teste')}
					/>
				</>
			</GoogleMap>
		</View>
	) : (
		<ActivityIndicator
			style={{
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center'
			}}
		/>
	)
}
