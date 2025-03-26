const eventsData = {
    concerts: [
        { title: "~ ELECTRIC PULSE ~", date: "March 15, 2025 (Saturday)", location: "Nelum Pokuna Theatre, Colombo", price: "LKR 1,500 upwards", media: "r1.mp4", time: "8:00 PM onwards",buttonLink:"concert.html?id=electric-pulse"  },
        { title: "~ OECHESTRA CONCERT ~", date: "April 20, 2025 (Sunday)", location: "Viharamahadevi Park, Colombo", price: "LKR 2,000 upwards", media: "r2.mp4", time: "9:00 PM onwards", buttonLink:"concert.html?id=orchestra-concert" },
        { title: "~ ECHOS OF ETERNY ~", date: "June 7, 2025 (Saturday)", location: "Earl’s Regency Hotel, Kandy", price: "LKR 3,000 upwards", media: "r3.mp4", time: "10:00 PM onwards", buttonLink:"concert.html?id=echos-of-eterny" },
        { title: "~ LEGENDS OF ROCK ~", date: "August 23, 2025 (Saturday)", location: "Jaffna Cultural Centre, Jaffna", price: "LKR 1,500 upwards", media: "r4.mp4", time: "7:30 PM onwards", buttonLink:"concert.html?id=legends-of-rock" },
        { title: "~ VELVET GROOVES ~", date: "March 15", location: "Viharamahadevi Park, Colombo", price: "LKR 2,500 upwards", media: "r5.mp4", time: "8:30 PM onwards",buttonLink:"concert.html?id=velvet-grooves" },
        { title: "~ ELEGANT SYMPHONY ~", date: "October 12, 2025 (Sunday)", location: "Galle Face Green, Colombo", price: "LKR 2,000 upwards", media: "r6.mp4", time: "7:30 PM onwards",buttonLink:"concert.html?id=symphony-of-elegance"  },
        { title: "~ DROP NATION ~", date: "December 5, 2025 (Friday)", location: "Sugathadasa Indoor Stadium, Colombo", price: "LKR 2,500 upwards", media: "r7.mp4", time: "8:30 PM onwards", buttonLink:"concert.html?id=drop-nation" },
        { title: "~ ETERNAL RIFFS ~", date: "March 18", location: "Nelum Pokuna Theatre, Colombo", price: "LKR 2,500 upwards", media: "r8.mp4", time: "8:00 PM onwards", buttonLink:"concert.html?id=eternal-riffs" }
    ],
    movies: [
        { title: "~ SILENT TRIGGER ~", date: "Select Date", location: "Select Location", price: "LKR 1,500", media: "m6.mp4", time: "Select Time",buttonLink:"movie.html?id=silent-trigger" },
        { title: "~ SHATTERED ILLUSIONS ~", date: "Select Date", location: "Select Location", price: "LKR 1,800", media: "m5.mp4", time: "Select Time",buttonLink:"movie.html?id=shattered-illusions" },
        { title: "~ LEELA'S CHRONICLES ~", date: "Select Date", location: "Select Location", price: "LKR 2,500", media: "m2.mp4", time: "Select Time",buttonLink:"movie.html?id=chronicles-leela" },
        { title: "~ STRINGS OF SOLITUDE ~", date: "Select Date", location: "Select Location", price: "LKR 2,000", media: "m8.mp4", time: "Select Time",buttonLink:"movie.html?id=strings-solitude" },
        { title: "~ MY LITTLE SECRET ~", date: "Select Date", location: "Select Location", price: "LKR 1,500", media: "m7.mp4", time: "Select Time",buttonLink:"movie.html?id=little-secret" },
        { title: "~ SILENT SCREAMS ~", date: "Select Date", location: "Select Location", price: "LKR 1,600", media: "m4.mp4", time: "Select Time",buttonLink:"movie.html?id=silent-screams" },
        { title: "~ DEAD END EXPRESS ~", date: "Select Date", location: "Select Location", price: "LKR 2,200", media: "m1.mp4", time: "Select Time",buttonLink:"movie.html?id=dead-end-express" },
        { title: "~ UNDER INVESTIGATION ~", date: "Select Date", location: "Select Location", price: "LKR 2,800", media: "m3.mp4", time: "Select Time",buttonLink:"movie.html?id=under-investigation" }
        
        
    ],
    conferences: [
        { title: "~ THE CREATIVE BUSINESS CONFERENCE ~", date: "March 22, 2025 (Saturday)", location: "Shangri-La Hotel, Colombo", price: "LKR 2,000", media: "c1.mp4", time: "9:00 AM onwards",buttonLink:"conference.html?id=creative-business" },
        { title: "~ HOW TO EARN AND START ONLINE BUSINESS ~", date: "March 24, 2025 (Monday)", location: "Online (Zoom)", price: "LKR 3,500", media: "c2.mp4", time: "10:00 AM onwards" ,buttonLink:"conference.html?id=online-business"},
        { title: "~ BOOST YOUR PRODUCTIVITY WITH AI ~", date: "March 26, 2025 (Wednesday)", location: "BMICH, Colombo", price: "LKR 4,000", media: "c3.mp4", time: "9:30 AM onwards" ,buttonLink:"conference.html?id=ai-productivity"},
        { title: "~ BUSINESS DIGITAL MARKETING ~", date: "March 28, 2025 (Friday)", location: "Cinnamon Grand, Colombo", price: "LKR 3,000", media: "c4.mp4", time: "11:00 AM onwards" ,buttonLink:"conference.html?id=digital-marketing"},
        { title: "~ CYBER MONDAY STRATEGIES ~", date: "April 7, 2025 (Monday)", location: "Galle Face Hotel, Colombo", price: "LKR 2,500", media: "c5.mp4", time: "8:30 AM onwards" ,buttonLink:"conference.html?id=cyber-monday-strategies"},
        { title: "~ ONLINE BUSINESS WEBINAR ~", date: "April 5, 2025 (Saturday)", location: "Online (Sri Lanka)", price: "LKR 1,500", media: "c6.mp4", time: "10:00 AM onwards",buttonLink:"conference.html?id=business-webinar" },
        { title: "~ HEALTHCARE CONFERENCE ~", date: "April 10, 2025 (Thursday)", location: "Kingsbury Hotel, Colombo", price: "LKR 3,200", media: "c7.mp4", time: "9:00 AM onwards",buttonLink:"conference.html?id=healthcare-conference" },
        { title: "~ VISIONX BUSINESS CONFERENCE ~", date: "April 15, 2025 (Tuesday)", location: "Taj Samudra, Colombo", price: "LKR 4,500", media: "c8.mp4", time: "10:30 AM onwards" ,buttonLink:"conference.html?id=visionx"}
    ]
};

