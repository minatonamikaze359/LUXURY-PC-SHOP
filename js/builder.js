const cpuSelect = document.getElementById('cpuSelect');
const moboSelect = document.getElementById('moboSelect');
const ramSelect = document.getElementById('ramSelect');
const gpuSelect = document.getElementById('gpuSelect');

const statusBox = document.getElementById('compatibilityStatus');
const totalPriceEl = document.getElementById('totalPrice');
const buildDetails = document.getElementById('buildDetails');

function updateBuilder() {
    const selectedCpu = cpuSelect.options[cpuSelect.selectedIndex];
    const selectedMobo = moboSelect.options[moboSelect.selectedIndex];
    const selectedRam = ramSelect.options[ramSelect.selectedIndex];
    const selectedGpu = gpuSelect.options[gpuSelect.selectedIndex];

    const cpuSocket = selectedCpu.getAttribute('data-socket');
    const moboSocket = selectedMobo.getAttribute('data-socket');

    // Compatibility Validation Logic
    if (cpuSocket && moboSocket && cpuSocket !== moboSocket) {
        statusBox.className = "status-box incompatible";
        statusBox.innerHTML = `⚠️ Compatibility Error: Selected CPU (${cpuSocket}) and Motherboard (${moboSocket}) sockets do not match!`;
    } else {
        statusBox.className = "status-box compatible";
        statusBox.innerHTML = "✓ All selected parts are fully compatible.";
    }

    // Calculate Price
    const totalPrice = (parseFloat(selectedCpu.getAttribute('data-price')) || 0) +
                       (parseFloat(selectedMobo.getAttribute('data-price')) || 0) +
                       (parseFloat(selectedRam.getAttribute('data-price')) || 0) +
                       (parseFloat(selectedGpu.getAttribute('data-price')) || 0);

    totalPriceEl.textContent = `$${totalPrice.toLocaleString('.2f')}`;

    // Update Text Details
    buildDetails.innerHTML = `
        <p><strong>CPU:</strong> ${selectedCpu.value || 'None'}</p>
        <p><strong>Motherboard:</strong> ${selectedMobo.value || 'None'}</p>
        <p><strong>RAM:</strong> ${selectedRam.value || 'None'}</p>
        <p><strong>GPU:</strong> ${selectedGpu.value || 'None'}</p>
    `;
}

function addBuildToCart() {
    if (statusBox.classList.contains('incompatible')) {
        alert('Please resolve hardware incompatibility errors before adding your build to the cart!');
        return;
    }
    addToCart(1);
}

[cpuSelect, moboSelect, ramSelect, gpuSelect].forEach(select => {
    select.addEventListener('change', updateBuilder);
});
