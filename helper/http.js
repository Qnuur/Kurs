import axios from "axios";

const url = 'https://react-native-b8064-default-rtdb.firebaseio.com/'


export function storeCourse(courseData){
    axios.post(url + '/courses.json',courseData)
}

export  async function getCourses(){
    const response = await axios.get(url+ '/courses.json');

    const courses = [];

    for (const key in response.data ){

        const coursesObj =  {
            id : key,
            amount:response.data[key].amount,
            date:new Date(response.data[key].date),
            description: response.data[key].amount,
        }
        courses.push(coursesObj)
    }
    return courses;
       
}