function toggleMenu() {
    document.getElementById("nav-menu").classList.toggle("show");
}


function loadEvents(category) {
    const eventContainer = document.getElementById("event-container");
    eventContainer.innerHTML = eventsData[category].map(event => {
        return `
            <div class="event-card">
                <div class="media-container">
                    ${event.media.endsWith(".mp4") || event.media.endsWith(".webm") 
                        ? `<video src="${event.media}" class="card-media" autoplay loop muted></video>` 
                        : `<img src="${event.media}" class="card-media" alt="${event.title}">`}
                </div>
                <div class="card-container">
                    <div class="title"><strong>${event.title}</strong></div>
                    <div class="location">📍 ${event.location}</div>
                    <div class="date">📅  ${event.date}</div>
                    <div class="time">⏰  ${event.time}</div>
                    <div class="price">💰  ${event.price}</div>
                </div>    
                    <a href="${event.buttonLink}" class="book-now">Book Now</a>
                
            </div>
        `;
    }).join("");
}




document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector(".active").classList.remove("active");
        btn.classList.add("active");
        loadEvents(btn.dataset.category);
    });
});


const allEvents = [
    ...eventsData.concerts,
    ...eventsData.movies,
    ...eventsData.conferences
];

const searchInput = document.getElementById('event-search');
const searchResults = document.getElementById('search-results');

function showSearchResults(results) {
    searchResults.innerHTML = '';
    
    if (results.length === 0) {
        searchResults.innerHTML = `<div class="no-results">No events found</div>`;
        searchResults.style.display = 'block';
        return;
    }

    results.forEach(event => {
        const div = document.createElement('div');
        div.className = 'search-result-item';
        div.innerHTML = `
            <div class="search-result-media">
                ${event.media.endsWith(".mp4") || event.media.endsWith(".webm") 
                    ? `<video src="${event.media}" autoplay loop muted></video>` 
                    : `<img src="${event.media}" alt="${event.title}">`}
            </div>
            <div class="search-result-content">
                <h4>${event.title}</h4>
                <p>📍 ${event.location}</p>
                <p>📅 ${event.date}</p>
                <p>💰 ${event.price}</p>
            </div>
        `;
        
        div.addEventListener('click', () => {
            window.location.href = event.buttonLink;
        });
        searchResults.appendChild(div);
    });
    
    searchResults.style.display = 'block';
}

