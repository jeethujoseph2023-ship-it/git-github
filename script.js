const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
    navigation.classList.toggle('is-open', !isOpen);
  });

  navigation.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation');
      navigation.classList.remove('is-open');
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navigation.classList.contains('is-open')) {
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation');
      navigation.classList.remove('is-open');
      menuButton.focus();
    }
  });
}

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

const projectForm = document.querySelector('#project-form');
const formStatus = document.querySelector('#form-status');

if (projectForm && formStatus) {
  projectForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!projectForm.reportValidity()) return;

    const fields = new FormData(projectForm);
    const projectType = fields.get('projectType');
    const subject = `New ${projectType} project enquiry from ${fields.get('name')}`;
    const details = [
      `Project type: ${projectType}`,
      `Location: ${fields.get('location')}`,
      `Preferred start: ${fields.get('timeline') || 'Not specified'}`,
      `Estimated budget: ${fields.get('budget') || 'Not specified'}`,
      `Heard about us: ${fields.get('referral') || 'Not specified'}`,
      '',
      'Project details:',
      fields.get('details'),
      '',
      `Name: ${fields.get('name')}`,
      `Email: ${fields.get('email')}`,
      `Phone: ${fields.get('phone') || 'Not provided'}`,
    ].join('\n');

    formStatus.classList.remove('error');
    formStatus.textContent = 'Your email app will open with your project details ready to send.';
    window.location.href = `mailto:hello@northlineconstruction.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(details)}`;
  });
}
