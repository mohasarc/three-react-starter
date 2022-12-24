import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export const startScene = (canvas: HTMLCanvasElement) => {
    /**
     * Core components
     */
    const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
    })

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000)
    
    const scene = new THREE.Scene()
    
    /**
     * Helpers
    */
    const controls = new OrbitControls( camera, renderer.domElement )
    //controls.update() must be called after any manual changes to the camera's transform
    camera.position.set(50, 50, 50)
    camera.lookAt(new THREE.Vector3(0, 0, 0))
    controls.update();
    
    const axesHelper = new THREE.AxesHelper(30)
    scene.add(axesHelper)

    /**
     * Add the 3D geometries elements etc..
     */
    const geometry = new THREE.BoxGeometry(15, 15, 15)
    const material = new THREE.MeshBasicMaterial({ color: 0xffff00 })
    const cube = new THREE.Mesh(geometry, material)

    scene.add(cube)


    /**
     * Start animation
     */
    const animate = () => {
        requestAnimationFrame(animate)

        cube.rotation.x += 0.01
        cube.rotation.y += 0.01

	    // required if controls.enableDamping or controls.autoRotate are set to true
	    controls.update();
        renderer.render(scene, camera)
    }

    animate()

    /**
     * Update the aspect ration when window is
     * resized so that the scene is not squished.
     */
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()

        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.render(scene, camera)
    })
}