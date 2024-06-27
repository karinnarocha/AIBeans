import React from 'react';
import { View, StyleSheet, Text, ActivityIndicator, Image, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image source={require('../static/aiBeans.png')} style={styles.image} />
        <Text style={styles.subtitle}>Your personal Sous Chef</Text>
      </View>
      <ActivityIndicator size="large" color="#ffcc80" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffcc80',
  },
  content: {
    alignItems: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: width * 0.07,
    color: '#fff',
    fontFamily: 'Avenir',
  },
  image: {
    width: width * 0.5,
    height: height * 0.3,
    resizeMode: 'contain',
  },
});

export default LoadingScreen;
