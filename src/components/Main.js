import React, { useRef } from "react";
import { Link } from "react-router-dom";
import '../styles/Main.css'
import {useDispatch} from 'react-redux'
import { setUserId } from "../redux/result_reducer";


export default function Main(){

    const inputRef=useRef(null)
    const dispatch= useDispatch()
    function startQuiz(){
        if(inputRef.current?.value){
           dispatch(setUserId(inputRef.current?.value))
        }
    }

    return (
        <div className="container">
            <h1 className="title text-light">Quick Quiz</h1>


            <ol>
                <li>You Will be asked <b>10 Questions</b> one after another.</li>
                <li><b>10 Points </b>will be awarded for correct answer.</li>
                <li>Each Question has <b>Three</b> Options. You can coose any <b>one</b> option. </li>
                <li>You can review and change answers before the quiz finish.</li>
                <li>The result will be declared at the end of the quiz.</li>
            </ol>

            <form id="form">
                <input ref={inputRef} className="userid" type="text" placeholder="Username *"/>
            </form>

            <div className="start">
                <Link className="btn" to={"quiz"} onClick={startQuiz}>Start Quiz</Link>
            </div>
        </div>
    )
}