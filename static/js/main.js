// Form validation enhancement
document.addEventListener('DOMContentLoaded', function() {
    // Form validation
    const forms = document.querySelectorAll('.needs-validation');
    forms.forEach(form => {
        form.addEventListener('submit', function(event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        });
    });

    // Initialize tooltips
    const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltips.forEach(tooltip => {
        new bootstrap.Tooltip(tooltip);
    });

    // Auto-dismiss alerts after 5 seconds
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(alert => {
        setTimeout(() => alert.remove(), 5000);
    });

    // Search input enhancement
    const searchInput = document.querySelector('input[name="search"]');
    if (searchInput) {
        let typingTimer;
        searchInput.addEventListener('input', function() {
            clearTimeout(typingTimer);
            typingTimer = setTimeout(() => {
                if (this.value.length >= 2 || this.value.length === 0) {
                    this.closest('form').submit();
                }
            }, 500);
        });
    }

    // Contact card hover effects
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Initialize fun features
    addFunFeatures();
    addMagneticButtons();
});

// Phone number formatting
function formatPhoneNumber(input) {
    let cleaned = input.value.replace(/\D/g, '');
    let formatted = '';
    
    if (cleaned.length > 0) {
        if (cleaned.length <= 3) {
            formatted = cleaned;
        } else if (cleaned.length <= 6) {
            formatted = `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
        } else {
            formatted = `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
        }
    }
    
    input.value = formatted;
}

// Confirm delete
function confirmDelete(event, name) {
    if (!confirm(`Are you sure you want to delete ${name}?`)) {
        event.preventDefault();
    }
}

// Fun features and animations
function addFunFeatures() {
    // Confetti effect for successful contact creation
    const successMessages = document.querySelectorAll('.alert-success');
    if (successMessages.length > 0) {
        createConfetti();
    }

    // Random avatar colors
    const avatarInitials = document.querySelectorAll('.avatar-initial');
    avatarInitials.forEach(avatar => {
        avatar.addEventListener('click', () => {
            const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD', '#D4A5A5'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            avatar.style.background = randomColor;
            avatar.style.transform = 'rotate(360deg)';
            avatar.style.transition = 'all 0.5s ease';
        });
    });

    // Keyboard shortcuts easter egg
    document.addEventListener('keydown', (e) => {
        // Press 'D' twice quickly for disco mode
        if (e.key === 'd') {
            clearTimeout(window.discoTimer);
            window.discoTimer = setTimeout(() => {
                window.discoCount = 0;
            }, 500);
            
            window.discoCount = (window.discoCount || 0) + 1;
            if (window.discoCount === 2) {
                toggleDiscoMode();
            }
        }
    });
}

// Confetti effect
function createConfetti() {
    for (let i = 0; i < 150; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDelay = Math.random() * 3 + 's';
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 3000);
    }
}

// Disco mode
function toggleDiscoMode() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        setInterval(() => {
            card.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 95%)`;
            card.style.transform = `rotate(${Math.random() * 2 - 1}deg)`;
        }, 500);
    });
}

// Add magnetic effect to buttons
function addMagneticButtons() {
    const buttons = document.querySelectorAll('.btn-primary');
    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            btn.style.transform = `translate(
                ${(x - rect.width / 2) / 10}px,
                ${(y - rect.height / 2) / 10}px
            )`;
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });
}

// Add CSS styles for animations
const style = document.createElement('style');
style.textContent = `
    .confetti {
        position: fixed;
        top: -10px;
        z-index: 9999;
        width: 10px;
        height: 10px;
        animation: fall 3s linear forwards;
    }
    
    @keyframes fall {
        to {
            transform: translateY(100vh) rotate(360deg);
        }
    }
    
    .card {
        transition: transform 0.3s ease, background-color 0.5s ease;
    }
    
    .btn-primary {
        transition: transform 0.2s ease;
    }
`;
document.head.appendChild(style);
