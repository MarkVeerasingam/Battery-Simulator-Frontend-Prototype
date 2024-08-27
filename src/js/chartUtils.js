export function createVoltageCurrentChart(ctx, chartType, labels, datasets) {

    datasets.forEach(dataset => {
        dataset.pointRadius = 0; // Remove point markers
    });

    return new Chart(ctx, {
        type: chartType,
        data: {
            labels: labels,
            datasets: datasets
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Time(s)'
                    }
                },
                'y-voltage': {
                    title: {
                        display: true,
                        text: 'Battery Voltage (V)'
                    },
                    position: 'left',
                    beginAtZero: false,
                },
                'y-current': {
                    title: {
                        display: true,
                        text: 'Current (A)'
                    },
                    position: 'right',
                    beginAtZero: false,
                    grid: {
                        drawOnChartArea: false // Optional: hide grid lines for the current axis
                    }
                }
            }
        }
    });
}

export function createTemperatureChart(ctx, chartType, labels, datasets) {

    datasets.forEach(dataset => {
        dataset.pointRadius = 0; // Remove point markers
    });


    return new Chart(ctx, {
        type: chartType,
        data: {
            labels: labels,
            datasets: datasets
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Time(s)'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Temperature (°C)'
                    },
                    beginAtZero: false
                }
            }
        }
    });
}

export function updateChart(chart, labels, datasets) {

    datasets.forEach(dataset => {
        dataset.pointRadius = 0; // Remove point markers
    });

    chart.data.labels = labels;
    chart.data.datasets = datasets;
    chart.update();
}
