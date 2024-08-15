export async function getDriveCycleData() {
    const url = "http://localhost:8084/simulate";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();

        //retries from api
        return json.driveCycles;
    } catch (error) {
        console.error('Error fetching data:', error.message);
        return []; // Return an empty array on error
    }
}
