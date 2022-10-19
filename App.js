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
  ActivityIndicator,
} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import Search from './assets/search.svg';
import Menu from './assets/menu.svg';
import React, {useEffect, useRef, useState} from 'react';

import Sun from './assets/sun.svg';
import Moon from './assets/moon.svg';
import Rain from './assets/rain.svg';
import Cloudy from './assets/cloudy.svg';
import GetLocation from 'react-native-get-location';

export default function App() {
  const {width, height} = useWindowDimensions();
  const X = useRef(new Animated.Value(0)).current;
  const [weatherdata, setWeatherData] = useState([]);
  const [weathertype, setWeatherType] = useState(null);
  const [weatherbg, setWeatherBg] = useState(null);
  const [loading, setLoading] = useState(true);

  const getData = (lat, lon) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=af22973bbc6329c2bc4873b13ed89a61`,
    )
      .then(res => res.json())
      .then(data => {
        setWeatherData(data);
        console.log(data);
        setLoading(false);
      });
  };
  const getLocation = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 25000,
    })
      .then(location => {
        if (location) {
          getData(location.latitude, location.longitude);
        }
      })
      .catch(error => {
        const {code, message} = error;
      });
  };

  useEffect(() => {
    getLocation();
  }, []);

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
      return require('./assets/sunny.jpg');
    } else if (i === 'Night') {
      return require('./assets/night2.jpg');
    } else if (i === 'Cloudy') {
      return require('./assets/cloudy.jpeg');
    } else if (i === 'Rainy' || i == 'Rain') {
      return require('./assets/rainy.jpg');
    }
    return require('./assets/sunny.jpg');
  };
  if (weatherdata && !loading) {
    var t = new Date(parseInt(weatherdata?.dt * 1000));

    var hours = t.getHours();
    // Find current hour in AM-PM Format
    hours = hours % 12;

    // To display "0" as "12"
    hours = hours ? hours : 12;
    var minutes = t.getMinutes();
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var dateformat = t.getHours() >= 12 ? 'PM' : 'AM';

    return (
      <>
        <StatusBar barStyle={'light-content'} />

        <ScrollView
          horizontal={true}
          pagingEnabled
          showsHorizontalScrollIndicator={false}>
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
                      {new Date(Number(weatherdata.dt * 1000)).toDateString() +
                        '  '}
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
                      <Text style={styles.type}>
                        {weatherdata?.weather[0]?.main}
                      </Text>
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
                    <Text style={styles.infotext}>km/h</Text>
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
        </ScrollView>
        <View style={styles.header}>
          <TouchableOpacity>
            <Search width={24} height={24} fill={'white'} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Menu width={24} height={24} fill={'white'} />
          </TouchableOpacity>
        </View>
      </>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ActivityIndicator size={'large'} color="black" />
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
