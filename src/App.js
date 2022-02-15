import Confetti from "react-confetti"
import Block from "./components/Block";



function App() {

  const dices= []
  for(let i=0;i<10;i++){
    dices.push(
      <Block value={Math.floor(Math.random()*6)+1}/>
    )
  }
  

  return (
    <main>
      <Confetti/>
    <h1>Tenzies</h1>
    <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
    <div className="die-container">{dices}</div>
    <button className="roll-dice" >
        "Reset Game"
    </button>
</main>
  );
}

export default App;
