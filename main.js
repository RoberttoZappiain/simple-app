// script.js
window.onload = function() {
    const imgElement = document.querySelector('.draggable');
    const contactForm = document.getElementById('contactForm');
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    let velocityX = 0, velocityY = 0;
    let isDragging = false;

    imgElement.onmousedown = dragMouseDown;

    imgElement.onclick = function() {
        if (!isDragging) {
            contactForm.style.display = contactForm.style.display === 'block' ? 'none' : 'block';
            if (contactForm.style.display === 'block') {
                document.onmousemove = null;  // Prevent dragging when the form is open
            } else {
                requestAnimationFrame(updatePosition);
            }
        }
    };

    function dragMouseDown(e) {
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
        isDragging = true;
    }

    function elementDrag(e) {
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        velocityX = -pos1;
        velocityY = -pos2;
        imgElement.style.top = (imgElement.offsetTop - pos2) + "px";
        imgElement.style.left = (imgElement.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
        isDragging = false;
        requestAnimationFrame(updatePosition);
    }

    function updatePosition() {
        if (!isDragging) {
            let top = imgElement.offsetTop + velocityY;
            let left = imgElement.offsetLeft + velocityX;

            if (top <= 0 || top >= window.innerHeight - imgElement.offsetHeight) {
                velocityY = -velocityY * 0.9; // Invert and reduce velocity for bounce effect
                top = Math.max(0, Math.min(top, window.innerHeight - imgElement.offsetHeight));
            }

            if (left <= 0 || left >= window.innerWidth - imgElement.offsetWidth) {
                velocityX = -velocityX * 0.9; // Invert and reduce velocity for bounce effect
                left = Math.max(0, Math.min(left, window.innerWidth - imgElement.offsetWidth));
            }

            imgElement.style.top = top + "px";
            imgElement.style.left = left + "px";

            velocityY *= 0.95; // Gradually reduce velocity
            velocityX *= 0.95;

            if (Math.abs(velocityX) > 0.1 || Math.abs(velocityY) > 0.1) {
                requestAnimationFrame(updatePosition);
            }
        }
    }
}
