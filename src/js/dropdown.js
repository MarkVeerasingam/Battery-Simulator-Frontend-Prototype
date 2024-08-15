import { getDriveCycleData } from './getDriveCycle.js';

export async function populateDriveCycleDropdown() {
    const values = await getDriveCycleData();

    $('#driveCycle-field')
        .append(
            $(document.createElement('label')).prop({
                for: 'driveCycles'
            })
        )
        .append(
            $(document.createElement('select')).prop({
                id: 'driveCycles',
                name: 'driveCycles'
            })
        );

    for (const val of values) {
        $('#driveCycles').append($(document.createElement('option')).prop({
            value: val,
            text: val.charAt(0).toUpperCase() + val.slice(1)
        }));
    }
}