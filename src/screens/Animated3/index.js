import React, {Component} from 'react';
import {Animated, Dimensions} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';

const {height} = Dimensions.get('window');

class SwipeScreen extends Component {
  constructor(props) {
    super(props);
    this.position = new Animated.ValueXY({x: 0, y: height - 100});
  }

  onGestureEvent = ({nativeEvent}) => {
    const {absoluteY, translationY, velocityY, y} = nativeEvent;
    this.position.extractOffset();
    this.position.setValue({x: 0, y: y});
    console.log('absoluteY =>', absoluteY);
    console.log('translationY =>', translationY);
    console.log('velocityY =>', velocityY);
    console.log('y =>', y);
    if (translationY < -35) {
      this.position.setValue({x: 0, y: 0});
    } else {
      this.position.setValue({x: 0, y: height - 100});
    }
  };

  render() {
    const transform = {
      transform: this.position.getTranslateTransform(),
    };
    console.log('transform =>', transform);
    return (
      <Animated.View style={styles.main}>
        <PanGestureHandler
          onGestureEvent={this.onGestureEvent}
          onHandlerStateChange={this.onGestureEvent}>
          <Animated.View style={[styles.box, this.position.getLayout()]} />
        </PanGestureHandler>
      </Animated.View>
    );
  }
}

const styles = {
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  box: {
    width: '100%',
    height: '100%',
    backgroundColor: 'red',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
};

export default SwipeScreen;
