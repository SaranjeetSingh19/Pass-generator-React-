import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passRef = useRef(null)
  
  const passwordGenerator = useCallback( () =>{  // Just to optimize code, we used useCallback here otherwise simple function would also have run.
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWabcdefghijklmnopqrstuvwxyz";

    if(numberAllowed) str += "0123456789";
    if(charAllowed) str += "~`!@#$%^&*()_+=-<>,.?/'}{][:";

    for (let i = 1; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
      
    }
    setPassword(pass);


  }, [length, numberAllowed, charAllowed])


  // function passwordGenerator() {
  //   let pass = "";
  //   let str = "ABCDEFGHIJKLMNOPQRSTUVWabcdefghijklmnopqrstuvwxyz";

  //   if(numberAllowed) str += "0123456789";
  //   if(charAllowed) str += "~`!@#$%^&*()_+=-<>,.?/'}{][:";

  //   for (let i = 1; i < length; i++) {
  //     let char = Math.floor(Math.random() * str.length + 1);
  //     pass += str.charAt(char);
      
  //   }
  //   setPassword(pass);
  // }

  useEffect(()=>{
    passwordGenerator()
  }, [length, numberAllowed, charAllowed  ])


  function copyPassToClipBoard(){
    window.navigator.clipboard.writeText(password)
    passRef.current?.select()
  }
  copyPassToClipBoard()



  return (
    <>
    <div className='pt-16 flex flex-col justify-center items-center'>
    <h1 className='text-4xl text-white text-center'>Password generator</h1>

    <div className='w-3/5 h-32 bg-slate-800 mt-8 flex flex-wrap items-center justify-around rounded-full'>
      <input value={password} readOnly placeholder='password...' ref={passRef}
      className='outline-none w-3/4 text-3xl h-12 rounded-2xl border-none text-center' type="text" />

      <button onClick={copyPassToClipBoard}  className='bg-blue-700 font-semibold text-lg rounded-lg px-4 py-2'>Copy</button>

            <input type="range" className='cursor-pointer' 
            min={8} max={30} value={length} onChange={(e)=>{setLength(e.target.value) }} />
            <label className='text-white text-xl -ml-12 font-medium'>Length : {length} </label>

      <input type="checkbox" defaultChecked={numberAllowed} 
      onChange={() => {
        setNumberAllowed((prev) => !prev)
      }} />      
      <label className='text-white text-xl -ml-12 font-medium'>Numbers</label>


      <input className='fon' type="checkbox" defaultChecked={charAllowed} 
      onChange={() => {
        setCharAllowed((prev) => !prev)
      }} />      
      <label className='text-white text-xl font-medium -ml-12'>Characters</label>

    </div>

    </div>
    </>
  )
}

export default App
