import * as THREE from 'three'

// 导入轨道控制器
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

// 导入动画库
import gsap from 'gsap'


// 导入dat.gui
import * as dat from 'dat.gui'


console.log(THREE);

// 1、创建场景
const scene = new THREE.Scene()

// 2、创建相机
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000)

// 设置相机位置
camera.position.set(1,0,10)

scene.add(camera)

// 添加物体
const material = new THREE.BoxGeometry(1,1,1);
// 设置材质
const type = new THREE.MeshBasicMaterial({color:0x00ff00});

// 根据几何体和材质创建物体
const cube = new THREE.Mesh(material,type);

// cue.position.set是设置位置的
// cube.position.set(5,0,0)
// cube.scale.set(2,1,1)
scene.add(cube)


const gui = new dat.GUI();
gui.add(cube.position,"x").min(0).max(5).step(0.01).name("移动x轴进行")

const params = {
    color:"#ffff00"
}
gui.addColor(params,'color').onChange((value)=>{
    cube.material.color.set(value)
    // console.log(e);
})

gui.add(cube,'visible').name("控制显隐藏")
// 设置按钮触发某个事件
const fn = {
    "fn":()=>{
        console.log(222222222);
        gsap.to(cube.position,{x:5,duration:10})
    }
}
gui.add(fn,'fn').name("控制函数")

// 初始化渲染器
const renderer = new THREE.WebGLRenderer()
// 设置渲染的尺寸大小
renderer.setSize(window.innerWidth,window.innerHeight);
// console.log(renderer)

// 添加到body中
document.body.appendChild(renderer.domElement);

// 使用渲染器，将场景渲染出来
// renderer.render(scene,camera)

const controls = new OrbitControls(camera,renderer.domElement)


// 添加坐标轴辅助器
const helper = new THREE.AxesHelper(5);
scene.add(helper)


// 创建一个clock
const clock = new THREE.Clock()
clock.startTime = 100;

controls.update();

// 设置阻尼感
controls.enableDamping = true;

// 设置动画
// 设置cube的位置到5，所需要用5s时间
// let mytest = gsap.to(cube.position,{x:5,duration:5,
//     repeat:2,
//     onComplete:()=>{
//     console.log(1111111111111111);
// }})

gsap.to(cube.rotation,{x:5,duration:5,ease:'power1.inOut'})



window.addEventListener('dblclick',()=>{
    if(!document.fullscreenElement){
        renderer.domElement.requestFullscreen()
    }
    else {
        document.exitFullscreen();
    }
})

// 默认传入一个时间
function animate(time){
    // 获取时钟运行的总时长
    let time2 = clock.getElapsedTime()

    // 两次获取时间的间隔时间
    let detailTime = clock.getDelta()
    requestAnimationFrame(animate)
    controls.update();
    // cube.rotation.x +=0.1
	renderer.render( scene, camera );
}
animate()



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




