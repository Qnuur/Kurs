import React from 'react';
import { StyleSheet, Text, View, TextInput, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function Input({ label, textInputConfig, style,invalid }) {
    const inputStyles = [styles.input];

    if (textInputConfig && textInputConfig.multiline) {
        inputStyles.push(styles.inputMultiline);
    }
    if (invalid) {
    inputStyles.push(styles.invalidInput);
  }

    return (
        <View style={[styles.inputContainer, style]}>
           <Text style={[styles.label, invalid && styles.invalidLabel]}>
              {label}
            </Text>
            <LinearGradient
                colors={['purple','purple','white']} // Kırmızı ve mor gradient
                style={styles.gradientBackground}
            >
                <TextInput style={inputStyles} {...textInputConfig} />
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 20,
    borderWidth:4,
    borderRadius:16,
    
  },
  label: {
    fontSize: 19,
    fontWeight:'600',
    textTransform:'capitalize',
    color:'royalblue'

  },
  gradientBackground: {
        width: '100%',
        borderRadius: 15,
        padding:12 , // Kenar boşluğu eklenir
  },

  input: {
    padding: 16,
    borderRadius: 10,
    fontSize: 15,
    width:'100%',
    backgroundColor:'white',
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: 'top',
    paddingTop:12
  },
  invalidLabel: {
    color: 'red',
  },
  invalidInput: {
    backgroundColor: 'red',
  },
});



