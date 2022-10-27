import 'react-native-gesture-handler'

declare global {
	// attributes
	var MAPS_ID: string
	var GOOGLE_MAPS_APIKEY: string

	// getters
	function getMapsId(): string
	function getMapsToken(): string

	// setters
	function setMapsId(id: string): void
	function setMapsToken(token: string): void

	// interfaces
	interface IMaps {
		id: string
		token: string
	}
}

// getters
global.getMapsId = () => global.MAPS_ID
global.getMapsToken = () => global.GOOGLE_MAPS_APIKEY

// setters
global.setMapsId = (id: string) => (global.MAPS_ID = id)
global.setMapsToken = (token: string) => (global.GOOGLE_MAPS_APIKEY = token)

// set global variables
global.setMapsId('google-map-script')
global.setMapsToken('AIzaSyCmrE9qeUQP20VEA6AT53UKRDNqbywCvYw')
