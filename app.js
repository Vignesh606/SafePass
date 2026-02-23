const pwdInput = document.getElementById('pwd-input');
const strengthBar = document.getElementById('strength-bar');
const strengthLabel = document.getElementById('strength-label');
const entropyValue = document.getElementById('entropy-value');
const crackTime = document.getElementById('crack-time');
const feedbackBox = document.getElementById('feedback-box');
const adviceText = document.getElementById('advice-text');

pwdInput.addEventListener('input', () => {
    const pwd = pwdInput.value;
    if (!pwd) {
        resetUI();
        return;
    }

    // 1. Calculate Character Pool (L)
    let L = 0;
    if (/[a-z]/.test(pwd)) L += 26;
    if (/[A-Z]/.test(pwd)) L += 26;
    if (/[0-9]/.test(pwd)) L += 10;
    if (/[^a-zA-Z0-9]/.test(pwd)) L += 32;

    // 2. Shannon Entropy Formula: E = log2(L^N)
    const N = pwd.length;
    const entropy = N > 0 ? Math.log2(Math.pow(L, N)) : 0;
    
    updateUI(entropy, pwd);
});

function updateUI(entropy, pwd) {
    entropyValue.innerText = entropy.toFixed(1);
    feedbackBox.classList.remove('hidden');

    // Strength Categories
    let color = 'bg-red-500';
    let label = 'Weak';
    let width = '25%';
    let time = 'Seconds';

    if (entropy > 40) {
        color = 'bg-yellow-500';
        label = 'Medium';
        width = '50%';
        time = 'Days';
    } 
    if (entropy > 60) {
        color = 'bg-emerald-500';
        label = 'Strong';
        width = '75%';
        time = 'Years';
    }
    if (entropy > 80) {
        color = 'bg-blue-500 shadow-[0_0_10px_#3b82f6]';
        label = 'Bulletproof';
        width = '100%';
        time = 'Centuries';
    }

    strengthBar.className = `h-3 rounded-full transition-all duration-500 ${color}`;
    strengthBar.style.width = width;
    strengthLabel.innerText = label;
    strengthLabel.className = `font-bold ${color.replace('bg-', 'text-')}`;
    crackTime.innerText = time;

    // Mentor Advice Logic
    if (pwd.length < 12) {
        adviceText.innerText = "Length is key! Try making it a 'Passphrase' of 4 random words.";
    } else if (entropy < 60) {
        adviceText.innerText = "Good length, but try adding special characters or mixed cases.";
    } else {
        adviceText.innerText = "Excellent! This password is mathematically resilient.";
    }
}

function resetUI() {
    strengthBar.style.width = '0%';
    strengthLabel.innerText = 'None';
    entropyValue.innerText = '0';
    crackTime.innerText = 'Instant';
    feedbackBox.classList.add('hidden');

}
// Dictionary of common weak patterns
const WEAK_PATTERNS = ['123', 'qwerty', 'password', 'admin', 'abc', 'asdf'];

function analyzePatterns(pwd) {
    let findings = [];
    const lowerPwd = pwd.toLowerCase();
    
    // Check for common sequences [cite: 56]
    WEAK_PATTERNS.forEach(pattern => {
        if (lowerPwd.includes(pattern)) {
            findings.push(`Pattern detected: "${pattern}"`);
        }
    });

    // Check for repeated characters
    if (/(.)\1{2,}/.test(pwd)) {
        findings.push("Too many repeated characters.");
    }

    return findings;
}

function estimateCrackingTime(entropy) {
    // Total combinations = 2^entropy
    const combinations = Math.pow(2, entropy);
    const hashesPerSecond = 1e11; // 100 Billion H/s for high-end GPU [cite: 76]
    
    const seconds = combinations / hashesPerSecond;

    if (seconds < 1) return "Instantaneous";
    if (seconds < 60) return `${Math.floor(seconds)} seconds`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours`;
    if (seconds < 31536000) return `${Math.floor(seconds / 86400)} days`;
    if (seconds < 3153600000) return `${Math.floor(seconds / 31536000)} years`;
    
    return "Centuries (Bulletproof)";
}

pwdInput.addEventListener('input', () => {
    const pwd = pwdInput.value;
    if (!pwd) { resetUI(); return; }

    // Character Pool Calculation (L) [cite: 75]
    let L = 0;
    if (/[a-z]/.test(pwd)) L += 26;
    if (/[A-Z]/.test(pwd)) L += 26;
    if (/[0-9]/.test(pwd)) L += 10;
    if (/[^a-zA-Z0-9]/.test(pwd)) L += 32;

    // Shannon Entropy: E = log2(L^N) [cite: 75]
    const N = pwd.length;
    const entropy = N > 0 ? (Math.log2(L) * N) : 0; // Using log rules for precision

    // Check for patterns 
    const patterns = analyzePatterns(pwd);
    
    // Final Output Update
    entropyValue.innerText = entropy.toFixed(1);
    crackTime.innerText = estimateCrackingTime(entropy);
    
    // Update Mentor Advice [cite: 40, 66]
    if (patterns.length > 0) {
        adviceText.innerText = `Warning: ${patterns[0]}. Try using a longer passphrase.`;
        feedbackBox.classList.remove('hidden');
    } else if (entropy < 40) {
        adviceText.innerText = "Too short. Even with special characters, it's vulnerable to GPUs.";
        feedbackBox.classList.remove('hidden');
    } else {
        adviceText.innerText = "Great! Your password follows NIST guidelines for length and entropy.";
    }
    
    updateStrengthBar(entropy);
});
