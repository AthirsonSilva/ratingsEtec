import * as React from 'react';
import { Button, FlatList, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { DataTable } from 'react-native-paper';
import styles from '../styles';

import { Table, TableWrapper, Cell, Row, Rows, Col, Cols } from 'react-native-table-component';

const MyComponent = () => {
  const DATA = Array()
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(false)
  const headers = ['Disciplina', 'Nota', 'Positivo', 'Negativo']

  const handleDelete = async () => {
    await fetch('http://localhost:3001/ratings', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json'
      },
    })
    .then(response => response.json())
    .then(data => console.table(data))
    .catch(error => console.error(error))
  }

  React.useEffect(() => {
    fetch('http://localhost:3001/ratings', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json'
      },
    })
    .then(response => response.json())
    .then(response => {
      response.ratings.map((item: any) => {
        DATA.push([item.id, item.subject, item.rating, item.positiveMessage, item.negativeMessage])
      })

      console.table(DATA)

      DATA.forEach((item: any) => {
        console.log(item[1])
      })
    })
    .catch(error => console.error(error))
  })

  console.table('TABLE: ', DATA)

  return (
    <SafeAreaView style={ styles.body }>
      {/* <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
        <Row data={[
          <Text style={styles.listTitle}>Disciplina</Text>,
          <Text style={styles.listTitle}>Nota</Text>,
          <Text style={styles.listTitle}>Positivo</Text>,
          <Text style={styles.listTitle}>Negativo</Text>
        ]}/>
        <Rows data={DATA}/>
      </Table> */}

      <FlatList
        data={DATA}
        renderItem={({ item }) => {          
          return (
            <View style={styles.listItem}>
              <Text style={styles.listItemText}>{item}</Text>
            </View>
          )
        }}
        keyExtractor={item => item[0]}
      />

      {DATA.length}

      <TouchableOpacity style={[ styles.button, { backgroundColor: '#d92b2b' } ]} onPress={handleDelete}>
        <Text>Deletar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default MyComponent;