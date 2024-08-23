import { createVoltageCurrentChart, createTemperatureChart, updateChart } from './chartUtils.js';

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
        label: 'Ambient Temperature [C]',
        data: [],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: false
    }
]);

export async function fetchSimulation(data) {
    const url = "http://localhost:8084/simulate";

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to submit simulation data: ${errorText}`);
        }

        const datapoints = await response.json();
        console.log(datapoints);
        return datapoints;
    } catch (error) {
        console.error('Error occurred while submitting data:', error);
        throw error;
    }
}

export function updateCharts(times, voltages, currents, temperatures) {
    updateChart(current_voltage_chart, times, [
        {
            label: 'Terminal Voltage [V]',
            data: voltages.map((voltage, index) => ({ x: parseFloat(times[index]), y: voltage })),
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            yAxisID: 'y-voltage'
        },
        {
            label: 'Current [A]',
            data: currents.map((current, index) => ({ x: parseFloat(times[index]), y: current })),
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            yAxisID: 'y-current'
        }
    ]);

    updateChart(temperature_chart, times, [
        {
            label: 'Ambient Temperature [C]',
            data: temperatures.map((temp, index) => ({ x: parseFloat(times[index]), y: temp })),
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            fill: false
        }
    ]);
}
