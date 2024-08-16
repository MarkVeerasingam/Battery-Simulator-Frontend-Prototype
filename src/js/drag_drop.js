const draggables = document.querySelectorAll('.draggable');
const boxes = document.querySelectorAll('.box');

draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', dragStart);
    draggable.addEventListener('dragend', dragEnd);
});

boxes.forEach(box => {
    box.addEventListener('dragover', dragOver);
    box.addEventListener('dragenter', dragEnter);
    box.addEventListener('dragleave', dragLeave);
    box.addEventListener('drop', drop);
});

function dragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.id);
    setTimeout(() => {
        event.target.classList.add('hide');  // Hide the dragged item during drag
    }, 0);
}

function dragEnd(event) {
    event.target.classList.remove('hide');  // Unhide the item after drag
}

function dragOver(event) {
    event.preventDefault();
}

function dragEnter(event) {
    event.preventDefault();
    event.target.classList.add('over');
}

function dragLeave(event) {
    event.target.classList.remove('over');
}

function drop(event) {
    event.preventDefault();
    const id = event.dataTransfer.getData('text');
    const originalDraggable = document.getElementById(id);
    const box = event.target.closest('.box');

    // Handle dropping into box1 from box2 (delete the item)
    if (box.id === 'box1' && originalDraggable.parentNode.id === 'box2') {
        originalDraggable.remove();
    }

    // Handle dropping into box2 from box1 (clone the item)
    if (box.id === 'box2' && originalDraggable.parentNode.id === 'box1') {
        const clone = originalDraggable.cloneNode(true);
        clone.id = id + '-clone-' + Date.now(); // Ensure a unique ID for the clone
        clone.classList.remove('hide');
        clone.classList.add('draggable');
        clone.draggable = true;

        // Add event listeners to the cloned element to make it draggable
        clone.addEventListener('dragstart', dragStart);
        clone.addEventListener('dragend', dragEnd);

        const afterElement = getDragAfterElement(box, event.clientY);
        if (afterElement == null) {
            box.appendChild(clone);
        } else {
            box.insertBefore(clone, afterElement);
        }
    }

    // Handle reordering within box2
    if (box.id === 'box2' && originalDraggable.parentNode.id === 'box2') {
        const afterElement = getDragAfterElement(box, event.clientY);
        if (afterElement == null) {
            box.appendChild(originalDraggable);
        } else {
            box.insertBefore(originalDraggable, afterElement);
        }
    }

    event.target.classList.remove('over');
}

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;

        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

// Adding 'dragging' class when dragging starts
document.addEventListener('dragstart', (event) => {
    event.target.classList.add('dragging');
});

// Removing 'dragging' class when dragging ends
document.addEventListener('dragend', (event) => {
    event.target.classList.remove('dragging');
});
