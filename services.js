import TrackPlayer from 'react-native-track-player';

module.exports = async function() {
  await TrackPlayer.addEventListener('remote-jump-forward', async event => {
    let position = await TrackPlayer.getPosition();
    let newPosition = position + event.interval;
    await TrackPlayer.seekTo(newPosition);
  });

  await TrackPlayer.addEventListener('remote-jump-backward', async event => {
    let position = await TrackPlayer.getPosition();
    let newPosition = position > 9 ? position - event.interval : 0;
    await TrackPlayer.seekTo(newPosition);
  });

  await TrackPlayer.addEventListener('remote-seek', async event => {
    await TrackPlayer.seekTo(event.position);
  });

  TrackPlayer.addEventListener('remote-play', event => {
    TrackPlayer.play();
  });

  TrackPlayer.addEventListener('remote-pause', event => {
    TrackPlayer.pause();
  });

  TrackPlayer.addEventListener('remote-stop', () => {
    TrackPlayer.destroy();
  });
};