function handleSearch() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    
    if (searchTerm === '') {
        searchResults.style.display = 'none';
        return;
    }

    const results = allEvents.filter(event => 
        event.title.toLowerCase().includes(searchTerm)
    );

    showSearchResults(results);
}


searchInput.addEventListener('input', handleSearch);
searchInput.addEventListener('focus', handleSearch);


document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target)) {
        searchResults.style.display = 'none';
    }
});

searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        searchResults.style.display = 'none';
    }
});


loadEvents("concerts");
+document.addEventListener("DOMContentLoaded", () => {
    const allEvents = [
        ...eventsData.concerts.map(event => ({ ...event, category: "concerts" })),
        ...eventsData.movies.map(event => ({ ...event, category: "movies" })),
        ...eventsData.conferences.map(event => ({ ...event, category: "conferences" }))
    ];

    const filterBtn = document.getElementById('filter-btn');
    const filterDropdown = document.getElementById('filter-dropdown');
    const filteredEventsGrid = document.getElementById('filtered-events-grid');
    const resetFiltersBtn = document.getElementById('reset-filters');

    if (filterBtn && filterDropdown) {
        filterBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            filterDropdown.classList.toggle('show');
        });

        document.addEventListener('click', (e) => {
            if (!filterBtn.contains(e.target) && !filterDropdown.contains(e.target)) {
                filterDropdown.classList.remove('show');
            }
        });
    }

    function filterEvents() {
        const selectedGenres = Array.from(document.querySelectorAll('input[name="genre"]:checked'))
            .map(cb => cb.value);

        const minPrice = parseFloat(document.getElementById('min-price')?.value) || 0;
        const maxPrice = parseFloat(document.getElementById('max-price')?.value) || Infinity;

        const selectedLocations = Array.from(document.querySelectorAll('input[name="location"]:checked'))
            .map(cb => cb.value);

        const startDate = document.getElementById('start-date')?.value;
        const endDate = document.getElementById('end-date')?.value;

        const filteredEvents = allEvents.filter(event => {
            const eventDate = new Date(event.date.replace(/\(.*?\)/, '').trim());
            const startValid = startDate ? eventDate >= new Date(startDate) : true;
            const endValid = endDate ? eventDate <= new Date(endDate) : true;
            const price = parseFloat(event.price.replace(/[^\d.]/g, '')) || 0;
            const priceValid = price >= minPrice && price <= maxPrice;

            return (
                (selectedGenres.length === 0 || selectedGenres.includes(event.category)) &&
                (selectedLocations.length === 0 || selectedLocations.some(loc => event.location.includes(loc))) &&
                startValid &&
                endValid &&
                priceValid
            );
        });

        displayFilteredEvents(filteredEvents);
    }

    function displayFilteredEvents(events) {
        if (filteredEventsGrid) {
            filteredEventsGrid.innerHTML = events.length > 0
                ? events.map(event => `
                    <div class="filtered-event-card">
                        <div class="event-media">
                            ${event.media.endsWith('.mp4') || event.media.endsWith('.webm') ?
                                `<video autoplay loop muted playsinline>
                                    <source src="${event.media}" type="video/mp4">
                                    Your browser does not support the video tag.
                                </video>` :
                                `<img src="${event.media}" alt="${event.title}">`
                            }
                        </div>
                        <h5>${event.title}</h5>
                        <p>📍 ${event.location}</p>
                        <p>📅 ${event.date}</p>
                        <p>⏰ ${event.time}</p>
                        <p>💰 ${event.price}</p>
                        <a href="${event.buttonLink}" class="book-now">View Details</a>
                    </div>
                `).join('')
                : '<p class="no-results">No events match your criteria.</p>';
        }
    }
    

    document.querySelectorAll('.filter-options input').forEach(input => {
        input.addEventListener('input', filterEvents);
    });

    if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener('click', () => {
            document.querySelectorAll('.filter-options input').forEach(input => {
                if (input.type === 'checkbox') input.checked = false;
                else input.value = '';
            });
            filterEvents();
        });
    }

    filterEvents();
});
