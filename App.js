import {
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import React from 'react';
import Locations from './utils/Locations';

export default function App() {
  const {width, height} = useWindowDimensions();

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
        showsHorizontalScrollIndicator={false}>
        {Locations.map((item, key) => {
          let bgimg = handleBackImg(item.weatherType);
          console.log(bgimg);
          return (
            <View key={key} style={{width: width, height: height}}>
              <ImageBackground
                style={{flex: 1}}
                source={bgimg}></ImageBackground>
            </View>
          );
        })}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({});
