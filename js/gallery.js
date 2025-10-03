const collage = document.querySelector('.collage');
const photos = collage.querySelectorAll('img');

const modal = document.querySelector('.modal');

let currentIndex;

let touchStartX = null;
let currentTranslate = 0;
let isDragging = false;
const modalImage = modal.querySelector('#modalImage');

photos.forEach(photo => {
    const id = photo.id;
    const src = photo.src;
    photo.addEventListener('click', function() {
        activateModal(id, src);
    });
});


function activateModal(id, src) {
    modal.classList.add('active');
    modal.querySelector('#modalImage').src = src;
    currentIndex = Number(id);

    updateText();

    document.addEventListener('keydown', handleKeyDown);
}

function swapImage(shiftIndex) {
    currentIndex += shiftIndex;

    if(currentIndex < 0) {
        currentIndex = photos.length - 1;
    } else if (currentIndex > photos.length - 1) {
        currentIndex = 0;
    }

    modal.querySelector('#modalImage').src = photos[currentIndex].src;
    updateText();
}

function closeModal() {
    modal.classList.remove('active');
}

function updateText() {
    const modalCounter = modal.querySelector('.modal-counter');
    const currentPicture = modalCounter.querySelector('#currentIndex');
    const totalImages = modalCounter.querySelector('#totalImages');

    const modalInfo = modal.querySelector('.modal-info')
    const title = modalInfo.querySelector('.modal-title');
    const description = modalInfo.querySelector('.modal-description');

    currentPicture.innerText = currentIndex + 1;
    totalImages.innerText = photos.length;

    title.innerText = photos[currentIndex].dataset.title;
    description.innerText = photos[currentIndex].alt;
}   


// ------------ ADD EVENT LISTENERS ------------

//Modal button functionality
const navButtons = modal.querySelectorAll('.modal-nav-btn');
navButtons.forEach(button => {
    const shiftIndex = Number(button.dataset.shift);

    button.addEventListener('click', function() {
        swapImage(shiftIndex);
    })
});

modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        closeModal();
    }
})


// Keyboard navigation
function handleKeyDown(e) {
    if (!modal.classList.contains('active')) return;
    if (e.key === 'ArrowLeft') {
        swapImage(-1);
    } else if (e.key === 'ArrowRight') {
        swapImage(1);
    } else if (e.key === 'Escape') {
        closeModal();
    }
}

// Remove keydown listener when modal closes
const originalCloseModal = closeModal;
closeModal = function() {
    document.removeEventListener('keydown', handleKeyDown);
    originalCloseModal();
}

// Swipe-to-slide functionality
function handleTouchStart(e) {
    if (e.touches && e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        isDragging = true;
        modalImage.style.transition = 'none';
    }
}

function handleTouchMove(e) {
    if (!isDragging) return;
    const touchX = e.touches[0].clientX;
    const diffX = touchX - touchStartX;
    currentTranslate = diffX;
    modalImage.style.transform = `translateX(${diffX}px)`;
}

function handleTouchEnd(e) {
    if (!isDragging) return;
    isDragging = false;
    modalImage.style.transition = 'transform 0.3s';
    if (Math.abs(currentTranslate) > 100) {
        const direction = currentTranslate < 0 ? 1 : -1;
        // Slide out in the direction of the swipe
        modalImage.style.transform = `translateX(${direction * -window.innerWidth}px)`;
        setTimeout(() => {
            // Instantly move new image in from the opposite side
            swapImage(direction);
            modalImage.style.transition = 'none';
            modalImage.style.transform = `translateX(${direction * window.innerWidth}px)`;
            setTimeout(() => {
                // Animate new image to center
                modalImage.style.transition = 'transform 0.3s';
                modalImage.style.transform = 'translateX(0)';
            }, 20);
        }, 300);
    } else {
        // Snap back
        modalImage.style.transform = 'translateX(0)';
    }
    currentTranslate = 0;
}

modal.addEventListener('touchstart', handleTouchStart);
modal.addEventListener('touchmove', handleTouchMove);
modal.addEventListener('touchend', handleTouchEnd);
