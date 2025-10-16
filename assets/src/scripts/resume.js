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

  // Add animation on scroll for resume sections
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe all resume sections and cards
  document.querySelectorAll('.resume-section, .card').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
  });

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
