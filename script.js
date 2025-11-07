// Product data
const products = [
  {
    id: "lgu",
    name: "LGU Management System",
    description: "Comprehensive local government unit management solution designed for municipal and provincial operations.",
    overview: "Streamline administrative processes, manage citizen services, and improve operational efficiency with our integrated LGU platform. Built specifically for government entities with compliance features and secure data management.",
    features: ["Citizen Management", "Permit & License Processing", "Revenue Management", "Reporting & Analytics"]
  },
  {
    id: "accounting",
    name: "Accounting & Financial System",
    description: "Complete accounting and financial management system for enterprises of all sizes.",
    overview: "Manage your finances with precision. Our accounting system provides real-time financial reporting, automated workflows, and compliance with accounting standards. Perfect for CFOs and finance teams managing complex operations.",
    features: ["General Ledger", "Accounts Payable/Receivable", "Financial Reporting", "Budget Management"]
  },
  {
    id: "payroll",
    name: "Payroll Management System",
    description: "Automated payroll processing and employee compensation management.",
    overview: "Simplify payroll operations with automated calculation, tax compliance, and employee self-service. Our system handles complex payroll scenarios while maintaining security and accuracy for your workforce.",
    features: ["Salary Processing", "Tax Compliance", "Leave Management", "Employee Portal"]
  }
];

// DOM Elements
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContent = document.querySelector('.tab-content');
const contactForm = document.getElementById('contactForm');

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
  // Initialize the first tab as active
  renderProductTab(products[0]);
  
  // Add event listeners to tab buttons
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      tabButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      button.classList.add('active');
      
      // Find the selected product
      const productId = button.getAttribute('data-tab');
      const selectedProduct = products.find(product => product.id === productId);
      
      // Render the selected product tab
      if (selectedProduct) {
        renderProductTab(selectedProduct);
      }
    });
  });
  
  // Handle contact form submission
  if (contactForm) {
    contactForm.addEventListener('submit', handleContactSubmit);
  }
});

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
