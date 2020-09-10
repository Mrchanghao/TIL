(function(){

  let canvas = document.getElementById('rain');

  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;

  let ctx = canvas.getContext('2d');
  console.log(ctx);
  let rainDrops = [];

  let rainDropBtn = document.getElementsByClassName('raindrop');
  console.log(rainDropBtn);

  let length = 30;
  let speed = 18;

  let angle = 90 * Math.PI / 180; // 각도값을 구할 때 원주율 사용--> 라디안 값 90도의 라디안값 // 
  // console.log(angle) // 1.5707963267948966
  let angleSin = Math.sin(angle);
  let angleCos = Math.cos(angle);
  
  let spawnInterval = setInterval(newDrop ,50);

  document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
      clearInterval(spawnInterval);
    } else {
      spawnInterval = setInterval(newDrop, 30);
    }
  })

  // function RainDrop(x, y, angle) {
  //   this.x = x;
  //   this.y = y;
  //   this.
  // }

  class RainDrop {
    constructor(x, y, angle) {
      this.x = x;
      this.y = y;
      rainDrops.push(this);
    }
  }

  // function newDrop() {
  //   for (let x = 0; x < 50; x++) {
  //     new RainDrop(Math.random() * c.width, -40 - 100 * Math.random(), angle);
  //   }
  // }

  function newDrop () {
    let x = 0;
    while (x < 50 ) {
      
      new RainDrop(Math.random() * canvas.width, - 40 - 100 * Math.random(), angle);
      x++;
    }
  }

  update();

  function update() {
    for(let x = 0; x < rainDrops.length; x++) {
      let drop = rainDrops[x];
      drop.x += speed * angleCos;
      drop.y += speed * angleSin;
                            // 30
      drop.endX = drop.x + length * angleCos;
      drop.endY = drop.y + length * angleSin;

      if (drop.y > canvas.height) {
        rainDrops.splice(x, 1);
        x--;
      }
    }
    draw();
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 1;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#0984e3';


    let gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, "#00a8ff");
    gradient.addColorStop(0.6, "#00a8ff");
    gradient.addColorStop(1, "white");

    ctx.strokeStyle = gradient;
    // console.log(ctx)
    ctx.beginPath();
    for (let i = 0; i < rainDrops.length; i++) {
      ctx.moveTo(Math.floor(rainDrops[i].x), Math.floor(rainDrops[i].y));
      ctx.lineTo(Math.floor(rainDrops[i].endX), Math.floor(rainDrops[i].endY))
    }
    ctx.stroke();
    clearRegions();

    window.requestAnimationFrame(update);
  }


  // window.addEventListener('resize', onResize);
  function clearRegions() {
    ctx.globalCompositeOperation = "destination-out";
  
    for (let i = 0; i < rainDropBtn.length; i++) {
      let boundingBox = rainDropBtn[i].getBoundingClientRect();
      let yDistanceBottom = canvas.height - boundingBox.bottom;
      let yDistanceTop = canvas.height - boundingBox.top;
  
      let bottomLeftX =
        boundingBox.left + yDistanceBottom * Math.tan(Math.PI / 2 - angle);
      let bottomRightX =
        boundingBox.right + yDistanceBottom * Math.tan(Math.PI / 2 - angle);
  
      let bottomLeftX2 =
        boundingBox.left + yDistanceTop * Math.tan(Math.PI / 2 - angle);
      let bottomRightX2 =
        boundingBox.right + yDistanceTop * Math.tan(Math.PI / 2 - angle);
  
      //From bottom of element to edge of page
      ctx.beginPath();
      ctx.moveTo(boundingBox.left, boundingBox.bottom);
      ctx.lineTo(bottomLeftX, canvas.height);
      ctx.lineTo(bottomRightX, canvas.height);
      ctx.lineTo(boundingBox.right, boundingBox.bottom);
      ctx.closePath();
      ctx.fill();
  
      //From top of element to edge of page
      ctx.beginPath();
      ctx.moveTo(boundingBox.left, boundingBox.top);
      ctx.lineTo(bottomLeftX2, canvas.height);
      ctx.lineTo(bottomRightX2, canvas.height);
      ctx.lineTo(boundingBox.right, boundingBox.top);
      ctx.closePath();
      ctx.fill();
    }
  
    ctx.globalCompositeOperation = "source-over";
  }
  

  window.addEventListener('resize', function() {
    const { width, height } = canvas.getBoundingClientRect();
    const { devicePixelRatio:ratio=1 } = window;

    if (canvas.width !== width || canvas.height !== height) {
      // canvas.width = width
      // canvas.height = height;
      canvas.width = width * ratio;
      canvas.height = height * ratio
      ctx.scale(ratio, ratio);
      return true
    }

    return false;
  })


})() 