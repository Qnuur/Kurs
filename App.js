import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import CoursesContextProvider from './store/coursesContext';
import ManageCourse from './screens/ManageCourse';
import RecentCourses from './screens/RecentCourses';
import AllCourses from './screens/AllCourses';
import ProfileScreen from './screens/ProfileScreen';
import UpdateProfile from './components/UpdateProfile';
import AchivementAndCertificatesScreen from './components/AchivementAndCertificatesScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function CourseOverview() {
  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: 'transparent', // Header arka planı geçişli olacak
          shadowColor: 'transparent',
        },
        headerTintColor: 'black', //  yazı rengi
        tabBarStyle: {
          backgroundColor: 'transparent',
          shadowColor: 'transparent',
        },
        tabBarActiveTintColor: '#00BFFF', // Açık mavi
        tabBarInactiveTintColor: 'black', 
        tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' },
        tabBarBackground: () => (
          <LinearGradient
            colors={['#1E90FF', '#4682B4', '#B0C4DE']} // Derin mavi, çelik mavi, açık mavi geçişi
            style={styles.tabBarBackground}
          />
        ),
        headerRight: () => (
          <Pressable
            style={({ pressed }) => pressed && styles.pressed}
            onPress={() => {
              navigation.navigate('ManageCourse');
            }}
          >
            <View style={styles.iconContainer}>
              <AntDesign name="plus" size={24} color="black" />
            </View>
          </Pressable>
        ),
      })}
    >
      <Tab.Screen 
        name="RecentCourses" 
        component={RecentCourses} 
        options={{
          title: 'Yakın Zamanda Kaydolunanlar',
          tabBarLabel: 'Yakın Zamanda',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="hourglass" size={size} color={color} />
          ),
        }} 
      />
      <Tab.Screen 
        name="AllCourses" 
        component={AllCourses}  
        options={{
          title: 'Tüm Kurslar',
          tabBarLabel: 'Tüm Kurslar',
          tabBarIcon: ({ color, size }) => (
            <Feather name="list" size={size} color={color} />
          ),
        }}     
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          title: 'Profilim',
          tabBarLabel: 'Profil',
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <CoursesContextProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="CourseOverview"
            component={CourseOverview}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="ManageCourse" component={ManageCourse} />
          <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
          <Stack.Screen name="AchivementAndCertificatesScreen" component={AchivementAndCertificatesScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </CoursesContextProvider>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.5,
  },
  iconContainer: {
    marginHorizontal: 8,
    marginVertical: 2,
  },
  tabBarBackground: {
    flex: 1,
  },
});
