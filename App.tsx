
import axios from 'axios';
import React, { useState } from 'react';
import { View, TextInput, Button,Alert } from 'react-native';

const App = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup 
 = async () => {
    try {
      const response = await axios.post('http://10.0.2.2:3000/signup',   
 { // Ensure correct URL
        username,
        email,
        password,
      });

      // const data = await response.json();
      const data = response.data;

      if (response.status === 200) //0k
      
      {
        // Handle successful signup 
        console.log('Signup successful:', data);
        Alert.alert('Success', 'User registered successfully');

        // Navigate to the next screen or show a success message
      } else {
        // Handle error response
        console.error('Signup failed:', data.error);
        Alert.alert('Error', 'Something went wrong. Please try again.');

        // Display an error message to the user
      }
    } catch (error) {
      console.error('Error:', error.message);
      Alert.alert('Error', 'Something went wrong. Please try again.');
      // Display an error message to the user
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}   
 
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Signup" onPress={handleSignup} />
    </View>
  );
};

export default 
 App;