// main.js - Common logic for Mountain Verses

function setLang(lang) {
  document.body.className = 'lang-' + lang;
  document.querySelectorAll('.lang-btn').forEach((b, i) => {
    b.classList.toggle('active', (i === 0 && lang === 'zh') || (i === 1 && lang === 'en'));
  });
  localStorage.setItem('poetry-lang', lang);
  
  // Stop any playing audio if language switched
  if (window.currentAudio) {
    window.currentAudio.pause();
    window.currentAudio.currentTime = 0;
    window.currentAudio = null;
    document.querySelectorAll('.play-btn').forEach(btn => btn.classList.remove('playing'));
  }
}

function initLang() {
  const saved = localStorage.getItem('poetry-lang');
  if (saved) {
    setLang(saved);
  }
}

function switchTab(idx) {
  document.querySelectorAll('.tab-btn').forEach((b, i) => b.classList.toggle('active', i === idx));
  document.querySelectorAll('.panel').forEach((p, i) => p.classList.toggle('active', i === idx));
}

// Text to Speech Functionality (Pre-rendered MP3s)
window.currentAudio = null;

function playPoem() {
  const playBtn = document.querySelector('.play-btn');
  const isZh = document.body.classList.contains('lang-zh');
  
  // If already playing audio, stop
  if (window.currentAudio) {
    window.currentAudio.pause();
    window.currentAudio.currentTime = 0;
    window.currentAudio = null;
    playBtn.classList.remove('playing');
    playBtn.innerHTML = isZh ? '▶ 朗读本诗' : '▶ Read Aloud';
    return;
  }
  
  // Determine which poem ID we are on based on URL
  const match = window.location.pathname.match(/poem-(\d+)\.html/);
  if (!match) return; // Should not happen if on a poem page
  const poemId = match[1];
  const langKey = isZh ? 'zh' : 'en';
  
  // Create audio element to play MP3
  window.currentAudio = new window.Audio(`../assets/audio/poem-${poemId}-${langKey}.mp3`);
  
  window.currentAudio.onplay = () => {
    playBtn.classList.add('playing');
    playBtn.innerHTML = isZh ? '停顿' : 'Stop';
  };
  
  window.currentAudio.onended = () => {
    window.currentAudio = null;
    playBtn.classList.remove('playing');
    playBtn.innerHTML = isZh ? '▶ 朗读本诗' : '▶ Read Aloud';
  };
  
  window.currentAudio.onerror = () => {
    window.currentAudio = null;
    playBtn.classList.remove('playing');
    playBtn.innerHTML = isZh ? '▶ 朗读本诗' : '▶ Read Aloud';
  };
  
  window.currentAudio.play().catch(e => {
    console.error("Audio play failed:", e);
  });
}

document.addEventListener('DOMContentLoaded', initLang);

// --- Poster Share Functionality ---

function generatePosterModal() {
  const modal = document.getElementById('poster-modal');
  const renderArea = document.getElementById('poster-render-area');
  
  const match = window.location.pathname.match(/poem-(\d+)\.html/);
  if (!match) return;
  const poemId = match[1];
  
  // Set the AI generated background image
  renderArea.style.backgroundImage = `url('../assets/images/posters/poem-${poemId}-bg.png')`;
  renderArea.innerHTML = ''; // Request: Keep it empty, just show the picture
  
  modal.classList.add('active');
}

function closePosterModal() {
  document.getElementById('poster-modal').classList.remove('active');
}

function downloadPoster() {
  const area = document.getElementById('poster-render-area');
  const btn = document.querySelector('.save-poster-btn');
  const isZh = document.body.classList.contains('lang-zh');
  
  const originalHtml = btn.innerHTML;
  btn.innerHTML = isZh ? '<span class="zh-only">⏳ 生成中...</span><span class="en-only">⏳ Generating...</span>' : '<span class="zh-only">⏳ Generating...</span><span class="en-only">⏳ Generating...</span>';
  
  html2canvas(area, { 
    scale: 3, // High-res poster
    useCORS: true,
    backgroundColor: null,
  }).then(canvas => {
    const link = document.createElement('a');
    link.download = `Mountain-Verses-Poster-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png', 0.95);
    link.click();
    btn.innerHTML = originalHtml;
  }).catch(e => {
    console.error("Poster generation failed:", e);
    btn.innerHTML = isZh ? '<span class="zh-only">❌ 失败</span><span class="en-only">❌ Failed</span>' : '❌ Failed';
    setTimeout(() => { btn.innerHTML = originalHtml; }, 2000);
  });
}
