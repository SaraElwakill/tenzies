import { json } from 'express';
import React from 'react'
import Confetti from "react-confetti"
import Block from "./components/Block";



function App() {
 
  const randomNumber =(x)=> Math.floor(Math.random()*x)+1
  const [tenzies, setTenzies] = React.useState(false)
  const [values, setValues] = React.useState(Array.from({length: 10},(ele, i)=>({id:i,value:randomNumber(6),held:false})))
  const BestRecord = localStorage.getItem("bestRecord")
  const [rollRecord ,setRollRecord] = React.useState({rollCount:0,rollDuration:"ccc"})
  const hold =(e ,value, key)=>{
    setValues(prevValues=>{
      return prevValues.map(p=>p.id===key? {...prevValues[key],held:true} : p)
    })
  }
  const roll = ()=>{
    if(!tenzies){

      setValues(prevValues=> {
        return prevValues.map(v=> v.held ? v : {...v,value : randomNumber(6)})
      })
      setRollRecord(prev=>({...prev,rollCount:prev.rollCount+1}))
      console.log(rollRecord.rollCount)
      //هنا كنت ممكن يكسب قبل ما يختار اخر مربع شبههم فعشان كدا عملت && عشان اتاكد ان الكل اختاار
      if (values.every((v)=>v.value===values[0].value && v.held === values[0].held)){
        setRollRecord(prev=>({...prev,rollCount:prev.rollCount}))
        
        console.log("wins")
        setTenzies(true)
      }
    }else{
      setRollRecord(prev=>({
        ...prev,rollCount:0
      }))
      setTenzies(false)
      setValues(Array.from({length: 10},(ele, i)=>({id:i,value:randomNumber(6),held:false})))
    }
  }
  

  const dices= values.map((v)=>(<Block key = {v.id} value={v.value} hold = {hold}  id = {v.id} held = {v.held}/>))


  return (
    <main>
      {tenzies && <Confetti/>}
    <h1>Tenzies</h1>
    <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
    <div className="die-container">{dices}</div>
    <button className="roll-dice" onClick={roll} >
        {tenzies? "Reset Game" : "Roll" }
    </button>
    <h3>your roll count : {rollRecord.rollCount}</h3>
</main>
  );
}
export default App;
