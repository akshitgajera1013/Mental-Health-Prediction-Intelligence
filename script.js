/**
 * Aura AI - Mental Health Prediction System
 * Senior Developer Implementation
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. UI Interactions & Observers ---

    // Smooth Scroll Observer for fade/slide animations
    const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Run once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.slide-up').forEach(el => observer.observe(el));

    // Button Ripple Effect
    document.querySelectorAll('.ripple').forEach(button => {
        button.addEventListener('click', function(e) {
            this.classList.remove('active');
            // Trigger reflow to restart animation
            void this.offsetWidth; 
            this.classList.add('active');
        });
    });

    // --- 2. Form Logic & Data Binding ---

    // Map range inputs to their display spans dynamically
    const rangeMappings = [
        { id: 'daily_social_media_hours', spanId: 'val-sm-hours', suffix: ' hrs' },
        { id: 'sleep_hours', spanId: 'val-sleep', suffix: ' hrs' },
        { id: 'screen_time_before_sleep', spanId: 'val-screen-sleep', suffix: ' hrs' },
        { id: 'academic_performance', spanId: 'val-academic', suffix: '' },
        { id: 'physical_activity', spanId: 'val-physical', suffix: '' },
        { id: 'stress_level', spanId: 'val-stress', suffix: '' },
        { id: 'anxiety_level', spanId: 'val-anxiety', suffix: '' },
        { id: 'addiction_level', spanId: 'val-addiction', suffix: '' }
    ];

    rangeMappings.forEach(mapping => {
        const input = document.getElementById(mapping.id);
        const span = document.getElementById(mapping.spanId);
        
        if(input && span) {
            input.addEventListener('input', (e) => {
                span.textContent = e.target.value + mapping.suffix;
            });
        }
    });

    // --- 3. Form Submission & API Fetch ---
    const form = document.getElementById('prediction-form');
    const submitBtn = document.getElementById('submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnIcon = submitBtn.querySelector('.btn-icon');
    const spinner = submitBtn.querySelector('.spinner');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Basic Validation
        if (!validateForm()) {
            showToast('Please correct the highlighted fields.', 'error');
            return;
        }

        // Toggle Loading State
        setLoadingState(true);

        // Gather and cast form data to match FastAPI Pydantic schema strictly
        const formData = new FormData(form);
        const payload = {
            age: parseInt(formData.get('age'), 10),
            gender: formData.get('gender'),
            daily_social_media_hours: parseFloat(formData.get('daily_social_media_hours')),
            platform_usage: formData.get('platform_usage'),
            sleep_hours: parseFloat(formData.get('sleep_hours')),
            screen_time_before_sleep: parseFloat(formData.get('screen_time_before_sleep')),
            academic_performance: parseFloat(formData.get('academic_performance')),
            physical_activity: parseFloat(formData.get('physical_activity')),
            social_interaction_level: formData.get('social_interaction_level'),
            stress_level: parseInt(formData.get('stress_level'), 10),
            anxiety_level: parseInt(formData.get('anxiety_level'), 10),
            addiction_level: parseInt(formData.get('addiction_level'), 10)
        };

        try {
            // Note: Update URL if hosted elsewhere. CORS must be configured on FastAPI server.
            const response = await fetch('http://127.0.0.1:8000/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            
            const data = await response.json();
            
            // Expected data format from your backend: { "depression": 0 } or { "depression": 1 }
            displayResult(data.depression);
            
        } catch (error) {
            console.error('API Request Failed:', error);
            showToast('Failed to connect to the AI model. Check backend server.', 'error');
            
            // Fallback for demonstration UI (Optional - remove in absolute production)
            // Simulating a backend response if server is offline just so the UI renders.
            // const mockPrediction = Math.random() > 0.5 ? 1 : 0;
            // displayResult(mockPrediction); 
        } finally {
            setLoadingState(false);
        }
    });

    // --- 4. Validation Functions ---
    function validateForm() {
        let isValid = true;
        
        // Age validation
        const ageInput = document.getElementById('age');
        if (!ageInput.value || ageInput.value < 13 || ageInput.value > 100) {
            ageInput.parentElement.classList.add('error');
            isValid = false;
        } else {
            ageInput.parentElement.classList.remove('error');
        }

        // Required selects validation
        const selects = ['gender', 'platform_usage', 'social_interaction_level'];
        selects.forEach(id => {
            const select = document.getElementById(id);
            if (!select.value) {
                select.parentElement.classList.add('error');
                isValid = false;
            } else {
                select.parentElement.classList.remove('error');
            }
        });

        // Clear error on change
        document.querySelectorAll('input, select').forEach(el => {
            el.addEventListener('change', () => {
                el.parentElement.classList.remove('error');
            });
        });

        return isValid;
    }

    function setLoadingState(isLoading) {
        submitBtn.disabled = isLoading;
        if (isLoading) {
            btnText.classList.add('hidden');
            btnIcon.classList.add('hidden');
            spinner.classList.remove('hidden');
        } else {
            btnText.classList.remove('hidden');
            btnIcon.classList.remove('hidden');
            spinner.classList.add('hidden');
        }
    }

    // --- 5. Result Rendering & Animations ---
    const overlay = document.getElementById('result-overlay');
    const resultCard = document.getElementById('result-content');
    const closeBtn = document.getElementById('close-result');

    function displayResult(prediction) {
        const titleEl = document.getElementById('result-title');
        const messageEl = document.getElementById('result-message');
        const iconContainer = document.getElementById('result-icon-container');
        const actionSteps = document.getElementById('action-steps');
        const circularProgress = document.getElementById('risk-meter');
        const riskText = document.getElementById('risk-percentage');

        // Reset classes
        resultCard.classList.remove('theme-success', 'theme-danger');
        
        overlay.classList.remove('hidden');

        if (prediction === 0) {
            // No Depression
            resultCard.classList.add('theme-success');
            iconContainer.innerHTML = '<i class="fas fa-check-circle"></i>';
            titleEl.textContent = 'No Depression Detected';
            messageEl.textContent = 'Your mental wellness metrics look healthy. Keep maintaining your positive lifestyle habits!';
            actionSteps.classList.add('hidden');
            
            animateCircularProgress(circularProgress, riskText, 15, 'var(--success)');
            triggerConfetti();

        } else if (prediction === 1) {
            // Depression Detected
            resultCard.classList.add('theme-danger');
            iconContainer.innerHTML = '<i class="fas fa-exclamation-triangle"></i>';
            titleEl.textContent = 'Depression Risk Detected';
            messageEl.textContent = 'The AI model identified patterns often associated with depression. You are not alone, and help is available.';
            actionSteps.classList.remove('hidden');
            
            animateCircularProgress(circularProgress, riskText, 85, 'var(--danger)');
        }
    }

    // Close Modal
    closeBtn.addEventListener('click', () => {
        overlay.classList.add('hidden');
        document.getElementById('confetti-container').innerHTML = ''; // Clear confetti
    });

    // Pure CSS Circular Progress Animation Logic
    function animateCircularProgress(element, textElement, targetPercentage, color) {
        let startValue = 0;
        let duration = 1500; // ms
        let interval = 20; // ms
        let step = targetPercentage / (duration / interval);

        // Reset
        element.style.background = `conic-gradient(#E2E8F0 0deg, #E2E8F0 0deg)`;
        
        let counter = setInterval(() => {
            startValue += step;
            if (startValue >= targetPercentage) {
                startValue = targetPercentage;
                clearInterval(counter);
            }
            textElement.textContent = Math.round(startValue) + '%';
            // Update CSS conic-gradient dynamically
            element.style.background = `conic-gradient(${color} ${startValue * 3.6}deg, #E2E8F0 0deg)`;
        }, interval);
    }

    // --- 6. Helper Utilities ---

    // Toast Notification System
    function showToast(message, type = 'success') {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
        
        toast.innerHTML = `
            <i class="fas ${icon}"></i>
            <span>${message}</span>
        `;
        
        container.appendChild(toast);
        
        // Trigger animation
        setTimeout(() => toast.classList.add('show'), 100);
        
        // Remove toast
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    }

    // Custom CSS Confetti System (Vanilla JS appending DOM elements animated by CSS)
    function triggerConfetti() {
        const container = document.getElementById('confetti-container');
        container.innerHTML = ''; // Clear previous
        
        const colors = ['#10B981', '#3B82F6', '#06B6D4', '#FCD34D'];
        
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti-piece');
            
            // Random properties
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDuration = (Math.random() * 2 + 1) + 's';
            confetti.style.animationDelay = Math.random() * 0.5 + 's';
            
            container.appendChild(confetti);
        }
    }
});