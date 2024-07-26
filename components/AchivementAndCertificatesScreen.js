import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Modal, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Picker } from '@react-native-picker/picker';


const resimler = {
  başarı1: require('../assets/images/rozet1.png'),
  başarı2: require('../assets/images/rozet2.png'),
  sertifika1: require('../assets/images/sertifika1.png'),
  sertifika2: require('../assets/images/sertifika2.png'),
};


const veriler = [
  { id: '1', tür: 'Başarı', başlık: 'Başarı Rozeti 1', açıklama: 'Başarı rozetinizin açıklaması.', resim: 'başarı1' },
  { id: '2', tür: 'Başarı', başlık: 'Başarı Rozeti 2', açıklama: 'Başarı rozetinizin açıklaması.', resim: 'başarı2' },
  { id: '3', tür: 'Sertifika', başlık: 'Sertifika 1', açıklama: 'Sertifikanızın açıklaması.', resim: 'sertifika1' },
  { id: '4', tür: 'Sertifika', başlık: 'Sertifika 2', açıklama: 'Sertifikanızın açıklaması.', resim: 'sertifika2' },
];

export default function AchivementAndCertificatesScreen({ route, navigation }) {
  // Modal görünürlüğü ve seçili öğe durumunu yönetir
  const [modalVisible, setModalVisible] = useState(false);
  const [seciliItem, setSeciliItem] = useState(null);
  const [siralama, setSiralama] = useState('hepsi');

  // Modal'daki öğeyi seçme fonksiyonu
  const itemSec = (item) => {
    setSeciliItem(item);
    setModalVisible(true);
  };

  // Modal'ı kapatma fonksiyonu
  const modalKapat = () => {
    setModalVisible(false);
    setSeciliItem(null);
  };

  // Listeyi sıralama ve filtreleme fonksiyonu
  const siraliVeriler = () => {
    if (siralama === 'başarı') {
      return veriler.filter((item) => item.tür === 'Başarı');
    } else if (siralama === 'sertifika') {
      return veriler.filter((item) => item.tür === 'Sertifika');
    }
    return veriler;
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#FF6', 'white', 'royalblue']} // Geçişli arka plan renkleri
        style={styles.gradientBackground}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Başarılar ve Sertifikalar</Text>
          <Picker
            selectedValue={siralama}
            style={styles.picker}
            onValueChange={(itemValue) => setSiralama(itemValue)}
          >
            <Picker.Item label="Tüm Başarılar ve Sertifikalar" value="hepsi" />
            <Picker.Item label="Başarılar" value="başarı" />
            <Picker.Item label="Sertifikalar" value="sertifika" />
          </Picker>
        </View>
        <FlatList
          data={siraliVeriler()} // Listeyi sıralama ve filtreleme
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.itemContainer}
              onPress={() => itemSec(item)}
            >
              <LinearGradient
                colors={['#FF6', 'white', 'royalblue']} // Geçişli renkler
                style={styles.itemBackground}
              >
                <View style={styles.imageContainer}>
                  <Image source={resimler[item.resim]} style={styles.image} />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.itemTitle}>{item.başlık}</Text>
                  <Text style={styles.itemDescription}>{item.açıklama}</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          )}
        />
        <Modal
            visible={modalVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={modalKapat}
        >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {seciliItem && (
                <>
                    <Image source={resimler[seciliItem.resim]} style ={styles.modalImage}/>
                    <Text style={styles.modalTitle}>{seciliItem.başlık}</Text>
                    <Text style={styles.modalDescription}>{seciliItem.açıklama}</Text>
                    <TouchableOpacity onPress={modalKapat} style={styles.modalButton}>
                        <Text style={styles.modalButtonText}>Kapat</Text>
                    </TouchableOpacity>
                </>
            )}
          </View>
        </View>
        </Modal>
        </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradientBackground:{
        flex: 1,
    },
    header:{
        padding:16,
        alignItems:'center'
    },

    title:{
        fontSize:24,
        fontWeight:'bold',
        color:'#333',
        marginBottom:16,
    },
    picker:{
        width:'100%',
        height:50,
    },
    itemContainer:{
        margin:10,
        borderRadius:10,
        overflow:'hidden'
    },
    itemBackground:{
        flexDirection:'row',
        alignItems:'center',
        padding:16,
        borderRadius:10,
        elevation:4,
    },
    imageContainer:{
        marginRight:10,
    },
    image:{
        width:50,
        height:50,
    },
    textContainer:{
        flex:1,
    },
    itemTitle:{
        fontSize:18,
        fontWeight:'bold',
        color:'#333'
    },

    itemDescription:{
        fontSize:15,
        color:'#666'
    },
    modalContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent:{
       width: '80%',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalImage:{
        width:100,
        height:100,
        marginBottom:20
    },
    modalTitle:{
        fontSize:24,
        fontWeight:'bold',
        color:'#333',
        marginBottom:20
    },
    modalDescription:{
        fontSize:16,
        color:'#666',
        textAlign:'center',
        marginBottom:20,
    },
    modalButton:{
        backgroundColor:'#3F51B5',
        padding:10,
        borderRadius:60,
    },
    modalButtonText:{
        color:'#fff',
        fontWeight:'bold'
    },
});