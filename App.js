import {
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  Animated,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import Locations from './utils/Locations';

export default function App() {
  const {width, height} = useWindowDimensions();
  const X = useRef(new Animated.Value(0)).current;

  const handleBackImg = i => {
    if (i === 'Sunny') {
      return require('./assets/sunny.jpg');
    } else if (i === 'Night') {
      return require('./assets/night2.jpg');
    } else if (i === 'Cloudy') {
      return require('./assets/cloudy.jpeg');
    } else if (i === 'Rainy') {
      return require('./assets/rainy.jpg');
    }
  };

  return (
    <>
      <StatusBar barStyle={'light-content'} />
      <ScrollView
        horizontal={true}
        pagingEnabled
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: X,
                },
              },
            },
          ],
          {
            useNativeDriver: false,
          },
        )}
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}>
        {Locations.map((item, key) => {
          let bgimg = handleBackImg(item.weatherType);

          return (
            <View key={key} style={{width: width, height: height}}>
              <ImageBackground style={{flex: 1}} source={bgimg}>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: 'rgba(0,0,0,0.4)',
                    padding: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: 'white',
                    }}>
                    {item.city}
                  </Text>
                </View>
              </ImageBackground>
            </View>
          );
        })}
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          top: 160,
          left: 20,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {Locations.map((item, key) => {
          const width2 = X.interpolate({
            inputRange: [width * (key - 1), width * key, width * (key + 1)],
            outputRange: [5, 12, 5],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              key={key}
              style={{
                height: 5,
                width: 5,
                borderRadius: 4,
                backgroundColor: 'white',
                marginHorizontal: 4,
                width: width2,
              }}
            />
          );
        })}
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
