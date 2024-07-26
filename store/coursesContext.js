import { createContext, useReducer } from 'react';

// Başlangıçta kullanılan örnek kurs verileri
const COURSES = [
  {
    id: '1',
    description: 'C Programlama',
    amount: 69,
    date: new Date('2023-01-05'),
  },
  {
    id: '2',
    description: 'C# Programlama',
    amount: 69,
    date: new Date('2023-04-10'),
  },
  {
    id: '3',
    description: 'Angular',
    amount: 69,
    date: new Date('2022-12-08'),
  },
  {
    id: '4',
    description: 'Bootstrap 5',
    amount: 69,
    date: new Date('2022-10-10'),
  },
  {
    id: '5',
    description: 'React Js',
    amount: 69,
    date: new Date('2023-05-20'),
  },
  {
    id: '6',
    description: 'React Native',
    amount: 69,
    date: new Date('2023-07-30'),
  },
  {
    id: '7',
    description: 'Javascript',
    amount: 69,
    date: new Date('2023-06-12'),
  },
  {
    id: '8',
    description: 'Komple Web',
    amount: 69,
    date: new Date('2021-10-22'),
  },
  {
    id: '9',
    description: 'Frontend',
    amount: 69,
    date: new Date('2022-11-25'),
  },
];

// CoursesContext oluşturuluyor ve varsayılan değerler tanımlanıyor
export const CoursesContext = createContext({
  courses: [], // Kurslar listesi
  addCourse: ({ description, amount, date }) => {}, // Yeni kurs ekleme fonksiyonu
  deleteCourse: (id) => {}, // Kurs silme fonksiyonu
  updateCourse: (id, { description, amount, date }) => {}, // Kurs güncelleme fonksiyonu
});

// Reducer fonksiyonu, durum güncellemeleri için kullanılır
function coursesReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      // Yeni bir kurs ekleme
      // { ...action.payload, id: id } ifadesi: action.payload içindeki tüm verileri alır
      // ve üzerine yeni bir id özelliği ekler. Bu yeni kurs nesnesidir.
      // [ ...state ] ifadesi: mevcut state dizisinin tüm öğelerini yeni bir diziye kopyalar.
      // Bu yeni kursu mevcut kursların başına ekler.
      const id = new Date().toString() + Math.random().toString(); // Otomatik ID oluştur
      return [{ ...action.payload, id: id }, ...state];
      
    case 'DELETE':
      // Belirtilen ID'ye sahip kursu silme
      // action.payload içindeki ID'ye sahip olan kursu listeden çıkarır
      return state.filter((course) => course.id !== action.payload);
      
    case 'UPDATE':
      // Belirtilen ID'ye sahip kursu güncelleme
      const updatableCourseIndex = state.findIndex(
        (course) => course.id === action.payload.id
      ); // Güncellenebilir kursun indeksini bul
      const updatableCourse = state[updatableCourseIndex]; // Güncellenebilir kursu al
      const updatedItem = { ...updatableCourse, ...action.payload.data }; // Güncellenmiş kurs nesnesini oluştur
      const updatedCourses = [...state]; // Mevcut state dizisini kopyala
      updatedCourses[updatableCourseIndex] = updatedItem; // Güncellenmiş kursu mevcut diziye ekle
      return updatedCourses;
      
    default:
      return state;
  }
}

// CoursesContextProvider bileşeni, context sağlayıcı olarak kullanılır
function CoursesContextProvider({ children }) {
  // useReducer ile durum yönetimi yapılıyor
  // coursesReducer, action türüne göre durumu günceller
  // COURSES, başlangıç durumu olarak verilir
  const [coursesState, dispatch] = useReducer(coursesReducer, COURSES);

  // Yeni kurs ekleme fonksiyonu
  function addCourse(courseData) {
    dispatch({ type: 'ADD', payload: courseData });
  }

  // Kurs silme fonksiyonu
  function deleteCourse(id) {
    dispatch({ type: 'DELETE', payload: id });
  }

  // Kurs güncelleme fonksiyonu
  function updateCourse(id, courseData) {
    dispatch({ type: 'UPDATE', payload: { id: id, data: courseData } });
  }

  // Context değerini sağlayan nesne
  const value = {
    courses: coursesState,
    addCourse: addCourse,
    deleteCourse: deleteCourse,
    updateCourse: updateCourse,
  };

  // Context.Provider ile değer sağlanıyor
  return (
    <CoursesContext.Provider value={value}>{children}</CoursesContext.Provider>
  );
}

export default CoursesContextProvider;