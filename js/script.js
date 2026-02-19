/* ===================================
   ABEFE MOTORS - BASIC JAVASCRIPT
   TASK 3: JavaScript Learning Outcomes
   =================================== */

// ========== LEARNING OUTCOME 1: VARIABLES ========== //
// Using let, const, and var
let currentYear = 2026;
const companyName = "Abefe Motors";
var websiteVersion = "1.0";

console.log("Company:", companyName);
console.log("Current Year:", currentYear);
console.log("Version:", websiteVersion);

// ========== LEARNING OUTCOME 2: DATA TYPES ========== //
// String, Number, Boolean, Array, Object
let customerName = "John Doe"; // String
let vehiclePrice = 18500000; // Number
let isAvailable = true; // Boolean
let vehicleFeatures = ["Leather", "Sunroof", "Camera"]; // Array
let vehicle = {
    model: "Toyota Camry",
    year: 2023,
    price: 18500000,
    color: "Silver"
}; // Object

console.log("Vehicle Object:", vehicle);
console.log("Features Array:", vehicleFeatures);

// ========== LEARNING OUTCOME 3: FUNCTIONS ========== //

// Function Declaration
function greetCustomer(name) {
    return "Welcome to " + companyName + ", " + name + "!";
}

// Arrow Function
const calculateMonthlyPayment = (price, depositPercent, months) => {
    const deposit = (price * depositPercent) / 100;
    const loanAmount = price - deposit;
    const monthlyPayment = loanAmount / months;
    return monthlyPayment;
};

console.log("Greeting:", greetCustomer("Joshua"));
console.log("Monthly Payment:", calculateMonthlyPayment(18500000, 30, 12));

// ========== LEARNING OUTCOME 4: DOM MANIPULATION ========== //

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded!");
    
    // Update current year in footer
    updateFooterYear();
    
    // Display business age
    displayBusinessAge();
    
    // Show current date and time
    displayDateTime();
    
    // Initialize payment calculator
    initializePaymentCalculator();
    
    // Initialize form validation
    initializeFormValidation();
    
    // Initialize interactive features
    initializeInteractiveFeatures();
    
    // Initialize vehicle filter
    initializeVehicleFilter();
});

// ========== FUNCTION: Update Footer Year ========== //
function updateFooterYear() {
    const yearElement = document.querySelector('footer p:first-child');
    if (yearElement) {
        yearElement.innerHTML = `Abefe Motors - Nigeria's Trusted Car Dealership`;
    }
}

// ========== FUNCTION: Display Business Age ========== //
function displayBusinessAge() {
    const foundedYear = 2015;
    const yearsInBusiness = currentYear - foundedYear;
    
    console.log("Years in Business:", yearsInBusiness);
    
    // Display on homepage
    const homeSection = document.getElementById('home');
    if (homeSection) {
        const ageDisplay = document.createElement('p');
        ageDisplay.innerHTML = `<strong>Proudly serving Nigeria for ${yearsInBusiness} years!</strong>`;
        ageDisplay.style.textAlign = "center";
        ageDisplay.style.color = "#EDAE49";
        ageDisplay.style.fontSize = "1.2em";
        ageDisplay.style.marginTop = "10px";
        
        const welcomeHeading = homeSection.querySelector('h2');
        if (welcomeHeading) {
            welcomeHeading.after(ageDisplay);
        }
    }
}

// ========== FUNCTION: Display Current Date and Time ========== //
function displayDateTime() {
    const dateTimeDiv = document.createElement('div');
    dateTimeDiv.id = 'current-datetime';
    dateTimeDiv.style.textAlign = 'center';
    dateTimeDiv.style.padding = '10px';
    dateTimeDiv.style.backgroundColor = '#EDAE49';
    dateTimeDiv.style.borderRadius = '5px';
    dateTimeDiv.style.margin = '10px 0';
    
    function updateTime() {
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };
        dateTimeDiv.innerHTML = `<strong>Today:</strong> ${now.toLocaleDateString('en-NG', options)}`;
    }
    
    updateTime();
    setInterval(updateTime, 1000); // Update every second
    
    const header = document.querySelector('header');
    if (header) {
        header.appendChild(dateTimeDiv);
    }
}

// ========== LEARNING OUTCOME 5: EVENT HANDLERS ========== //

