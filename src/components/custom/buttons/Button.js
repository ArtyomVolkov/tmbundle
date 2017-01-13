import React, {Component} from 'react';
import {View, Text, TouchableHighlight, StyleSheet } from 'react-native';

const style = StyleSheet.create({
  button: {
    backgroundColor: '#009cde',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    height: 48
  },
  title: {
    color: 'white',
    textAlign: 'center'
  }
});

class Button extends Component {
  constructor(props) {
    super(props);
  }

  _onPressButton =()=> {
    if (this.props.onPress) {
      this.props.onPress();
    }
  };

  render() {
    return (
      <TouchableHighlight onPress={this._onPressButton} style={style.button}>
        <Text style={style.title}>{this.props.title}</Text>
      </TouchableHighlight>
    )
  }
}

export default Button;