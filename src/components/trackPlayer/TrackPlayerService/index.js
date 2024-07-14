import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
  Event,
  useTrackPlayerEvents
} from 'react-native-track-player';
// import {images} from '../../config/Images';

const events = [Event.PlaybackState, Event.PlaybackError, Event.PlaybackActiveTrackChanged, Event.PlaybackQueueEnded]

export const useLogTrackPlayerState = () => {
	useTrackPlayerEvents(events, async (event) => {
		if (event.type === Event.PlaybackError) {
			console.warn('An error occurred: ', event)
		}

		if (event.type === Event.PlaybackState) {
			console.log('Playback state: ', event)
		}

		if (event.type === Event.PlaybackActiveTrackChanged) {
			console.log('Track changed', event.index)
		}

    if (event.type === Event.PlaybackQueueEnded) {
      console.log('Queue ended')
    }
	})
}

export const setupPlayer = async () => {
  let isSetup = false;
  try {
    await TrackPlayer.getActiveTrack();
    isSetup = true;
  } catch {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({
      android: {
        appKilledPlaybackBehavior:
          AppKilledPlaybackBehavior.PausePlayback,
      },
      stopWithApp: false,
      waitForBuffer: true,
      // icon: images.demoTrack,
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.SeekTo,
        Capability.Stop,
      ],
      compactCapabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
      ],
      notificationCapabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.Stop,
      ],
      progressUpdateEventInterval: 2,
    });
    isSetup = true;
  } finally {
    return isSetup;
  }
};

export const playbackService = async () => {
  TrackPlayer.addEventListener(Event.RemotePlay, () => TrackPlayer.play());
  TrackPlayer.addEventListener(Event.RemotePause, () => TrackPlayer.pause());
  TrackPlayer.addEventListener(Event.RemoteNext, async event => {
    console.log('Forward>>>>>>>>Remote');
    console.log(await TrackPlayer.getQueue(), 'await TrackPlayer.getQueue();');
    await TrackPlayer.seekTo(0);
    await TrackPlayer.skipToNext();
  });

  TrackPlayer.addEventListener(Event.RemotePrevious, async () => {
    console.log('Previous<<<<<<<<Remote');
    await TrackPlayer.seekTo(0);
    await TrackPlayer.skipToPrevious();
  });

  TrackPlayer.addEventListener(Event.RemoteJumpForward, async ({position}) => {
    console.log('remote-jump-forward');
    await TrackPlayer.seekTo(0);
  });

  TrackPlayer.addEventListener(Event.RemoteJumpBackward, async ({position}) => {
    console.log('remote-jump-backward');
    await TrackPlayer.seekTo(0);
  });
  TrackPlayer.addEventListener(Event.RemoteSeek, async ({position}) => {
    await TrackPlayer.seekTo(position);
    console.log('remote');
  });
};
