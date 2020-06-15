// @flow

import React from 'react';
import {View} from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';
import {SocketIO, Test, Test2} from './screens';

const App = props => {
  const {style} = props;
  return (
    <View style={[styles.wrapper, style]}>
      <SocketIO />
    </View>
  );
};

App.defaultProps = {
  style: {},
};

App.propTypes = {
  style: PropTypes.object,
};

export default App;
