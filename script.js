    // ── Utilities ──
    function showMsg(id, text, type) {
      const el = document.getElementById('msg-' + id);
      el.textContent = text;
      el.className = 'field-msg show ' + type;
    }

    function clearMsg(id) {
      const el = document.getElementById('msg-' + id);
      el.className = 'field-msg';
      el.textContent = '';
    }

    function setInputState(inputId, state) {
      const input = document.getElementById(inputId);
      input.className = state; // 'valid' | 'invalid' | ''
    }

    // ── Validators ──
    function validateName() {
      const val = document.getElementById('name').value.trim();
      if (!val) {
        showMsg('name', '✕ Full name is required', 'error');
        setInputState('name', 'invalid');
        return false;
      }
      if (val.length < 2) {
        showMsg('name', '✕ Name must be at least 2 characters', 'error');
        setInputState('name', 'invalid');
        return false;
      }
      showMsg('name', '✓ Looks good', 'success');
      setInputState('name', 'valid');
      return true;
    }

    function validateEmail() {
      const val = document.getElementById('email').value.trim();
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!val) {
        showMsg('email', '✕ Email address is required', 'error');
        setInputState('email', 'invalid');
        return false;
      }
      if (!re.test(val)) {
        showMsg('email', '✕ Please enter a valid email address', 'error');
        setInputState('email', 'invalid');
        return false;
      }
      showMsg('email', '✓ Valid email address', 'success');
      setInputState('email', 'valid');
      return true;
    }

    function validatePhone() {
      const val = document.getElementById('phone').value.trim();
      if (!val) return true; // optional
      const digits = val.replace(/\D/g, '');
      if (digits.length < 7 || digits.length > 15) {
        showMsg('phone', '✕ Enter a valid phone number', 'error');
        setInputState('phone', 'invalid');
        return false;
      }
      showMsg('phone', '✓ Valid number', 'success');
      setInputState('phone', 'valid');
      return true;
    }

    function getStrength(pw) {
      let score = 0;
      if (pw.length >= 8) score++;
      if (/[A-Z]/.test(pw)) score++;
      if (/[0-9]/.test(pw)) score++;
      if (/[^A-Za-z0-9]/.test(pw)) score++;
      return score;
    }

    const colors = ['#ff4d6a', '#ff6b35', '#ffd60a', '#00ff88'];
    const labels = ['Weak', 'Fair', 'Good', 'Strong'];

    function updateStrength(pw) {
      const track = document.getElementById('strengthTrack');
      if (!pw) { track.classList.remove('show'); return; }
      track.classList.add('show');
      const score = getStrength(pw);
      for (let i = 1; i <= 4; i++) {
        const seg = document.getElementById('seg' + i);
        seg.style.background = i <= score ? colors[score - 1] : 'var(--border)';
      }
      return score;
    }

    function validatePassword() {
      const val = document.getElementById('password').value;
      if (!val) {
        showMsg('password', '✕ Password is required', 'error');
        setInputState('password', 'invalid');
        return false;
      }
      const score = getStrength(val);
      if (score < 2) {
        showMsg('password', '✕ ' + labels[score - 1] + ' — add uppercase, numbers, or symbols', 'error');
        setInputState('password', 'invalid');
        return false;
      }
      showMsg('password', '✓ ' + labels[score - 1] + ' password', 'success');
      setInputState('password', 'valid');
      return true;
    }

    function validateConfirm() {
      const pw = document.getElementById('password').value;
      const cf = document.getElementById('confirm').value;
      if (!cf) {
        showMsg('confirm', '✕ Please confirm your password', 'error');
        setInputState('confirm', 'invalid');
        return false;
      }
      if (pw !== cf) {
        showMsg('confirm', '✕ Passwords do not match', 'error');
        setInputState('confirm', 'invalid');
        return false;
      }
      showMsg('confirm', '✓ Passwords match', 'success');
      setInputState('confirm', 'valid');
      return true;
    }

    // ── Event Listeners ──

    // Name — validate on blur
    document.getElementById('name').addEventListener('blur', validateName);
    document.getElementById('name').addEventListener('input', () => {
      if (document.getElementById('name').className) validateName();
    });

    // Email — validate on blur
    document.getElementById('email').addEventListener('blur', validateEmail);
    document.getElementById('email').addEventListener('input', () => {
      if (document.getElementById('email').className) validateEmail();
    });

    // Phone
    document.getElementById('phone').addEventListener('blur', validatePhone);
    document.getElementById('phone').addEventListener('input', () => {
      if (document.getElementById('phone').className) validatePhone();
    });

    // Password — real-time strength, validate on blur
    document.getElementById('password').addEventListener('input', (e) => {
      updateStrength(e.target.value);
      if (e.target.className) validatePassword();
      if (document.getElementById('confirm').value) validateConfirm();
    });
    document.getElementById('password').addEventListener('blur', validatePassword);

    // Confirm
    document.getElementById('confirm').addEventListener('input', () => {
      if (document.getElementById('confirm').className) validateConfirm();
    });
    document.getElementById('confirm').addEventListener('blur', validateConfirm);

    // Toggle password visibility
    document.getElementById('togglePw').addEventListener('click', () => {
      const input = document.getElementById('password');
      input.type = input.type === 'password' ? 'text' : 'password';
    });
    document.getElementById('toggleConfirm').addEventListener('click', () => {
      const input = document.getElementById('confirm');
      input.type = input.type === 'password' ? 'text' : 'password';
    });

    // ── Submit ──
    function handleSubmit() {
      const n = validateName();
      const e = validateEmail();
      const p = validatePhone();
      const pw = validatePassword();
      const cf = validateConfirm();
      const terms = document.getElementById('terms').checked;

      if (!terms) {
        alert('Please agree to the Terms of Service to continue.');
        return;
      }

      if (n && e && p && pw && cf) {
        const name = document.getElementById('name').value.trim().split(' ')[0];
        document.getElementById('successName').textContent = name;
        document.getElementById('formView').style.display = 'none';
        document.getElementById('successView').classList.add('show');
      }
    }

    function resetForm() {
      document.getElementById('formView').style.display = 'block';
      document.getElementById('successView').classList.remove('show');

      // Reset all fields
      ['name','email','phone','password','confirm'].forEach(id => {
        const el = document.getElementById(id);
        el.value = '';
        el.className = '';
        clearMsg(id);
      });
      document.getElementById('terms').checked = false;
      document.getElementById('strengthTrack').classList.remove('show');
    }