// ========== FUNCTION: Payment Calculator ========== //
function initializePaymentCalculator() {
    const calculateButton = document.querySelector('input[value="Calculate Monthly Payment"]');
    
    if (calculateButton) {
        // Change button type to button to prevent form submission
        calculateButton.type = 'button';
        
        calculateButton.addEventListener('click', function(event) {
            event.preventDefault();
            
            // Get input values
            const priceInput = document.getElementById('vehicle-price');
            const depositInput = document.getElementById('deposit');
            const monthsInput = document.getElementById('months');
            
            if (!priceInput || !depositInput || !monthsInput) {
                alert("Payment calculator form elements not found!");
                return;
            }
            
            // LEARNING OUTCOME 6: CONDITIONALS
            const price = parseFloat(priceInput.value);
            const depositPercent = parseFloat(depositInput.value);
            const months = parseInt(monthsInput.value);
            
            // Validation with if/else
            if (!price || price < 1000000) {
                alert("Please enter a valid vehicle price (minimum ₦1,000,000)");
                return;
            }
            
            if (!depositPercent || depositPercent < 30 || depositPercent > 100) {
                alert("Deposit must be between 30% and 100%");
                return;
            }
            
            if (!months || months < 3 || months > 12) {
                alert("Payment period must be between 3 and 12 months");
                return;
            }
            
            // Calculate
            const deposit = (price * depositPercent) / 100;
            const loanAmount = price - deposit;
            const monthlyPayment = loanAmount / months;
            
            // Format numbers with commas
            const formattedPrice = price.toLocaleString('en-NG');
            const formattedDeposit = deposit.toLocaleString('en-NG');
            const formattedLoan = loanAmount.toLocaleString('en-NG');
            const formattedMonthly = monthlyPayment.toLocaleString('en-NG');
            
            // Display result
            const resultMessage = `
                <strong>Payment Calculation Results:</strong><br><br>
                Vehicle Price: ₦${formattedPrice}<br>
                Initial Deposit (${depositPercent}%): ₦${formattedDeposit}<br>
                Loan Amount: ₦${formattedLoan}<br>
                Payment Period: ${months} months<br><br>
                <strong style="color: #EDAE49; font-size: 1.2em;">Monthly Payment: ₦${formattedMonthly}</strong><br><br>
                <small>*Excludes interest rates. Contact us for final quote.</small>
            `;
            
            alert(resultMessage.replace(/<br>/g, '\n').replace(/<[^>]*>/g, ''));
            
            // Also display on page
            displayCalculationResult(resultMessage);
        });
    }
}

// Display calculation result on page
function displayCalculationResult(message) {
    let resultDiv = document.getElementById('calculation-result');
    
    if (!resultDiv) {
        resultDiv = document.createElement('div');
        resultDiv.id = 'calculation-result';
        resultDiv.style.backgroundColor = '#e8f4f8';
        resultDiv.style.padding = '20px';
        resultDiv.style.borderRadius = '8px';
        resultDiv.style.marginTop = '20px';
        resultDiv.style.border = '2px solid #EDAE49';
        
        const calculatorSection = document.querySelector('input[value="Calculate Monthly Payment"]').closest('section');
        if (calculatorSection) {
            calculatorSection.appendChild(resultDiv);
        }
    }
    
    resultDiv.innerHTML = message;
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ========== FUNCTION: Form Validation ========== //
function initializeFormValidation() {
    const forms = document.querySelectorAll('form');
    
    // LEARNING OUTCOME 7: LOOPS
    for (let i = 0; i < forms.length; i++) {
        const form = forms[i];
        
        // Skip payment calculator form
        if (form.querySelector('input[value="Calculate Monthly Payment"]')) {
            continue;
        }
        
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            
            let isValid = true;
            let errors = [];
            
            // Validate required text inputs
            const requiredInputs = form.querySelectorAll('input[required], select[required], textarea[required]');
            
            requiredInputs.forEach(function(input) {
                if (!input.value.trim()) {
                    isValid = false;
                    errors.push(`${input.previousElementSibling ? input.previousElementSibling.textContent : 'A required field'} must be filled`);
                    input.style.borderColor = 'red';
                } else {
                    input.style.borderColor = '#ccc';
                }
            });
            
            // Validate email
            const emailInputs = form.querySelectorAll('input[type="email"]');
            emailInputs.forEach(function(email) {
                if (email.value) {
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailPattern.test(email.value)) {
                        isValid = false;
                        errors.push("Please enter a valid email address");
                        email.style.borderColor = 'red';
                    }
                }
            });
            
            // Validate phone number
            const phoneInputs = form.querySelectorAll('input[type="tel"]');
            phoneInputs.forEach(function(phone) {
                if (phone.value) {
                    const phonePattern = /^[0-9]{11}$/;
                    if (!phonePattern.test(phone.value)) {
                        isValid = false;
                        errors.push("Phone number must be 11 digits");
                        phone.style.borderColor = 'red';
                    }
                }
            });
            
            // Validate age
            const ageInput = form.querySelector('input[type="number"]#age');
            if (ageInput && ageInput.value) {
                const age = parseInt(ageInput.value);
                if (age < 18 || age > 100) {
                    isValid = false;
                    errors.push("Age must be between 18 and 100");
                    ageInput.style.borderColor = 'red';
                }
            }
            
            // Show results
            if (isValid) {
                alert("✓ Form submitted successfully!\n\nThank you for your inquiry. Our team will contact you shortly.");
                
                // Show confirmation section
                const confirmationSection = document.getElementById('confirmation');
                if (confirmationSection) {
                    confirmationSection.scrollIntoView({ behavior: 'smooth' });
                    confirmationSection.style.display = 'block';
                }
            } else {
                alert("❌ Form Validation Failed!\n\n" + errors.join("\n"));
            }
        });
    }
}

