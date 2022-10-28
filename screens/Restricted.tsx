import React from 'react'
import {
	ActivityIndicator,
	Alert,
	FlatList,
	Modal,
	Text,
	TouchableOpacity,
	View,
} from 'react-native'
import { SearchBar } from 'react-native-elements'

import styles from '../styles'

export default function RestrictedPage({ navigation }: any) {
	const [data, setData] = React.useState<any[]>([])
	const [filtered, setFiltered] = React.useState<any[]>([])
	const [search, setSearch] = React.useState<string>('')
	const [loading, setLoading] = React.useState<boolean>(true)
	const [modalVisible, setModalVisible] = React.useState<boolean>(false)
	const [isEdit, setEdit] = React.useState<boolean>(false)

	const searchFilterFunction = (text: string) => {
		// Check if searched text is not blank
		if (text) {
			// Inserted text is not blank
			// Filter the masterDataSource and update FilteredDataSource
			const newData = data.filter((item) => {
				// Applying filter for the inserted text in search bar
				const itemData = item.data
					? item.data.toUpperCase()
					: ''.toUpperCase()

				const textData = text.toUpperCase()

				return itemData.indexOf(textData) > -1
			})
			setFiltered(newData)
			setSearch(text)
		} else {
			// Inserted text is blank
			// Update FilteredDataSource with masterDataSource
			setFiltered(data)
			setSearch(text)
		}
	}

	const getRatings = async () => {
		await fetch('http://localhost:3000/ratings', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		})
			.then((response) => response.json())
			.then((json) => {
				data.splice(0, data.length)

				json.forEach((rating: any, index: number) => {
					if (data.includes(rating, index)) {
						console.log('')
					} else {
						data.push(rating)
					}
				})

				console.table(data)
			})
			.catch((error) => console.error(error))
			.finally(() => setLoading(false))
	}

	const renderItem = ({ item }: { item: any }): JSX.Element => {
		return (
			<View
				style={[
					styles.item,
					styles.row,
					{
						backgroundColor:
							item.id === 'ID' ? '#f9c2ff' : '#f6f6f6',
					},
				]}
				onTouchEnd={() => setModalVisible(!modalVisible)}
			>
				<View
					style={[
						styles.item,
						{
							backgroundColor:
								item.id === 'ID' ? '#f9c2ff' : '#f6f6f6',
						},
					]}
				>
					<Text
						style={[
							styles.listTitle,
							{
								fontSize: item.id === 'ID' ? 28 : 24,
								fontWeight:
									item.id === 'ID' ? 'bold' : 'normal',
								color: item.id === 'ID' ? '#000' : '#000',
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
								item.id === 'ID' ? '#f9c2ff' : '#f6f6f6',
						},
					]}
				>
					<Text
						style={[
							styles.listTitle,
							{
								fontSize: item.subject === 'Subject' ? 28 : 24,
								fontWeight:
									item.subject === 'Subject'
										? 'bold'
										: 'normal',
								color:
									item.subject === 'Subject'
										? '#000'
										: '#000',
							},
						]}
					>
						{item.subject}
					</Text>
				</View>
				<View
					style={[
						styles.item,
						{
							backgroundColor:
								item.id === 'ID' ? '#f9c2ff' : '#f6f6f6',
						},
					]}
				>
					<Text
						style={[
							styles.listTitle,
							{
								fontSize: item.rating === 'Rating' ? 28 : 24,
								fontWeight:
									item.rating === 'Rating'
										? 'bold'
										: 'normal',
								color:
									item.rating === 'Rating' ? '#000' : '#000',
							},
						]}
					>
						{item.rating}
					</Text>
				</View>

				<Modal
					animationType='slide'
					transparent={true}
					visible={modalVisible}
					onRequestClose={() => {
						Alert.alert('Modal has been closed.')
						setModalVisible(!modalVisible)
					}}
				>
					<View style={styles.centeredView}>
						<View style={styles.modalView}>
							<Text style={styles.listTitle}>
								Informações sobre a avaliação
							</Text>
							<br />
							<br />

							<View
								style={{
									alignItems: 'flex-start',
								}}
							>
								<Text style={styles.modalText}>
									<strong>ID: </strong>
									{item.id}
								</Text>
								<Text style={styles.modalText}>
									<strong>Disciplina: </strong>
									{item.subject}
								</Text>
								<Text style={styles.modalText}>
									<strong>Avaliação: </strong>
									{item.rating}
								</Text>
								<Text style={styles.modalText}>
									<strong>Professor: </strong>
									{item.teacher}
								</Text>
								<Text style={styles.modalText}>
									<strong>Aluno: </strong>
									{item.student}
								</Text>
								<Text style={styles.modalText}>
									<strong>Message positivo: </strong>
									{item.positiveMessage}
								</Text>
								<Text style={styles.modalText}>
									<strong>Message negativo: </strong>
									{item.negativeMessage}
								</Text>
							</View>
							<View style={[styles.row, { marginBottom: 15 }]}>
								<TouchableOpacity
									style={[
										styles.button,
										{ padding: 4, marginHorizontal: 6 },
									]}
									onPress={() =>
										setModalVisible(!modalVisible)
									}
								>
									<Text style={[styles.modalText]}>
										Fechar
									</Text>
								</TouchableOpacity>
								<TouchableOpacity
									style={[
										styles.button,
										{ padding: 4, marginHorizontal: 6 },
									]}
									onPress={() => {
										setModalVisible(!modalVisible)
									}}
								>
									<Text style={[styles.modalText]}>
										Editar
									</Text>
								</TouchableOpacity>
								<TouchableOpacity
									style={[
										styles.button,
										{ padding: 4, marginHorizontal: 6 },
									]}
									onPress={async () => {
										await fetch(
											`http://localhost:3000/ratings/${item.id}`,
											{
												method: 'DELETE',
												headers: {
													Accept: 'application/json',
													'Content-Type':
														'application/json',
												},
											}
										)
											.then(
												(
													response: Response
												): Promise<JSON> =>
													response.json()
											)
											.then((json: JSON): void =>
												window.alert(
													'Avaliação deletada com successo!'
												)
											)
											.catch((error: Error): void =>
												console.error(error)
											)
									}}
								>
									<Text style={[styles.modalText]}>
										Deletar
									</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</Modal>
			</View>
		)
	}

	React.useEffect(() => {
		getRatings()
		const headers = {
			id: 'ID',
			subject: 'Subject',
			rating: 'Rating',
			teacher: 'Teacher',
			student: 'Student',
			positive: 'Positive',
			negative: 'Negative',
		}

		data.push(headers)
	}, [])

	return (
		<View style={[styles.container, { backgroundColor: '#fff' }]}>
			{loading ? (
				<ActivityIndicator />
			) : (
				<View style={styles.container}>
					<SearchBar
						placeholder='Search ratings...'
						lightTheme
						platform='android'
						round
						value={search}
						onChangeText={(text: string) =>
							searchFilterFunction(text)
						}
						autoCorrect={false}
						blurOnSubmit={true}
						autoFocus={true}
						style={{
							width: '72%',
						}}
					/>

					<View style={[styles.row, { marginBottom: 15 }]}>
						<TouchableOpacity
							style={[styles.button]}
							onPress={() => navigation.navigate('Form')}
						>
							<Text style={[styles.listTitle]}> Home </Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={[styles.button]}
							onPress={async () => {
								await fetch('http://localhost:3000/ratings', {
									method: 'DELETE',
									headers: {
										Accept: 'application/json',
										'Content-Type': 'application/json',
									},
								})
									.then(
										(response: Response): Promise<any> =>
											response.json()
									)
									.then((json: JSON): void => {
										console.info(
											'Deu certo, boy. Apagou tudo'
										)
									})
									.catch((error: Error): void =>
										console.error(error)
									)
									.finally((): void => setLoading(false))
							}}
						>
							<Text style={[styles.listTitle]}> Delete all </Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={[styles.button]}
							onPress={async () => getRatings()}
						>
							<Text style={[styles.listTitle]}> Refresh </Text>
						</TouchableOpacity>
					</View>

					<FlatList
						data={filtered}
						renderItem={renderItem}
						keyExtractor={(item) => item.id}
						scrollEnabled={true}
						bounces={true}
					/>
				</View>
			)}
		</View>
	)
}
