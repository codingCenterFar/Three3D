import * as THREE from 'three'

// 导入轨道控制器
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

// 导入动画库
import gsap from 'gsap'
import img from  '../assets/img/log.png'

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


// 设置加载管理器
const manager = new THREE.LoadingManager(()=>{
    console.log("完成而来");
})



// 导入纹理
const textureLoader = new THREE.TextureLoader(manager)
// 这里可以载入一些图片
const load = textureLoader.load(img,()=>{
    console.log("完成");
},(value)=>{
    console.log(value);
})


const cubeGeometry = new THREE.BoxBufferGeometry(1,1,1)


const material = new THREE.MeshStandardMaterial(
    {
        color:'blue',
        // 纹理的设置
        map:load,
        // 设置材质可以是透明的
        transparent:true,
        roughness:1,
        // metalness:1
    }
    )

const cube = new THREE.Mesh(cubeGeometry,material);

scene.add(cube);


// 加入环境光
const light = new THREE.AmbientLight(0xffffff,0.5);
scene.add(light)

// 直线光源的设置
const directLight = new THREE.DirectionalLight(0xffffff,0.5)
directLight.position.set(0,1,2)
scene.add(directLight)



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



