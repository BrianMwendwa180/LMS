import React, { useEffect, useRef, useState } from 'react'
import uniqid from 'uniqid';
import Quill from 'quill';
import file_upload_icon from '../../assets/file_upload_icon.png'
import down_icon from '../../assets/down_icon .png'
import cross_icon from '../../assets/cross_icon.png'


const AddCourse = () => {
  const quillRef = useRef(null);
  const editorRef = useRef(null);

  const [courseTitle, setCourseTitle] = useState('')
  const [coursePrice, setCoursePrice] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [image, setImage] = useState(null)
  const [chapters, setChapters] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [currentChapterId, setCurrentChapterId] = useState(null);

  const [lectureDetails, setLectureDetails] = useState(
    {
      lectureTitle: '',
      lectureDuration: '',
      lectureUrl: '',
      isPreview: false,
    }
  )
const handleChapter = (action,chapterId) => {
  if (action === 'add') {
    const title = prompt('Enter Chapter Name:');
    if (title) {
      const newChapter = {
        chapterId:uniqid(),
        chapterTitle: title,
        chapterContent: [],
        collapsed: false,
        chapterOrder: chapters.length > 0 ? chapters.slice(-1)[0].chapterOrder +
        1 : 1,
      };
      setChapters([...chapters, newChapter]);
    }
  } else if (action === 'remove') {
    setChapters(chapters.filter((chapter) => chapter.chapterId !== chapterId));
  }else if (action === 'toggle') {
    setChapters(
      chapters.map((chapter) =>
      chapter.chapterId === chapterId ? {...chapter, collapsed: !chapter.
        collapsed} : chapter
      )
    );
  }
};

const handleLecture = (action, chapterId, lectureIndex) => {
  if (action === 'add') {
    setCurrentChapterId(chapterId);
    setShowPopup(true);
  } else if (action === 'remove') {
    setChapters(
      chapter.map((chapter) => {
        if (chapter.chapterId === chapterId) {
          chapter.chapterContent.splice(lectureIndex, 1);
        }
        return chapter;
      })
    );
  }
};



  useEffect(()=>{
    //initiate Quill only once
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
      });
    }
  }, [])

