import React, {Component} from 'react';
import {View, Text} from 'react-native';
import styles from './styles';

class Test2 extends Component {
  componentDidMount() {}

  render() {
    return (
      <View style={styles.wrapper}>
        <Text>Test2</Text>
      </View>
    );
  }
}

export default Test2;
