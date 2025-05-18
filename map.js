// map.js
const Globe = new ThreeGlobe()
  .globeImageUrl('//unpkg.com/three-globe/example/img/earth-dark.jpg')
  .arcsData([
    { startLat: -1.2921, startLng: 36.8219, endLat: 25.2048, endLng: 55.2708 }, // Nairobi → Dubai
    { startLat: 25.2048, startLng: 55.2708, endLat: -31.9505, endLng: 115.8605 } // Dubai → Perth
  ])
  .arcColor(() => ['#ff6b81'])
  .arcAltitude(0.3)
  .arcStroke(1.5)
  .arcDashLength(0.4)
  .arcDashGap(2)
  .arcDashInitialGap(() => Math.random() * 5)
  .arcDashAnimateTime(4000);

const scene = new THREE.Scene();
scene.add(Globe);

const camera = new THREE.PerspectiveCamera();
camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();
camera.position.z = 300;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000);
document.getElementById('globeViz').appendChild(renderer.domElement);

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 1;

const ambientLight = new THREE.AmbientLight(0xbbbbbb);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
directionalLight.position.set(0, 0, 1);
scene.add(directionalLight);

function animate() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();

