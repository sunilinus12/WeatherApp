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

import GetLocation from 'react-native-get-location';

export default function App() {
  const [weatherdata, setWeatherData] = useState([]);

  const [loading, setLoading] = useState(true);

  const getData = (lat, lon) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=af22973bbc6329c2bc4873b13ed89a61`,
    )
      .then(res => res.json())
      .then(data => {
        setWeatherData(data);
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

  if (weatherdata && !loading) {
    return (
      <>
        <StatusBar barStyle={'light-content'} />

        <ScrollView showsHorizontalScrollIndicator={false}>
          <Card weatherdata={weatherdata} />
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
    <View style={styles.center}>
      <ActivityIndicator size={'large'} color="black" />
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
