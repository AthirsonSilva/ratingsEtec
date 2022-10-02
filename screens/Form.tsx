import React from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import styles from '../styles';

import { Picker } from '@react-native-picker/picker';
import Dropdown from '../components/Dropdown';
import ModalDropdown from 'react-native-modal-dropdown';


export default function form({navigation}: any) {
  const [subject, setSubject] = React.useState(undefined);
  const [rating, setRating] = React.useState(undefined);
  const [positive, setPositive] = React.useState('');
  const [negative, setNegative] = React.useState('');

    const pickerRef = React.useRef(undefined)

    const open = () => {
      pickerRef.current.open()
    }

    const close = () => {
      pickerRef.current.close()
    }

    const subjectData = [
      { id: 1, name: 'Programaçaõ de apps mobile II' },
      { id: 2, name: 'Programação Web III' },
      { id: 3, name: 'Sistemas Embarcados' },
      { id: 4, name: 'Segurança de sistemas da informação' },
      { id: 5, name: 'Desenvolvimento do trabalho de conclusão de curso' },
      { id: 6, name: 'Qualidade e Teste de Software' },
      { id: 7, name: 'Banco de dados III' },
    ]
    
    const ratingData = [
      { id: 1, name: 1 },
      { id: 2, name: 2 },
      { id: 3, name: 3 },
      { id: 4, name: 4 },
      { id: 5, name: 5 },
    ]

    const handleSubmit = (): void => {
      fetch('http://localhost:3001/ratings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json'
        },
        body: JSON.stringify({
          subject: subject.name,
          rating: rating.name,
          negativeMessage: negative,
          positiveMessage: positive
        })
      })
      .then(() => {
        console.table([subject, rating, negative, positive])
      })
      .catch(error => {
        console.log(error);
      })
    }
    
    return (
        <SafeAreaView style={ styles.body }>
        <br />
        <br />
        
      <Text style={styles.listTitle}>Disciplina</Text>
        <View style={[ styles.lilMargin, { 
          marginHorizontal: '10vw', 
          height: '5vh', 
          } ]}>
        <Picker
          mode={'dropdown'}
          style={[ styles.picker, { borderRadius: 10 } ]}
          ref={pickerRef}
          selectedValue={subject}
          onValueChange={(value, index) => {
            (() => setSubject(value))()

            console.log(subject)
            }
          }>
          <Picker.Item label="PW3" value="PW3" />
          <Picker.Item label="PAM2" value="PAM2" />
          <Picker.Item label="SE" value="SE" />
          <Picker.Item label="SSI" value="SSI" />
          <Picker.Item label="DTCC" value="DTCC" />
          <Picker.Item label="QTS" value="QTS" />
          <Picker.Item label="BD2" value="BD2" />
        </Picker>
        </View>
        <br />
      <Text style={styles.listTitle}>Avaliação</Text>
        <View style={[ styles.lilMargin, { 
          marginHorizontal: '10vw', 
          height: '5vh', 
          } ]}>
        <Picker
          mode={'dropdown'}
          style={[ styles.picker, { borderRadius: 10 } ]}
          ref={pickerRef}
          selectedValue={rating}
          onValueChange={(value, index) => {
            (() => setRating(value))()

            console.log(rating)
            }
          }>
          <Picker.Item label="I" value="I" />
          <Picker.Item label="R" value="R" />
          <Picker.Item label="B" value="B" />
          <Picker.Item label="MB" value="MB" />
        </Picker>
        </View>

        <View style={ styles.lilMargin }>
            <Text style={[ styles.listTitle, { marginBottom: '2vh' } ]}> Positive review:  </Text>          
            <TextInput              
              style={ styles.textInputs }
              placeholder='Enter your positive review. Example: foo'
              placeholderTextColor='#000'
              autoFocus={true}
              
              onChangeText = {(input: React.SetStateAction<string>) => setPositive(input)}
              />            
          </View>    

          <View style={ styles.lilMargin }>
            <Text style={[ styles.listTitle, { marginBottom: '2vh' } ]}> Negative review:  </Text>          
            <TextInput
              style={styles.textInputs}
              placeholder='Enter your negative review. Example: bar'
              placeholderTextColor='#000'              
              
              onChangeText = {(input: React.SetStateAction<string>) => setNegative(input)}
              />            
          </View>           

          <View style={ styles.lilMargin }>
            <TouchableOpacity
              style={ styles.button }
              onPress={() => handleSubmit()}
              >
                <Text>Enviar avaliação</Text>
            </TouchableOpacity>
          </View>

          <View style={ styles.lilMargin }>
            <TouchableOpacity
              style={ styles.button }
              onPress={() => navigation.navigate('Restricted')}
              >
                <Text>Área restrita</Text>
            </TouchableOpacity>
          </View>
      </SafeAreaView>
    );
}


