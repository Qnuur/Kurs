import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getData } from '../components/firebaseApi'; // Bu satırı doğru dosya yolu ile düzeltin

export default function ProfileScreen({ route, navigation }) {
    const [profileData, setProfileData] = useState({});
    const [loading, setLoading] = useState(true);

    // Verileri almak
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getData('Profile');
                setProfileData(data);
            } catch (error) {
                console.error("Profil verisi yükleme hatası:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData(); // Use fetchData to initiate data fetching
    }, []);

    if (loading) {
        return <Text>Yükleniyor... </Text>;
    }

    const { name, username, email, bio } = profileData; // Use profileData to get values

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.profileHeader}>
                <Image 
                    source={require('../assets/images/avatar-659651.png')} 
                    style={styles.profileImage} 
                />
                <TouchableOpacity 
                    style={styles.editButton} 
                    onPress={() => {/* Handle profile image change */}}
                >
                    <Text style={styles.editButtonText}>Resmi Değiştir</Text>
                </TouchableOpacity>
            </View>

            <LinearGradient 
                colors={['#0033A0', '#001F5C']} 
                style={styles.headingContainer}
            >
                <Text style={styles.heading}>Profil Bilgileri</Text>
            </LinearGradient>
            <View style={styles.infoContainer}>
                <Text style={styles.label}>İsim ve Soyisim:</Text>
                <Text style={styles.info}>{name}</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.label}>Kullanıcı Adı:</Text>
                <Text style={styles.info}>{username}</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.label}>E-posta:</Text>
                <Text style={styles.info}>{email}</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.label}>Bio:</Text>
                <Text style={styles.info}>{bio}</Text>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => navigation.navigate('UpdateProfile', {
                        name,
                        username,
                        email,
                        bio,
                    })}
                >
                    <Text style={styles.buttonText1}>Güncelle</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => navigation.navigate('AchivementAndCertificatesScreen')}
                >
                    <Text style={styles.buttonText}>Başarılar ve Sertifikalar</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 15,
        backgroundColor: '#F5F5F5',
    },
    profileHeader: {
        alignItems: 'center',
        marginBottom: 25,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 4,
        borderColor: '#FFD700',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
    },
    editButton: {
        marginTop: 10,
        paddingVertical: 5,
        paddingHorizontal: 20,
        backgroundColor: '#FFD700',
    },
    editButtonText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 14,
    },
    headingContainer: {
        borderRadius: 10,
        marginBottom: 20,
        paddingVertical: 10,
        alignItems: 'center',
    },
    heading: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FFF',
        textAlign: 'center',
    },
    infoContainer: {
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#0033A0',
        padding: 10,
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    label: {
        fontSize: 14,
        color: '#0033A0',
        marginBottom: 5,
    },
    info: {
        fontSize: 14,
        fontWeight: '500',
        color: '#000',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
    },
    button: {
        flex: 1,
        marginHorizontal: 5,
        padding: 10,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#FFD700',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        alignItems: 'center',
        backgroundColor: '#0033A0',
    },
    buttonText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#FFD700',
    },
    buttonText1: {
        fontSize: 14,
        fontWeight: '600',
        color: '#FFD700',
        textTransform: 'uppercase',
        marginVertical: 5,
    },
});