return (
    <div className='h-screen overflow-scroll flex flex-col items-start
    justify-between md:p-8 md:pb-0 p-4 pt-8 pb-o'>
     <form className='flex flex-col gap-4 max-w-md w-full text-gray-500'>
      <div className='flex flex-col gap-1'>
        <p>Course Title</p>
        <input onChange={e => setCourseTitle(e.target.value)} value={courseTitle}
        type="text" placeholder='Type here' className='outline-none md:py-2.5
        py-2 px-3 rounded border border-gray-500' required/>
      </div>
      <div className='flex flex-col gap-1'>
        <p>Course Descrimption</p>
      </div>
      <div ref={editorRef}></div>
      <div className='flex items-center justify-between flex-wrap'>
        <div className='flex flex-col gap-1'>
          <p>Course Price</p>
          <input onChange={e => setCoursePrice(e.target.value)} value=
          {coursePrice} type="number" placeholder="0" className='outline-none
          md:py-2.5 py-2 w-28 rounded border border-gray-500' required />
        </div>
        <div className='flex md:flex-row flex-col items-center gap-3'>
          <p>Course Thumbnail</p>
          <label htmlFor='thumbnailImage' className='flex items-center gap-3'>
           <img 
  src={file_upload_icon} 
  alt="Upload file" 
  className="p-3 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 
             rounded-lg transition-all duration-200 ease-in-out
             cursor-pointer select-none
             w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16" 
/>
            <input type="file" id='thumbnailImage' onChange={e => setImage(e.
              target.files[0]
            )} accept="image/*" hidden/>
            <img className='max-h-10' src={image ? URL.createObjectURL(image) :
              ''} alt=""/>
            
            </label>
        </div>
      </div>

      <div>
        <p>Discount %</p>
        <input onChage={e => setDiscount(e.target.value)} value={discount}
        type="number" placeholder='0' min={0} max={100} className='outline-none
        md:py-2.5 py-2 w-28 px-3 rounded border border-gray-500' required/>
      </div>
      {/*Adding Chapters &lectures */}
      <div>
        {chapters.map((chapter, chapterIndex) =>(
          <div key={chapterIndex} className='bg-white border rounded-lg mb-4'>
            <div className='flex justify-between items-center p-4 border-b'>
              <div className='flex items-center'>
                <img src={down_icon} width={14} alt="" className={`mr-2 cursor-pointer transition-all ${chapter.collapsed &&
                  "-rotate-90" }`}/>
               
                <span className='font-semibold'>{chapterIndex + 1} {chapter.
                  chapterTitle}</span>

              </div>
              <span className='text-gray-500'>{chapter.chapterContent.length} Lectures</span>
              <img src={cross_icon} alt="" className='cursor-pointer w-3 h-3 md:w-4 md:h-4 hover:opacity-70 transition-opacity'/>

            </div>
            {!chapter.collapsed && (
              <div className='p-4'>
                {chapter.chapterContent.map((lectue, lectureIndex)=>(
                  <div key={lectureIndex} className='flex justify-between 
                  items-center mb-2'>
                    <span>{lectureIndex + 1} {lecture.lectureTitle} - {lecture.
                      lectureDuration} mins - <a href={lecture.lectureUrl}
                      target="_blank" className='text-blue-500'>Link</a> - {lecture.isPreviewFree
                      ? 'Frre Preview' : 'Paid'}</span>
                      <img src={cross_icon} alt="" onClick={()=>handleLecture
                      ('remove',chapter.chapterId, lectureIndex)}
                      className='cursor-pointer w-3 h-3 md:w-4 md:h-4 hover:opacity-70 transition-opacity'/>


                  </div>
                ))}
                <div className='inline-flex bg-gray-100 p-2 rounded
                 cursor-pointer mt-2' onClick={()=>  handleLecture('add', chapter.
                  chapterId )}>  + Add Lecture
                 
                </div>
                 
                
              </div>
            )}

          </div>
        ))}
        <div className='flex justify-center items-center bg-blue-100 p-2
        rounded-lg cursor-pointer' onClick={() => handleChapter('add')}>
          + Add Chapter</div>
        {showPopup && (
          <div className='fixed inset-0 flex items-center justify-center
          bg-gray-800 bg-opacity-50 p-4'>
            <div className='bg-white text-gray-700 p-4 sm:p-6 rounded-lg relative w-full
            max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto'>
              <h2 className='text-lg font-semibold mb-4'>Add Lecture</h2>
              <div className='mb-3 sm:mb-4'>
                <p className='text-sm sm:text-base mb-1'>Lecture Title</p>
                <input
                type="text"
                className='mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500'
                value={lectureDetails.lectureTitle}
                onChange={(e) => setLectureDetails({...lectureDetails,
                  lectureTitle: e.target.value
                })}
                />
              </div>
              <div className='mb-3 sm:mb-4'>
                <p className='text-sm sm:text-base mb-1'>Duration (minutes)</p>
                <input
                type="number"
                className='mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500'
                value={lectureDetails.lectureDuration}
                onChange={(e) => setLectureDetails({...lectureDetails,
                  lectureDuration: e.target.value
                })}
                />
                </div>

                <div className='mb-3 sm:mb-4'>
                <p className='text-sm sm:text-base mb-1'>Lecture URL</p>
                <input
                type="text"
                className='mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500'
                value={lectureDetails.lectureUrl}
                onChange={(e) => setLectureDetails({...lectureDetails,
                  lectureUrl: e.target.value
                })}
                />
                </div>

                <div className='flex items-center gap-3 my-4 sm:my-6'>
                <p className='text-sm sm:text-base'>Is Preview Free?</p>
                <input
                type="checkbox"
                className='w-4 h-4 sm:w-5 sm:h-5 text-blue-600 rounded focus:ring-blue-500'
                checked={lectureDetails.isPreviewFree}
                onChange={(e) => setLectureDetails({...lectureDetails,
                  isPreviewFree: e.target.checked
                })}
                />
                </div>
                <button type='button' className='w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2.5 sm:py-3 rounded-md text-sm sm:text-base font-medium transition-colors'>Add Lecture</button>

                <img onClick={() => setShowPopup(false)} src={cross_icon}
                className='absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 cursor-pointer hover:opacity-70 transition-opacity' alt='Close'/>

            </div>

          </div>
        )

        }
      </div>
      <button type='submit' className='bg-black text-white w-max py-2.5 px-8
      rounded my-4'>
        ADD</button>

     </form>
    </div>
  )
}

export default AddCourse
