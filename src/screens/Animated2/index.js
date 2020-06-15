import React from 'react';
import {SafeAreaView, StyleSheet, Text, View, Dimensions} from 'react-native';
import Animated from 'react-native-reanimated';
import {PanGestureHandler, State} from 'react-native-gesture-handler';
const {width, height} = Dimensions.get('window');

const {cond, eq, add, set, Value, event, interpolate, Extrapolate} = Animated;

export default class App extends React.Component {
  render() {
    this.dragX = new Value(0);
    this.dragY = new Value(0);
    this.offsetX = new Value(width / 2);
    this.offsetY = new Value(height / 2);
    this.gestureState = new Value(-1);
    this.onGestureEvent = event([
      {
        nativeEvent: {
          translationX: this.dragX,
          translationY: this.dragY,
          state: this.gestureState,
        },
      },
    ]);
    this.transX = cond(
      eq(this.gestureState, State.ACTIVE),
      add(this.offsetX, this.dragX),
      set(this.offsetX, add(this.offsetX, this.dragX)),
    );
    this.transY = cond(
      eq(this.gestureState, State.ACTIVE),
      add(this.offsetY, this.dragY),
      set(this.offsetY, add(this.offsetY, this.dragY)),
    );
    this.opacity = interpolate(this.transY, {
      inputRange: [0, height / 2, height],
      outputRange: [0.1, 1, 1],
    });
    this.borderWidth = interpolate(this.transX, {
      inputRange: [0, width],
      outputRange: [0, 10],
      extrapolate: Extrapolate.CLAMP,
    });

    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <PanGestureHandler
            maxPointers={1}
            onGestureEvent={this.onGestureEvent}
            onHandlerStateChange={this.onGestureEvent}>
            <Animated.View
              style={[
                styles.box,
                {
                  opacity: this.opacity,
                  borderWidth: this.borderWidth,
                  transform: [
                    {
                      translateX: this.transX,
                    },
                    {
                      translateY: this.transY,
                    },
                  ],
                },
              ]}
            />
          </PanGestureHandler>
        </View>
      </SafeAreaView>
    );
  }
}
const CIRCLE_SIZE = 70;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    backgroundColor: 'tomato',
    marginLeft: -(CIRCLE_SIZE / 2),
    marginTop: -(CIRCLE_SIZE / 2),
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    borderColor: '#000',
  },
});
