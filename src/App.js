import React from 'react'
import Confetti from "react-confetti"
import Block from "./components/Block";



function App() {
 
  const randomNumber =(x)=> Math.floor(Math.random()*x)+1
  const [tenzies, setTenzies] = React.useState(false)
  const [values, setValues] = React.useState(Array.from({length: 10},(ele, i)=>({id:i,value:randomNumber(6),held:false})))
  const [startTime, setStartTime] = React.useState(null)
  let bestRecord= JSON.parse(localStorage.getItem("bestRecord")) || rollRecord
  const [rollRecord ,setRollRecord] = React.useState({rollCount:0,rollDuration:0})
  let diff
  let endTime
  
  const hold =(e ,value, key)=>{

    
    if (values.every((v)=>v.value===values[0].value)){
      setValues(prevValues=>{
        return prevValues.map(p=>p.id===key? {...p,held:!p.held} : p)
      })
      setTenzies(true)
      endTime =new Date().getTime()
      diff = endTime-startTime
      setRollRecord(prev=>({...prev,rollCount:rollRecord.rollCount,rollDuration: diff}))
      console.log(bestRecord)
      console.log(diff)
      localStorage.setItem("bestRecord",
      JSON.stringify(
        {...bestRecord,
          rollCount:diff<bestRecord.rollDuration?rollRecord.rollCount : bestRecord.rollCount ,
          rollDuration: diff<bestRecord.rollDuration? diff : bestRecord.rollDuration
        }))
      }else{
        setValues(prevValues=>{
          return prevValues.map(p=>p.id===key? {...p,held:!p.held} : p)
        })
      }
    
    
  }
  const roll = ()=>{
    
    
    if (!startTime) {setStartTime(new Date().getTime()) }
    
    if(!tenzies){
      setValues(prevValues=> {
        return prevValues.map(v=> v.held ? v : {...v,value : randomNumber(6)})
      })
      setRollRecord(prev=>({...prev,rollCount:prev.rollCount+1}))
    }else{
        setStartTime(null)
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
      <div>
        <h3>Your Roll count : {rollRecord.rollCount} Rolls</h3>
        {tenzies && <h3>You spent: {` ${Math.floor(rollRecord.rollDuration %(1000*3600)/(1000*60))} mins ${Math.floor(rollRecord.rollDuration%(1000*60)/(1000)) } seconds`} </h3>}
        <h3>Your best Records {`${bestRecord.rollCount} Rolls in  ${` ${Math.floor(bestRecord.rollDuration %(1000*3600)/(1000*60))} mins ${Math.floor(bestRecord.rollDuration%(1000*60)/(1000)) } seconds`}`}</h3>
      </div>
    </main>
  );
}
export default App;
