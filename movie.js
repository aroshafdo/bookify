document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id');
    
    const movies = {
        'silent-trigger': { title: "~ SILENT TRIGGER ~", video: "m6.mp4", seatPrice: 1500, seats: generateSeatMap('silent-trigger') },
        'shattered-illusions': { title: "~ SHATTERED ILLUSIONS ~", video: "m5.mp4", seatPrice: 1800, seats: generateSeatMap('shattered-illusions') },
        'chronicles-leela': { title: "~ THE CHRONICLES OF LEELA ~", video: "m2.mp4", seatPrice: 2500, seats: generateSeatMap('chronicles-leela') },
        'strings-solitude': { title: "~ STRINGS OF SOLITUDE ~", video: "m8.mp4", seatPrice: 2000, seats: generateSeatMap('strings-solitude') },
        'little-secret': { title: "~ MY LITTLE SECRET ~", video: "m7.mp4", seatPrice: 1500, seats: generateSeatMap('little-secret') },
        'silent-screams': { title: "~ SILENT SCREAMS ~", video: "m4.mp4", seatPrice: 1600, seats: generateSeatMap('silent-screams') },
        'dead-end-express': { title: "~ DEAD END EXPRESS ~", video: "m1.mp4", seatPrice: 2200, seats: generateSeatMap('dead-end-express') },
        'under-investigation': { title: "~ UNDER INVESTIGATION ~", video: "m3.mp4", seatPrice: 2800, seats: generateSeatMap('under-investigation') }
    };

    if (!movies[movieId]) redirectToHome();
    const movie = movies[movieId];

    setMovieDetails(movie);
    setupSeatSelection(movie);
    setupEventListeners();

    function generateSeatMap(movieId) {
        const storedSeats = localStorage.getItem(`seatMap-${movieId}`);
        return storedSeats ? JSON.parse(storedSeats) : createNewSeatMap();
    }

    function createNewSeatMap() {
        return { A: createSeatRow(12), B: createSeatRow(12), C: createSeatRow(12), D: createSeatRow(12), E: createSeatRow(12), F: createSeatRow(12), G: createSeatRow(12), H: createSeatRow(12), I: createSeatRow(12), J: createSeatRow(12) };
    }

    function createSeatRow(count) {
        return Array.from({ length: count }, (_, i) => ({ number: i + 1, occupied: false }));
    }

    function setMovieDetails(movie) {
        document.getElementById('event-title').textContent = movie.title;
        const videoElement = document.getElementById('event-video');
        videoElement.querySelector('source').src = movie.video;
        videoElement.load();
    }

    function setupSeatSelection(movie) {
        const seatsGrid = document.getElementById('seats-grid');
        seatsGrid.innerHTML = generateSeatHTML(movie.seats);
        seatsGrid.addEventListener('click', handleSeatClick);
    }

    function handleSeatClick(e) {
        const seat = e.target.closest('#seats-grid .seat:not(.occupied)');
        if (!seat) return;
        seat.classList.toggle('selected');
        updateTotal(movie);
    }

    function setupEventListeners() {
        document.querySelector('.checkout-btn').addEventListener('click', handleCheckout);
        ['select-location', 'select-date', 'select-time'].forEach(id => {
            document.getElementById(id).addEventListener('change', updateDateTimeDisplay);
        });
        document.addEventListener('keydown', handleKeyPress);
    }

    function handleKeyPress(e) {
        if (e.shiftKey && e.altKey && e.key === 'R') {
            localStorage.removeItem(`seatMap-${movieId}`);
            movie.seats = generateSeatMap(movieId);
            setupSeatSelection(movie);
            alert('Seats reset successfully!');
        }
    }

    function handleCheckout(e) {
        e.preventDefault();
        const bookingErrors = validateBooking();
        const formErrors = validateForm();
        if (bookingErrors.length === 0 && formErrors === 0) {
            processCheckout(movie);
            alert('Redirecting to payment gateway...');
        }
    }

    function validateBooking() {
        const errors = [];
        if (!document.getElementById('select-location').value) errors.push('location');
        if (!document.getElementById('select-date').value) errors.push('date');
        if (!document.getElementById('select-time').value) errors.push('time');
        if (document.querySelectorAll('#seats-grid .seat.selected').length === 0) errors.push('seats');
        if (errors.length > 0) showBookingErrors(errors);
        return errors;
    }

    function showBookingErrors(errors) {
        const errorMessages = { location: 'Please select a location', date: 'Please select a date', time: 'Please select a time', seats: 'Please select at least one seat' };
        alert('Missing required information:\n' + errors.map(e => `• ${errorMessages[e]}`).join('\n'));
    }

    function validateForm() {
        let errorCount = 0;
        if (!validateName()) errorCount++;
        if (!validatePhone()) errorCount++;
        if (!validateEmail()) errorCount++;
        if (!validateNIC()) errorCount++;
        return errorCount;
    }

    function validateName() {
        const input = document.getElementById('name');
        const isValid = input.value.trim().length >= 3;
        showValidation(input, isValid, 'Name must be at least 3 characters');
        return isValid;
    }

    function validatePhone() {
        const input = document.getElementById('phone');
        const isValid = /^0(71|77|70|76|78|72|74|75|11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|39|41|45|47|51|52|54|55|57|63|65|66|67|81|91)[0-9]{7}$/.test(input.value);
        showValidation(input, isValid, 'Invalid Sri Lankan phone number');
        return isValid;
    }

    function validateEmail() {
        const input = document.getElementById('email');
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);
        showValidation(input, isValid, 'Invalid email format');
        return isValid;
    }

    function validateNIC() {
        const input = document.getElementById('nic');
        const value = input.value.trim().toUpperCase();
        const isValid = /(^[0-9]{9}[VX]$)|(^[0-9]{12}$)/.test(value);
        showValidation(input, isValid, 'Invalid NIC format (ex: 123456789V or 200012345678)');
        return isValid;
    }

    function showValidation(input, isValid, message) {
        const errorElement = document.getElementById(`${input.id}Error`);
        input.classList.toggle('error', !isValid);
        errorElement.textContent = isValid ? '' : message;
    }

    function generateSeatHTML(seats) {
        return Object.entries(seats).map(([row, seats]) => `<div class="seat-row">${seats.map(seat => `<button class="seat ${seat.occupied ? 'occupied' : 'available'}" data-seat="${row}${seat.number}" ${seat.occupied ? 'disabled' : ''}>${row}${seat.number}</button>`).join('')}</div>`).join('');
    }

    function updateTotal(movie) {
        const selectedCount = document.querySelectorAll('#seats-grid .seat.selected').length;
        document.getElementById('total-amount').textContent = `${(selectedCount * movie.seatPrice).toLocaleString()} LKR`;
    }

    function processCheckout(movie) {
        const selectedSeats = document.querySelectorAll('#seats-grid .seat.selected');
        selectedSeats.forEach(seat => {
            const seatId = seat.dataset.seat;
            const row = seatId.charAt(0);
            const number = parseInt(seatId.slice(1), 10);
            if (movie.seats[row]) {
                const seatData = movie.seats[row].find(s => s.number === number);
                if (seatData) seatData.occupied = true;
            }
        });
        localStorage.setItem(`seatMap-${movieId}`, JSON.stringify(movie.seats));
    }

    function redirectToHome() {
        window.location.href = 'index.html';
    }

    function updateDateTimeDisplay() {
        document.getElementById('event-date-display').textContent = document.getElementById('select-date').value || 'Not selected';
        document.getElementById('event-location-display').textContent = document.getElementById('select-location').value || 'Not selected';
        document.getElementById('event-time-display').textContent = document.getElementById('select-time').value || 'Not selected';
    }
});