export async function displayChart() {
    const ctx = document.getElementById('myChart');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: '# of Dogs',
                data: [12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3],
                borderColor: [
                    'rgb(255, 0, 0, 0.5)'
                ],
            },
            {
                label: '# of Cats',
                data: [20, 11, 4, 9, 2, 5, 19, 22, 9, 10, 3, 8],
                borderColor: [
                    'rgb(0, 255, 0, 0.5)'
                ],
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}