import React, { useState, useRef, useCallback, useEffect } from 'react';
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

const pixelRatio = 4;

function getResizeCanvas (canvas, newWidth, newHeight) {
  const tmpData = document.createElement('canvas');
  tmpData.width = newWidth;
  tmpData.height = newHeight;

  const ctx = tmpData.getContext('2d');

  ctx.drawImage(
    canvas,
    0, 0,
    canvas.width, canvas.height,
    0, 0,
    newWidth, newHeight
  )
  return tmpData;
}

function generateDownloaded(previewCanvas, crop) {
  if(!crop || !previewCanvas) {
    return;
  }

  const canvas = getResizeCanvas(previewCanvas, crop.width, crop.height);

  canvas.toBlob(
    blob => {
      const previewUrl = window.URL.createObjectURL(blob);
      const anchor = document.createElement('a');

      anchor.download = 'cropPreview.png';
      anchor.href = URL.createObjectURL(blob);
      anchor.click();

      window.URL.revokeObjectURL(previewUrl);

    },
    "image/png",
    1,
  )
}


const ImageComponent = () => {
  const [upImage, setUpImage] = useState();
  const imageRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState({unit: '%', width: 30, aspect: 16 / 9});
  const [completedCrop, setCompletedCrop] = useState(null);

  const onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setUpImage(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onLoad = useCallback(image => {
    imageRef.current = image;
  }, []);


  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imageRef.current) {
      return;
    }

    const image = imageRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scalX = image.naturalWith / image.width;
    const scalY = image.naturalHeight / image.height;

    const ctx = canvas.getContext('2d');

    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingEnabled = false;

    ctx.drawImage(
      image,
      crop.x * scalX,
      crop.y * scalY,
      crop.width * scalX,
      crop.height * scalY,
      0,
      0,
      crop.width,
      crop.height,
    )
  
  }, [completedCrop]);


  return (
    <>
      <div>
        <input type="file" accept="image/*" onChange={onSelectFile} />
      </div>
      <ReactCrop src={upImage} onImageLoaded={onLoad} crop={crop} 
      onChange={c => setCrop(c)} onComplete={c => setCompletedCrop(c)} 
      />
      <div>
        <canvas 
          ref={previewCanvasRef}
          style={{
            width: completedCrop?.width ?? 0,
            height: completedCrop?.height ?? 0,            
          }}
        />
      </div>
      <div>
        <button type="button"
          disabled={!completedCrop?.width || !completedCrop?.height}
          onClick={() => generateDownloaded(previewCanvasRef.current, completedCrop)}
        >
          DOWNLOAD
        </button>
      </div>
    </>
  );
}
// todo
// 폼으로 submit 구현

export default ImageComponent;
