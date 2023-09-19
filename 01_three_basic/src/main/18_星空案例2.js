import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import img1 from '../assets/img/textures/钻石.png'


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000)

camera.position.set(0,0,30)

const renderer = new THREE.WebGLRenderer();

document.body.appendChild(renderer.domElement);
renderer.setSize(window.innerWidth,window.innerHeight)

// const geoArray = new THREE.Float32BufferAttribute(1000*3);
const geoArray = new Float32Array(5000*3);
const colors = new Float32Array(5000*3)
for(let i=0;i<5000;i++){
    geoArray[i] = (Math.random()-0.5)*100
    colors[i] = Math.random()
}

const points = new THREE.BufferGeometry()
points.setAttribute('position',new THREE.BufferAttribute(geoArray,3))
points.setAttribute('color',new THREE.BufferAttribute(colors,3))

const TextureLoader = new THREE.TextureLoader();
const loader = TextureLoader.load(img1)


const material = new THREE.PointsMaterial()
material.map = loader;
material.alphaMap = loader;

material.transparent = true;
material.blending =THREE.AdditiveBlending

material.size = 0.5
material.color.set(0xffff00)
material.vertexColors = true;

const mesh = new THREE.Points(points,material);

scene.add(mesh)

const controls = new OrbitControls(camera,renderer.domElement);
controls.update()

const axios = new THREE.AxesHelper(10);
scene.add(axios)

renderer.shadowMap.enabled = true;

renderer.render(scene,camera)


const clock = new THREE.Clock()

function animate(){
    let time = clock.getElapsedTime()
    console.log(time);
    mesh.rotation.x = time * 0.3;
    
    controls.update();
    renderer.render(scene,camera)
    requestAnimationFrame(animate)
}
animate()
window.addEventListener('resize',()=>{
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window,innerWidth,window.innerHeight)

})





