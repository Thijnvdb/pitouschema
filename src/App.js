import { useEffect, useState } from 'react';
import './App.css';
import './wordart.scss';

Date.prototype.getWeekNumber = function(){
  var d = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()));
  var dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
  return Math.ceil((((d - yearStart) / 86400000) + 1)/7)
};

function App() {
  const people = ["Frederik", "Isa", "Thijn", "Bram", "Thomas"]
  const styles = ["rainbow", "blues", "superhero", "radial", "tilt", "purple", "horizon", "slate"]
  // const [person, setPerson] = useState();
  const [week, setWeek] = useState(0);
  const [wordart, setWordart] = useState(); 

  useEffect(()=> {
    let w = new Date().getWeekNumber();
    // setPerson();
    setWeek(w)
    setWordart(styles[Math.floor(Math.random() * styles.length)]);
  },[]);

  function getRandomAnimationDirection() {
    return Math.floor(Math.random() * 2) === 1 ? "reverse" : ""
  }

  const fotocount = 3;//dit is het aantal foto's in de array
  function randomArray() {
    const pietcount = 5;//dit gelijk maken aan pitou foto aantal

    let arr = [].fill(0,0,fotocount);
    for(let i = 0; i < fotocount; i++) {
      arr[i] = Math.floor(Math.random() * pietcount) + 1;
    }

    return arr;
  }

  return (
      <div style={{backgroundImage: `url(${process.env.PUBLIC_URL}/tile.gif)`}} className="App bg-cover flex justify-evenly flex-col items-center">
        <div className={`pitouholder`}>
          {
            randomArray().map((x,i) => <img key={i+"a"} alt="pitou!" src={`${process.env.PUBLIC_URL}/pitou${x}.png`} className={"z-10 max-w-1/3  pitou "+ getRandomAnimationDirection()}/>)
          }
        </div>
        <h2 className='text-5xl z-10 text-center'>Deze week mag...</h2>
        <h1 className={'z-10 wordart text-7xl lg:text-9xl ' + wordart}><span className='text'>{people[week % people.length]}</span></h1>
        <h2 className='text-5xl z-10 text-center'>De bak verschonen!</h2>
        <h3 className='text-4xl z-10 text-center'>Volgende week mag {people[(week + 1) % people.length]}</h3>
        <div className={`pitouholder`}>
          {
            randomArray().map((x,i) => <img key={i+"b"} alt="pitou!" src={`${process.env.PUBLIC_URL}/pitou${x}.png`} className={"z-10 max-w-1/3 pitou "+ getRandomAnimationDirection()}/>)
          }
        </div>
      </div>
  );
}

export default App;
