// Define the star properties
const stars = [];
let accumulatedSnow = 0;
const maxLevels = 3; 

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
        stars[i].y += stars[i].speed;
        if (stars[i].y > canvas.height) {
            stars.splice(i, 1);
            accumulatedSnow++;
            i--;
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

function drawSnowPile() {
    let level = Math.min(Math.floor(accumulatedSnow / 10), maxLevels); // Change 10 to adjust accumulation speed

    // Adjust the height and slope based on the level
    let height = level * 20; // Change 20 to adjust the height of each level
    let slope = 20 * level; // Adjust the slope of each level

    ctx.beginPath();
    ctx.moveTo(0, canvas.height);
    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(canvas.width, canvas.height - height);
    ctx.quadraticCurveTo(canvas.width / 2, canvas.height - height - slope, 0, canvas.height - height);
    ctx.closePath();
    ctx.fillStyle = 'white';
    ctx.fill();
}

// Update the animate function
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#5f8dd7b2";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawParticles(); // Existing heart particles
    updateStars(); // Update positions of stars
    drawStars(); // Draw the stars
    drawSnowPile(); // Draw the snow pile

    animationID = requestAnimationFrame(animate);
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
