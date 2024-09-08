document.addEventListener('DOMContentLoaded', function () {
    // Initialize Sortable for box1 and box2
    const box1 = document.getElementById('box1');
    const box2 = document.getElementById('box2');

    // Function to create a new draggable item
    function createDraggableItem(id, text) {
        const item = document.createElement('p');
        item.className = 'draggable';
        item.draggable = true;
        item.id = id;
        item.textContent = text;
        return item;
    }

    // Add items to box1 dynamically
    const items = [
        { id: 'item1', text: 'Discharge at C/5 for 10 hours or until 2.5V' },
        { id: 'item2', text: 'Rest for 1 hour' },
        { id: 'item3', text: 'Charge at 1 A until 3.5 V' },
        { id: 'item4', text: 'Hold at 3.5 V until 10 mA' }
    ];

    items.forEach(item => {
        box1.appendChild(createDraggableItem(item.id, item.text));
    });

    new Sortable(box1, {
        group: {
            name: 'shared',
            pull: 'clone',
            put: true // Allow items to be put into box1
        },
        sort: false,
        animation: 150,
        onStart: function (evt) {
            evt.clone.id = evt.item.id + '-clone-' + Date.now(); // Ensure a unique ID for the clone
        },
        onAdd: function (evt) {
            if (evt.from === box2) {
                // Remove item from box2
                evt.item.parentNode.removeChild(evt.item);
            }
        }
    });

    new Sortable(box2, {
        group: {
            name: 'shared',
            pull: true, // Allow items to be pulled from box2
            put: true // Allow items to be put into box2
        },
        sort: true,
        animation: 150,
        onAdd: function (evt) {
            // Optional: Add logic for reordering or other actions
        },
        onEnd: function (evt) {
            // Optional: Add logic for reordering or other actions
        }
    });
});
