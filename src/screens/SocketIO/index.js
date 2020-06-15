import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import io from 'socket.io-client';
import AudioRecord from 'react-native-audio-record';
import {Buffer} from 'buffer';
import base64 from 'react-native-base64';
import MicStream from 'react-native-microphone-stream';
var Sound = require('react-native-sound');
Sound.setCategory('Playback');
import MP3 from '../../assets/test.mp3';
import SoundPlayer from 'react-native-sound-player';
import RNFS from 'react-native-fs';
import TrackPlayer from 'react-native-track-player';

TrackPlayer.updateOptions({
  ratingType: TrackPlayer.RATING_5_STARS,
  stopWithApp: false,
  capabilities: [
    TrackPlayer.CAPABILITY_PLAY,
    TrackPlayer.CAPABILITY_PAUSE,
    TrackPlayer.CAPABILITY_STOP,
  ],
  compactCapabilities: [
    TrackPlayer.CAPABILITY_PLAY,
    TrackPlayer.CAPABILITY_PAUSE,
  ],
});

const options = {
  sampleRate: 16000, // default 44100
  channels: 1, // 1 or 2, default 1
  bitsPerSample: 16, // 8 or 16, default 16
  audioSource: 6, // android only (see below)
  wavFile: require('../../assets/test.wav'), // default 'audio.wav'
};

export class SocketIO extends Component {
  state = {
    onlineCount: 0,
    color: '#f1f1f1',
    audio: '',
    track: {
      id: 1,
      url:
        'https://file-examples.com/wp-content/uploads/2017/11/file_example_MP3_700KB.mp3',
      title: 'Avaritia',
      artist: 'deadmau5',
      album: 'while(1<2)',
      genre: 'Progressive House, Electro House',
      date: '2014-05-20T07:00:00+00:00',
      artwork: require('../../assets/img/cover.jpg'),
    },
  };

  componentDidMount = async () => {
    SoundPlayer.onFinishedLoading((success: boolean) => {
      console.log('finished loading', success);
    });
    this.io = io.connect('http://192.168.1.100:3000', {
      timeout: 10000,
    });

    this.io.on('newUser', onlineCount => {
      this.setState({
        onlineCount,
      });
    });

    this.io.on('disUser', onlineCount => {
      this.setState({
        onlineCount,
      });
    });

    this.io.on('changeColor', color => {
      this.setState({
        color,
      });
    });

    this.io.on('recordAudio', data => {
      console.log('GET DATA', data);
      SoundPlayer.playUrl(data);
    });

    AudioRecord.init(options);

    AudioRecord.on('data', data => {
      this.io.emit('recordAudio', data);
    });
  };

  generateColor = () => {
    return (
      '#' +
      Math.random()
        .toString(16)
        .slice(2, 8)
    );
  };

  changeColor = () => {
    let color = this.generateColor();

    this.setState({
      color,
    });

    this.io.emit('changeColor', color);
  };

  onPressIn = () => {
    AudioRecord.start();
  };

  onPressOut = async () => {
    const filePath = await AudioRecord.stop();
  };

  render() {
    return (
      <View style={[styles.container, {backgroundColor: this.state.color}]}>
        <TouchableOpacity
          onPress={this.changeColor}
          style={styles.button}
          onPressIn={this.onPressIn}
          onPressOut={this.onPressOut}>
          <React.Fragment>
            <Text style={styles.color}>{this.state.color}</Text>
            <View style={styles.countContainer}>
              <Text style={styles.count}>{this.state.onlineCount}</Text>
              <Text>Online now</Text>
            </View>
          </React.Fragment>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  countContainer: {
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    padding: 15,
    borderRadius: 5,
  },
  count: {
    fontSize: 32,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  color: {
    fontSize: 28,
    padding: 10,
  },
});

export default SocketIO;
