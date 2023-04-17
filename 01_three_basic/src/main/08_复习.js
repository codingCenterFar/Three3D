import * as THREE from 'three'
import gsap from 'gsap';

import * as dat from 'dat.gui'

// 导入轨道控制器
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000)
const scene = new THREE.Scene();

camera.position.set(1,0,10)

scene.add(camera)

const geometry = new THREE.ConeGeometry(2,10,22)
const matirail = new THREE.MeshBasicMaterial({color:0x00ff00})
const cube = new THREE.Mesh(geometry,matirail);

const adjust = {
    color: "#ffff00"
}

const gui =new  dat.GUI()
gui.add(cube.position,'x').min(0).max(10).name("控制x").step(0.01)
gui.addColor(adjust,'color').onChange((value)=>{
    cube.material.color.set(value)
})

scene.add(cube)




const renderer = new THREE.WebGLRenderer()
// 添加坐标轴辅助器
const helper = new THREE.AxesHelper(5);
scene.add(helper)

const controls = new OrbitControls(camera,renderer.domElement);
camera.add(controls)

controls.enableDamping = true

renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement)

gsap.to(cube.rotation,{x:10,repeat:-1,duration:10,ease:'power1.inOut'})
gsap.to(cube.rotation,{z:5,repeat:-1,duration:10,ease:'power1.inOut'})

controls.update();
function tsg(){
    renderer.render(scene,camera)
    controls.update()
    requestAnimationFrame(tsg)
}
tsg()


// 监听画面的变化，更新渲染画面
window.addEventListener('resize',()=>{
    // 更新摄像头
    camera.aspect = window.innerWidth/window.innerHeight;

    // 更新摄像机的投影矩阵
    camera.updateProjectionMatrix();

    // 更新渲染的尺寸大小
    renderer.setSize(window.innerWidth,window.innerHeight);

    // 设置渲染器的像素比：使得配置好不同的屏幕设备
    renderer.setPixelRatio(window.devicePixelRatio);
})



