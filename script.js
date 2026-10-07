/**
 * MAICK CAR - INTERACTIVE SCRIPT
 * High Performance Luxury Car Dealership Logic
 */

// Database of Exclusive Vehicles
const carInventory = [
  {
    id: 1,
    name: 'Porsche 911 GT3 RS',
    brand: 'porsche',
    price: 3450000,
    priceFormatted: 'R$ 3.450.000',
    image: 'images/porsche.png',
    power: '525 CV',
    speed: '3.2s (0-100)',
    year: '2025',
    category: 'esportivos',
    featured: true
  },
  {
    id: 2,
    name: 'Lamborghini Revuelto V12',
    brand: 'lamborghini',
    price: 6800000,
    priceFormatted: 'R$ 6.800.000',
    image: 'images/lamborghini.png',
    power: '1015 CV',
    speed: '2.5s (0-100)',
    year: '2025',
    category: 'superesportivos',
    featured: true
  },
  {
    id: 3,
    name: 'Ferrari SF90 Stradale',
    brand: 'ferrari',
    price: 5900000,
    priceFormatted: 'R$ 5.900.000',
    image: 'images/ferrari.png',
    power: '1000 CV',
    speed: '2.5s (0-100)',
    year: '2024',
    category: 'superesportivos',
    featured: true
  },
  {
    id: 4,
    name: 'Rolls-Royce Spectre Electric',
    brand: 'rollsroyce',
    price: 5200000,
    priceFormatted: 'R$ 5.200.000',
    image: 'images/rollsroyce.png',
    power: '584 CV',
    speed: '4.5s (0-100)',
    year: '2025',
    category: 'luxo',
    featured: true
  },
  {
    id: 5,
    name: 'McLaren 750S Spider',
    brand: 'mclaren',
    price: 4100000,
    priceFormatted: 'R$ 4.100.000',
    image: 'images/hero.png',
    power: '750 CV',
    speed: '2.8s (0-100)',
    year: '2025',
    category: 'esportivos',
    featured: false
  }
];

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  renderCatalog('all');
  initFilterButtons();
  initFinancingCalculator();
  initModals();
});

// Sticky Navbar Scroll Effect
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// Render Cars into Grid
function renderCatalog(filter = 'all') {
  const grid = document.getElementById('carsGrid');
  if (!grid) return;

  grid.innerHTML = '';
  
  const filteredCars = filter === 'all' 
    ? carInventory 
    : carInventory.filter(car => car.category === filter || car.brand === filter);

  filteredCars.forEach(car => {
    const card = document.createElement('div');
    card.className = 'car-card';
    card.innerHTML = `
      <div class="car-image">
        <img src="${car.image}" alt="${car.name}" loading="lazy">
        <span class="car-badge">${car.year}</span>
      </div>
      <div class="car-details">
        <span class="car-brand">${car.brand}</span>
        <h3 class="car-name">${car.name}</h3>
        <div class="car-specs">
          <div class="spec-item">
            <i class="fas fa-tachometer-alt"></i>
            <span class="spec-value">${car.power}</span>
            <span class="spec-label">Potência</span>
          </div>
          <div class="spec-item">
            <i class="fas fa-bolt"></i>
            <span class="spec-value">${car.speed}</span>
            <span class="spec-label">0 - 100 km/h</span>
          </div>
          <div class="spec-item">
            <i class="fas fa-shield-alt"></i>
            <span class="spec-value">Garantia</span>
            <span class="spec-label">Oficial</span>
          </div>
        </div>
        <div class="car-footer">
          <div class="car-price">
            <span>Preço sob consulta</span>
            ${car.priceFormatted}
          </div>
          <button class="btn btn-outline" onclick="openInterestModal('${car.name}')">
            Tenho Interesse
          </button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

// Category Filter Handling
function initFilterButtons() {
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      buttons.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      const filterValue = e.target.getAttribute('data-filter');
      renderCatalog(filterValue);
    });
  });
}

// Financing Calculator Interactive Engine
function initFinancingCalculator() {
  const priceInput = document.getElementById('calcCarPrice');
  const downPaymentInput = document.getElementById('calcDownPayment');
  const monthsInput = document.getElementById('calcMonths');
  const resultDisplay = document.getElementById('calcResultValue');

  if (!priceInput || !downPaymentInput || !monthsInput || !resultDisplay) return;

  function calculate() {
    const price = parseFloat(priceInput.value) || 0;
    const downPaymentPercent = parseFloat(downPaymentInput.value) || 0;
    const months = parseInt(monthsInput.value) || 12;

    document.getElementById('downPaymentPercentText').innerText = `${downPaymentPercent}%`;

    const downPaymentAmount = price * (downPaymentPercent / 100);
    const financedAmount = price - downPaymentAmount;

    // Monthly interest rate around 1.1% for high end financing
    const monthlyRate = 0.011;
    let monthlyPayment = 0;

    if (financedAmount > 0) {
      monthlyPayment = (financedAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    }

    resultDisplay.innerText = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(monthlyPayment);
  }

  priceInput.addEventListener('input', calculate);
  downPaymentInput.addEventListener('input', calculate);
  monthsInput.addEventListener('change', calculate);
  
  calculate();
}

// Modal handling
function initModals() {
  const modal = document.getElementById('interestModal');
  const closeBtn = document.querySelector('.modal-close');

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  }

  const form = document.getElementById('interestForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Obrigado! Um consultor exclusivo da Maick Car entrará em contato em minutos.');
      modal.classList.remove('active');
    });
  }
}

function openInterestModal(carName) {
  const modal = document.getElementById('interestModal');
  const carTitleElem = document.getElementById('modalCarTitle');
  if (carTitleElem) carTitleElem.innerText = carName;
  if (modal) modal.classList.add('active');
}
