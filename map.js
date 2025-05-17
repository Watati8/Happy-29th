// map.js
// Interactive spinning globe with heart-line animation from Kenya to Dubai to Australia

// This script uses Three.js and Globe.gl — ensure both are loaded in your HTML

const world = Globe()(document.getElementById('globeViz'))
  .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
  .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
  .showAtmosphere(true)
  .atmosphereColor('#3a228a')
  .atmosphereAltitude(0.25)
  .pointOfView({ lat: 0, lng: 0, altitude: 2 }, 4000)
  .width(window.innerWidth)
  .height(window.innerHeight);

// Country coordinates
const locations = [
  { name: 'Kenya', lat: -1.286389, lng: 36.817223 },
  { name: 'Dubai', lat: 25.276987, lng: 55.296249 },
  { name: 'Australia', lat: -31.950527, lng: 115.860457 } // Perth
];

// Arc paths to form a heart-ish route
const arcsData = [
  { startLat: locations[0].lat, startLng: locations[0].lng, endLat: locations[1].lat, endLng: locations[1].lng, color: ['red'] },
  { startLat: locations[1].lat, startLng: locations[1].lng, endLat: locations[2].lat, endLng: locations[2].lng, color: ['green'] },
  { startLat: locations[2].lat, startLng: locations[2].lng, endLat: locations[0].lat, endLng: locations[0].lng, color: ['#00FF00'] }
];

world
  .arcsData(arcsData)
  .arcColor('color')
  .arcDashLength(0.4)
  .arcDashGap(1)
  .arcDashInitialGap(() => Math.random())
  .arcDashAnimateTime(4000);

// Resize support
window.addEventListener('resize', () => {
  world.width([window.innerWidth]);
  world.height([window.innerHeight]);
});

