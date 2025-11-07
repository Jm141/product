// Product data
const products = [
  {
    id: "lgu",
    name: "LGU Management System",
    description: "Comprehensive local government unit management solution designed for municipal and provincial operations.",
    overview: "Streamline administrative processes, manage citizen services, and improve operational efficiency with our integrated LGU platform. Built specifically for government entities with compliance features and secure data management.",
    features: ["Citizen Management", "Permit & License Processing", "Revenue Management", "Reporting & Analytics"],
    color: "#f0f9ff"
  },
  {
    id: "accounting",
    name: "Accounting & Financial System",
    description: "Complete accounting and financial management system for enterprises of all sizes.",
    overview: "Manage your finances with precision. Our accounting system provides real-time financial reporting, automated workflows, and compliance with accounting standards. Perfect for CFOs and finance teams managing complex operations.",
    features: ["General Ledger", "Accounts Payable/Receivable", "Financial Reporting", "Budget Management"],
    color: "#f0fdf4"
  },
  {
    id: "payroll",
    name: "Payroll Management System",
    description: "Automated payroll processing and employee compensation management.",
    overview: "Simplify payroll operations with automated calculation, tax compliance, and employee self-service. Our system handles complex payroll scenarios while maintaining security and accuracy for your workforce.",
    features: ["Salary Processing", "Tax Compliance", "Leave Management", "Employee Portal"],
    color: "#f5f3ff"
  }
];

// DOM Elements
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContent = document.querySelector('.tab-content');
const contactForm = document.getElementById('contactForm');
const productSections = document.querySelectorAll('.product-section');
const navLinks = document.querySelectorAll('.nav-link');
const docLinks = document.querySelectorAll('.doc-link');

// Add smooth scrolling for documentation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // If it's a product section, show it
            if (targetId.includes('-section')) {
                const productId = targetId.replace('-section', '').substring(1);
                showProduct(productId);
            }
            
            // Smooth scroll to the target
            setTimeout(() => {
                targetElement.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 100);
        }
    });
});

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
  // Add copy to clipboard functionality for code blocks
  document.querySelectorAll('.code-block').forEach(block => {
    const button = document.createElement('button');
    button.className = 'copy-button';
    button.innerHTML = '<i class="far fa-copy"></i>';
    button.title = 'Copy to clipboard';
    
    button.addEventListener('click', () => {
      const code = block.querySelector('code').innerText;
      navigator.clipboard.writeText(code).then(() => {
        button.innerHTML = '<i class="fas fa-check"></i>';
        button.classList.add('copied');
        setTimeout(() => {
          button.innerHTML = '<i class="far fa-copy"></i>';
          button.classList.remove('copied');
        }, 2000);
      });
    });
    
    block.style.position = 'relative';
    block.appendChild(button);
  });
  
  // Initialize tooltips for documentation links
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
  // Initialize the first tab and section as active
  showProduct(products[0].id);
  
  // Add event listeners to tab buttons
  tabButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const productId = button.getAttribute('data-tab');
      showProduct(productId);
      
      // Update URL hash
      window.location.hash = productId;
      
      // Scroll to the product section
      document.getElementById(`${productId}-section`).scrollIntoView({ behavior: 'smooth' });
    });
  });
  
  // Handle contact form submission
  if (contactForm) {
    contactForm.addEventListener('submit', handleContactSubmit);
  }
  
  // Handle hash changes for direct linking
  window.addEventListener('hashchange', handleHashChange);
  
  // Check for initial hash
  if (window.location.hash) {
    const productId = window.location.hash.substring(1);
    if (productId) {
      showProduct(productId);
    }
  }
});

// Handle hash changes
function handleHashChange() {
  const productId = window.location.hash.substring(1);
  if (productId) {
    showProduct(productId);
  }
}

// Show product section and update active states
function showProduct(productId) {
  // Hide all product sections
  productSections.forEach(section => {
    section.classList.remove('active');
  });
  
  // Show selected product section
  const activeSection = document.getElementById(`${productId}-section`);
  if (activeSection) {
    activeSection.classList.add('active');
    
    // Update URL without page reload
    const newUrl = `${window.location.pathname}#${productId}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
    
    // Add active class to installation guide in the current section
    const installationGuide = activeSection.querySelector('.installation-guide');
    if (installationGuide) {
      // Add a slight delay to ensure the section is visible
      setTimeout(() => {
        installationGuide.style.opacity = '1';
        installationGuide.style.transform = 'translateY(0)';
      }, 50);
    }
  }
  
  // Update tab buttons
  tabButtons.forEach(button => {
    if (button.getAttribute('data-tab') === productId) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
  });
  
  // Update navigation links
  navLinks.forEach(link => {
    if (link.getAttribute('href') === `#${productId}`) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
  
  // Scroll to top of the section
  if (activeSection) {
    setTimeout(() => {
      activeSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }
  
  // Update document title
  const product = products.find(p => p.id === productId);
  if (product) {
    document.title = `${product.name} | ARUGA Products`;
  }
}

// Render product tab content
function renderProductTab(product) {
  if (!product) return;
  
  const featuresHTML = product.features
    .map(feature => `<li>${feature}</li>`)
    .join('');
  
  const tabHTML = `
    <div class="product-details">
      <div class="product-info">
        <h3>${product.name}</h3>
        <p class="product-description">${product.description}</p>
        <p class="product-overview">${product.overview}</p>
        <h4>Key Features:</h4>
        <ul class="features">${featuresHTML}</ul>
        <button class="btn primary">Learn More</button>
      </div>
      <div class="product-image">
        <div class="image-placeholder">${product.name} Preview</div>
      </div>
    </div>
  `;
  
  tabContent.innerHTML = '';
  const tabPane = document.createElement('div');
  tabPane.className = 'tab-pane active';
  tabPane.id = `${product.id}-tab`;
  tabPane.innerHTML = tabHTML;
  tabContent.appendChild(tabPane);
  
  // Add click handler to the new Learn More button
  const learnMoreBtn = tabPane.querySelector('.btn.primary');
  if (learnMoreBtn) {
    learnMoreBtn.addEventListener('click', () => {
      // Scroll to contact form
      document.querySelector('.contact').scrollIntoView({ behavior: 'smooth' });
      // Set the interest dropdown to the current product
      const interestSelect = document.getElementById('interest');
      if (interestSelect) {
        interestSelect.value = product.id;
      }
    });
  }
}

// Handle contact form submission
function handleContactSubmit(e) {
  e.preventDefault();
  
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const interest = document.getElementById('interest').value;
  
  // Simple validation
  if (!name || !email || !interest) {
    alert('Please fill in all fields');
    return;
  }
  
  // In a real app, you would send this data to a server
  console.log('Form submitted:', { name, email, interest });
  
  // Show success message
  alert('Thank you for your interest! We will contact you soon.');
  
  // Reset form
  contactForm.reset();
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Add animation on scroll
const animateOnScroll = () => {
  const elements = document.querySelectorAll('.product-details, .contact-content');
  
  elements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (elementTop < windowHeight - 100) {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }
  });
};

// Set initial styles for animation
document.querySelectorAll('.product-details, .contact-content').forEach(element => {
  element.style.opacity = '0';
  element.style.transform = 'translateY(20px)';
  element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
});

// Add scroll event listener
window.addEventListener('scroll', animateOnScroll);

// Trigger once on page load
setTimeout(animateOnScroll, 100);
