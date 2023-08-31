
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

// redux actions
import * as Action from "../redux/question_reducer"
import { getServerData } from "../helper/helper";

//  fetch ques hook to fetch api data and set value to store



export const useFetchQuestion=()=>{
    const dispatch =useDispatch();
    const[getData,setGetData] =useState({
        isLoading:  false,
        apiData:[],
        serverError: null
    });


    useEffect(()=>{
        setGetData(prev => ({...prev, isLoading : true}));

        // async func to fetch backend data

        (async ()=>{
            try{
               
                const [{questions,answers}] = await getServerData(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/questions`,(data)=>data);
                console.log({questions,answers});


                if(questions.length>0){
                    setGetData(prev=>({...prev, isLoading : false}))
                    setGetData(prev=>({...prev, apiData : questions}))

                    // dispatch an action
                    dispatch(Action.startExamAction({question :questions,answers}))


                }
                else{
                    throw new Error("No question available");
                }

            }
            catch (error){
                setGetData(prev=>({...prev, isLoading : false}))
                setGetData(prev=>({...prev, serverError : error}))

            }

        })();
    },[dispatch])

    return [getData,setGetData] 


}

// move Actions dispatch function

export const MoveNextQuestion =()=> async (dispatch)=>{
    try{
       dispatch(Action.moveNextAction())
    }
    catch(error){
       console.log(error)
    }
}

// prevActions dispatch function

export const MovePrevQuestion =()=> async (dispatch)=>{
    try{
       dispatch(Action.movePrevAction())
    }
    catch(error){
       console.log(error)
    }
}