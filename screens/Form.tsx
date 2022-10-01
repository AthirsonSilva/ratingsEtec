import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import axios from 'axios';
import styles from '../styles';

import Dropdown from '../components/Dropdown';

export default function form({navigation}) {
    const [subject, setSubject] = React.useState(undefined);
    const [rating, setRating] = React.useState(undefined);
    const [positive, setPositive] = React.useState('');
    const [negative, setNegative] = React.useState('');

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
        <View>
            <Text style={styles.title}>Avaliação de disciplinas</Text>

        <br />
        <br />
        <Text style={styles.listTitle}>Disciplina</Text>    
          {!!subject && (
        <Text>
          Disciplina: {subject.name}
        </Text>
        )}
        <Dropdown style={{ color: '#000' }} label="Select Item" data={subjectData} onSelect={setSubject} />
            <br />

        <Text style={[styles.listTitle, { alignItems: 'flex-start' }]}>Nota</Text>
        {!!rating && (
        <Text>
          Avaliação: {rating.name}
        </Text>
        )}
        <Dropdown label="Select Item" data={ratingData} onSelect={setRating} />
                   

        <View style={ styles.lilMargin }>
            <Text> Positive review:  </Text>          
            <TextInput              
              style={ styles.textInputs }
              placeholder='Enter your positive review. Example: foo'
              placeholderTextColor='#000'
              autoFocus={true}
              
              onChangeText = {(input: React.SetStateAction<string>) => setPositive(input)}
              />            
          </View>    

          <View style={ styles.lilMargin }>
            <Text> Negative review:  </Text>          
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
      </View>
    );
}


