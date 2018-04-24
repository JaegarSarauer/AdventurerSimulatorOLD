import React from 'react';
import { Button, View, Text, StyleSheet, FlatList, Image} from 'react-native';
import {Player, PP} from '../state/player'; 

export default class Inventory extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={PP.items}
          keyExtractor={(item, index) => item.id.toString()}
          renderItem={({item}) => 
            <View style={styles.item}>
              <Image source={item.icon}/>
              <Text style={styles.text}>{item.name + ": " + item.amount}</Text>
            </View>
        }
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    height: 40,
    width: '100%',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    padding: 10,
    height: 44,
  }
})