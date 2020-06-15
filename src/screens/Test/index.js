import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import TrackPlayer, {ProgressComponent} from 'react-native-track-player';

import Player from './Player';
import localTrack from '../../assets/test-3.mp3';
import io from 'socket.io-client';

function getStateName(state) {
  switch (state) {
    case TrackPlayer.STATE_NONE:
      return 'None';
    case TrackPlayer.STATE_PLAYING:
      return 'Playing';
    case TrackPlayer.STATE_PAUSED:
      return 'Paused';
    case TrackPlayer.STATE_STOPPED:
      return 'Stopped';
    case TrackPlayer.STATE_BUFFERING:
      return 'Buffering';
  }
}

async function skipToNext() {
  try {
    await TrackPlayer.skipToNext();
  } catch (_) {}
}

async function skipToPrevious() {
  try {
    await TrackPlayer.skipToPrevious();
  } catch (_) {}
}

const playlistData = [];

export default class PlaylistScreen extends ProgressComponent {
  componentDidMount = () => {
    this.setup();
    this.io = io.connect('https://localhost:3000', {
      timeout: 10000,
    });

    this.io.on('d', data => {
      console.log('get data =>', data);
    });
  };

  setup = async () => {
    await TrackPlayer.setupPlayer({});
    await TrackPlayer.updateOptions({
      stopWithApp: true,
      capabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
        TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
        TrackPlayer.CAPABILITY_STOP,
      ],
      compactCapabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
      ],
    });
  };

  togglePlayback = async () => {
    const currentTrack = await TrackPlayer.getCurrentTrack();
    if (currentTrack == null) {
      await TrackPlayer.reset();
      await TrackPlayer.add(playlistData);
      await TrackPlayer.add({
        id: 'local-track',
        url: localTrack,
        title: 'Pure (Demo)',
        artist: 'David Chavez',
        artwork: 'https://i.picsum.photos/id/500/200/200.jpg',
        duration: 28,
      });
      await TrackPlayer.play();
    } else {
      if (this.props.playbackState === TrackPlayer.STATE_PAUSED) {
        await TrackPlayer.play();
      } else {
        await TrackPlayer.pause();
      }
    }
  };

  render() {
    const {playbackState} = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.description}>
          We'll be inserting a playlist into the library loaded from
          `playlist.json`. We'll also be using the `ProgressComponent` which
          allows us to track playback time.
        </Text>
        <Player
          onNext={skipToNext}
          style={styles.player}
          onPrevious={skipToPrevious}
          onTogglePlayback={this.togglePlayback}
        />
        <Text style={styles.state}>{getStateName(playbackState)}</Text>
      </View>
    );
  }
}

PlaylistScreen.navigationOptions = {
  title: 'Playlist Example',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  description: {
    width: '80%',
    marginTop: 20,
    textAlign: 'center',
  },
  player: {
    marginTop: 40,
  },
  state: {
    marginTop: 20,
  },
});
