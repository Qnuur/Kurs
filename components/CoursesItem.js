import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { getFormattedDate } from '../helper/date';
import { useNavigation } from '@react-navigation/native';

export default function CourseItem({ amount, date, description, id }) {
  const navigation = useNavigation();

  function coursePress() {
    navigation.navigate('ManageCourse', {
      courseId: id,
    });
  }

  return (
    <Pressable onPress={coursePress}>
      <LinearGradient
        colors={['#ff6f61', '#d8356e', '#8e44ad']} // Kırmızı, pembe ve mor gradient
        style={styles.courseContainer}
      >
        <View style={styles.textContainer}>
          <Text style={styles.description}>{description}</Text>
          <Text style={styles.date}>{getFormattedDate(date)}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{amount}</Text>
        </View>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  courseContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
    padding: 16,
    borderRadius: 15,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: 10,
  },
  description: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff', // Beyaz renk
    marginBottom: 4,
    textShadowColor: '#000', // Siyah gölge
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  date: {
    fontSize: 14,
    color: '#f1f1f1', // Çok açık gri
  },
  priceContainer: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  price: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#d8356e', // Pembe renk
  },
});
