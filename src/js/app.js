import './getBattery.js';
import { populateDriveCycleDropdown } from './dropdown.js';
import './radio-select.js';
import './sortable.js';
import './progress-bar.js';
import { initializeForm } from './submit-form.js';
import { simulateBattery } from './simulate.js';

$(document).ready(function () {
    console.log('App initialized');
    initializeForm();

    simulateBattery();
});
