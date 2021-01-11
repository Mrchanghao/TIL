import React, { useEffect, createRef, useState, useRef, useLayoutEffect, forwardRef } from 'react'

const usePreviouse = value => {
  const prevChilrenRef = useRef();

  useEffect(() => {
    prevChilrenRef.current = value;

  }, [value]);

  return prevChilrenRef.current;
}

const calculateBoundingBoxes = children => {
  const boundingBoxes = {};

  React.Children.forEach(children, child => {
    const domNode = child.ref.current;
    const nodeBoundingBox = domNode.getBoundingClientRect();

    boundingBoxes[child.key] = nodeBoundingBox;
  });

  return boundingBoxes;

}


const AnimateBubbles = ({children}) => {

  const [boundingBox, setBoundingBox ] = useState({});
  const [prevBoundingBox, setPrevBoundingBox] = useState({});
  const prevChildren = usePrevious(children);

  useLayoutEffect(() => {
    const newBoundingBox = calculateBoundingBoxes(children);
    setBoundingBox(newBoundingBox);
  }, [children]);

  useLayoutEffect(() => {
    const prevBoundingBox = calculateBoundingBoxes(prevChildren);

    setPrevBoundingBox(prevBoundingBox);

  }, [prevChildren]);

  useEffect(() => {
    const hasPrevboundingBox = Object.keys(prevBoundingBox).length;
    
    if(hasPrevboundingBox) {
      React.Children.forEach(children, child => {
        const domNode = child.ref.current;
        const firstBox = prevBoundingBox[child.key];
        const lastBox = boundingBox[child.key];
        const changeInX = firstBox.left - lastBox.left;

        if (changeInX) {
          requestAnimationFrame(() => {
            domNode.style.transform = `translateX(${changeInX})`;
            domNode.style.transition = 'transform 0s';

            requestAnimationFrame(() => {
              domNode.style.transform = '';
              domNode.style.transition = 'transform 500ms';
            })
          })

        }

      })
    }

  }, [boundingBox, prevBoundingBox, children]);

  return children;
};


const Bubble = forwardRef(({text ,id}, ref) => {
  return (
    <div ref={ref}>
      <div className='circle'>
        <span style={}></span>
        <p className='text'>{text}</p>
      </div>
    </div>
  )
})