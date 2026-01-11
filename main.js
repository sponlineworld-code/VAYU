// Minimal interactivity: mobile nav toggle, contact form submit (POST JSON to /api/contact)
(function(){
  // Mobile nav toggle
  const toggle = document.querySelector('.mobile-nav-toggle');
  if(toggle){
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      // For simplicity, reveal nav links when toggled
      document.querySelectorAll('.top-nav .nav-link').forEach(a=>{
        a.style.display = !expanded ? 'inline-block' : '';
      });
    });
  }

  // Contact form submit (Ajax)
  const form = document.getElementById('contactForm');
  if(!form) return;
  const statusEl = document.getElementById('formStatus');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    statusEl.textContent = 'Sending…';
    const data = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      message: form.message.value.trim()
    };
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(data)
      });
      if(res.ok){
        statusEl.textContent = 'Thank you — your message has been received. We will contact you shortly.';
        form.reset();
      } else {
        const payload = await res.json().catch(()=>({}));
        statusEl.textContent = payload.error || 'There was an issue submitting the form. Please try again or contact via WhatsApp.';
      }
    } catch (err){
      statusEl.textContent = 'Unable to send message. Please try again later or contact via WhatsApp.';
    }
  });
})();