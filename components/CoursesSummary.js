import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

export default function CoursesSummary({ periodName, courses }) {

    const coursesSum = courses.reduce((sum, course) => {
        return sum + course.amount; 
        // Her bir kursun 'amount' (miktar) değerini toplar ve birikimli toplamı günceller
    }, 0); 
    // Başlangıç değeri olarak 0 kullanılır. Bu, toplamın hesaplanmaya başlamadan önceki başlangıç değeri olarak belirlenir

    return (
        <LinearGradient
            colors={['royalblue','black', ]} // Kırmızı, pembe ve mor gradient
            style={styles.container}
        >
            <View>
                <Text style={styles.title}>{periodName}</Text>
                <Text style={styles.cost}>{coursesSum + ' TL'}</Text>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderRadius: 15,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    title: {
        color: 'yellow',
        fontSize: 18,
        fontWeight: 'bold',
    },
    cost: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    }
});
