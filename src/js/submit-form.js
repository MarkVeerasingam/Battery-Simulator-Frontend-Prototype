function getFormData() {
    // gets the form data of the simulation input, currently just battery chemistry and it's respective model
    return {
        battery_chemistry: document.getElementById('battery-chemistry').value,
        bpx_battery_models: document.getElementById('cell-model').value
    };
}

//  get simulation scenario and it's respective simulation-specific data i.e. (drive_cycle = file, experiment = string list, time_eval = input)
function getSimulationData(simulationType) {
    const simulationData = { type: simulationType };

    if (simulationType === 'experiment') {
        const experimentConditions = Array.from(document.getElementById('box2').children)
            .map(item => item.textContent.trim().replace(/\r?\n|\r/g, ' '));
        simulationData.experiment = { conditions: experimentConditions };
    } else if (simulationType === 'time_eval') {
        const timeEvalField = document.querySelector('.time-eval-field').value;
        simulationData.time_eval = { conditions: JSON.parse(timeEvalField) };
    } else if (simulationType === 'drive_cycle') {
        const driveCycleField = document.querySelector('#driveCycle-field select').value;
        simulationData.drive_cycle = {
            chemistry: document.getElementById('battery-chemistry').value,
            drive_cycle_file: driveCycleField
        };
    }

    return simulationData;
}

function buildPostData(simulationData) {
    return {
        battery_chemistry: document.getElementById('battery-chemistry').value,
        bpx_battery_models: document.getElementById('cell-model').value,
        electrochemical_model: 'DFN', // Static for now
        solver: 'CasadiSolver', // Static 
        tolerance: {
            atol: 1e-6, // Static 
            rtol: 1e-6  // Static 
        },
        simulation: simulationData,
        display_params: ["Terminal voltage [V]", "Current [A]", "Discharge capacity [A.h]"] // Static for now
    };
}

export function submitForm() {
    const formEl = document.querySelector('#simulation-form');

    formEl.addEventListener('submit', event => {
        event.preventDefault();

        // Get form data and simulation type
        const formData = getFormData();
        const simulationType = document.querySelector('input[name="simulation"]:checked').value;

        // Get simulation-specific data
        const simulationData = getSimulationData(simulationType);

        const postData = buildPostData(simulationData);
        console.log('Form Data:', postData);
        simulate(postData);
    });
}

async function simulate(data) {
    const url = "http://localhost:8084/simulate";

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            console.error('Failed to submit simulation data', await response.text());
        } else {
            console.log('Simulation request successful');
        }
    } catch (error) {
        console.error('Error occurred while submitting data:', error);
    }
}
