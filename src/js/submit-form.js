let formData = {};
let formSubmitPromise = null;

export function initializeForm() {
    const form = document.getElementById('simulation-form');

    form.addEventListener('submit', async function (event) {
        event.preventDefault();

        const batteryChemistry = document.getElementById('battery-chemistry').value;
        const cellModel = document.getElementById('cell-model').value;

        // Get the selected simulation type
        const simulationType = document.querySelector('input[name="simulation"]:checked');
        const simulationValue = simulationType ? simulationType.value : '';

        let simulationConditions = '';
        if (simulationValue === 'experiment') {
            const droppedItems = Array.from(document.getElementById('box2').children)
                .map(item => item.textContent)
                .join(', ');
            simulationConditions = droppedItems;
        } else if (simulationValue === 'timeEval') {
            simulationConditions = document.querySelector('.time-eval-field').value;
        } else if (simulationValue === 'driveCycle') {
            simulationConditions = document.querySelector('#driveCycle-field select').value;
        }

        // Store the collected information
        formData = {
            batteryChemistry,
            cellModel,
            simulationValue,
            simulationConditions
        };

        // Resolve the promise
        if (formSubmitPromise) {
            formSubmitPromise.resolve(formData);
        }

        // Scroll to the results section
        $('html, body').animate({
            scrollTop: $('#results-section').offset().top
        }, 50); // 50 milliseconds scroll animation
    });
}

export function onFormSubmit() {
    return new Promise((resolve) => {
        formSubmitPromise = { resolve };
    });
}
