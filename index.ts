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

let meshes: THREE.Mesh[] = [];

function colorBetween(color1: number, color2: number, percent: number) {
  const r1 = (color1 >> 16) & 0xff;
  const g1 = (color1 >> 8) & 0xff;
  const b1 = color1 & 0xff;

  const r2 = (color2 >> 16) & 0xff;
  const g2 = (color2 >> 8) & 0xff;
  const b2 = color2 & 0xff;

  const r = Math.round(r1 + (r2 - r1) * percent);
  const g = Math.round(g1 + (g2 - g1) * percent);
  const b = Math.round(b1 + (b2 - b1) * percent);

  return (r << 16) | (g << 8) | b;
}

globalThis.setPoints = (points: number[][]) => {
  for (const mesh of meshes) {
    scene.remove(mesh);
  }

  // we can make a gradient effect from purple to blue from top to bottom
  const sortedPoints = points.sort((a, b) => b[1] - a[1]);
  const topY = sortedPoints[0][1];
  const bottomY = sortedPoints[sortedPoints.length - 1][1];

  for (const [x, y, z] of points) {
    const yPercent = (y - bottomY) / (topY - bottomY);
    const material = new THREE.MeshBasicMaterial({ color: colorBetween(0x0000ff, 0xff00ff, yPercent) })
    const cube = new THREE.Mesh(geometry, material);
    console.log(yPercent);
    cube.position.set(x, y, z);
    cube.scale.set(0.005, 0.005, 0.005);
    scene.add(cube);
    meshes.push(cube);
  }
};

camera.position.z = 5;

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
camera.position.set(0, 1, 5);
controls.update();

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  controls.update();
}
animate();
