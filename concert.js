document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get('id');
    
        const events = {
        'electric-pulse': {
            title: '~ ELECTRIC PULSE ~',
            date: 'March 15, 2025 (Saturday)',
            location: 'Nelum Pokuna Theatre, Colombo',
            time: '8:00 PM onwards',
            video: 'r1.mp4',
            prices: {
                general: 1500,
                vip: 3000
            }
        },
        "orchestra-concert": {
    title: '~ OECHESTRA CONCERT ~',
    date: 'April 20, 2025 (Sunday)',
    location: 'Viharamahadevi Park, Colombo',
    time: '9:00 PM onwards',
    video: 'r2.mp4',
    prices: {
        general: 2000,
        vip: 4000
    }
},
"echos-of-eterny": {
    title: '~ ECHOS OF ETERNY ~',
    date: 'June 7, 2025 (Saturday)',
    location: 'Earl’s Regency Hotel, Kandy',
    time: '10:00 PM onwards',
    video: 'r3.mp4',
    prices: {
        general: 3000,
        vip: 6000
    }
},
"legends-of-rock": {
    title: '~ LEGENDS OF ROCK ~',
    date: 'August 23, 2025 (Saturday)',
    location: 'Jaffna Cultural Centre, Jaffna',
    time: '7:30 PM onwards',
    video: 'r4.mp4',
    prices: {
        general: 1500,
        vip: 3000
    }
},
"velvet-grooves": {
    title: '~ VELVET GROOVES ~',
    date: 'March 15, 2025 (Saturday)',
    location: 'Viharamahadevi Park, Colombo',
    time: '8:30 PM onwards',
    video: 'r5.mp4',
    prices: {
        general: 2500,
        vip: 5000
    }
},
"symphony-of-elegance": {
    title: '~ SYMPHONY OF ELEGANCE ~',
    date: 'October 12, 2025 (Sunday)',
    location: 'Galle Face Green, Colombo',
    time: '7:30 PM onwards',
    video: 'r6.mp4',
    prices: {
        general: 2000,
        vip: 4000
    }
},
"drop-nation": {
    title: '~ DROP NATION ~',
    date: 'December 5, 2025 (Friday)',
    location: 'Sugathadasa Indoor Stadium, Colombo',
    time: '8:30 PM onwards',
    video: 'r7.mp4',
    prices: {
        general: 2500,
        vip: 5000
    }
},
"eternal-riffs": {
    title: '~ ETERNAL RIFFS ~',
    date: 'March 18, 2025 (Tuesday)',
    location: 'Nelum Pokuna Theatre, Colombo',
    time: '8:00 PM onwards',
    video: 'r8.mp4',
    prices: {
        general: 2500,
        vip: 5000
    }
}
    
    };

   
    const event = events[eventId];
    if (!event) {
        window.location.href = '/';
        return;
    }

    document.getElementById('event-title').textContent = event.title;
    document.getElementById('event-date').textContent = event.date;
    document.getElementById('event-location').textContent = event.location;
    document.getElementById('event-time').textContent = event.time;
    
    document.getElementById('general-price').textContent = `LKR ${event.prices.general}`;
    document.getElementById('vip-price').textContent = `LKR ${event.prices.vip}`;

    const video = document.getElementById('event-video');
    const source = video.querySelector('source');
    source.src = event.video;
    video.load();

    window.updateTickets = (type, change) => {
        const ticketElement = document.getElementById(`${type}-tickets`);
        const amountElement = document.getElementById(`${type}-amount`);
        
        let tickets = parseInt(ticketElement.textContent) + change;
        tickets = Math.max(0, tickets);
        
        ticketElement.textContent = tickets;
        const amount = tickets * event.prices[type];
        amountElement.textContent = `${amount} LKR`;
        
        updateTotal();
    };

    function updateTotal() {
        const general = parseInt(document.getElementById('general-tickets').textContent);
        const vip = parseInt(document.getElementById('vip-tickets').textContent);
        const total = (general * event.prices.general) + (vip * event.prices.vip);
        document.getElementById('total-amount').textContent = `${total} LKR`;
    }

    function validateName() {
        const nameInput = document.getElementById('name');
        const error = document.getElementById('nameError');
        const isValid = /^[A-Za-z ]{3,30}$/.test(nameInput.value.trim());
        
        if (!isValid) {
            showError(nameInput, 'Invalid name (3-30 letters)');
            return false;
        }
        clearError(nameInput);
        return true;
    }

    function validatePhone() {
        const phoneInput = document.getElementById('phone');
        const error = document.getElementById('phoneError');
        const isValid = /^0[1-9][0-9]{8}$/.test(phoneInput.value);
        
        if (!isValid) {
            showError(phoneInput, 'Invalid phone number (10 digits starting with 0)');
            return false;
        }
        clearError(phoneInput);
        return true;
    }

    function validateEmail() {
        const emailInput = document.getElementById('email');
        const error = document.getElementById('emailError');
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value);
        
        if (!isValid) {
            showError(emailInput, 'Invalid email format');
            return false;
        }
        clearError(emailInput);
        return true;
    }

    function validateNIC() {
        const nicInput = document.getElementById('nic');
        const error = document.getElementById('nicError');
        const isValid = /(^[0-9]{9}[vVxX]$)|(^[0-9]{12}$)/.test(nicInput.value);
        
        if (!isValid) {
            showError(nicInput, 'Invalid NIC format (old or new)');
            return false;
        }
        clearError(nicInput);
        return true;
    }

    function validateForm() {
        const isValidName = validateName();
        const isValidPhone = validatePhone();
        const isValidEmail = validateEmail();
        const isValidNIC = validateNIC();
        return isValidName && isValidPhone && isValidEmail && isValidNIC;
    }

    function showError(input, message) {
        const formGroup = input.parentElement;
        const error = formGroup.querySelector('.error-message');
        formGroup.classList.add('invalid');
        formGroup.classList.remove('valid');
        error.textContent = message;
    }

    function clearError(input) {
        const formGroup = input.parentElement;
        const error = formGroup.querySelector('.error-message');
        formGroup.classList.remove('invalid');
        formGroup.classList.add('valid');
        error.textContent = '';
    }

    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('blur', () => {
            switch(input.id) {
                case 'name': validateName(); break;
                case 'phone': validatePhone(); break;
                case 'email': validateEmail(); break;
                case 'nic': validateNIC(); break;
            }
        });
        
        input.addEventListener('input', () => {
            if(input.value === '') {
                input.parentElement.classList.remove('valid', 'invalid');
                input.parentElement.querySelector('.error-message').textContent = '';
            }
        });
    });

    document.querySelector('.checkout-btn').addEventListener('click', (e) => {
        e.preventDefault();
        
        const generalTickets = parseInt(document.getElementById('general-tickets').textContent);
        const vipTickets = parseInt(document.getElementById('vip-tickets').textContent);

        if (generalTickets + vipTickets === 0) {
            alert('Please select at least one ticket!');
            return;
        }

        if (!validateForm()) {
            alert('Please correct the form errors.');
            return;
        }

        alert('Redirecting to payment gateway...');

    });
});
