$(document).ready(function () {
    const url = "../src/api/modelData.json";

    // Fetch JSON data
    $.getJSON(url, function (data) {
        // Prepare the cellModels object to store the parsed data
        const cellModels = {};

        // Populate battery model dropdown
        const $batteryModel = $('#battery-chemistry');
        data.batteryModel.forEach(function (item) {
            // Add each chemistry as an option in the battery model dropdown
            $batteryModel.append(`<option value="${item.chemistry}">${item.chemistry}</option>`);
            // Store models for each chemistry
            cellModels[item.chemistry] = item.models.map(function (model) {
                return {
                    // Remove .json for display text and value - not sure how to handle this in the future.
                    // should a user name the files they upload or should it be with raw json to save a headache
                    value: model.replace(/\.json$/i, ''),
                    text: model.replace(/\.json$/i, '')
                };
            });
        });

        // Handle battery model change
        $('#battery-chemistry').change(function () {
            const batteryType = $(this).val();
            const $cellModel = $('#cell-model');
            $cellModel.empty(); // Clear existing options
            $cellModel.append('<option value="">Select Cell Model</option>'); // Reset to default

            if (cellModels[batteryType]) {
                cellModels[batteryType].forEach(function (model) {
                    $cellModel.append(`<option value="${model.value}">${model.text}</option>`);
                });
                $cellModel.prop('disabled', false); // Enable the dropdown
            } else {
                $cellModel.prop('disabled', true); // Disable if no battery type selected
            }
        });

        // Initially disable cell model dropdown
        $('#cell-model').prop('disabled', true);
    });
});
