function initializePastEvents() {
    const slider = document.getElementById('past-events-slider');
    
    fetch('past-events.xml')
        .then(response => response.text())
        .then(xmlString => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
            const events = Array.from(xmlDoc.querySelectorAll('event'));
            
            slider.innerHTML = '';

            const slideContainer = document.createElement('div');
            slideContainer.className = 'slide-container';

            const slides = [];
            for(let i = 0; i < 3; i++) {
                const slide = document.createElement('div');
                slide.className = 'event-slide';
                
                events.slice(i*4, (i+1)*4).forEach(event => {
                    const name = event.querySelector('name').textContent;
                    const date = event.querySelector('date').textContent;
                    const venue = event.querySelector('venue').textContent;
                    const media = event.querySelector('media').textContent;
                    
                    const mediaElement = media.endsWith('.mp4') || media.endsWith('.webm')
                        ? `<video class="card-media" autoplay loop muted playsinline>
                              <source src="${media}" type="video/mp4">
                           </video>`
                        : `<img class="card-media" src="${media}" alt="${name}">`;
                    
                    slide.innerHTML += `
                        <div class="past-event-card">
                            <div class="media-container">
                                ${mediaElement}
                            </div>
                            <div class="past-event-info">
                                <h3>${name}</h3>
                                <p>📅 ${date}</p>
                                <p>📍 ${venue}</p>
                            </div>
                        </div>
                    `;
                });
                slides.push(slide);
            }

            const firstSlideClone = slides[0].cloneNode(true);
            slides.push(firstSlideClone);

            slides.forEach(slide => slideContainer.appendChild(slide));
            slider.appendChild(slideContainer);
            
            startCarousel(slideContainer, slides.length);
        })
        .catch(error => console.error('Error loading past events:', error));
}

function startCarousel(container, totalSlides) {
    let currentSlide = 0;
    const slideWidth = 100 / totalSlides;
    
    function nextSlide() {
        currentSlide++;

        container.style.transform = `translateX(-${currentSlide * slideWidth}%)`;

        if(currentSlide === totalSlides - 1) {
            setTimeout(() => {

                container.style.transition = 'none';
                container.style.transform = 'translateX(0)';
                currentSlide = 0;
                void container.offsetWidth;
                container.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            }, 800); 
        }
    }
    

    setInterval(nextSlide, 5000);
}


document.addEventListener('DOMContentLoaded', initializePastEvents);