import './getBattery.js';
import { populateDriveCycleDropdown } from './dropdown.js';
import './radio-select.js';
import './sortable.js';
import './progress-bar.js';
import { displayChart } from './graph.js'
import { submitForm } from './submit-form.js';

$(document).ready(function () {
    console.log('App initialized');
    submitForm();

    displayChart();
});
