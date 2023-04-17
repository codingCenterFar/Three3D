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

const geometry = new THREE.BufferGeometry();
const vertices = new  Float32Array([
    -1.0,-1.0,1.0,
    1.0,-1.0,1.0,
    1.0,1.0,1.0,
    1.0,1.0,1.0,
    -1.0,1.0,1.0,
    -1.0,-1.0,1.0
])
geometry.setAttribute('position',new THREE.BufferAttribute(vertices,3))

// 设置材质
const type = new THREE.MeshBasicMaterial({color:0x00ff00});

const mesh = new THREE.Mesh(geometry,type);
scene.add(mesh)


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



controls.update();

// 设置阻尼感
controls.enableDamping = true;



// 默认传入一个时间
function animate(time){
    requestAnimationFrame(animate)
    controls.update();
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




