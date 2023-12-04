// GSAP ANIMATIONS
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

document.querySelectorAll('.origami').forEach(origami => {
    origami.addEventListener('mouseenter', () => {
        gsap.to(origami, {
            scale: 1.5,
            x: () => Math.random() * 100 - 50,
            y: () => Math.random() * 100 - 50,
            duration: 1,
            ease: "power1.out"
        });
    });
    origami.addEventListener('mouseleave', () => {
        gsap.to(origami, { scale: 1, duration: 1, ease: "power1.out" });
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
