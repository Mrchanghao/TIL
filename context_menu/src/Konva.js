import React, { useState } from 'react'
import { Stage, Layer, Star, Text} from 'react-konva';

function generateShapes() {
  return [...Array(10)].map((_, i) => ({
    id: i.toString(),
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    rotation: Math.random() * 100,
    isDragging: false,
  }));
}

const INITIAL_STATE = generateShapes();

/*
{id, x, y, rotation, isDragging}
*/ 

const Konva = () => {
  const [stars, setStars] = useState(INITIAL_STATE)
}