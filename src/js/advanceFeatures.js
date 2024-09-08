function toggleAdvancedFeatures() {
    const advancedFeatures = document.querySelector('.advanced-features');
    advancedFeatures.classList.toggle('expanded');
    advancedFeatures.classList.toggle('hidden');
}

document.querySelector('.advanced-features-btn').addEventListener('click', function (event) {
    event.preventDefault(); // must prevent the form submission
    toggleAdvancedFeatures();
});
