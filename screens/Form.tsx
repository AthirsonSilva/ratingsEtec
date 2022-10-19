import React from 'react'
import {
	SafeAreaView,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native'
import styles from '../styles'

import { Picker } from '@react-native-picker/picker'

export default function Form({ navigation }: any) {
	const [subject, setSubject] = React.useState<string>('')
	const [rating, setRating] = React.useState<string>('')
	const [positive, setPositive] = React.useState<string>('')
	const [negative, setNegative] = React.useState<string>('')

	const pickerRef = React.useRef<any>()

	const open = () => {
		pickerRef.current.open()
	}

	const close = () => {
		pickerRef.current.close()
	}

	const handleSubmit = (): void => {
		fetch('http://localhost:3000/ratings', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				accept: 'application/json',
			},
			body: JSON.stringify({
				subject: subject.value,
				rating: rating.value,
				negativeMessage: negative,
				positiveMessage: positive,
			}),
		})
			.then(() => {
				console.table([subject, rating, negative, positive])
			})
			.catch((error) => {
				console.log(error)
			})
	}

	return (
		<SafeAreaView style={styles.body}>
			<br />
			<br />

			<Text style={styles.listTitle}>Disciplina</Text>
			<View
				style={[
					styles.lilMargin,
					{
						marginHorizontal: '10vw',
						height: '5vh',
					},
				]}
			>
				<Picker
					mode={'dropdown'}
					style={[styles.picker, { borderRadius: 10 }]}
					ref={pickerRef}
					selectedValue={subject}
					onValueChange={(value, index) => {
						;(() => setSubject(value))()

						console.log(subject)
					}}
				>
					<Picker.Item label='PW3' value='PW3' />
					<Picker.Item label='PAM2' value='PAM2' />
					<Picker.Item label='SE' value='SE' />
					<Picker.Item label='SSI' value='SSI' />
					<Picker.Item label='DTCC' value='DTCC' />
					<Picker.Item label='QTS' value='QTS' />
					<Picker.Item label='BD2' value='BD2' />
				</Picker>
			</View>
			<br />
			<Text style={styles.listTitle}>Avaliação</Text>
			<View
				style={[
					styles.lilMargin,
					{
						marginHorizontal: '10vw',
						height: '5vh',
					},
				]}
			>
				<Picker
					mode={'dropdown'}
					style={[styles.picker, { borderRadius: 10 }]}
					ref={pickerRef}
					selectedValue={rating}
					onValueChange={(value, index) => {
						setRating(value)

						console.log(rating)
					}}
				>
					<Picker.Item label='I' value='I' />
					<Picker.Item label='R' value='R' />
					<Picker.Item label='B' value='B' />
					<Picker.Item label='MB' value='MB' />
				</Picker>
			</View>

			<View style={styles.lilMargin}>
				<Text style={[styles.listTitle, { marginBottom: '2vh' }]}>
					{' '}
					Positive review:{' '}
				</Text>
				<TextInput
					style={styles.textInputs}
					placeholder='Enter your positive review. Example: foo'
					placeholderTextColor='#000'
					autoFocus={true}
					onChangeText={(input: React.SetStateAction<string>) =>
						setPositive(input)
					}
				/>
			</View>

			<View style={styles.lilMargin}>
				<Text style={[styles.listTitle, { marginBottom: '2vh' }]}>
					{' '}
					Negative review:{' '}
				</Text>
				<TextInput
					style={styles.textInputs}
					placeholder='Enter your negative review. Example: bar'
					placeholderTextColor='#000'
					onChangeText={(input: React.SetStateAction<string>) =>
						setNegative(input)
					}
				/>
			</View>

			<View style={styles.lilMargin}>
				<TouchableOpacity
					style={styles.button}
					onPress={() => handleSubmit()}
				>
					<Text>Enviar avaliação</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.lilMargin}>
				<TouchableOpacity
					style={styles.button}
					onPress={() => navigation.navigate('Restricted')}
				>
					<Text>Área restrita</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	)
}
