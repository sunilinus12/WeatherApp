import {
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  Animated,
  TouchableOpacity,
} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import Search from './assets/search.svg';
import Menu from './assets/menu.svg';
import React, {useEffect, useRef} from 'react';
import Locations from './utils/Locations';
import Sun from './assets/sun.svg';
import Moon from './assets/moon.svg';
import Rain from './assets/rain.svg';
import Cloudy from './assets/cloudy.svg';

export default function App() {
  const {width, height} = useWindowDimensions();
  const X = useRef(new Animated.Value(0)).current;

  const handleWeatherType = i => {
    if (i === 'Sunny') {
      return <Sun width={34} height={34} fill={'white'} />;
    } else if (i === 'Night') {
      return <Moon width={34} height={34} fill={'white'} />;
    } else if (i === 'Cloudy') {
      return <Cloudy width={34} height={34} fill={'white'} />;
    } else if (i === 'Rainy') {
      return <Rain width={34} height={34} fill={'white'} />;
    }
  };
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
                  }}>
                  <View style={styles.topinfowrapper}>
                    <View>
                      <Text style={styles.city}>{item.city}</Text>
                      <Text style={styles.time}>{item.dateTime}</Text>
                    </View>
                    <View>
                      <Text style={styles.temp}>{item.temparature}</Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        {handleWeatherType(item.weatherType)}
                        <Text style={styles.type}>{item.weatherType}</Text>
                      </View>
                    </View>
                  </View>

                  <View
                    style={{
                      marginTop: 20,
                      borderBottomColor: 'gray',
                      borderBottomWidth: 1,
                    }}
                  />
                  <View style={styles.bottominfowrapper}>
                    <View
                      style={{
                        alignItems: 'center',
                      }}>
                      <Text style={styles.infotext}>wind</Text>
                      <Text style={[styles.infotext, {fontSize: 24}]}>
                        {item.wind}
                      </Text>
                      <Text style={styles.infotext}>km/h</Text>
                    </View>
                    <View
                      style={{
                        alignItems: 'center',
                      }}>
                      <Text style={styles.infotext}>Rain</Text>
                      <Text style={[styles.infotext, {fontSize: 24}]}>
                        {item.rain}
                      </Text>
                      <Text style={styles.infotext}>%</Text>
                    </View>
                    <View
                      style={{
                        alignItems: 'center',
                      }}>
                      <Text style={styles.infotext}>humidity</Text>
                      <Text style={[styles.infotext, {fontSize: 24}]}>
                        {item.humidity}
                      </Text>
                      <Text style={styles.infotext}>%</Text>
                    </View>
                  </View>
                </View>
              </ImageBackground>
            </View>
          );
        })}
      </ScrollView>
      <View style={styles.header}>
        <TouchableOpacity>
          <Search width={24} height={24} fill={'white'} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Menu width={24} height={24} fill={'white'} />
        </TouchableOpacity>
      </View>
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

const styles = StyleSheet.create({
  infotext: {
    fontSize: 14,
    color: 'white',
    fontFamily: 'Montserrat-Regular',
  },
  topinfowrapper: {
    flex: 1,
    marginTop: 160,
    justifyContent: 'space-between',
  },
  city: {
    fontSize: 30,
    color: 'white',
    fontFamily: 'Montserrat-Medium',
  },
  time: {
    color: 'white',
    fontFamily: 'Montserrat-Medium',
  },
  temp: {
    color: '#fff',
    fontFamily: 'Montserrat-Regular',
    fontSize: 85,
  },
  type: {
    color: 'white',
    lineHeight: 34,
    fontFamily: 'Montserrat-Regular',
    fontSize: 24,
    marginLeft: 10,
  },
  bottominfowrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  header: {
    position: 'absolute',
    top: 0,
    height: getStatusBarHeight() + 40,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
});
