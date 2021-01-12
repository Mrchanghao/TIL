import React from 'react'
import style from './style';


const App = () => {
  return (
    <>
      <div className={style.app}>
        Hello world
      </div>
      <button onClick={e => alert('hello me')}>
        say hello you?
      </button>
    </>
  )
}

export default App;