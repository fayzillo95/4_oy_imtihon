document.getElementById('registerForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  try {
    console.log('Form data:', data);
    console.log('Sending request to:', form.action);
    console.log('Request method:', 'POST');
    console.log('Request headers:', { 'Content-Type': 'application/json' });
    console.log('Request body:', JSON.stringify(data));
    const response = await fetch(form.action, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    if(result.verifyUrl) {
      document.getElementById('verify-link-container').innerHTML =
        `<a href="${result.verifyUrl}" target="_blank" style="color:green; font-weight:bold;">Emailni tasdiqlash uchun bu yerni bosing</a>`;
    } else {
      document.getElementById('verify-link-container').innerHTML =
        `<span style="color:red;">Xatolik yoki verifyUrl topilmadi!</span>,<span style="color:blue;">Sizni avtomatik ravishda profil sahifasiga yo'naltiramiz...</span>`;
        console.log(result)
    }
  } catch (err) {
    document.getElementById('verify-link-container').innerHTML =
      `<span style="color:red;">Serverda xatolik: ${err.message}</span>`;
  }
});
