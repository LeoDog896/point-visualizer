import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const hash = window.location.hash.substring(1);
const parsedHash = decodeURIComponent(hash).split(";").map((x) => x.split(",").map((y) => parseFloat(y)));

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
for (const [x, y, z] of parsedHash) {
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(x, y, z);
    cube.scale.set(0.1, 0.1, 0.1);
    scene.add(cube);
}

camera.position.z = 5;

const controls = new OrbitControls( camera, renderer.domElement );
camera.position.set( 0, 4, 20 );
controls.update();

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

globalThis.pointsToHash = (points: number[][]) => {
    window.location.hash = encodeURIComponent(points.map((x) => x.join(",")).join(";"))
}

