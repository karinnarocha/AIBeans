import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
} from 'react-native';

const foodOptions = [
  // Fruits and Vegetables
  {
    title: 'Fruits',
    items: [
      { label: '🍎', value: 'Apples' },
      { label: '🍌', value: 'Bananas' },
      { label: '🍋', value: 'Lemon' },
      { label: '🍅', value: 'Tomatoes' },
      { label: '🍓', value: 'Strawberries' },
      { label: '🥭', value: 'Mango' },
    ],
  },
  // Vegetables
  {
    title: 'Vegetables',
    items: [
      { label: '🥕', value: 'Carrots' },
      { label: '🍆', value: 'Eggplant' },
      { label: '🥦', value: 'Broccoli' },
      { label: '🌶️', value: 'Peppers' },
      { label: '🧅', value: 'Onions' },
      { label: '🧄', value: 'Garlic' },
    ],
  },
  // Meat and Protein
  {
    title: 'Protein',
    items: [
      { label: '🍗', value: 'Chicken' },
      { label: '🥩', value: 'Beef' },
      { label: '🐟', value: 'Fish' },
      { label: '🐖', value: 'Pork' },
      { label: '🥓', value: 'Bacon' },
      { label: '🍖', value: 'Ribs' },
    ],
  },
  // Grains and Breads
  {
    title: 'Carbohydrate',
    items: [
      { label: '🍞', value: 'Bread' },
      { label: '🍚', value: 'Rice' },
      { label: '🍝', value: 'Pasta' },
      { label: '🥯', value: 'Bagel' },
      { label: '🥔', value: 'Potatoes' },
      { label: '🥐', value: 'Croissant' },
    ],
  },
  // Dairy and Refrigerated Items
  {
    title: 'Dairy',
    items: [
      { label: '🥛', value: 'Milk' },
      { label: '🥚', value: 'Eggs' },
      { label: '🧈', value: 'Butter' },
      { label: '🧀', value: 'Cheese' },
      { label: '🍫', value: 'Chocolate' },
      { label: '🍨', value: 'Ice Cream' },
    ],
  },
  // Complements
  {
    title: 'Complements',
    items: [
      { label: '🍺', value: 'Beer' },
      { label: '🍷', value: 'Wine' },
      { label: '🧂', value: 'Salt' },
      { label: '🥫', value: 'Tomato Sauce' },
      { label: '🍯', value: 'Honey' },
      { label: '🥜', value: 'Peanut butter' },
    ],
  },
];

const culinaryOptions = [
  { label: 'Amateur', prompt: "I do not have a lot of experience cooking, give me a not a complicated recipe..." },
  { label: 'Home Cook', prompt: "I do have some experience cooking, make me a recipe..." },
  { label: 'Expert', prompt: "I am a professional Chef, provide me an fancy recipe..." },
];

const MainPage = ({ navigation }) => {
  const [inputText, setInputText] = useState('');
  const [selectedFood, setSelectedFood] = useState([]);
  const [selectedCulinaryLevel, setSelectedCulinaryLevel] = useState('');

  const handleFoodToggle = (food) => {
    if (selectedFood.includes(food)) {
      setSelectedFood(selectedFood.filter((item) => item !== food));
    } else {
      setSelectedFood([...selectedFood, food]);
    }
  };

  const handleCulinaryLevelToggle = (level) => {
    setSelectedCulinaryLevel(level);
  };

  const handleSubmit = () => {
    const prompt = culinaryOptions.find((option) => option.label === selectedCulinaryLevel)?.prompt;
    const selectedFoodText = selectedFood.join(' ');
    const completeInputText = `${prompt} ${selectedFoodText} ${inputText}`;
    navigation.navigate('GPTResponse', { inputText: completeInputText });
  };

  return (
    <ImageBackground source={require('../static/fruits.jpg')} style={styles.backgroundImage}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <View>
            <Text style={styles.title}>AIBeans</Text>
            <Text style={styles.description}>Provide me the ingredients that you want to use:</Text>
            <View style={styles.borderContainer}>
              {foodOptions.map((category, index) => (
                <View key={index}>
                  <Text style={styles.categoryTitle}>{category.title}</Text>
                  <View style={styles.emojiContainer}>
                    {category.items.map((food, foodIndex) => (
                      <TouchableOpacity
                        key={foodIndex}
                        style={[
                          styles.emojiButton,
                          selectedFood.includes(food.value) && styles.selectedEmojiButton,
                        ]}
                        onPress={() => handleFoodToggle(food.value)}
                      >
                        <Text style={styles.emojiLabel}>{food.label}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              ))}
            </View>
            <View style={styles.separator} />
            <View>
              <Text style={[styles.textAlign, styles.description]}>Culinary Level:</Text>
              <View style={styles.culinaryLevelContainer}>
                {culinaryOptions.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.culinaryLevelButton,
                      selectedCulinaryLevel === option.label && styles.selectedCulinaryLevelButton,
                    ]}
                    onPress={() => handleCulinaryLevelToggle(option.label)}
                  >
                    <Text style={styles.culinaryLevelLabel}>{option.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  onChangeText={(text) => setInputText(text)}
                  value={inputText}
                  placeholder="Type extra ingredients or details!"
                  multiline
                />
                <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
                  <Text style={styles.submitButtonText}>Let's Start!</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{ height: 100 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 50,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    marginBottom: 20, 
    marginTop: 100,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',

  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    padding: 5,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  image: {
    width: 90,
    height: 110,
    marginBottom: 15,
    marginTop: 15,
  },
  description: {
    fontSize: 20,
    marginBottom: 25,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  borderContainer: {
    borderWidth: 1.5,
    borderColor: '#ccc',
    borderRadius: 25,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  separator: {
    height: 20,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    fontFamily: 'Tahoma',
  },
  culinaryLevelTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
    textAlign: 'center',
    fontFamily: 'Tahoma',
  },
  emojiContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  emojiButton: {
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginHorizontal: 4,
    marginVertical: 8,
    backgroundColor: '#fff',
  },
  selectedEmojiButton: {
    backgroundColor: '#e0e0e0',
  },
  emojiLabel: {
    fontSize: 45,
  },
  inputContainer: {
    marginHorizontal: 10,
    marginBottom: 20,
  },
  input: {
    height: 60,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
    textAlign: 'center',
    fontFamily: 'Tahoma',
    borderRadius: 30,
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  submitButton: {
    borderRadius: 20,
    backgroundColor: '#f2ae72',
    textAlign: 'center',
    height: 50,
    width: 250,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    fontFamily: 'Avenir',
  },
  submitButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffff',
    fontFamily: 'Avenir',
  },
  culinaryLevelContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  culinaryLevelButton: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginHorizontal: 4,
    marginVertical: 8,
    backgroundColor: '#ffff',
    minWidth: 90,
  },
  selectedCulinaryLevelButton: {
    backgroundColor: '#ffcc80',
  },
  culinaryLevelLabel: {
    fontSize: 16,
    fontFamily: 'Tahoma',
  },
});

export default MainPage;
