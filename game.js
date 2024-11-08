// game.js
let scene, camera, renderer, controls;
let blockSize = 5;
let blocks = [];

function init() {
    // Set up scene, camera, and renderer
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Create blocks (like Minecraft's cubes)
    createWorld();

    // Set camera position
    camera.position.set(0, 5, 20);
    controls = new THREE.OrbitControls(camera, renderer.domElement);

    // Call the render loop
    animate();
}

function createWorld() {
    // Create a grid of blocks
    for (let x = -5; x < 5; x++) {
        for (let z = -5; z < 5; z++) {
            createBlock(x * blockSize, 0, z * blockSize);
        }
    }
}

function createBlock(x, y, z) {
    // Create a simple cube block
    const geometry = new THREE.BoxGeometry(blockSize, blockSize, blockSize);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const block = new THREE.Mesh(geometry, material);

    block.position.set(x, y, z);
    scene.add(block);
    blocks.push(block);
}

function animate() {
    requestAnimationFrame(animate);

    // Rotate the blocks for some visual effect
    blocks.forEach(block => {
        block.rotation.x += 0.01;
        block.rotation.y += 0.01;
    });

    controls.update();
    renderer.render(scene, camera);
}

// Handle window resizing
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

init();
