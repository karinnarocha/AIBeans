import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { GPT_URL } from '@env';

const GPTApiCall = (inputText) => {
  const [responseText, setResponseText] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (inputText) {
      console.log(`Making API call to: ${GPT_URL}/generaterecipe with input: ${inputText}`);
      fetch(`${GPT_URL}/generaterecipe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input_text: inputText }),
      })
        .then((response) => {
          console.log('API response received:', response);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((responseJson) => {
          console.log('Parsed response JSON:', responseJson);
          setResponseText(responseJson.output_text);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('API call error:', error);
          setIsLoading(false);
          Alert.alert('Error', 'Failed to fetch recipe. Please try again later.');
        });
    }
  }, [inputText]);

  return { responseText, isLoading };
};

export default GPTApiCall;
