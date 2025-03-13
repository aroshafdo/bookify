document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get('id');
    
    
    const conferences = {
        'creative-business': {
            title: '~ THE CREATIVE BUSINESS CONFERENCE ~',
            date: 'March 22, 2025 (Saturday)',
            location: 'Shangri-La Hotel, Colombo',
            time: '9:00 AM onwards',
            video: 'c1.mp4',
            pricePerAttendee: 2000
        },
        'online-business': {
            title: '~ HOW TO EARN AND START ONLINE BUSINESS ~',
            date: 'March 24, 2025 (Monday)',
            location: 'Online (Zoom)',
            time: '10:00 AM onwards',
            video: 'c2.mp4',
            pricePerAttendee: 3500
        },
        'ai-productivity': {
            title: '~ BOOST YOUR PRODUCTIVITY WITH AI ~',
            date: 'March 26, 2025 (Wednesday)',
            location: 'BMICH, Colombo',
            time: '9:30 AM onwards',
            video: 'c3.mp4',
            pricePerAttendee: 4000
        },
        'digital-marketing': {
            title: '~ BUSINESS DIGITAL MARKETING ~',
            date: 'March 28, 2025 (Friday)',
            location: 'Cinnamon Grand, Colombo',
            time: '11:00 AM onwards',
            video: 'c4.mp4',
            pricePerAttendee: 3000
        },
        'cyber-monday-strategies': {
            title: "~ CYBER MONDAY STRATEGIES ~",
            date: "April 7, 2025 (Monday)",
            location: "Galle Face Hotel, Colombo",
            time: "8:30 AM onwards",
            video: "c5.mp4",
            pricePerAttendee: 2500
        },
        'business-webinar': {
            title: "~ BUSINESS WEBINAR ~",
            date: "April 5, 2025 (Saturday)",
            location: "Online (Sri Lanka)",
            time: "10:00 AM onwards",
            video: "c6.mp4",
            pricePerAttendee: 1500
        },
        'healthcare-conference': {
            title: "~ HEALTHCARE CONFERENCE ~",
            date: "April 10, 2025 (Thursday)",
            location: "Kingsbury Hotel, Colombo",
            time: "9:00 AM onwards",
            video: "c7.mp4",
            pricePerAttendee: 3200
        },
        'visionx': {
            title: "~ VISIONX ~",
            date: "April 15, 2025 (Tuesday)",
            location: "Taj Samudra, Colombo",
            time: "10:30 AM onwards",
            video: "c8.mp4",
            pricePerAttendee: 4500
    }
    };

     const conference = conferences[eventId];
     if (!conference) {
         window.location.href = '/';
         return;
     }
 
     document.getElementById('event-title').textContent = conference.title;
     document.getElementById('event-date').textContent = conference.date;
     document.getElementById('event-location').textContent = conference.location;
     document.getElementById('event-time').textContent = conference.time;

     document.getElementById('price-per-attendee').textContent = 
         `LKR ${conference.pricePerAttendee}`;
 
     const video = document.getElementById('event-video');
     const source = video.querySelector('source');
     source.src = conference.video;
     video.load();

     window.updateAttendees = (change) => {
         const attendeeElement = document.getElementById('attendees-count');
         const amountElement = document.getElementById('attendees-amount');
         
         let attendees = parseInt(attendeeElement.textContent) + change;
         attendees = Math.max(0, attendees);
         
         attendeeElement.textContent = attendees;
         const amount = attendees * conference.pricePerAttendee;
         amountElement.textContent = `${amount} LKR`;
         
         updateTotal();
     };
 
     function updateTotal() {
         const attendees = parseInt(document.getElementById('attendees-count').textContent);
         const total = attendees * conference.pricePerAttendee;
         document.getElementById('total-amount').textContent = `${total} LKR`;
     }

     function validateName() {
         const nameInput = document.getElementById('name');
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
         
         const attendees = parseInt(document.getElementById('attendees-count').textContent);

         if (attendees === 0) {
             alert('Please select at least one attendee!');
             return;
         }

         if (!validateForm()) {
             alert('Please correct the form errors.');
             return;
         }

         alert('Redirecting to payment gateway...');
 
     });
 });