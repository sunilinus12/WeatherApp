import {
  ImageBackground,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import React from 'react';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import Sun from '../assets/sun.svg';
import Moon from '../assets/moon.svg';
import Rain from '../assets/rain.svg';
import Cloudy from '../assets/cloudy.svg';

export default function Card({weatherdata}) {
  var t = new Date(parseInt(weatherdata?.dt * 1000));
  const {width, height} = useWindowDimensions();

  var hours = t.getHours();
  // Find current hour in AM-PM Format
  hours = hours % 12;

  // To display "0" as "12"
  hours = hours ? hours : 12;
  var minutes = t.getMinutes();
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var dateformat = t.getHours() >= 12 ? 'PM' : 'AM';

  const handleWeatherType = i => {
    if (i === 'Sunny' || i == 'Clear') {
      return <Sun width={34} height={34} fill={'white'} />;
    } else if (i === 'Night') {
      return <Moon width={34} height={34} fill={'white'} />;
    } else if (i === 'Cloudy' || i == 'cloud') {
      return <Cloudy width={34} height={34} fill={'white'} />;
    } else if (i === 'Rainy' || i == 'Rain') {
      return <Rain width={34} height={34} fill={'white'} />;
    } else {
      return <Sun width={34} height={34} fill={'white'} />;
    }
  };
  const handleBackImg = i => {
    if (i === 'Sunny') {
      return require('../assets/sunny.jpg');
    } else if (i === 'Night') {
      return require('../assets/night2.jpg');
    } else if (i === 'Cloudy') {
      return require('../assets/cloudy.jpeg');
    } else if (i === 'Rainy' || i == 'Rain') {
      return require('../assets/rainy.jpg');
    }
    return require('../assets/sunny.jpg');
  };
  return (
    <View style={{width: width, height: height}}>
      <ImageBackground
        style={{flex: 1}}
        source={handleBackImg(weatherdata?.weather[0].main)}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.4)',
            padding: 20,
          }}>
          <View style={styles.topinfowrapper}>
            <View>
              <Text style={styles.city}>{weatherdata.name}</Text>
              <Text style={styles.time}>
                {new Date(Number(weatherdata.dt * 1000)).toDateString() + '  '}
              </Text>
              <Text style={styles.time}>
                {hours}:{minutes} {dateformat}
              </Text>
            </View>
            <View>
              <Text style={styles.temp}>
                {(parseInt(weatherdata?.main?.temp) - 273.15).toFixed(0) +
                  '\u2103'}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                {handleWeatherType(weatherdata?.main?.temp)}
                <Text style={styles.type}>{weatherdata?.weather[0]?.main}</Text>
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
                {' '}
                {weatherdata.wind.speed}
              </Text>
              <Text style={styles.infotext}>m/s</Text>
            </View>
            <View
              style={{
                alignItems: 'center',
              }}>
              <Text style={styles.infotext}>Rain</Text>
              <Text style={[styles.infotext, {fontSize: 24}]}>
                {' '}
                {weatherdata?.rain ? weatherdata.rain : '0'}
              </Text>
              <Text style={styles.infotext}>%</Text>
            </View>
            <View
              style={{
                alignItems: 'center',
              }}>
              <Text style={styles.infotext}>humidy</Text>
              <Text style={[styles.infotext, {fontSize: 24}]}>
                {weatherdata?.main?.humidity}
              </Text>
              <Text style={styles.infotext}>%</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
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
