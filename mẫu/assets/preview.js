document.addEventListener('DOMContentLoaded', () => {
  const frame = document.getElementById('preview-frame');
  const container = document.getElementById('frame-container');
  const select = document.getElementById('sample-select');
  const btns = document.querySelectorAll('.preview-btn');

  // Change Sample
  select.addEventListener('change', (e) => {
    frame.src = e.target.value;
  });

  // Change Device
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const device = btn.dataset.device;
      container.className = 'frame-container device-' + device;
    });
  });
});
