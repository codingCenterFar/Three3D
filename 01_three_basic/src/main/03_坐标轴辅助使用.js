import * as THREE from 'three'

// 导入轨道控制器
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

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
scene.add(cube)

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
function animate(){
    requestAnimationFrame(animate)
    controls.update();
	renderer.render( scene, camera );
}
animate()




