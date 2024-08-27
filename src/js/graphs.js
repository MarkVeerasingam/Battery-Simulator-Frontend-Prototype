import { createVoltageCurrentChart, createTemperatureChart, updateChart } from './chartUtils.js';

// every simulation will display battery voltage + current together. 
const ctx1 = document.getElementById('current_voltage_chart').getContext('2d');
const current_voltage_chart = createVoltageCurrentChart(ctx1, 'line', [], [
    {
        label: 'Terminal Voltage [V]',
        data: [],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        yAxisID: 'y-voltage',
        fill: false
    },
    {
        label: 'Current [A]',
        data: [],
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        yAxisID: 'y-current',
        fill: false
    }
]);

const ctx2 = document.getElementById('temperature_chart').getContext('2d');
const temperature_chart = createTemperatureChart(ctx2, 'line', [], [
    {
        label: 'X-averaged cell temperature [C]',
        data: [],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: false
    }
]);

export function updateCharts(times, processedData) {
    updateChart(current_voltage_chart, times, [
        {
            label: 'Terminal Voltage [V]',
            data: processedData['Terminal voltage [V]'],
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            yAxisID: 'y-voltage'
        },
        {
            label: 'Current [A]',
            data: processedData['Current [A]'],
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            yAxisID: 'y-current'
        }
    ]);

    updateChart(temperature_chart, times, [
        {
            label: 'X-averaged cell temperature [C]',
            data: processedData['X-averaged cell temperature [C]'],
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            fill: false
        }
    ]);
}

export function processSimulationData(datapoints, parameters) {

    // Extract and sort the time points from the datapoints object keys
    // Sorting ensures that the time data is in chronological order
    const time = Object.keys(datapoints).sort((a, b) => parseFloat(a) - parseFloat(b));
    const processedData = {};

    // Iterate over each parameter that we want to process (e.g., voltage, current, temperature)
    parameters.forEach(param => {
        // Map each time point to a data object that includes the time (x) and the corresponding param value (y)
        processedData[param] = time.map(timePoint => ({
            // Convert time point to a floating-point number for the x-axis
            x: parseFloat(timePoint),
            // Retrieve the parameter value, or set it to null if undefined
            y: datapoints[timePoint][param] !== undefined ? datapoints[timePoint][param] : null
        }));
    });

    return { time, processedData };
}
