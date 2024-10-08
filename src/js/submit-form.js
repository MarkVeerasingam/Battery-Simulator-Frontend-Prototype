import { fetchSimulation } from './fetchSimulation.js';
import { updateCharts, processSimulationData } from './graphs.js'

//get simulation scenario and it's respective simulation-specific data i.e. (drive_cycle = file, experiment = string list, time_eval = input)
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
            drive_cycle_file: driveCycleField
        };
    }
    return simulationData;
}

function buildPostData(simulationData) {
    return {
        battery_model: {
            battery_chemistry: document.getElementById('battery-chemistry').value,
            bpx_battery_models: document.getElementById('cell-model').value
        },
        electrochemical_model: {
            model: document.getElementById('electrochemical-model').value || 'SPM',
            cell_geometry: document.getElementById('cell-geometry').value || "arbitrary", // optional, default is 'arbitrary' in pybamm
            thermal_model: document.getElementById('thermal-model').value || "isothermal"    // optional, default is'lumped' in pybamm
        },
        "solver_model": {
            solver: document.getElementById('solver').value || "CasadiSolver",
            "tolerance": {
                "atol": 1e-6,
                "rtol": 1e-6
            },
            "mode": "safe"  // only used in CasadiSolver, default is'safe' in pybamm
        },
        simulation: simulationData,
        display_params: ["Terminal voltage [V]", "Current [A]", "X-averaged cell temperature [C]"] // Static for now
    };
}

// handles form submission to simulate a battery
export async function submitForm() {
    const formEl = document.querySelector('#simulation-form');

    formEl.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Get form data and simulation type
        const simulationType = document.querySelector('input[name="simulation"]:checked').value;

        // Get simulation-specific data
        const simulationData = getSimulationData(simulationType);

        const postData = buildPostData(simulationData);
        console.log('Form Data:', postData);

        try {
            // fetch the simulation
            const datapoints = await fetchSimulation(postData);

            // Process data for graphs
            const { time, processedData } = processSimulationData(datapoints, postData.display_params);

            // Update the charts with processed data
            updateCharts(time, processedData);

            // when simulation is finished, then scroll to the results section
            scrollToResults();
        } catch (error) {
            document.querySelector('#error-message').textContent = `Simulation failed: ${error.message}`;
            console.error('Error occurred during simulation:', error);
        }
    });
}

// animation to scroll to results section
function scrollToResults() {
    $('html, body').animate({
        scrollTop: $('#results-section').offset().top
    }, 50); // 50 ms scroll animation
}