import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import img1 from '../assets/img/textures/钻石.png'


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000)
 
camera.position.set(0,0,10)


const paricalTextureLoader = new THREE.TextureLoader();
let load = paricalTextureLoader.load(img1)

const params = {
    count:5000,
    radius:5,
    branch:3,
    color:'#ffffff',
    size:0.1
}
   
let geometry = null;
let material = null;
let mesh = null;
const generateGalaxyz = ()=>{
    geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(params.count*3);
    const colors = new Float32Array(params.count*3)
    for(let i=0;i<params.count;i++){

        // 当前分支应该在哪个角度
        const branchAngle = (i%params.branch)*((2*Math.PI)/params.branch)
  
        let distance = Math.random()*params.radius;

        let randomX =Math.pow(Math.random()*2-1,3)
        let randomY = Math.pow(Math.random()*2-1,3)
        let randomZ = Math.pow(Math.random()*2-1 ,3)

        const current = i*3;
        positions[current] = Math.cos(branchAngle+distance)*distance+randomX;
        positions[current+1] = 0+randomY;
        positions[current+2] = Math.sin(branchAngle+distance)*distance+randomZ;   
        colors[i] = Math.random()
    }
    geometry.setAttribute('position',new THREE.BufferAttribute(positions,3))
    geometry.setAttribute('color',new THREE.BufferAttribute(colors,3))
    material = new THREE.PointsMaterial({
        size:params.size,
        color:params.color,
        vertexColors:true,
        sizeAttenuation:true,
        blending:THREE.AdditiveBlending,
        map:load,
        alphaMap:load,
        transparent:true
    });
    mesh = new THREE.Points(geometry,material)
    scene.add(mesh) 
}

generateGalaxyz()



const renderer = new THREE.WebGLRenderer();

document.body.appendChild(renderer.domElement);
renderer.setSize(window.innerWidth,window.innerHeight)

const controls = new OrbitControls(camera,renderer.domElement);
controls.update()

const axios = new THREE.AxesHelper(10);
scene.add(axios)

renderer.shadowMap.enabled = true;

renderer.render(scene,camera)


const clock = new THREE.Clock()

function animate(){
    // let time = clock.getElapsedTime()
    // console.log(time);
    // mesh.rotation.x = time * 0.3;
    
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





