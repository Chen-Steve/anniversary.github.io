// GASP ANIMATION
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

function moveOrigami(element, duration) {
    gsap.to(element, {
        x: () => Math.random() * window.innerWidth - window.innerWidth / 2,
        y: () => Math.random() * window.innerHeight - window.innerHeight / 2,
        duration: duration,
        ease: "power1.inOut",
        onComplete: () => {
            wrapAroundScreen(element);
            moveOrigami(element, duration);
        }
    });
}

function wrapAroundScreen(element) {
    const rect = element.getBoundingClientRect();
    let offsetX = 0;
    let offsetY = 0;

    if (rect.left > window.innerWidth) {
        offsetX = -window.innerWidth - rect.width;
    } else if (rect.right < 0) {
        offsetX = window.innerWidth + rect.width;
    }

    if (rect.top > window.innerHeight) {
        offsetY = -window.innerHeight - rect.height;
    } else if (rect.bottom < 0) {
        offsetY = window.innerHeight + rect.height;
    }

    gsap.set(element, {
        x: `+=${offsetX}`,
        y: `+=${offsetY}`,
    });
}

document.querySelectorAll('.origami').forEach(origami => {
    moveOrigami(origami, 10); // Duration of each move in seconds
});

document.querySelectorAll('.origami').forEach(origami => {
    origami.addEventListener('mouseenter', (e) => {
        const boundingRect = origami.getBoundingClientRect();
        const origamiCenter = {
            x: boundingRect.left + boundingRect.width / 2,
            y: boundingRect.top + boundingRect.height / 2
        };
        const angleDeg = Math.atan2(e.clientY - origamiCenter.y, e.clientX - origamiCenter.x) * 180 / Math.PI;

        gsap.to(origami, {
            x: "+=" + 100 * Math.cos(angleDeg * Math.PI / 180),
            y: "+=" + 100 * Math.sin(angleDeg * Math.PI / 180),
            scale: 1.5,
            duration: 1,
            ease: "power1.out"
        });
    });

    origami.addEventListener('mouseleave', () => {
        gsap.to(origami, { scale: 1, duration: 1, ease: "power1.out" });
    });
});


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
