import React, { useEffect, useState } from 'react'
import { MoveNextQuestion,MovePrevQuestion } from '../hooks/FetchQuestion'
import Questions from "./Questions"

import { PushAnswer } from '../hooks/setResult'

// redux store import
import { useSelector,useDispatch} from 'react-redux'
import { Navigate } from  'react-router-dom'

export default function Quiz() {


  const [check, setChecked]=useState(undefined)

  const result =useSelector(state=>state.result.result);
  const {queue,trace} =useSelector(state=>state.questions);
  const dispatch = useDispatch()


// next button event handler

    function onNext(){
      //  update trace value by 1

      // console.log("on next click")
      if(trace<queue.length){
       dispatch(MoveNextQuestion())
      //  insert new result in array
      if(result.length<=trace){
        dispatch(PushAnswer(check))
      }
      }

      // reset the value of check variable 

      setChecked(undefined)
    }

// prev button event handler

    function onPrev(){
        if(trace>0){
        dispatch(MovePrevQuestion())
        }


    }

    function onChecked(check){
      setChecked(check)
    }

    // finished exam after the last question
    if(result.length && result.length>=queue.length){
      return <Navigate to={'/result'} replace="true"></Navigate>
    }


  return (
    <div className='container'>
        <h1 className="title text-light">Quick Quiz</h1>

         {/* display questions */}
   
          <Questions onChecked={onChecked}/>
         <div className='grid'>
            {trace>0 ? <button className='btn prev' onClick={onPrev}>Prev</button>:<div></div>}
            <button className='btn next' onClick={onNext} >Next</button>

         </div>

    </div>
  )
}
