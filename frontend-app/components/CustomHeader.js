// components/CustomHeader.js
import React from 'react';
import {StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function NavBar() {
  const navigation = useNavigation();

  return (
    <Appbar.Header style={styles.header}>
      <TouchableOpacity onPress={() => navigation.navigate('MainPage')}>
        <Text style={styles.homeEmoji}>🏠</Text>
      </TouchableOpacity>
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 50,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    elevation: 0,
  },
  homeEmoji: {
    fontSize: 20,
  },
});
