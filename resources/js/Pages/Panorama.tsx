import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface Panorama360Props {
    imagePath: string;
}

const Panorama360: React.FC<Panorama360Props> = ({ imagePath }) => {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Create a scene, camera, and renderer
        const scene = new THREE.Scene(); //scene dihgunakan untuk membuat bola
        const camera = new THREE.PerspectiveCamera( // kamera membuat object bergerak kiri kanan atas bawah
            100, //view
            window.innerWidth / window.innerHeight,
            0.1,
            1000 //aspect ratio
        );
        const renderer = new THREE.WebGLRenderer(); // digunakan ngerender dari scene dan kamera yg dibuat
        renderer.setSize(window.innerWidth, window.innerHeight);
        if (mountRef.current) {
            mountRef.current.appendChild(renderer.domElement);
        }

        // Load texture and apply it to a sphere geometry
        const textureLoader = new THREE.TextureLoader(); // ngubah gambar menjadi bentukan bola atau stitch gambar
        const geometry = new THREE.SphereGeometry(500, 60, 40); // bentukan bola
        const material = new THREE.MeshBasicMaterial({ 
            map: textureLoader.load(imagePath), // load file gambar dan menyimpan gambar
            side: THREE.DoubleSide,
        });
        const sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);

        // Adjust camera to be inside the sphere
        camera.position.set(0, 0, 0.1);
        sphere.rotation.y = Math.PI;

        // Controls for camera rotation
        let isUserInteracting = false;
        let onMouseDownMouseX = 0,
            onMouseDownMouseY = 0;
        let lon = 0,
            lat = 0;
        let onMouseDownLon = 0,
            onMouseDownLat = 0;

        const onDocumentMouseDown = (event: MouseEvent) => {
            event.preventDefault();
            isUserInteracting = true;

            onMouseDownMouseX = event.clientX;
            onMouseDownMouseY = event.clientY;

            onMouseDownLon = lon;
            onMouseDownLat = lat;
        };

        const onDocumentMouseMove = (event: MouseEvent) => {
            if (isUserInteracting) {
                lon =
                    (onMouseDownMouseX - event.clientX) * 0.1 + onMouseDownLon;
                lat =
                    (event.clientY - onMouseDownMouseY) * 0.1 + onMouseDownLat;
            }
        };

        const onDocumentMouseUp = () => {
            isUserInteracting = false;
        };

        const onDocumentMouseWheel = (event: WheelEvent) => {
            camera.fov += event.deltaY * 0.05;
            camera.updateProjectionMatrix();
        };

        const animate = () => {
            if (!isUserInteracting) {
                // Automatically pan horizontally by increasing 'lon' when user is not interacting
                lon += 0.04; // Adjust this value to control panning speed
            }

            lat = Math.max(-85, Math.min(85, lat));
            const phi = THREE.MathUtils.degToRad(90 - lat);
            const theta = THREE.MathUtils.degToRad(lon);

            camera.lookAt(
                500 * Math.sin(phi) * Math.cos(theta),
                500 * Math.cos(phi),
                500 * Math.sin(phi) * Math.sin(theta)
            );

            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        };

        if (mountRef.current) {
            document.addEventListener("mousedown", onDocumentMouseDown, false);
            document.addEventListener("mousemove", onDocumentMouseMove, false);
            document.addEventListener("mouseup", onDocumentMouseUp, false);
            document.addEventListener("wheel", onDocumentMouseWheel, false);

            animate();

            // Cleanup
            return () => {
                document.removeEventListener(
                    "mousedown",
                    onDocumentMouseDown,
                    false
                );
                document.removeEventListener(
                    "mousemove",
                    onDocumentMouseMove,
                    false
                );
                document.removeEventListener(
                    "mouseup",
                    onDocumentMouseUp,
                    false
                );
                document.removeEventListener(
                    "wheel",
                    onDocumentMouseWheel,
                    false
                );
                if (mountRef.current) {
                    mountRef.current.removeChild(renderer.domElement);
                }
            };
        }
    }, [imagePath]);

    return <div ref={mountRef} style={{ width: "100vw", height: "100vh" }} />;
};

export default Panorama360;
