

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

// ORIGAMIS
gsap.to(".origami:nth-child(1)", {
    duration: 20,
    rotation: 360,
    repeat: -1,
    ease: "linear"
});

gsap.to(".origami:nth-child(2)", {
    duration: 15,
    rotation: -360,
    repeat: -1,
    ease: "linear"
});

gsap.to(".origami:nth-child(3)", {
    duration: 30,
    rotation: -180,
    repeat: -1,
    ease: "linear"
});

gsap.to(".origami:nth-child(4)", {
    duration: 10,
    rotation: 180,
    repeat: -1,
    ease: "linear"
});

gsap.to(".origami:nth-child(5)", {
    duration: 20,
    rotation: -360,
    repeat: -1,
    ease: "linear"
});

function updateParticles() {
    particles.forEach(p => {
        p.t += p.speedT;
        const position = heartShape(p.t, p.scale);
        p.x = position.x + canvas.width / 2;
        p.y = -position.y + canvas.height / 2;

        // Bouncing off the edges
        if (p.x < 0 || p.x > window.innerWidth) p.speedT = -p.speedT;
        if (p.y < 0 || p.y > window.innerHeight) p.speedT = -p.speedT;
    });
}

// Function to get the current height of the snow pile
function getCurrentSnowPileHeight() {
    let level = Math.min(Math.floor(accumulatedSnow / 10), maxLevels); // Use the same calculation as in drawSnowPile
    return level * 20; // Return the height of the snow pile
}

document.querySelectorAll('.origami').forEach(origami => {
    Draggable.create(origami, {
        type: "x,y",
        bounds: "#origami-container",
        onDrag: function() {
            let snowPileHeight = getCurrentSnowPileHeight();
            let origamiBottom = this.target.getBoundingClientRect().bottom;

            // Check if the origami element touches the snow
            if (window.innerHeight - origamiBottom <= snowPileHeight) {
                this.endDrag(); // Stop dragging
            }
        },
        onDragStart: function() {
            this.target.style.zIndex = 1000;
        },
        onDragEnd: function() {
            this.target.style.zIndex = 1;
        }
    });
});

// GSAP Draggable
gsap.registerPlugin(Draggable);

// Make each origami element draggable
document.querySelectorAll('.origami').forEach(origami => {
    Draggable.create(origami, {
        type: "x,y",
        bounds: "#origami-container",
        onDragStart: function() {
            this.target.style.zIndex = 1000;
        },
        onDragEnd: function() {
            this.target.style.zIndex = 1;
        }
    });
});

// GALLERY
document.addEventListener("DOMContentLoaded", function() {
    const images = document.querySelectorAll('.gallery-image');
    let currentIndex = 0;

    function showImage(index) {
        const offset = index * -100; // Calculate the transform offset
        document.querySelector('.gallery').style.transform = `translateX(${offset}%)`; // Apply the transform
    }

    document.getElementById('prev').addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            showImage(currentIndex);
        }
    });

    document.getElementById('next').addEventListener('click', () => {
        if (currentIndex < images.length - 1) {
            currentIndex++;
            showImage(currentIndex);
        }
    });

    // Initialize the gallery to show the first image
    showImage(currentIndex);
});

// CAROUSEL
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel__image');
const totalSlides = slides.length;
const imagesContainer = document.querySelector('.carousel__images');
let slideInterval;

function showSlide(index) {
    // Disable transition for instant change when wrapping around
    if (index >= totalSlides) {
      imagesContainer.style.transition = 'none';
      index = 0;
    } else if (index < 0) {
      imagesContainer.style.transition = 'none';
      index = totalSlides - 1;
    } else {
      // Re-enable transitions for normal slide behavior
      imagesContainer.style.transition = 'transform 0.5s ease';
    }
  
    // Move the image container
    const offset = -index * 100; // assuming each image takes up 100% of the container width
    imagesContainer.style.transform = `translateX(${offset}%)`;
  
    // Update the current slide index
    currentSlide = index;
  }
  
  // Add an event listener to re-enable transitions after disabling them
  imagesContainer.addEventListener('transitionend', () => {
    imagesContainer.style.transition = 'transform 0.5s ease';
  });
  

  function moveSlide(direction) {
    // Clear the interval to stop auto-swiping
    clearInterval(slideInterval);
  
    // Move to the next or previous slide
    showSlide(currentSlide + direction);
  
    // Optionally restart the auto-swiping after a manual button click
    // If you don't want to auto-swipe after clicking a button, remove this line
    startSlideShow();
  }

// Auto-play functionality
function startSlideShow() {
  slideInterval = setInterval(() => {
    showSlide(currentSlide + 1);
  }, 3000); // Change slide every 3 seconds
}


// Start the slideshow
startSlideShow();

// Event listeners for next/previous buttons
document.querySelector('.carousel__button--left').addEventListener('click', () => moveSlide(-1));
document.querySelector('.carousel__button--right').addEventListener('click', () => moveSlide(1));

// Initialize the first slide
showSlide(currentSlide);


