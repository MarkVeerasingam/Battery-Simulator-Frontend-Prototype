import './getBattery.js';
import { populateDriveCycleDropdown } from './dropdown.js';
import './radio-select.js';
import './sortable.js';
import './progress-bar.js';
import { submitForm } from './submit-form.js';
import './advanceFeatures.js';

$(document).ready(function () {
    console.log('App initialized');
    submitForm();
});
