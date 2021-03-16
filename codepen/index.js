const form = document.getElementsByTagName('form')[0];
const root = document.getElementById('root');

console.log(form);
// Initialize options.
let options = {
  dots: 300,
  dotSize: 4,
  dotInterval: 1,
  spread: 2,
  speed: .0005,
};

// set form values 
for (let option in options) {
  if (form[option].type === 'checkbox') {
    form[option].checked = options[option];
    continue;
  }
  form[option].value = options[option];
}

// create canvas 

const canvas = document.getElementById('canvas');

const ctx = canvas.getContext('2d');
root.appendChild(canvas);
console.log(ctx);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let interval = options.dotInterval;
const xmid = canvas.width / 2;
const ymid = canvas.height / 2;

const colors = [
  '#A0A86F',
  '#7f2491',
  '#AFD0F5', 
]



animate();

function animate () {
  ctx.beginPath();
  ctx.fillStyle = '#FFF';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fill();

  drawSpiral(interval);
  interval += options.speed;
  window.requestAnimationFrame(animate);
}

function drawSpiral(interval) {
  // ctx.moveTo(xmid, ymid);

  // let spread = 2;
  // let tick = 0;
  // for (let i = 0; i < options.dot; i++) {
  //   x = Math.cos(i) * spread + xmid;
  //   y = Math.sin(i) * spread + ymid;

  //   ctx.moveTo(x, y);
  //   ctx.beginPath();

  //   const color = colors[tick % 3];
  //   ctx.strokeStyle = color;
  //   ctx.fillStyle = color;

  //   ctx.arc(x, y, options.dotSize, 0, 2 * Math.PI);
  //   ctx.stroke();
  //   ctx.fill();
  //   i += interval;

  //   spread += options.spread;
  //   tick++;
  // }
  ctx.moveTo(xmid, ymid);
  let spread = 2;
  let tick = 0;
  for (let i=0; i<options.dots; i++) {
    x = Math.cos(i)*spread + xmid;
    y = Math.sin(i)*spread + ymid;

    ctx.moveTo(x, y);
    ctx.beginPath();
    const color = colors[tick%3];
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.arc(x,y,options.dotSize,0,2*Math.PI);
    //ctx.lineTo(x,y)
    ctx.stroke();
    ctx.fill();
    i += interval;
    spread += options.spread;
    tick++;
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  for(let option of form.elements) {
    if(option.type === 'submit') {
      continue;
    } else if (option.type === 'checkbox') {
      options[option.name] = option.checked;
    } else if (option.type == 'number' || option.type == 'range') {
      options[option.name] = parseFloat(option.value);
    } else {
      options[option.name] = option.value;
    }
  }

  interval = options.dotInterval;

})

