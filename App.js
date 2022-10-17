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

export default function App() {
  const {width, height} = useWindowDimensions();
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
            source={require('./assets/night2.jpg')}></ImageBackground>
        </View>
        <View style={{width: width, height: height}}>
          <ImageBackground
            style={{flex: 1}}
            source={require('./assets/rainy.jpg')}></ImageBackground>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({});
