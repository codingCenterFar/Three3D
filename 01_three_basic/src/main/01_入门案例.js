import * as THREE from 'three'

console.log(THREE);

// 1、创建场景
const scene = new THREE.Scene()

// 2、创建相机
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000)

// 设置相机位置
camera.position.set(1,0,10)

scene.add(camera)

// 添加物体
const material = new THREE.BoxGeometry(10,10,10);
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

function animate(){
    requestAnimationFrame(animate);
    cube.rotation.x +=0.01;
    cube.rotation.y +=0.02;
    renderer.render(scene,camera)
}
animate()




