import React, {Component} from 'react';
import {View, StyleSheet, Text, Animated, StatusBar} from 'react-native';

const IMG_SRC = {
  uri: 'https://pulsations.files.wordpress.com/2010/05/randomdog.jpg',
};
const IMG_HEIGHT = 300;
const NAVBAR_HEIGHT = 100;

class Animated1 extends Component {
  constructor(props) {
    super(props);
    const yOffset = new Animated.Value(0);

    const translateY = yOffset.interpolate({
      inputRange: [-2, 0, IMG_HEIGHT - NAVBAR_HEIGHT, IMG_HEIGHT],
      outputRange: [-1, 0, 0, NAVBAR_HEIGHT],
    });

    const scale = yOffset.interpolate({
      inputRange: [-IMG_HEIGHT, 0, 1],
      outputRange: [2, 1, 1],
    });

    this.animatedHeaderStyles = {
      transform: [{translateY}, {scale}],
    };
    this.onScrollHandler = Animated.event(
      [{nativeEvent: {contentOffset: {y: yOffset}}}],
      {useNativeDriver: true},
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Animated.ScrollView
          style={styles.content}
          onScroll={this.onScrollHandler}
          scrollEventThrottle={1}>
          <View style={styles.placeholder} />
          <Text style={styles.title}>RandomDog</Text>
          <Text style={styles.info}>
            This is a profile of some random photo
          </Text>
          <View style={{width: 394, height: 2000}} />
          <Animated.Image
            style={[styles.header, this.animatedHeaderStyles]}
            source={IMG_SRC}
          />
        </Animated.ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  placeholder: {
    height: IMG_HEIGHT,
  },
  content: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  info: {
    fontSize: 16,
  },
  header: {
    position: 'absolute',
    top: -20,
    right: -10,
    left: -10,
    height: IMG_HEIGHT,
  },
  backButton: {
    position: 'absolute',
    top: 25,
    left: 10,
    backgroundColor: 'transparent',
  },
  settingsButton: {
    position: 'absolute',
    right: 10,
    top: IMG_HEIGHT,
  },
});

export default Animated1;
