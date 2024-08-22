import { getDriveCycleData } from './getDriveCycle.js';

export async function populateDriveCycleDropdown() {
    const values = await getDriveCycleData();

    $('#driveCycle-field')
        .append(
            $(document.createElement('label')).prop({
                for: 'drive_cycle'
            })
        )
        .append(
            $(document.createElement('select')).prop({
                id: 'drive_cycle',
                name: 'drive_cycle'
            })
        );

    for (const val of values) {
        $('#drive_cycle').append($(document.createElement('option')).prop({
            value: val,
            text: val.charAt(0).toUpperCase() + val.slice(1)
        }));
    }
}