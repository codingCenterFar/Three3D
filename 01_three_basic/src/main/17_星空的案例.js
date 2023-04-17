import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import img1 from '../assets/img/textures/particles/1.png'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000)
camera.position.set(1,0,10)
scene.add(camera)



const partical = new THREE.BufferGeometry();
const count = 5000;

//设置缓冲区数组
const positions = new Float32Array(count*3);

//设置颜色数组
const colors = new Float32Array(count*3);

for(let i=0;i<count;i++){
    positions[i] = Math.random()*5;
    colors[i] = Math.random();
}
partical.setAttribute('position',new THREE.BufferAttribute(positions,3))

partical.setAttribute('color',new THREE.BufferAttribute(colors,3))

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


// 设置启用顶点的颜色
pointMaterial.vertexColors = true;

// 这里是设置点的
const mesh = new THREE.Points(partical,pointMaterial)

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
    renderer.render(scene,camera)
}
animate()

window.addEventListener('resize',()=>{
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
})


