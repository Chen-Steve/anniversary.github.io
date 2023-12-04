// Define the star properties
const stars = [];

function createStar() {
    stars.push({
        x: Math.random() * canvas.width,
        y: 0, // Starting at the top
        size: Math.random() * 3 + 1, // Size between 1 and 4
        speed: Math.random() * 2 + 1 // Increased speed between 2 and 5
    });
}

function updateStars() {
    for (let i = 0; i < stars.length; i++) {
        stars[i].y += stars[i].speed; // Ensure movement down
        if (stars[i].y > canvas.height) {
            stars.splice(i, 1); // Remove star if it goes off screen
            i--; // Adjust the index after removal
        }
    }
}

function drawStars() {
    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
    });
}

// Update the animate function
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#5f8dd7b2";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawParticles(); // Existing heart particles
    updateStars(); // Update positions of stars
    drawStars(); // Draw the stars

    animationID = requestAnimationFrame(animate); // Continuously animate
}

// Random interval generation for new stars
function generateStars() {
    const interval = Math.random() * 1000 + 500; // Random interval between 500ms and 1500ms
    createStar();
    setTimeout(generateStars, interval);
}

// Start the animations
animate();
generateStars();