// ========== LEARNING OUTCOME 8: ARRAYS & OBJECTS ========== //

// Array of vehicles
const vehicles = [
    { model: "Toyota Camry", year: 2023, price: 18500000, type: "Sedan", available: true },
    { model: "Honda Accord", year: 2022, price: 16200000, type: "Sedan", available: true },
    { model: "Lexus RX 350", year: 2021, price: 28900000, type: "SUV", available: true }
];

// Function to display vehicle count
function displayVehicleCount() {
    const count = vehicles.length;
    console.log(`Total vehicles available: ${count}`);
}

displayVehicleCount();

// LEARNING OUTCOME 9: ARRAY MANIPULATION
// Using forEach to list all vehicles
console.log("Available Vehicles:");
vehicles.forEach(function(vehicle, index) {
    console.log(`${index + 1}. ${vehicle.model} (${vehicle.year}) - ₦${vehicle.price.toLocaleString()}`);
});

// ========== FUNCTION: Interactive Features ========== //
function initializeInteractiveFeatures() {
    // Add "Back to Top" functionality
    addBackToTopButton();
    
    // Add hover effect message
    addHoverEffects();
    
    // Add click counter
    addClickCounter();
    
    // Add testimonial rotator
    addTestimonialRotator();
}

// Back to Top Button
function addBackToTopButton() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '↑ Top';
    backToTopBtn.id = 'back-to-top';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #EDAE49;
        color: #003D5B;
        border: none;
        padding: 12px 20px;
        border-radius: 5px;
        cursor: pointer;
        font-weight: bold;
        display: none;
        z-index: 1000;
        box-shadow: 0 2px 5px rgba(0,0,0,0.3);
    `;
    
    document.body.appendChild(backToTopBtn);
    
    // Show button when scrolling down
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });
    
    // Scroll to top on click
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Add hover effects
function addHoverEffects() {
    const vehicleArticles = document.querySelectorAll('#inventory article');
    
    vehicleArticles.forEach(function(article) {
        article.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'transform 0.3s ease';
            this.style.boxShadow = '0 5px 15px rgba(237, 174, 73, 0.3)';
        });
        
        article.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
    });
}

// Click counter
function addClickCounter() {
    let clickCount = 0;
    
    const counterDiv = document.createElement('div');
    counterDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #003D5B;
        color: white;
        padding: 10px 15px;
        border-radius: 5px;
        font-size: 0.9em;
        z-index: 999;
    `;
    counterDiv.innerHTML = `Clicks: <span id="click-count">0</span>`;
    
    document.body.appendChild(counterDiv);
    
    document.addEventListener('click', function() {
        clickCount++;
        document.getElementById('click-count').textContent = clickCount;
    });
}

// Testimonial rotator
function addTestimonialRotator() {
    const testimonials = document.querySelectorAll('#testimonials article');
    
    if (testimonials.length === 0) return;
    
    let currentIndex = 0;
    
    // Hide all except first
    testimonials.forEach(function(testimonial, index) {
        if (index !== 0) {
            testimonial.style.display = 'none';
        }
    });
    
    // Rotate every 5 seconds
    setInterval(function() {
        testimonials[currentIndex].style.display = 'none';
        currentIndex = (currentIndex + 1) % testimonials.length;
        testimonials[currentIndex].style.display = 'block';
    }, 5000);
}

