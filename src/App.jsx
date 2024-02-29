/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import './App.css'
import './index.css'

function App() {
  const [lenght, setLenght] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)
  const passwordGenerator = useCallback ( () => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!#$%&()*+,-./:;<=>?@[]^_`{|}~"

    for (let i=1; i <= lenght; i++)
    {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char) 
    }
    setPassword(pass)

  }, [lenght, numberAllowed, charAllowed, setPassword])
  
  useEffect( () => {
    passwordGenerator()
  }, [lenght, numberAllowed, charAllowed, passwordGenerator])
 
  const copyTo = useCallback (() => {
    window.navigator.clipboard.writeText(password)
  })
  return (
    <>
      <div className='all'>
        <div className='container'>
          <h1 className='title-bar'>
            Password Generator
          </h1>
          <div className='password-box'>
                <input type="text" 
                value={password}
                placeholder='Password'
                readOnly
                ref={passwordRef}
                />
                <button onClick={copyTo}>Copy</button>
          </div>
          <div className="password-props">
            <input type="range" min={6} max={99} value={lenght} onChange={(e) => setLenght(e.target.value)}/>
            <label htmlFor="">Lenght: {lenght}</label>
            <input type="checkbox" id="numberAllowed" defaultChecked = {numberAllowed} onChange={(e) => setNumberAllowed((prev) => !prev)} />
            <label htmlFor="numberAllowed">Numbers</label>
            <input type="checkbox" id="charAllowed" defaultChecked = {charAllowed} onChange={(e) => setCharAllowed((prev) => !prev)} />
            <label htmlFor="charAllowed">Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
