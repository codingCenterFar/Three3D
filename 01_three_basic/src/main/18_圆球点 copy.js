import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import img1 from '../assets/img/textures/particles/1.png'


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000)

camera.position.set(0,0,10)

const renderer = new THREE.WebGLRenderer();

document.body.appendChild(renderer.domElement);
renderer.setSize(window.innerWidth,window.innerHeight)

const sphere = new THREE.SphereBufferGeometry(3,20,20)

const TextureLoader = new THREE.TextureLoader();
const loader = TextureLoader.load(img1)


const material = new THREE.MeshBasicMaterial({
    wireframe:true,
    color:'yellow'
})

const mesh = new THREE.Points(sphere,material);

scene.add(mesh)

const controls = new OrbitControls(camera,renderer.domElement);
controls.update()

const axios = new THREE.AxesHelper(10);
scene.add(axios)

renderer.render(scene,camera)
animate()

function animate(){
    requestAnimationFrame(animate)
    controls.update();
    renderer.render(scene,camera)
}

window.addEventListener('resize',()=>{
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window,innerWidth,window.innerHeight)

})





