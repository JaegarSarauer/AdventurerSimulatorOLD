import React from 'react';
import { Button, View, Text, StyleSheet, FlatList, Modal, Image} from 'react-native';
import {Player, PP} from '../state/player'; 
import { ITEM } from '../definitions/Item';
import * as Assets from '../definitions/Assets';

export default class Shop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updateList: false,
      showSellModal: false,
      modalItem: null,
    };
  }

  sellItem(item, amount) {
    amount = Math.min(amount, PP.getItemAmount(item));
    if (amount === 0) {
      this.setState({showSellModal: false});
      return;
    }
    PP.removeItem(item, amount);
    PP.addItem(ITEM.Coins, amount * item.value);
    this.setState({
      updateList: !this.state.updateList,
      showSellModal: false,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={PP.items.filter(item => {return item.id !== ITEM.Coins.id})}
          extraData={this.state.updateList}
          keyExtractor={(item, index) => item.id.toString()}
          renderItem={({item}) => 
          <View style={styles.item} onTouchEnd={() => {this.setState({showSellModal: true, modalItem: item})}}>
            <Image source={item.icon}/>
            <Text style={styles.text}>{item.name + ": " + item.amount}</Text>
          </View>
        }
        />
        <Modal
          animationType='slide'
          transparent={false}
          visible={this.state.showSellModal}
          onRequestClose={() => {this.setState({showSellModal: false})}}
        >
        <View style={styles.buttons3}>
          <View style={styles.buttonContainer}>
            <Button style={styles.button} title='Sell 1' onPress={() => {this.sellItem(this.state.modalItem, 1)}}/>
        </View>
          <View style={styles.buttonContainer}>
            <Button style={styles.button} title='Sell 10' onPress={() => {this.sellItem(this.state.modalItem, 10)}}/>
        </View>
          <View style={styles.buttonContainer}>
            <Button style={styles.button} title='Sell All' onPress={() => {this.sellItem(this.state.modalItem, this.state.modalItem.amount)}}/>
        </View>
        </View>
        </Modal>
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
  },
  buttons3: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    width: '100%',
    padding: 10,
  },
  button: {
    padding: 16,
    width: '100%',
  },
})


/*




            */