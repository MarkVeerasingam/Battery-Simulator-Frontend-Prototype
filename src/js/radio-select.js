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

            $('#driveCycle-field').empty();

            await populateDriveCycleDropdown();
        } else if (selection === "timeEval") {
            $('#experiment-field').hide("slow");
            $('#driveCycle-field').hide("slow");
            $('#timeEval-field').show("slow");
        }
    });
});
