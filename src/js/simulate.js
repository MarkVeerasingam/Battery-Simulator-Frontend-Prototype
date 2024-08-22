export async function simulate(data) {
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
        } else {
            console.log('Simulation request successful');
        }

    } catch (error) {
        console.error('Error occurred while submitting data:', error);
        throw error; // Rethrow to handle in submitForm.js
    }
}
