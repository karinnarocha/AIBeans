import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoadingScreen from './components/Loadingscreen';
import NavBar from './components/CustomHeader'; 
import MainPage from './components/Mainpage';
import GPTResponse from './components/GPTResponse';

const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainPage" screenOptions={{ header: (props) => <NavBar {...props} /> }}>
        <Stack.Screen name="MainPage" component={MainPage} />
        <Stack.Screen name="GPTResponse" component={GPTResponse} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
