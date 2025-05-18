// map.js

import Globe from 'three-globe';

// Create scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera();
camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();
camera.position.z = 300;

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('globeViz').appendChild(renderer.domElement);

// Orbit controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 0.3;

// Set up the globe
const globe = new Globe()
  .globeImageUrl('//unpkg.com/three-globe/example/img/earth-dark.jpg')
  .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
  .arcsData([
    {
      startLat: -1.286389, startLng: 36.817223, // Nairobi
      endLat: 25.276987, endLng: 55.296249,     // Dubai
      color: ['#ff6b81', '#ff6b81']
    },
    {
      startLat: 25.276987, startLng: 55.296249, // Dubai
      endLat: -31.950527, endLng: 115.860458,   // Perth
      color: ['#00ff95', '#00ff95']
    }
  ])
  .arcDashLength(0.4)
  .arcDashGap(2)
  .arcDashAnimateTime(4000)
  .arcsTransitionDuration(1000)
  .arcAltitude(0.3);

scene.add(globe);

// Lighting
const ambientLight = new THREE.AmbientLight(0xbbbbbb);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

// Animate
function animate() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();

// Handle resizing
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
