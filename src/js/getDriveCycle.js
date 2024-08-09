export async function getDriveCycleData() {
    const url = "../src/api/driveCycleData.json";
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
