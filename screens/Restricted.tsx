import React from 'react';
import {
	FlatList,
	Text,
	View,
	ActivityIndicator,
	TouchableOpacity,
} from 'react-native';
import { SearchBar } from 'react-native-elements';

import styles from '../styles';

export default function RestrictedPage({ navigation }: any) {
	const [data, setData] = React.useState<any[]>([]);
	const [filtered, setFiltered] = React.useState<any[]>([]);
	const [search, setSearch] = React.useState<string>('');
	const [loading, setLoading] = React.useState<boolean>(true);

	const searchFilterFunction = (text: string) => {
		// Check if searched text is not blank
		if (text) {
			// Inserted text is not blank
			// Filter the masterDataSource and update FilteredDataSource
			const newData = data.filter((item) => {
				// Applying filter for the inserted text in search bar
				const itemData = item.data
					? item.data.toUpperCase()
					: ''.toUpperCase();

				const textData = text.toUpperCase();

				return itemData.indexOf(textData) > -1;
			});
			setFiltered(newData);
			setSearch(text);
		} else {
			// Inserted text is blank
			// Update FilteredDataSource with masterDataSource
			setFiltered(data);
			setSearch(text);
		}
	};

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
				json.forEach((rating: any) => {
					data.push(rating);
				});

				console.table(data);
			})
			.catch((error) => console.error(error))
			.finally(() => setLoading(false));
	};

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
								fontSize: item.data === 'DATA' ? 28 : 24,
								fontWeight:
									item.data === 'DATA' ? 'bold' : 'normal',
								color: item.data === 'DATA' ? '#000' : '#000',
							},
						]}
					>
						{item.data}
					</Text>
				</View>
			</View>
		);
	};

	React.useEffect(() => {
		getRatings();
		const headers = {
			id: 'ID',
			subject: 'Subject',
			rating: 'Rating',
			teacher: 'Teacher',
			student: 'Student',
			positive: 'Positive',
			negative: 'Negative',
		};

		data.push(headers);
	}, []);

	return (
		<View style={[styles.container, { backgroundColor: '#fff' }]}>
			{loading ? (
				<ActivityIndicator />
			) : (
				<View style={styles.container}>
					<SearchBar
						placeholder="Search ratings..."
						lightTheme
						platform="android"
						round
						value={search}
						onChangeText={(text: string) => searchFilterFunction(text)}
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
										'Content-Type': 'application/json'
									}
								})
									.then((response: Response): Promise<JSON> => response.json())
									.then((json: JSON): void => {
										console.info('Deu certo, boy. Apagou tudo')
									})
									.catch((error: Error): void => console.error(error))
									.finally((): void => setLoading(false))
							}}
						>
							<Text style={[styles.listTitle]}> Delete all </Text>
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
	);
}