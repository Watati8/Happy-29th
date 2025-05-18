// map.js — Spinning Globe with Heart Path
let globe;
const countries = [
  { name: "Kenya", lat: -1.2921, lng: 36.8219, message: "Where our story began ❤️" },
  { name: "Dubai", lat: 25.276987, lng: 55.296249, message: "Where you asked me to be yours 🥹" },
  { name: "Perth", lat: -31.9505, lng: 115.8605, message: "Where your heart waits for me 💚" }
];

const colors = {
  heart: "#ff4d4d",
  path: "#00cc99"
};

function initMapGlobe() {
  globe = Globe()(document.getElementById("globeViz"))
    .globeImageUrl("//unpkg.com/three-globe/example/img/earth-night.jpg")
    .backgroundColor("#000000")
    .pointOfView({ lat: 10, lng: 10, altitude: 2 }, 3000)
    .arcColor(() => colors.path)
    .arcAltitude(0.2)
    .arcDashLength(0.5)
    .arcDashGap(4)
    .arcDashInitialGap(() => Math.random() * 5)
    .arcDashAnimateTime(2000)
    .arcsData(getRoutes())
    .labelsData(countries)
    .labelLat(d => d.lat)
    .labelLng(d => d.lng)
    .labelText(d => d.name)
    .labelColor(() => "white")
    .labelSize(1)
    .labelDotRadius(0.3)
    .onLabelClick(showMessage);

  rotateGlobe();
}

function getRoutes() {
  return [
    { startLat: countries[0].lat, startLng: countries[0].lng, endLat: countries[1].lat, endLng: countries[1].lng },
    { startLat: countries[1].lat, startLng: countries[1].lng, endLat: countries[2].lat, endLng: countries[2].lng }
  ];
}

function rotateGlobe() {
  let angle = 0;
  setInterval(() => {
    angle += 0.2;
    globe.pointOfView({ lat: 10, lng: angle }, 50);
  }, 75);
}

function showMessage(d) {
  alert(d.message);
}

window.addEventListener("DOMContentLoaded", initMapGlobe);
