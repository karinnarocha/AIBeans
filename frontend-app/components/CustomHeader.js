import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function NavBar() {
  const navigation = useNavigation();

  return (
    <Appbar.Header style={styles.header}>
      <TouchableOpacity onPress={() => navigation.navigate('MainPage')}>
        <Text style={styles.title}>Menu</Text>
      </TouchableOpacity>
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 50,
    backgroundColor: '#f2ae72',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10,
    fontFamily: 'Avenir',
  },
});
