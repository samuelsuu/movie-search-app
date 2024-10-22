import React, { useContext } from 'react';
import { Text, StyleSheet, TouchableOpacity, Linking, Alert } from 'react-native';
import { ThemeContext } from '../models/ThemeContext'; // Assuming ThemeContext is in this directory

const WhatsAppLink = () => {
  const { isDarkMode } = useContext(ThemeContext);

  const openWhatsApp = () => {
    const phoneNumber = "+2349066106450"; // Replace with your WhatsApp number, include country code
    const url = `whatsapp://send?phone=${phoneNumber}`;

    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(url);
        } else {
          Alert.alert("WhatsApp not installed", "Please install WhatsApp to send a message.");
        }
      })
      .catch((err) => console.error('Error opening WhatsApp:', err));
  };

  return (
    <TouchableOpacity onPress={openWhatsApp}>
      <Text style={[styles.text, { color: isDarkMode ? "#FFF" : "#000" }]}>
        Created By SamuelSU - Contact me on WhatsApp
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    textDecorationLine: 'underline', // To underline the link
  },
});

export default WhatsAppLink;
