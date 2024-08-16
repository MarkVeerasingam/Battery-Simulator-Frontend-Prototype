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
        event.target.style.display = 'none';
    }, 0);
}

function dragEnd(event) {
    event.target.style.display = 'block';
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
    const draggable = document.getElementById(id);
    event.target.classList.remove('over');
    event.target.appendChild(draggable);
    draggable.style.display = 'block';
}
