import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import img1 from '../assets/img/textures/particles/13.png'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000)
camera.position.set(1,0,10)
scene.add(camera)

const partical = new THREE.BufferGeometry()
const texture = new THREE.TextureLoader()
const loadImg = texture.load(img1)

const count = 5000;
const postoins = new Float32Array(count*3);
for(let i=0;i<count;i++){
    postoins[i] = (Math.random()-0.5)*100;
}
partical.setAttribute('position',new THREE.BufferAttribute(postoins,3));

const material = new THREE.PointsMaterial()
material.size = 0.5
material.map = loadImg;
material.alphaMap = loadImg;
material.blending = THREE.AdditiveBlending
material.transparent = true;
// material.vertexColors = true;

const mesh = new THREE.Points(partical,material)
scene.add(mesh)

const axe = new THREE.AxesHelper(5)
scene.add(axe)



const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight)
document.body.appendChild(renderer.domElement);


const controls = new OrbitControls(camera,renderer.domElement)
controls.enableDamping = true;

controls.update()

function animate(){
    requestAnimationFrame(animate)
    controls.update()
    mesh.rotation.x += 0.1
    renderer.render(scene,camera)
}
animate()

window.addEventListener('resize',()=>{
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
})


