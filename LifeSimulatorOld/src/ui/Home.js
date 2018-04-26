import React from 'react';
import { Button, View, Text, StyleSheet} from 'react-native';

export default class Home extends React.Component {

  showInventory() {
    this.props.navigation.navigate('Inventory', { name: 'Jane' })
  }

  showSkills() {
    this.props.navigation.navigate('Skills', { name: 'Jane' })
  }

  showShop() {
    this.props.navigation.navigate('Shop', { name: 'Jane' })
  }

  showActivities() {
    this.props.navigation.navigate('Activities', { name: 'Jane' })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Button style={styles.button} title='Inventory' onPress={() => this.showInventory()}/>
        </View>
        <View style={styles.buttonContainer}>
          <Button style={styles.button} title='Skills' onPress={() => this.showSkills()}/>
        </View>
        <View style={styles.buttonContainer}>
          <Button style={styles.button} title='Shop' onPress={() => this.showShop()}/>
        </View>
        <View style={styles.buttonContainer}>
          <Button style={styles.button} title='Activities' onPress={() => this.showActivities()}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
  },
  buttonContainer: {
    width: '100%',
    padding: 10,
  },
  button: {
    width: '100%',
    height: 60,
  }
});
