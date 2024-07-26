import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useLayoutEffect } from 'react';
import { EvilIcons } from '@expo/vector-icons';
import { useContext } from 'react';
import { CoursesContext } from '../store/coursesContext';
import CourseForm from '../components/CourseForm';
import { storeCourse } from '../helper/http';

export default function ManageCourse({ route, navigation }) {
  const coursesContext = useContext(CoursesContext);
  const courseId = route.params?.courseId;
  let isEditing = false;

  const selectedCourse = coursesContext.courses.find(
    (course) => course.id === courseId
  );

  if (courseId) {
    isEditing = true;
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Kursu Güncelle' : 'Kurs Ekle',
    });
  }, [navigation, isEditing]);

  function deleteCourse() {
    coursesContext.deleteCourse(courseId);
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  function addOrUpdateHandler(courseData) {
    if (isEditing) {
      coursesContext.updateCourse(courseId, courseData);
    } else {
      storeCourse(courseData);
      coursesContext.addCourse(courseData);
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <CourseForm
        buttonLabel={isEditing ? 'Güncelle' : 'Ekle'}
        onSubmit={addOrUpdateHandler}
        cancelHandler={cancelHandler}
        defaultValues={selectedCourse}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <EvilIcons
            name="trash"
            size={36}
            color="black"
            onPress={deleteCourse}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: '#f7f7f7', // Açık gri arka plan
  },
  deleteContainer: {
    alignItems: 'center',
    borderTopWidth: 2,
    borderTopColor: '#ff0050', // Canlı pembe
    paddingTop: 10,
    marginTop: 16,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  cancel: {
    backgroundColor: '#ff0050', // Canlı pembe
    minWidth: 120,
    marginRight: 10,
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  cancelText: {
    color: 'white',
    fontWeight: 'bold',
  },
  addOrDelete: {
    backgroundColor: '#4a90e2', // Canlı mavi
    minWidth: 120,
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  addOrDeleteText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
