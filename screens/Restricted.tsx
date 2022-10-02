import * as React from 'react';
import { Button, FlatList, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { DataTable } from 'react-native-paper';
import styles from '../styles';

import { Table, TableWrapper, Row, Rows, Col, Cols } from 'react-native-table-component';

const RestrictedArea = () => {
  const DATA = Array()
  const HEADERS = ['Disciplina', 'Nota', 'Positivo', 'Negativo']
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

      DATA.forEach((item: any) => {
        console.log(item[1])
      })
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
        style={styles.headStyle}
        textStyle={styles.headerText}/>
        <Rows data={[
          ['1', 'Matemática', '10', 'Muito bom', 'Nada a declarar'],
          ['2', 'Português', '10', 'Muito bom', 'Nada a declarar'],
        ]} 
        textStyle={styles.rowText}/>
      </Table>
      </TableWrapper>
      <View style={styles.lilMargin}>
        <Button
          title="Deletar"
          onPress={handleDelete}
        />
      </View>
    </SafeAreaView>
  );
}

export default RestrictedArea;