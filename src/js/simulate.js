import { onFormSubmit } from './submit-form.js';

const simulate_single_cell_url = "http://localhost:8084/simulate";

export async function simulateBattery() {
    // continuously wait for form submissions and log data. 
    while (true) {
        // Wait for form submission
        const formData = await onFormSubmit();

        if (formData) {
            console.log('Battery Chemistry:', formData.batteryChemistry);
            console.log('Cell Model:', formData.cellModel);
            console.log('Simulation Type:', formData.simulationValue);
            console.log('Simulation Condition:', formData.simulationConditions);
        }
    }
}
