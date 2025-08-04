function initBubbles() {
  const canvas = document.getElementById('bubbles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const bubbles = [];
  resize();
  window.addEventListener('resize', resize);

  for (let i = 0; i < 30; i++) {
    bubbles.push(createBubble());
  }

  requestAnimationFrame(update);

  function createBubble() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: 5 + Math.random() * 15,
      s: 0.5 + Math.random() * 1.5,
      o: 0.1 + Math.random() * 0.2
    };
  }

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bubbles.forEach(b => {
      b.y -= b.s;
      if (b.y + b.r < 0) {
        b.y = canvas.height + b.r;
        b.x = Math.random() * canvas.width;
      }
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(58, 141, 255, ${b.o})`;
      ctx.fill();
    });
    requestAnimationFrame(update);
  }
}