// ========== FUNCTION: Vehicle Filter ========== //
function initializeVehicleFilter() {
    const inventorySection = document.getElementById('inventory');
    
    if (!inventorySection) return;
    
    // Create filter controls
    const filterDiv = document.createElement('div');
    filterDiv.style.cssText = `
        background-color: #e8f4f8;
        padding: 20px;
        border-radius: 8px;
        margin-bottom: 20px;
    `;
    
    filterDiv.innerHTML = `
        <h3 style="margin-top: 0;">Filter Vehicles</h3>
        <label for="price-filter" style="margin-right: 10px;">Max Price:</label>
        <select id="price-filter" style="padding: 8px; border-radius: 4px; margin-right: 20px;">
            <option value="all">All Prices</option>
            <option value="20000000">Under ₦20M</option>
            <option value="25000000">Under ₦25M</option>
            <option value="30000000">Under ₦30M</option>
        </select>
        
        <button id="apply-filter" style="background-color: #003D5B; color: white; padding: 8px 20px; border: none; border-radius: 5px; cursor: pointer;">Apply Filter</button>
        <button id="reset-filter" style="background-color: #30638E; color: white; padding: 8px 20px; border: none; border-radius: 5px; cursor: pointer; margin-left: 10px;">Reset</button>
    `;
    
    const inventoryHeading = inventorySection.querySelector('h2');
    if (inventoryHeading) {
        inventoryHeading.after(filterDiv);
    }
    
    // Filter functionality
    const applyButton = document.getElementById('apply-filter');
    const resetButton = document.getElementById('reset-filter');
    const priceFilter = document.getElementById('price-filter');
    
    if (applyButton) {
        applyButton.addEventListener('click', function() {
            const maxPrice = priceFilter.value;
            const vehicleArticles = document.querySelectorAll('#inventory > article');
            let visibleCount = 0;
            
            vehicleArticles.forEach(function(article) {
                const priceText = article.querySelector('mark').textContent;
                const price = parseInt(priceText.replace(/[^\d]/g, ''));
                
                if (maxPrice === 'all' || price <= parseInt(maxPrice)) {
                    article.style.display = 'block';
                    visibleCount++;
                } else {
                    article.style.display = 'none';
                }
            });
            
            alert(`Showing ${visibleCount} vehicle(s) matching your criteria`);
        });
    }
    
    if (resetButton) {
        resetButton.addEventListener('click', function() {
            priceFilter.value = 'all';
            const vehicleArticles = document.querySelectorAll('#inventory > article');
            vehicleArticles.forEach(function(article) {
                article.style.display = 'block';
            });
            alert('Filter reset - showing all vehicles');
        });
    }
}

// ========== LEARNING OUTCOME 10: SWITCH STATEMENT ========== //
function getVehicleCategory(price) {
    let category;
    
    switch(true) {
        case (price < 15000000):
            category = "Economy";
            break;
        case (price >= 15000000 && price < 25000000):
            category = "Mid-Range";
            break;
        case (price >= 25000000):
            category = "Luxury";
            break;
        default:
            category = "Unknown";
    }
    
    return category;
}

console.log("Vehicle Categories:");
vehicles.forEach(function(vehicle) {
    console.log(`${vehicle.model}: ${getVehicleCategory(vehicle.price)}`);
});

// ========== ADDITIONAL INTERACTIVE FEATURES ========== //

// Alert on page load
window.addEventListener('load', function() {
    setTimeout(function() {
        console.log("Welcome to Abefe Motors! Page fully loaded.");
    }, 1000);
});

// Confirmation before leaving page
window.addEventListener('beforeunload', function(event) {
    // Only show if form is filled
    const inputs = document.querySelectorAll('input[type="text"], input[type="email"]');
    let hasContent = false;
    
    inputs.forEach(function(input) {
        if (input.value.trim() !== '') {
            hasContent = true;
        }
    });
    
    if (hasContent) {
        event.preventDefault();
        event.returnValue = '';
    }
});

// ========== CONSOLE LOG SUMMARY ========== //
console.log("=====================================");
console.log("ABEFE MOTORS - JavaScript Initialized");
console.log("=====================================");
console.log("✓ Variables declared");
console.log("✓ Functions created");
console.log("✓ DOM manipulation active");
console.log("✓ Event handlers attached");
console.log("✓ Interactive features enabled");
console.log("✓ Form validation ready");
console.log("✓ Payment calculator working");
console.log("=====================================");