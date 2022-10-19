import * as React from 'react'
import {
	FlatList,
	LogBox,
	SafeAreaView,
	Text,
	TouchableOpacity,
	View,
} from 'react-native'
import styles from '../styles'

LogBox.ignoreLogs([
	'Failed prop type: Invalid prop `textStyle` of type `array` supplied to `Cell`, expected `object`.',
])

const RestrictedArea = () => {
	const [data, setData] = React.useState<any[]>([])
	const [loading, setLoading] = React.useState(true)
	const [error, setError] = React.useState(false)

	const handleDelete = async () => {
		await fetch('http://localhost:3000/ratings', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				accept: 'application/json',
			},
		})
			.then((response) => response.json())
			.then((data) => console.table(data))
			.catch((error) => console.error(error))
	}

	const handleGet = async (): Promise<void> => {
		await fetch('http://localhost:3000/ratings', {
			method: 'GET',
			headers: {
				mode: 'no-cors',
				'Content-Type': 'application/json',
				accept: 'application/json',
			},
		})
			.then((response: any) => response.json())
			.then((response: any) => {
				response.forEach((item: any) => {
					console.table(item)

					data.push(item)
				})

				console.table(data)
			})
			.catch((error) => console.error(error))
	}

	React.useEffect(() => {
		handleGet()
		const headers: any = {
			id: 'ID',
			subject: 'Subject',
			rating: 'Rating',
			positive: 'Positive',
			negative: 'Negative',
		}

		setData(headers)

		setLoading(false)
	}, [])

	const renderItem = ({ item }: { item: any }): JSX.Element => {
		return (
			<View
				style={[
					styles.item,
					styles.row,
					{
						backgroundColor:
							item.id === 'id' ? '#f9c2ff' : '#f6f6f6',
					},
				]}
			>
				<View
					style={[
						styles.item,
						{
							backgroundColor:
								item.id === 'id' ? '#f9c2ff' : '#f6f6f6',
						},
					]}
				>
					<Text
						style={[
							styles.listTitle,
							{
								fontSize: item.id === 'id' ? 28 : 24,
								fontWeight:
									item.id === 'id' ? 'bold' : 'normal',
								color: item.id === 'id' ? '#000' : '#000',
							},
						]}
					>
						{item.id}
					</Text>
				</View>
				<View
					style={[
						styles.item,
						{
							backgroundColor:
								item.id === 'id' ? '#f9c2ff' : '#f6f6f6',
						},
					]}
				>
					<Text
						style={[
							styles.listTitle,
							{
								fontSize: item.subject === 'SUBJECT' ? 28 : 24,
								fontWeight:
									item.subject === 'SUBJECT'
										? 'bold'
										: 'normal',
								color:
									item.subject === 'SUBJECT'
										? '#000'
										: '#000',
							},
						]}
					>
						{item.subject}
					</Text>
				</View>
			</View>
		)
	}

	return (
		<SafeAreaView style={styles.body}>
			<FlatList
				data={data}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
			/>

			<View style={styles.lilMargin}>
				<TouchableOpacity style={styles.button} onPress={handleDelete}>
					<Text style={{ fontWeight: 'bold' }}>Apagar tudo</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	)
}

export default RestrictedArea
