import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

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

const geometry = new THREE.SphereGeometry(1, 8, 4);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
let meshes: THREE.Mesh[] = [];

globalThis.addPoints = (points: number[][]) => {
  for (const [x, y, z] of points) {
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(x, y, z);
    cube.scale.set(0.005, 0.005, 0.005);
    scene.add(cube);
    meshes.push(cube);
  }
};

globalThis.removeAllPoints = () => {
  for (const mesh of meshes) {
    scene.remove(mesh);
  }
}

globalThis.setPoints = (points: number[][]) => {
  globalThis.removeAllPoints();
  globalThis.addPoints(points);
};

camera.position.z = 5;

const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 1, 5);
controls.update();

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
