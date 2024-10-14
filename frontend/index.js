import { backend } from 'declarations/backend';

async function loadFilmProjects() {
    try {
        const projects = await backend.getFilmProjects();
        const projectList = document.getElementById('project-list');
        projectList.innerHTML = '';

        projects.forEach(project => {
            const projectElement = document.createElement('div');
            projectElement.className = 'project';
            projectElement.innerHTML = `
                <img src="${project.posterUrl}" alt="${project.title} Poster">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <p>Release Date: ${new Date(Number(project.releaseDate)).getFullYear()}</p>
            `;
            projectList.appendChild(projectElement);
        });
    } catch (error) {
        console.error('Error loading film projects:', error);
    }
}

async function loadTestimonials() {
    try {
        const testimonials = await backend.getTestimonials();
        const testimonialList = document.getElementById('testimonial-list');
        testimonialList.innerHTML = '';

        testimonials.forEach(testimonial => {
            const testimonialElement = document.createElement('div');
            testimonialElement.className = 'testimonial';
            testimonialElement.innerHTML = `
                <blockquote>${testimonial.content}</blockquote>
                <cite>- ${testimonial.author}</cite>
            `;
            testimonialList.appendChild(testimonialElement);
        });
    } catch (error) {
        console.error('Error loading testimonials:', error);
    }
}

window.addEventListener('load', () => {
    loadFilmProjects();
    loadTestimonials();
});
