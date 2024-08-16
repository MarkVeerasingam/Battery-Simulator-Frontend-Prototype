document.addEventListener('DOMContentLoaded', function () {
    // Initialize Sortable for box1 and box2
    const box1 = document.getElementById('box1');
    const box2 = document.getElementById('box2');

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
