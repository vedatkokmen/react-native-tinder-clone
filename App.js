import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import Card from './src/components/Card';
import users from './assets/data/users';
import Like from './assets/images/LIKE.png';
import Nope from './assets/images/nope.png';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  useAnimatedGestureHandler,
  useDerivedValue,
  interpolate,
  runOnJS,
} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [nextIndex, setNextIndex] = useState(currentIndex + 1);
  const currentProfile = users[currentIndex];
  const nextProfile = users[nextIndex];
  const {width} = Dimensions.get('screen');
  const ROTATION = 60;
  const SWIPE_VELOCITY = 600;
  const hiddenTranslateX = 2 * width;
  const translateX = useSharedValue(0);
  const rotate = useDerivedValue(
    () =>
      interpolate(translateX.value, [0, hiddenTranslateX], [0, ROTATION]) +
      'deg',
  );

  const cardStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: withSpring(translateX.value)},
        {rotate: withSpring(rotate.value)},
      ],
    };
  });

  const nextCardStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(
            translateX.value,
            [-hiddenTranslateX, 0, hiddenTranslateX],
            [0, 0.8, 1],
          ),
        },
      ],
      opacity: interpolate(
        translateX.value,
        [-hiddenTranslateX, 0, hiddenTranslateX],
        [1, 0.5, 1],
      ),
    };
  });

  const likeStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        translateX.value,
        [0, hiddenTranslateX / 10],
        [0, 1],
      ),
    };
  });
  const nopeStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        translateX.value,
        [0, -hiddenTranslateX / 10],
        [0, 1],
      ),
    };
  });

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      ctx.startX = translateX.value;
    },
    onActive: (event, ctx) => {
      translateX.value = ctx.startX + event.translationX;
    },
    onEnd: (event, ctx) => {
      if (Math.abs(event.velocityX) < SWIPE_VELOCITY) {
        translateX.value = withSpring(0);
        return;
      }
      translateX.value = withSpring(
        hiddenTranslateX * Math.sign(event.velocityX),
        {},
        () => runOnJS(setCurrentIndex)(currentIndex + 1),
      );
    },
  });

  useEffect(() => {
    translateX.value = 0;
    setNextIndex(currentIndex + 1);
  }, [currentIndex, translateX]);

  return (
    <View style={styles.container}>
      {nextProfile && (
        <View style={styles.nextCardContainer}>
          <Animated.View style={[styles.animatedCard, nextCardStyle]}>
            <Card user={nextProfile} />
          </Animated.View>
        </View>
      )}

      {currentProfile && (
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View style={[cardStyle, styles.animatedCard]}>
            <Animated.Image
              source={Like}
              style={[styles.like, {left: 10}, likeStyle]}
            />
            <Animated.Image
              source={Nope}
              style={[styles.like, {right: 10}, nopeStyle]}
            />
            <Card user={currentProfile} />
          </Animated.View>
        </PanGestureHandler>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  animatedCard: {
    width: '95%',
    height: '70%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextCardContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    position: 'absolute',
    bottom: 50,
    borderWidth: 1,
    paddingHorizontal: 20,
  },
  like: {
    width: 150,
    height: 150,
    zIndex: 1,
    position: 'absolute',
    resizeMode: 'contain',
  },
});

export default App;
