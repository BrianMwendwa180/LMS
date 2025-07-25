import React from 'react'
import assets from '../../assets/assets.js'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'

const SearchBar = ({data, onInputChange, searchResults}) => {
  const navigate = useNavigate()
  const [input, setInput] = useState(data ? data : '')
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    setInput(data || '')
  }, [data])

  useEffect(() => {
    if(input && searchResults && searchResults.length > 0){
      setShowDropdown(true)
    } else {
      setShowDropdown(false)
    }
  }, [input, searchResults])

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const onSearchHandler = (e) => {
    e.preventDefault()
    if(input.trim()) {
      navigate('/course-list/' + input.trim())
    } else {
      navigate('/course-list')
    }
    if(input.trim() && searchResults && searchResults.length > 0){
      setShowDropdown(true)
    } else {
      setShowDropdown(false)
    }
  }

  const onChangeHandler = (e) => {
    setInput(e.target.value)
    if(onInputChange){
      onInputChange(e.target.value)
    }
  }

  const onSelectCourse = (courseId) => {
    navigate('/course/' + courseId)
    setShowDropdown(false)
    setInput('')
  }

  return (
    <div className='relative max-w-xl w-full'>
      <form onSubmit={onSearchHandler} className='w-full md:h-14 h-12 flex items-center bg-white
      border border-gray-500/20 rounded'>
        <input 
          onChange={onChangeHandler} 
          value={input}
          type="text" 
          placeholder='Search for courses' 
          className='w-full h-full outline-none text-gray-500/80 px-4 rounded-l'
        />
        <button 
          type='submit' 
          className='bg-blue-600 hover:bg-blue-700 rounded-r text-white md:px-10
          px-7 md:py-3 py-2 transition-colors duration-200'
        >
          Search
        </button>
      </form>
      
      {showDropdown && searchResults && searchResults.length > 0 && (
        <ul ref={dropdownRef} className='absolute z-10 w-full bg-white border border-gray-300 rounded mt-1 max-h-60 overflow-auto shadow-lg'>
          {searchResults.map((course) => (
            <li key={course._id} 
                className='px-4 py-2 cursor-pointer hover:bg-blue-100 transition-colors duration-150'
                onClick={() => onSelectCourse(course._id)}>
              <div className='flex flex-col'>
                <span className='font-medium text-gray-800'>
                  {course.courseTitle || course.title}
                </span>
                {course.instructor && (
                  <span className='text-sm text-gray-500'>
                    by {course.instructor}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SearchBar
