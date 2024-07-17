import { StyleSheet, Text, View } from 'react-native'
import { Slider } from 'react-native-awesome-slider'
import { useSharedValue } from 'react-native-reanimated'
import TrackPlayer, { useProgress } from 'react-native-track-player'

export const PlayerProgressBar = ({ style }) => {
	const { duration, position } = useProgress(250);

	const isSliding = useSharedValue(false)
	const progress = useSharedValue(0)
	const min = useSharedValue(0)
	const max = useSharedValue(1)

	if (!isSliding.value) {
		progress.value = duration > 0 ? position / duration : 0
	}

	const formatSecondsToMinutes = (seconds) => {
		const minutes = Math.floor(seconds / 60)
		const remainingSeconds = Math.floor(seconds % 60)
	
		const formattedMinutes = String(minutes).padStart(2, '0')
		const formattedSeconds = String(remainingSeconds).padStart(2, '0')
	
		return `${formattedMinutes}:${formattedSeconds}`
	}

	
	const trackElapsedTime = formatSecondsToMinutes(position)
	const trackRemainingTime = formatSecondsToMinutes(duration - position)

	return (
		<View style={style}>
			<Slider
				progress={progress}
				minimumValue={min}
				maximumValue={max}
				thumbWidth={10}
				renderBubble={() => null}
				theme={{
					minimumTrackTintColor: "#fff",
					maximumTrackTintColor: "#fff",
				}}
				onSlidingStart={() => (isSliding.value = true)}
				onValueChange={async (value) => {
					await TrackPlayer.seekTo(value * duration)
				}}
				onSlidingComplete={async (value) => {
					// if the user is not sliding, we should not update the position
					if (!isSliding.value) return

					isSliding.value = false

					await TrackPlayer.seekTo(value * duration)
				}}
			/>

			<View style={styles.timeRow}>
				<Text style={styles.timeText}>{trackElapsedTime}</Text>

				<Text style={styles.timeText}>
					{'-'} {trackRemainingTime}
				</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	timeRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'baseline',
		marginTop: 20,
	},
	timeText: {
		color: "#fff",
		opacity: 0.75,
		fontSize: 12,
		letterSpacing: 0.7,
		fontWeight: '500',
	},
})