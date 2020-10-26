import React, { useReducer, useState, useEffect, useRef, useContext, createContext } from "react";
import { MyContext } from './Context';
// import './App.css';

function App() {
  const {data, loading, more, load} = useContext(MyContext);
  const [element, setElement] = useState(null);
  const loader = useRef(load);

  const observer = useRef(
    new IntersectionObserver(entries => {
      const first = entries[0];
      // console.log(second);
      if(first.isIntersecting) {
        loader.current();
      }
    }, {threshold: 1})
  );

  useEffect(() => {
    loader.current = load;

  }, [load])
  // console.log(loader)
  
  useEffect(() => {
    const currentElement = element;
    const currentObserver = observer.current;

    if(currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if(currentElement) {
        currentObserver.unobserve(currentElement);
      }
    }
  }, [element])

  
  
  return (
    <div className="App">
      <ul>
        {data.map(row => (
          <li key={row} style={{ background: "orange" }}>
            {row}
          </li>
        ))}

        {loading && <li>Loading...</li>}

        {!loading && more && (
          <li ref={setElement} style={{ background: "green" }}>
            <button onClick={load}>Load more</button>
          </li>
        )}
      </ul>
    </div>
  );
}

export default App;


// export default () => {
//   return (
//     <MyProvider>
//       <App />
//     </MyProvider>
//   );
// };