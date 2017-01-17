import React, {Component} from 'react';
import {View, Text, TouchableHighlight, StyleSheet } from 'react-native';

const BUTTON_STYLES = {
  primary: {
    button: {
      backgroundColor: '#009cde',
      borderRadius: 4,
      alignItems: 'center',
      justifyContent: 'center',
      height: 48
    },
    title: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 16,
      textAlign: 'center'
    }
  },
  secondary: {
    button: {
      backgroundColor: 'white',
      borderRadius: 4,
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: '#b7c9d3',
      borderWidth: 2,
      height: 48
    },
    title: {
      color: '#b7c9d3',
      fontWeight: 'bold',
      fontSize: 16,
      textAlign: 'center'
    }
  }
};

class Button extends Component {
  constructor(props) {
    super(props);

    let type = props.type || 'primary';
    this.style = StyleSheet.create({
      button: BUTTON_STYLES[type].button,
      title: BUTTON_STYLES[type].title
    });
  }

  _onPressButton =()=> {
    if (this.props.onPress) {
      this.props.onPress();
    }
  };

  render() {
    const {style, props} = this;

    return (
      <TouchableHighlight onPress={this._onPressButton} style={style.button}>
        <Text style={style.title}>{props.title}</Text>
      </TouchableHighlight>
    )
  }
}

export default Button;