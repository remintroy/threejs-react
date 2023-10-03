import gsap from "gsap";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

function App() {
  const canvas = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    const scene = new THREE.Scene();

    const gltfLoader = new GLTFLoader();
    gltfLoader.load("/3d2/scene.gltf", (gltfScene) => {
      scene.add(gltfScene.scene);
    });

    // //
    // const geometry = new THREE.SphereGeometry(3, 64, 64);
    // const material = new THREE.MeshStandardMaterial({ color: 0xffff00 });

    // // mesh
    // const mesh = new THREE.Mesh(geometry, material);
    // scene.add(mesh);

    // light
    const light = new THREE.PointLight(0xffffff, 500, 100);
    light.position.set(0, 10, 10);
    scene.add(light);

    // camera
    const camera = new THREE.PerspectiveCamera(50, sizes.width / sizes.height);
    camera.position.z = 10;

    scene.add(camera);

    const controls = new OrbitControls(camera, canvas.current as HTMLCanvasElement);
    controls.enableDamping = true;
    controls.autoRotate = true;

    const renderer = new THREE.WebGLRenderer({ canvas: canvas?.current as HTMLCanvasElement });

    const loop = () => {
      // camera.rotateZ(1)
      controls.update();
      renderer.setSize(sizes.width, sizes.height);
      renderer.render(scene, camera);
      window.requestAnimationFrame(loop);
    };

    loop();

    const timeLine = gsap.timeline({ defaults: { duration: 1 } });
    // timeLine.fromTo(mesh.scale, { x: 0, y: 0, z: 0 }, { x: 1, y: 1, z: 1 });
    timeLine.fromTo(canvas.current, { opacity: 0 }, { opacity: 1 });

    // let mouseDown: boolean = false;
    // window.addEventListener("mousedown", () => (mouseDown = true));
    // window.addEventListener("mouseup", () => (mouseDown = false));

    // window.addEventListener("mousemove", (e) => {
    //   if (mouseDown) {
    //     const rgb = `rgb(${[
    //       Math.round((e.pageX / window.innerWidth) * 255),
    //       Math.round((e.pageY / window.innerHeight) * 255),
    //       Math.round(150),
    //     ].join(",")})`;
    //     const newColor = new THREE.Color(rgb);
    //     gsap.to(mesh.material.color, {
    //       r: newColor.r,
    //       g: newColor.g,
    //       b: newColor.b,
    //     });
    //   }
    // });
  }, []);

  return (
    <>
      <canvas ref={canvas} className="webgl"></canvas>
    </>
  );
}

export default App;
