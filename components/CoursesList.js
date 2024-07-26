import { StyleSheet, Text, View,FlatList } from 'react-native'
import React from 'react'
import CoursesItem from './CoursesItem'

function renderCourseItem(itemData){
  return <CoursesItem{...itemData.item}/>
  // itemData.item içindeki tüm verileri CoursesItem bileşenine prop olarak geçirir
}

export default function CoursesList({courses}) {
  return (
   <FlatList
  data={courses} 
  // FlatList'e verilecek veri dizisi, burada courses dizisi
  keyExtractor={(item) => item.id} 
  // Her bir öğe için benzersiz bir anahtar belirlemek amacıyla kullanılır, burada öğenin id'si kullanılır
  renderItem={renderCourseItem} 
  // Her bir öğeyi nasıl render edeceğini belirten işlev, burada renderCourseItem işlevi kullanılır
/>

  )
}

const styles = StyleSheet.create({})