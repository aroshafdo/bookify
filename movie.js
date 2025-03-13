document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id');

    const movies = {
        'silent-trigger': {
            title: "~ SILENT TRIGGER ~",
            video: "m6.mp4",
            seatPrice: 750,
            seats: generateSeatMap('silent-trigger')
        },
        'shattered-illusions': {
            title: "~ SHATTERED ILLUSIONS ~",
            video: "m5.mp4",
            seatPrice: 900,
            seats: generateSeatMap('shattered-illusions')
        },
        'chronicles-leela': {
            title: "~ THE CHRONICLES OF LEELA ~",
            video: "m2.mp4",
            seatPrice: 1000,
            seats: generateSeatMap('chronicles-leela')
        },
        'strings-solitude': {
            title: "~ STRINGS OF SOLITUDE ~",
            video: "m8.mp4",
            seatPrice: 850,
            seats: generateSeatMap('strings-solitude')
        },
        'little-secret': {
            title: "~ MY LITTLE SECRET ~",
            video: "m7.mp4",
            seatPrice: 800,
            seats: generateSeatMap('little-secret')
        },
        'silent-screams': {
            title: "~ SILENT SCREAMS ~",
            video: "m4.mp4",
            seatPrice: 950,
            seats: generateSeatMap('silent-screams')
        },
        'dead-end-express': {
            title: "~ DEAD END EXPRESS ~",
            video: "m1.mp4",
            seatPrice: 1050,
            seats: generateSeatMap('dead-end-express')
        },
        'under-investigation': {
            title: "~ UNDER INVESTIGATION ~",
            video: "m3.mp4",
            seatPrice: 875,
            seats: generateSeatMap('under-investigation')
        }
    };

    // Redirect to home page if movie ID is invalid
    const movie = movies[movieId];
    if (!movie) redirectToHome();

    // Initialize movie details and event setup
    setMovieDetails(movie);
    setupSeatSelection(movie);
    setupEventListeners(movie);

    // Core Functions =========================================
    function generateSeatMap(movieId) {
        const storedSeats = localStorage.getItem(`seatMap-${movieId}`);
        if (storedSeats) return JSON.parse(storedSeats);

        const seats = {};
        const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
        rows.forEach(row => {
            seats[row] = Array(12).fill().map((_, i) => ({
                number: i + 1
            }));
        });
        return seats;
    }

    function setMovieDetails(movie) {
        document.getElementById('event-title').textContent = movie.title;
        const video = document.getElementById('event-video');
        const source = video.querySelector('source');
        source.src = movie.video;
        video.load();
    }

    function setupSeatSelection(movie) {
        const seatsGrid = document.getElementById('seats-grid');
        seatsGrid.innerHTML = generateSeatHTML(movie.seats);

        seatsGrid.addEventListener('click', (e) => {
            const seat = e.target.closest('.seat');
            if (seat && !seat.classList.contains('occupied')) {
                seat.classList.toggle('selected');
                updateTotal(movie);
            }
        });
    }

    // Event Listeners ========================================
    function setupEventListeners(movie) {
        // Update date/time/location display when selections change
        ['select-location', 'select-date', 'select-time'].forEach(id => {
            document.getElementById(id).addEventListener('change', updateDateTimeDisplay);
        });

        // Checkout process with redirection to payment gateway
        document.querySelector('.checkout-btn').addEventListener('click', (e) => {
            e.preventDefault();
            if (validateBooking(movie) && validateForm()) {
                processCheckout(movie);
            }
        });

        // Form validation listeners
        document.getElementById('name').addEventListener('blur', validateName);
        document.getElementById('phone').addEventListener('input', validatePhone);
        document.getElementById('email').addEventListener('input', validateEmail);
        document.getElementById('nic').addEventListener('input', validateNIC);
    }

    // Price Calculation ======================================
    function updateTotal(movie) {
        const selectedCount = document.querySelectorAll('.seat.selected:not(.occupied)').length;
        document.getElementById('total-amount').textContent =
            `${(selectedCount * movie.seatPrice).toLocaleString()} LKR`;
    }

    // Validation Functions ===================================
    function validateBooking(movie) {
        const errors = [];
        if (!document.getElementById('select-location').value) errors.push('Please select a location');
        if (!document.getElementById('select-date').value) errors.push('Please select a date');
        if (!document.getElementById('select-time').value) errors.push('Please select a time');
        if (!document.querySelectorAll('.seat.selected').length) errors.push('Please select at least one seat');
        
        if (errors.length) {
            alert(errors.join('\n'));
            return false;
        }
        return true;
    }

    function validateForm() {
        return validateName() && validatePhone() && validateEmail() && validateNIC();
    }

    function validateName() {
        const input = document.getElementById('name');
        const isValid = input.value.trim().length >= 3;
        showValidation(input, isValid, 'Minimum 3 characters required');
        return isValid;
    }

    function validatePhone() {
        const phoneInput = document.getElementById('phone');
        const isValid = /^0(71|77|70|76|78|72|74|75|11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|39|41|45|47|51|52|54|55|57|63|65|66|67|81|91)[0-9]{7}$/.test(phoneInput.value);
        showValidation(phoneInput, isValid, 'Invalid Sri Lankan phone number');
        return isValid;
    }

    function validateEmail() {
        const emailInput = document.getElementById('email');
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value);
        showValidation(emailInput, isValid, 'Invalid email format');
        return isValid;
    }

    function validateNIC() {
        const nicInput = document.getElementById('nic');
        const value = nicInput.value.trim().toUpperCase();
        const isValid = /(^[0-9]{9}[VX]$)|(^[0-9]{12}$)/.test(value);
        showValidation(nicInput, isValid, 'Invalid NIC format (ex: 123456789V or 200012345678)');
        return isValid;
    }

    function showValidation(input, isValid, message) {
        const errorElement = document.getElementById(`${input.id}Error`);
        if (!isValid) {
            errorElement.textContent = message;
            input.classList.add('error');
        } else {
            errorElement.textContent = '';
            input.classList.remove('error');
        }
    }

    // Helper Functions ========================================
    function generateSeatHTML(seats) {
        return Object.entries(seats).map(([row, seatArray]) => `
            <div class="seat-row">
                ${seatArray.map(seatData => `
                    <button class="seat ${seatData.occupied ? 'occupied' : 'available'}" 
                            data-seat="${row}${seatData.number}"
                            ${seatData.occupied ? 'disabled' : ''}>
                        ${row}${seatData.number}
                    </button>
                `).join('')}
            </div>
        `).join('');
    }

    function processCheckout(movie) {
        // Mark selected seats as occupied
        const selectedSeats = document.querySelectorAll('.seat.selected');
        selectedSeats.forEach(seat => {
            const seatId = seat.dataset.seat;
            const row = seatId.charAt(0);
            const number = parseInt(seatId.slice(1), 10);
            const seatData = movie.seats[row].find(s => s.number === number);
            if (seatData) {
                seatData.occupied = true;
            }
        });

        // Persist the updated seat map to localStorage
        localStorage.setItem(`seatMap-${movieId}`, JSON.stringify(movie.seats));

        // Prepare booking data for confirmation
        const bookingData = {
            movie: movie.title,
            date: document.getElementById('select-date').value,
            time: document.getElementById('select-time').value,
            location: document.getElementById('select-location').value,
            seats: Array.from(selectedSeats).map(seat => seat.textContent.trim()),
            total: document.getElementById('total-amount').textContent,
            customer: {
                name: document.getElementById('name').value,
                phone: document.getElementById('phone').value,
                email: document.getElementById('email').value,
                nic: document.getElementById('nic').value
            }
        };

        console.log('Booking Confirmation:', bookingData);
        // Show a message including redirection info then redirect to payment gateway
        alert(`Booking successful! Total: ${bookingData.total}\nRedirecting to payment gateway...`);
        setTimeout(() => {
            // Replace 'payment.html' with your actual payment gateway URL if needed
            window.location.href = 'payment.html';
        }, 2000);
    }

    function redirectToHome() {
        window.location.href = 'index.html';
    }

    function updateDateTimeDisplay() {
        const date = document.getElementById('select-date').value;
        const location = document.getElementById('select-location').value;
        const time = document.getElementById('select-time').value;
        
        document.getElementById('event-date-display').textContent = date || 'Not selected';
        document.getElementById('event-location-display').textContent = location || 'Not selected';
        document.getElementById('event-time-display').textContent = time || 'Not selected';
    }
});
