import React from 'react';
import { View, StyleSheet, Text, ActivityIndicator,Image } from 'react-native';

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
  title: {
    fontSize: 38,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily:'Avenir',
  },
  subtitle: {
    fontSize: 28,
    color: '#fff',
    fontFamily:'Avenir',
  },
  image: {
    width: 200,
    height: 230,
    marginBottom: 15,
    marginTop: 15,
  },
});

export default LoadingScreen;
