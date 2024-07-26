import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { updateDate } from '../components/firebaseApi'; // Bu yolu kontrol edin


export default function UpdateProfile({ route, navigation }) {
  const [name, setName] = useState(route.params?.name || '');
  const [username, setUsername] = useState(route.params?.username || '');
  const [email, setEmail] = useState(route.params?.email || '');
  const [bio, setBio] = useState(route.params?.bio || '');

  const handleSave = async () => {
    try {
      // Veriyi Firebase Realtime Database'e güncelle
      await updateDate('Profile', { name, username, email, bio });
      
      // Bilgileri ProfileScreen'e gönder
      navigation.navigate('ProfileScreen', {
        name,
        username,
        email,
        bio,
      });
    } catch (error) {
      console.error("Profil güncelleme hatası:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <LinearGradient
      colors={['#8e44ad', '#3498db']} // Mor ve mavi gradient arka plan
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.heading}>Profil Bilgilerini Güncelle</Text>
        
        <Text style={styles.label}>İsim ve Soyisim</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="İsim ve Soyisim"
          placeholderTextColor="#ddd"
        />

        <Text style={styles.label}>Kullanıcı Adı</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="Kullanıcı Adı"
          placeholderTextColor="#ddd"
        />

        <Text style={styles.label}>E-posta Adresi</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholder="E-posta Adresi"
          placeholderTextColor="#ddd"
        />

        <Text style={styles.label}>Bio</Text>
        <TextInput
          style={styles.input}
          value={bio}
          onChangeText={setBio}
          multiline
          placeholder="Kısa Bio"
          placeholderTextColor="#ddd"
        />

        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Kaydet</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 16,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#fff',
    marginVertical: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    color: '#333',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#e74c3c',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});
