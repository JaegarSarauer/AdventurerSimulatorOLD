import React from 'react';
import { Button, View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {Player, PP} from '../state/player'; 
import { ITEM } from '../definitions/Item';
import { SKILL } from '../definitions/Skill';
import Float from './Float';

export default class Activity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            progress: 0,
            progressIncrement: 1,
        };
    }

    componentDidMount() {
      this.getProgressIncrement();
    }

    getProgressIncrement() {
      this.setState({progressIncrement: .75 + PP.skills[SKILL.Woodcutting.id].level * .25});
    }

    action() {
        let progress = this.state.progress + this.state.progressIncrement;
        if (progress >= this.props.maxProgress) {
            progress -= this.props.maxProgress;
            PP.addItem(this.props.reward.item, this.props.reward.itemAmount);
            PP.addXP(SKILL.Woodcutting, this.props.reward.xp);
            this.getProgressIncrement();
            this.props.onFloat('loot', 1);
        }
        this.setState({progress});
        this.props.onFloat('progress', 1);
    }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.item} onPress={() => this.action()}>
          <Text style={styles.text}>{this.props.title}</Text>
          <Text style={styles.subText}>{Math.floor((this.state.progress / this.props.maxProgress) * 100) + '%'}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  item: {
    height: '100%',
    width: '100%',
    backgroundColor: 'lightblue'
  },
  text: {
    fontSize: 22,
    textAlign: 'center',
    textAlignVertical: 'center',
    height: '50%',
  },
  subText: {
    fontSize: 18,
    textAlign: 'center',
    textAlignVertical: 'center',
    height: '50%',
  }
})