import * as React from 'react';
import { LogBox, FlatList, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import styles from '../styles';

import { Table, TableWrapper, Row, Rows } from 'react-native-table-component';

LogBox.ignoreLogs(['Failed prop type: Invalid prop `textStyle` of type `array` supplied to `Cell`, expected `object`.']);

const RestrictedArea = () => {
  const DATA = Array()
  const HEADERS = ['Índice', 'Disciplina', 'Nota', 'Positivo', 'Negativo']
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(false)
  const widthArray = [40, 60, 80, 100, 120, 140, 160, 180, 200]

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

      console.table(DATA[0][0])
    })
    .catch(error => console.error(error))
  })

  console.table('TABLE: ', DATA)

  return (
    <SafeAreaView style={ styles.body }>
      <TableWrapper>
      <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
        <Row 
        data={HEADERS}
        style={styles.cellStyle}
        textStyle={styles.headerText}/>
        <Rows 
        style={styles.cellStyle}
        data={[
          ['1', 'Matemática', '10', 'Muito bom', 'Nada a declarar'],
          ['2', 'Português', '10', 'Muito bom', 'Nada a declarar'],
        ]} 
        textStyle={styles.rowText}/>
      </Table>
      </TableWrapper>
      <View style={styles.lilMargin}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleDelete}
        >
          <Text style={{ fontWeight: 'bold' }}>Apagar tudo</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default RestrictedArea;