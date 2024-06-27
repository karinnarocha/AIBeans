import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoadingScreen from './components/LoadingScreen';
import MainPage from './components/MainPage';
import GPTResponse from './components/GPTResponse';
import GPTApiCall from './hooks/GPTApiCall'; // Ensure this path is correct

const Stack = createNativeStackNavigator();

const useLoading = (duration) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return isLoading;
};

export default function App() {
  const isLoading = useLoading(3000);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="MainPage"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="MainPage" component={MainPage} />
          <Stack.Screen name="GPTResponse" component={GPTResponse} />
          <Stack.Screen name="GPTApiCall" component={GPTApiCall} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
