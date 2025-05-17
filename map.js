// map.js

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.SphereGeometry(5, 32, 32);
const texture = new THREE.TextureLoader().load('https://threejs.org/examples/textures/earth_atmos_2048.jpg');
const material = new THREE.MeshBasicMaterial({ map: texture });
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

camera.position.z = 10;

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;

function animate() {
  requestAnimationFrame(animate);
  sphere.rotation.y += 0.002;
  renderer.render(scene, camera);
}
animate();

// TODO: Add curved lines between coordinates (Kenya → Dubai → Australia)
// Use THREE.CurvePath and custom shaders for glowing effects
// Example coordinates (in radians):
const locations = {
  kenya: { lat: -1.286389, lon: 36.817223 },
  dubai: { lat: 25.276987, lon: 55.296249 },
  perth: { lat: -31.950527, lon: 115.860457 }
};
