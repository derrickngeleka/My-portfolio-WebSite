/**
 * Resume Page Scripts
 * Handles print functionality and interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  // Print/Save PDF button
  const printButton = document.getElementById('print-resume');
  
  if (printButton) {
    printButton.addEventListener('click', () => {
      window.print();
    });
  }

  // Add smooth scroll behavior for any anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Animation on scroll for resume sections and experience cards
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Animate experience cards and resume sections
  document.querySelectorAll('.animate-on-scroll, .resume-section, .card').forEach(section => {
    observer.observe(section);
  });

  // Animate tech skill cards with staggered effect
  const skillCards = document.querySelectorAll('.animate-skill');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, idx * 120);
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  skillCards.forEach(card => skillObserver.observe(card));

  // Copy to clipboard functionality for contact info
  document.querySelectorAll('.contact-item a').forEach(link => {
    link.addEventListener('click', async (e) => {
      // Only copy email addresses to clipboard
      if (link.href.startsWith('mailto:')) {
        e.preventDefault();
        const email = link.textContent;
        try {
          await navigator.clipboard.writeText(email);
          // Visual feedback
          const originalText = link.textContent;
          link.textContent = 'Copied!';
          link.style.color = 'var(--accent)';
          setTimeout(() => {
            link.textContent = originalText;
            link.style.color = '';
          }, 2000);
        } catch (err) {
          console.error('Failed to copy:', err);
        }
      }
    });
  });
});
