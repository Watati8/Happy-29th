// map.js
const globeContainer = document.getElementById('globeViz');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 300;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
globeContainer.appendChild(renderer.domElement);

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 0.3;

const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

// Create the globe
const globe = new ThreeGlobe()
  .globeImageUrl('//unpkg.com/three-globe/example/img/earth-dark.jpg')
  .arcsData([
    { startLat: -1.2921, startLng: 36.8219, endLat: 25.276987, endLng: 55.296249 }, // Nairobi to Dubai
    { startLat: 25.276987, startLng: 55.296249, endLat: -31.9505, endLng: 115.8605 } // Dubai to Perth
  ])
  .arcColor(() => '#ff6b81')
  .arcAltitude(0.3)
  .arcStroke(1)
  .arcDashLength(0.4)
  .arcDashGap(2)
  .arcDashInitialGap(() => Math.random() * 5)
  .arcDashAnimateTime(5000)
  .arcsTransitionDuration(0);

scene.add(globe);

function animate() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
