document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section');
  const navList = document.getElementById('navbar__list');
  const scrollTopButton = document.getElementById('scrollTopBtn');

  // Build the navigation menu dynamically
  sections.forEach(section => {
    const navItem = document.createElement('li');
    const navLink = document.createElement('a');
    navLink.textContent = section.getAttribute('data-nav');
    navLink.href = `#${section.id}`;
    navLink.classList.add('menu__link');
    navItem.appendChild(navLink);
    navList.appendChild(navItem);
  });

  // Set the first section as active by default
  const initialActiveLink = document.querySelector(`a[href="#${sections[0].id}"]`);
  sections[0].classList.add('your-active-class');
  initialActiveLink.classList.add('active');

  // Function to check if an element is in the viewport
  const isElementInViewport = (element) => {
    const rect = element.getBoundingClientRect();
    return (rect.top >= 0 && rect.top < window.innerHeight * 0.5);
  };

  // Function to update the active class for the section in the viewport
  const updateActiveSection = () => {
    sections.forEach(section => {
      const navLink = document.querySelector(`a[href="#${section.id}"]`);
      if (isElementInViewport(section)) {
        section.classList.add('your-active-class');
        navLink.classList.add('active');
      } else {
        section.classList.remove('your-active-class');
        navLink.classList.remove('active');
      }
    });
  };

  // Scroll smoothly to the section when clicking on nav link
  const handleNavClick = (event) => {
    event.preventDefault();
    const targetId = event.target.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    targetSection.scrollIntoView({ behavior: 'smooth' });
  };

  // Scroll to top button functionality
  scrollTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    resetInitialLinkStyles();
  });

  // Function to reset styles of the first navigation link
  const resetInitialLinkStyles = () => {
    if (!isElementInViewport(sections[0])) {
      initialActiveLink.classList.remove('active');
    }
  };

  // Event listeners
  document.addEventListener('scroll', updateActiveSection);
  navList.addEventListener('click', handleNavClick);

  // Show or hide the scroll to top button
  window.addEventListener('scroll', () => {
    scrollTopButton.style.display = (window.scrollY > 20) ? 'block' : 'none';
  });
});
