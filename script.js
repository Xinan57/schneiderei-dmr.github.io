document.addEventListener('DOMContentLoaded', () => {
  // einfache Fade-In Effekte
  const fadeElems = document.querySelectorAll('.fade-in');
  fadeElems.forEach((el, i) => {
    setTimeout(() => {
      el.style.opacity = 1;
      el.style.transform = 'translateY(0)';
    }, 200 * i);
  });

  // Formularvalidierung
  const form = document.getElementById('kontaktForm');
  const messageBox = document.getElementById('formMessage');

  if (form) {
    form.addEventListener('submit', async event => {
      event.preventDefault();
      messageBox.textContent = '';

      const formData = new FormData(form);
      const name = formData.get('name').trim();
      const email = formData.get('email').trim();
      const nachricht = formData.get('nachricht').trim();

      if (!name || !email || !nachricht) {
        messageBox.textContent = 'Bitte füllen Sie alle Felder aus.';
        messageBox.style.color = 'red';
        return;
      }

      // einfacher E-Mail-RegEx Check
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        messageBox.textContent = 'Bitte geben Sie eine gültige E-Mail-Adresse ein.';
        messageBox.style.color = 'red';
        return;
      }

      // Senden der Formulardaten per Fetch an send-mail.php
      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const text = await response.text();
          messageBox.textContent = 'Vielen Dank für Ihre Nachricht!';
          messageBox.style.color = 'green';
          form.reset();
        } else {
          messageBox.textContent = 'Fehler beim Senden. Bitte versuchen Sie es später erneut.';
          messageBox.style.color = 'red';
        }
      } catch (error) {
        messageBox.textContent = 'Fehler beim Senden. Bitte prüfen Sie Ihre Internetverbindung.';
        messageBox.style.color = 'red';
      }
    });
  }
});
