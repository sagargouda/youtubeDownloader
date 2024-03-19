import {useState} from "react";

function App() {
    const [ value , setValue] = useState('')


    function dataValuation(url){
        const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|(?:youtu\.be|youtube\.com\/shorts)\/)([^"&?\/\s]{11})/gi
        ;
        const match = regex.exec(url);
        return match ? match[1] : null;
    }

    function handleClick(){
        const id = dataValuation(value)
        console.log(id)
    }
  return (
   <div>
       <input type="text" value={value} onChange={(e)=> setValue(e.target.value)}/>
    <button onClick={handleClick}>Submit</button>

   </div>
  );
}

export default App;
