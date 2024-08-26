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
            const errorData = await response.json(); // Attempt to get JSON error details
            throw new Error(errorData.error || "Simulation failed");
        }

        const datapoints = await response.json();
        console.log(datapoints);
        return datapoints;
    } catch (error) {
        console.error('Error occurred while submitting data:', error.message);
        throw error;
    }
}
