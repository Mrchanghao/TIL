let renderer;
let camera;
let planet;
let moon;
let sphereBg;
let terrainGeometry;
let container = document.getElementById("canvas_container")
let timeout_Debounce
let frame = 0
let cameraDx = .07
let count = 0
let t = 0


/*   Lines values  */
let lineTotal = 1000;
let linesGeometry = new THREE.BufferGeometry();
linesGeometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(6 * lineTotal), 3));

linesGeometry.setAttribute("velocity", new THREE.BufferAttribute(new Float32Array(2 * lineTotal), 1));
let l_positionAttr = linesGeometry.getAttribute("position");
let l_vertex_Array = linesGeometry.getAttribute("position").array;
let l_velocity_Array = linesGeometry.getAttribute("velocity").array;


start();
animate();
// console.log(l_vertex_Array);
function start() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color("#000000");
  scene.fog = new THREE.Fog("#3c1e02", 0.5, 50);

  camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.01, 1000)
  camera.position.set(0, 1, 32)
  positionLightOne = new THREE.PointLight('#ffffff', 1, 0);

  positionLightOne.position.set(0, 30, 30);
  scene.add(positionLightOne);

  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
  });

  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  
  container.appendChild(renderer.domElement);
  
  const loader = new THREE.TextureLoader();

  // planet 
  const texturePlanet = loader.load('https://res.cloudinary.com/dtvy1jqj0/image/upload/v1600159868/misc/saturn3.jpg');
  texturePlanet.anisotropy = 16;
  const planetGeometry = new THREE.SphereBufferGeometry(10, 50, 50);
  const planetMaterial = new THREE.MeshLambertMaterial({
    map: texturePlanet,
    fog: false,
  });
  planet = new THREE.Mesh(planetGeometry, planetMaterial);
  planet.position.set(0, 8, -30);
  scene.add(planet);
  
  // moon 
  const textureMoon = loader.load('https://res.cloudinary.com/dtvy1jqj0/image/upload/v1600159866/misc/moon.jpg');
  textureMoon.anisotropy = 16;
  let moonGeometry = new THREE.SphereBufferGeometry(2, 32, 32);
  let moonMaterial = new THREE.MeshPhongMaterial({
    map: textureMoon,
    fog: false,
  });

  moon = new THREE.Mesh(moonGeometry, moonMaterial);
  moon.position.set(0, 8, 0);
  scene.add(moon);

  // Sphere Background 
  const textureSphereBg = loader.load('https://res.cloudinary.com/dtvy1jqj0/image/upload/v1600121398/misc/stars2.jpg')

  textureSphereBg.anisotropy = 16;
  
  const geometrySphereBg = new THREE.SphereBufferGeometry(150, 32, 32);
  const materialSphereBg = new THREE.MeshBasicMaterial({
    side: THREE.BackSide,
    map: textureSphereBg,
    fog: false,
  });

  sphereBg = new THREE.Mesh(geometrySphereBg, materialSphereBg);
  sphereBg.position.set(0, 50, 0);
  scene.add(sphereBg);

  // star 
  for (let i = 0; i < lineTotal; i++) {
    let x = THREE.MathUtils.randInt(-200, 200);
    let y = THREE.MathUtils.randInt(-200, 200);

    if (x < 7 && x > -7 && y < 20) {
      x += 14;
    }
    let z = THREE.MathUtils.randInt(0, -300);
    l_vertex_Array[6 * i + 0] = l_vertex_Array[6 * i + 3] = x;
    l_vertex_Array[6 * i + 1] = l_vertex_Array[6 * i + 4] = y;
    l_vertex_Array[6 * i + 2] = l_vertex_Array[6 * i + 5] = z;

    l_velocity_Array[2 * i] = l_velocity_Array[2 * i + 1 ] = 0;
  }
  let starsMaterial = new THREE.LineBasicMaterial({
    color: '#ffffff',
    transparent: true,
    opacity: 0.5,
    fog: false,
  });
  let lines = new THREE.LineSegments(linesGeometry, starsMaterial);

  linesGeometry.getAttribute('position').setUsage(THREE.DynamicDrawUsage);
  scene.add(lines);

}



function animate() {
  planet.rotation.y += 0.002;
  sphereBg.rotation.x += 0.002;
  sphereBg.rotation.y += 0.002;
  sphereBg.rotation.z += 0.002;

  // moon animate
  moon.rotation.y -= 0.007;
  moon.rotation.x -= 0.007;
  moon.position.x = 15 * Math.cos(t) + 0;
  moon.position.z = 20 * Math.sin(t) - 35;
  t += 0.015;

  // star 
  for (let i = 0; i < lineTotal; i++) {
    l_velocity_Array[2 * i] += 0.0049;
    l_velocity_Array[2 * i + 1] += 0.005;
    l_vertex_Array[6 * i + 2] += l_velocity_Array[2 * i];
    l_vertex_Array[6 * i + 5] += l_velocity_Array[2 *i + 1];

    if (l_vertex_Array[6 * i + 2] > 50) {
      l_vertex_Array[6 * i + 2] = l_vertex_Array[6 * i + 5] = THREE.MathUtils.randInt(-200, 10);
      l_velocity_Array[2 * i] = 0;
      l_velocity_Array[2 * i + 1] = 0;
    }
  };
  // console.log(lineTotal);
  l_positionAttr.needsUpdate = true;
  // console.log(l_positionAttr);

  // camera move 
  camera.position.x += cameraDx;
  camera.position.y = -1.2 * (1 - Math.abs(frame / 2000 - 0.5) / 0.5);
  camera.lookAt(0, 0, 0);
  frame += 8;
  if (frame > 2000) {
    frame = 0;
  }
  if (camera.position.x > 18) {
    cameraDx = -cameraDx;
  }
  if (camera.position.x < -18) {
    cameraDx = Math.abs(cameraDx);
  }
  l_positionAttr.needsUpdate = true;

  renderer.render(scene, camera);
  requestAnimationFrame(animate);

}


// resize
window.addEventListener('resize', () => {
  clearTimeout(timeout_Debounce);
  timeout_Debounce = setTimeout(windowResize, 80);

  function windowResize() {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container, container.clientWidth, container.clientHeight);
  }
})



let fullScreen;
let fsBtn = document.getElementById('fullscreen');
fsBtn.addEventListener('click', (e) => {
  e.preventDefault();
  if(!fullScreen) {
    fullScreen = true;
    document.documentElement.requestFullscreen();
    fsBtn.innerHTML = 'Exit FullScreen';
  } else {
    fullScreen = false;
    document.exitFullscreen();
    fsBtn.innerHTML = 'Fullscreen';
  };
})