import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import img1 from '../assets/img/textures/particles/1.png'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000)
camera.position.set(1,0,10)
scene.add(camera)

const circleGeo = new THREE.SphereBufferGeometry(3,30,30)
// const material = new THREE.MeshStandardMaterial({
//     roughness:0.1,
//     metalness:0.1,
//     wireframe:true
// })
const texture = new THREE.TextureLoader();
const result = texture.load(img1)

const pointMaterial = new THREE.PointsMaterial()
pointMaterial.map = result;
pointMaterial.alphaMap = result;
pointMaterial.transparent = true;
pointMaterial.blending = THREE.AdditiveBlending;
// 设置粒子的大小
pointMaterial.size = 0.1
pointMaterial.color.set(0xffff00)

// 这里是设置点的
const mesh = new THREE.Points(circleGeo,pointMaterial)

scene.add(mesh)
const axe = new THREE.AxesHelper(5)
scene.add(axe)


// const enviLight = new THREE.AmbientLight(0xffff00,0.5)
// scene.add(enviLight)

// const directLight = new THREE.DirectionalLight(0xffff00,0.5)
// directLight.position.set(0,1,2)
// scene.add(directLight)

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight)
document.body.appendChild(renderer.domElement);


const controls = new OrbitControls(camera,renderer.domElement)
controls.enableDamping = true;

controls.update()

function animate(){
    requestAnimationFrame(animate)
    controls.update()
    renderer.render(scene,camera)
}
animate()

window.addEventListener('resize',()=>{
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
})


