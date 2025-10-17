// Blog page functionality
document.addEventListener('DOMContentLoaded', () => {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const blogCards = document.querySelectorAll('.blog-card');

  // Filter functionality
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.getAttribute('data-category');

      // Filter blog cards
      blogCards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
          card.style.display = 'block';
          // Add animation
          card.style.animation = 'fadeIn 0.5s ease-in-out';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Add reading progress indicator for individual blog posts
  const addReadingProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.innerHTML = '<div class="reading-progress-bar"></div>';
    document.body.prepend(progressBar);

    window.addEventListener('scroll', () => {
      const winHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;
      
      const progressBarElement = document.querySelector('.reading-progress-bar');
      if (progressBarElement) {
        progressBarElement.style.width = scrollPercent + '%';
      }
    });
  };

  // Uncomment for individual blog post pages
  // if (document.querySelector('.blog-post-content')) {
  //   addReadingProgress();
  // }

  // Search functionality (basic client-side search)
  const searchInput = document.getElementById('blogSearch');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase();
      
      blogCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const content = card.querySelector('p').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || content.includes(searchTerm)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }

  // Lazy loading for blog images
  const blogImages = document.querySelectorAll('.blog-card img[data-src]');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });

  blogImages.forEach(img => imageObserver.observe(img));
});
