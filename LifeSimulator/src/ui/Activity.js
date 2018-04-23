import React from 'react';
import { Button, View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import FloatingHearts from 'react-native-floating-hearts';
import {Player, PP} from '../state/player'; 
import { ITEM } from '../definitions/Item';
import { SKILL } from '../definitions/Skill';

export default class Activity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            progress: 0,
            progressIncrement: 1,
            progressCount: 0,
            lootCount: 0,
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
            this.setState({
              lootCount: this.state.lootCount + 1
            });
        }
        this.setState({
          progress, 
          progressCount: this.state.progressCount + 1
        });
    }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.item} onPress={() => this.action()}>
          <Text style={styles.text}>{this.props.title}</Text>
          <Text style={styles.subText}>{Math.floor((this.state.progress / this.props.maxProgress) * 100) + '%'}</Text>
        </TouchableOpacity>
        <FloatingHearts count={this.state.progressCount}/>
        <FloatingHearts count={this.state.lootCount}/>
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