import { populateDriveCycleDropdown } from './dropdown.js';

$(document).ready(function () {
    $('input[name="simulation"]').on("click", async function () {
        const selection = $('input[name="simulation"]:checked').val();

        console.log('Selected Simulation: ' + selection);

        if (selection === "experiment") {
            $('#timeEval-field').hide("slow");
            $('#driveCycle-field').hide("slow");
            $('#experiment-field').show("slow");
        } else if (selection === "driveCycle") {
            $('#experiment-field').hide("slow");
            $('#timeEval-field').hide("slow");
            $('#driveCycle-field').show("slow");

            // Populate the dropdown only if it's empty
            if ($('#driveCycle-field').find('select').length === 0) {
                await populateDriveCycleDropdown(); // Wait for dropdown to be populated
            }
        } else if (selection === "timeEval") {
            $('#experiment-field').hide("slow");
            $('#driveCycle-field').hide("slow");
            $('#timeEval-field').show("slow");
        }
    });
});
