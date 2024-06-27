import React, { useEffect, useState, useRef } from 'react';
import { View, ImageBackground, Text, StyleSheet, ActivityIndicator, TextInput, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, ScrollView, Modal, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import CameraButton from '../components/CameraButton';

const API_URL = '***';

const GPTResponse = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [responseText, setResponseText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [adjustedRecipe, setAdjustedRecipe] = useState('');
  const [adjustedRecipeText, setAdjustedRecipeText] = useState('');
  const [recipeTitle, setRecipeTitle] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const scrollViewRef = useRef();

  useEffect(() => {
    const inputText = route.params.inputText;

    fetch(`${API_URL}/generaterecipe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input_text: inputText,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setResponseText(responseJson.output_text);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
        Alert.alert('Error', 'Failed to fetch recipe. Please try again later.');
      });
  }, [route.params.inputText]);

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [responseText, adjustedRecipeText]);

  const handleAdjustRecipe = () => {
    const inputText = `${responseText} Adjusted: ${adjustedRecipe}`;
    setIsLoading(true);

    fetch(`${API_URL}/generaterecipe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input_text: inputText,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setAdjustedRecipeText(responseJson.output_text);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
        Alert.alert('Error', 'Failed to adjust recipe. Please try again later.');
      });
  };

  const saveRecipe = async () => {
    try {
      const recipe = {
        title: recipeTitle,
        text: responseText,
        user: user_ID,
      };

      await fetch(`${API_URL}/saverecipe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipe),
      });

      Alert.alert('Success', 'Recipe saved successfully!');
      navigation.navigate('UserRecipes');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to save recipe.');
    }
  };

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <ImageBackground source={require('../static/fruits.jpg')} style={styles.backgroundImage}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('MainPage')}>
            <Text style={styles.homeEmoji}>🏠</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.borderContainer}>
            <ScrollView
              ref={scrollViewRef}
              style={styles.scrollView}
              contentContainerStyle={styles.scrollContentContainer}
              keyboardShouldPersistTaps="handled"
            >
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View>
                  <View style={styles.recipeContainer}>
                    <View style={styles.loadingContainer}>
                      <Text style={styles.title}>Cooking time!</Text>
                      {isLoading ? (
                        <ActivityIndicator size="large" color="#0000ff" />
                      ) : (
                        <Text style={styles.recipeText}>{responseText}</Text>
                      )}
                    </View>
                  </View>
                  {adjustedRecipeText !== '' && (
                    <View style={styles.recipeContainer}>
                      <Text style={styles.title}>I hope you like this better!</Text>
                      <View style={styles.loadingContainer}>
                        {isLoading ? (
                          <ActivityIndicator size="large" color="#0000ff" />
                        ) : (
                          <Text style={styles.recipeText}>{adjustedRecipeText}</Text>
                        )}
                      </View>
                    </View>
                  )}
                </View>
              </TouchableWithoutFeedback>          
            </ScrollView>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                onChangeText={(text) => setAdjustedRecipe(text)}
                value={adjustedRecipe}
                placeholder='Any idea of what I can change in this recipe? How can I add this(these) ingredients on the recipe? How can I replace...'
                multiline
              />
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleAdjustRecipe} style={styles.submitButton}>
                  <Text style={styles.submitButtonText}>Adjustment Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top:50,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch' to fit the entire screen
  },
  header: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 1,
  },
  homeEmoji: {
    fontSize: 30,
  },
  contentContainer: {
    flex: 1,
    padding: 16,
    marginTop: 60,
  },
  borderContainer: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: '#ccc',
    borderRadius: 25,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Add a slight background color for readability
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContentContainer: {
    paddingBottom: 20,
  },
  recipeContainer: {
    justifyContent: 'center',
    marginBottom: 16,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 16,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 23,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    fontFamily: 'Tahoma',
  },
  recipeText: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'Tahoma',
  },
  input: {
    width: '100%',
    height: 100,
    borderWidth: 1,
    borderRadius: 30,
    marginBottom: 10,
    paddingHorizontal: 8,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: 'Tahoma',
  },
  submitButton: {
    borderRadius: 20,
    backgroundColor: '#f2ae72',
    textAlign: 'center',
    height: 50,
    width: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'Avenir',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    minWidth: 300,
  },
  titleInput: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: '#f2ae72',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  saveButtonModal: {
    backgroundColor: '#f2ae72',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default GPTResponse;
