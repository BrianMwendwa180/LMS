import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import SearchBar from '../../components/student/SearchBar'
import { useParams } from 'react-router-dom'
import CourseCard from '../../components/student/CourseCard'
import crossIcon from '../../assets/cross_icon.png'
import Footer from '../../components/student/Footer'

const CoursesList = () => {
  
  const {navigate, allCourses}  = useContext(AppContext)
  const {input: inputParam} = useParams()
  const [input, setInput] = useState(inputParam || '')
  const [filteredCourse, setFilteredCourse] = useState([])

  useEffect(()=>{
     if(allCourses && allCourses.length > 0){
      const tempCourses = allCourses.slice()

      input ?
          setFilteredCourse(
           tempCourses.filter(
            item => item.courseTitle?.includes(input)
           )

          )
      : setFilteredCourse(tempCourses)
     }
  },[allCourses, input])

  // Sync input state with URL param changes
  useEffect(() => {
    setInput(inputParam || '')
  }, [inputParam])

  const onInputChange = (value) => {
    setInput(value)
  }

  const onClearSearch = () => {
    setInput('')
    navigate('/course-list')
  }

  return (
   <>
   <div className='relative md:px-36 px-4 pt-20 text-left'>
    <div className='flex md:flex-row flex-col gap-6 items-start justify-between
    w-full'>
      <div>
         <h1 className='text-4xl font-semibold text-gray-800'>Course List</h1>
      <p className='text-gray-500'>
        <span className='text-blue-600 cursor-pointer'
        onClick={()=> navigate('/')}>Home</span> / <span>Course List</span>
      </p>
      </div>
      <div className='w-full md:w-auto'>
        <SearchBar data={input} onInputChange={onInputChange} searchResults={filteredCourse} />
      </div>
    </div>
    { input && <div className='inline-flex flex-wrap items-center gap-4 px-4 py-2 border mt-8 -mb-8 text-gray-600'>
      <p className='truncate max-w-xs'>{input}</p>
      <img src={crossIcon} alt='' className='cursor-pointer w-5 h-5' onClick={onClearSearch}/>
      
      </div>
    }
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
    my-16 gap-4 px-2 md:px-0'>
      {filteredCourse.map((course, index)=> <CourseCard key={index} course=
      {course} highlightTerm={input} />
    )}
    </div>
   </div>
   <Footer />
   
   </>
  )
}

export default CoursesList
