document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('wf-form-Home-contact-form');
  if (!form) return;
  let pendingSubmission;
  let submitting = false;

  const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:3001/submit-form'
    : 'https://fresh-back.vercel.app/submit-form';

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    if (submitting) return;
    submitting = true;
    window.WebM8Analytics?.form('cleaning_enquiry', 'step_complete');
    window.WebM8Analytics?.form('cleaning_enquiry', 'submit');

    const formData = new FormData(this);
    const fields = Object.fromEntries(formData);
    const snapshot = JSON.stringify(fields);
    if (!pendingSubmission || pendingSubmission.snapshot !== snapshot) {
      pendingSubmission = { snapshot, submissionId: crypto.randomUUID(), submittedAt: new Date().toISOString() };
    }
    const submitButton = this.querySelector('input[type="submit"]');
    const successMessage = document.querySelector('.w-form-done');
    const errorMessage = document.querySelector('.w-form-fail');
    const errorMessageText = document.querySelector('.error-message');
    const loadingSpinner = document.querySelector('.loading-spinner');
    const formCard = document.querySelector('.card.form');

    // Initial state - hide all messages
    const hideAllMessages = () => {
      successMessage.style.display = 'none';
      errorMessage.style.display = 'none';
      errorMessageText.style.display = 'none';
      loadingSpinner.style.display = 'none';
    };

    // Start loading state
    hideAllMessages();
    loadingSpinner.style.display = 'flex';
    submitButton.value = 'Sending...';
    submitButton.disabled = true;
    formCard.style.opacity = '0.6';

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ ...fields, submissionId: pendingSubmission.submissionId, submittedAt: pendingSubmission.submittedAt })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      if (result.success !== true) throw new Error('Enquiry was not saved');
      window.WebM8Analytics?.form('cleaning_enquiry', 'success');

      // Success state
      hideAllMessages();
      formCard.style.opacity = '1';
      successMessage.style.display = 'block';
      this.reset();
      pendingSubmission = undefined;

    } catch (error) {
      window.WebM8Analytics?.form('cleaning_enquiry', 'submission_error', { code: 'unknown' });
      console.error('Error details:', error);
      // Error state
      hideAllMessages();
      formCard.style.opacity = '1';
      errorMessage.style.display = 'block';
    } finally {
      submitting = false;
      loadingSpinner.style.display = 'none';
      submitButton.value = 'Submit message';
      submitButton.disabled = false;
    }
  });
});
