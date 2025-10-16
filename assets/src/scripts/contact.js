/**
 * Contact Page Interactive Features
 * Handles form submission, copy buttons, and animations
 */

document.addEventListener('DOMContentLoaded', () => {
  // Copy to clipboard functionality
  const copyButtons = document.querySelectorAll('.copy-btn-modern');
  
  copyButtons.forEach(button => {
    button.addEventListener('click', async () => {
      const textToCopy = button.getAttribute('data-copy');
      
      try {
        await navigator.clipboard.writeText(textToCopy);
        
        // Visual feedback
        const originalHTML = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i> Copied!';
        button.style.background = 'var(--accent)';
        button.style.color = 'white';
        button.style.borderColor = 'var(--accent)';
        
        // Reset after 2 seconds
        setTimeout(() => {
          button.innerHTML = originalHTML;
          button.style.background = '';
          button.style.color = '';
          button.style.borderColor = '';
        }, 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
        button.innerHTML = '<i class="fas fa-times"></i> Failed';
        
        setTimeout(() => {
          button.innerHTML = '<i class="fas fa-copy"></i> Copy';
        }, 2000);
      }
    });
  });

  // Form submission handling
  const form = document.querySelector('.contact-form-modern');
  
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const submitBtn = form.querySelector('.submit-btn');
      const originalBtnContent = submitBtn.innerHTML;
      
      // Show loading state
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;
      
      // Get form data
      const formData = new FormData(form);
      
      try {
        // Submit to Netlify
        const response = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(formData).toString()
        });
        
        if (response.ok) {
          // Show success message
          showMessage('success', 'Message sent successfully! I\'ll get back to you soon.');
          form.reset();
          
          // Confetti effect (optional, simple animation)
          createConfetti();
        } else {
          throw new Error('Form submission failed');
        }
      } catch (error) {
        console.error('Error:', error);
        showMessage('error', 'Oops! Something went wrong. Please try again or email me directly.');
      } finally {
        // Reset button
        submitBtn.innerHTML = originalBtnContent;
        submitBtn.disabled = false;
      }
    });
  }

  // Show message function
  function showMessage(type, text) {
    // Remove existing messages
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
      existingMessage.remove();
    }
    
    // Create new message
    const message = document.createElement('div');
    message.className = `form-message ${type}`;
    message.innerHTML = `
      <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
      <span>${text}</span>
    `;
    
    // Insert before form
    form.parentNode.insertBefore(message, form);
    
    // Animate in
    message.style.opacity = '0';
    message.style.transform = 'translateY(-10px)';
    message.style.transition = 'all 0.3s ease';
    
    setTimeout(() => {
      message.style.opacity = '1';
      message.style.transform = 'translateY(0)';
    }, 10);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      message.style.opacity = '0';
      message.style.transform = 'translateY(-10px)';
      setTimeout(() => message.remove(), 300);
    }, 5000);
  }

  // Simple confetti effect
  function createConfetti() {
    const colors = ['#2563eb', '#3b82f6', '#60a5fa', '#93c5fd'];
    const confettiCount = 30;
    
    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div');
      confetti.style.position = 'fixed';
      confetti.style.width = '10px';
      confetti.style.height = '10px';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.top = '-10px';
      confetti.style.opacity = '1';
      confetti.style.pointerEvents = 'none';
      confetti.style.zIndex = '9999';
      confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
      
      document.body.appendChild(confetti);
      
      // Animate
      const duration = Math.random() * 2 + 1;
      const xMovement = (Math.random() - 0.5) * 200;
      
      confetti.animate([
        { 
          transform: 'translateY(0) translateX(0) rotate(0deg)',
          opacity: 1
        },
        { 
          transform: `translateY(${window.innerHeight + 10}px) translateX(${xMovement}px) rotate(${Math.random() * 360}deg)`,
          opacity: 0
        }
      ], {
        duration: duration * 1000,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      });
      
      // Remove after animation
      setTimeout(() => confetti.remove(), duration * 1000);
    }
  }

  // Scroll animations for contact cards
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 100);
      }
    });
  }, observerOptions);

  // Observe contact cards
  document.querySelectorAll('.contact-card-modern, .contact-form-modern').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
  });

  // Add ripple effect to buttons
  document.querySelectorAll('.submit-btn, .copy-btn-modern').forEach(button => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.style.position = 'absolute';
      ripple.style.borderRadius = '50%';
      ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
      ripple.style.pointerEvents = 'none';
      ripple.style.animation = 'ripple-animation 0.6s ease-out';
      
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Add ripple animation to CSS
  if (!document.getElementById('ripple-animation')) {
    const style = document.createElement('style');
    style.id = 'ripple-animation';
    style.textContent = `
      @keyframes ripple-animation {
        from {
          transform: scale(0);
          opacity: 1;
        }
        to {
          transform: scale(4);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Form validation with real-time feedback
  const inputs = form.querySelectorAll('input, textarea');
  
  inputs.forEach(input => {
    input.addEventListener('blur', () => {
      if (input.required && !input.value.trim()) {
        input.style.borderColor = '#ef4444';
      } else if (input.type === 'email' && input.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value)) {
          input.style.borderColor = '#ef4444';
        } else {
          input.style.borderColor = '#22c55e';
        }
      } else if (input.value.trim()) {
        input.style.borderColor = '#22c55e';
      }
    });
    
    input.addEventListener('focus', () => {
      input.style.borderColor = 'var(--primary)';
    });
  });
});
