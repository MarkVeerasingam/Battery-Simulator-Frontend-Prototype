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

