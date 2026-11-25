
const byId = Object.fromEntries(DATA.regions.map(r => [r.id, r]));
const FOCUS = new Set(["piemonte","lombardia","veneto","liguria","emilia","toscana","lazio","campania","puglia","calabria","sicilia","sardegna"]);

function showRegion(id) {
  const r = byId[id];
  if (!r) return;
  document.querySelectorAll('.reg').forEach(el => el.classList.toggle('is-active', el.dataset.id === id));
  document.querySelectorAll('.flag-btn').forEach(el => el.classList.toggle('is-active', el.dataset.id === id));
  document.getElementById('emptyState').classList.add('hidden');
  document.getElementById('card').classList.remove('hidden');
  document.getElementById('flagImg').src = r.flag;
  document.getElementById('flagImg').alt = 'Bandiera / stemma ' + r.name;
  document.getElementById('zone').textContent = r.zone;
  document.getElementById('regName').textContent = r.name;
  document.getElementById('city').textContent = 'Città / area: ' + r.city;
  document.getElementById('how').textContent = r.how;
  document.getElementById('history').textContent = r.history;
  const ul = document.getElementById('phrases');
  ul.innerHTML = '';
  r.phrases.forEach(ph => {
    const li = document.createElement('li');
    const d = document.createElement('div'); d.className = 'd'; d.textContent = ph.d;
    const it = document.createElement('div'); it.className = 'it'; it.textContent = '= ' + ph.it;
    const note = document.createElement('span'); note.className = 'note'; note.textContent = ph.note;
    li.appendChild(d); li.appendChild(it); li.appendChild(note);
    li.addEventListener('click', () => {
      li.style.background = '#e8f3ec';
      setTimeout(() => { li.style.background = ''; }, 450);
    });
    ul.appendChild(li);
  });
}

function buildFlags() {
  const bar = document.getElementById('flagBar');
  DATA.regions.filter(r => FOCUS.has(r.id)).forEach(r => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'flag-btn';
    b.dataset.id = r.id;
    const img = document.createElement('img');
    img.src = r.flag; img.alt = '';
    const span = document.createElement('span');
    span.textContent = r.name.replace(' (Roma)','').replace(' (Napoli)','');
    b.appendChild(img); b.appendChild(span);
    b.addEventListener('click', () => showRegion(r.id));
    bar.appendChild(b);
  });
}

function buildAll() {
  const box = document.getElementById('allList');
  DATA.regions.filter(r => FOCUS.has(r.id)).forEach(r => {
    r.phrases.forEach(ph => {
      const d = document.createElement('div');
      d.className = 'mini';
      const b = document.createElement('b'); b.textContent = r.name.split(' ')[0];
      const sp = document.createElement('span'); sp.className = 'd'; sp.textContent = ' · ' + ph.d;
      const line = document.createElement('div'); line.textContent = '= ' + ph.it;
      d.appendChild(b); d.appendChild(sp); d.appendChild(line);
      d.addEventListener('click', () => showRegion(r.id));
      box.appendChild(d);
    });
  });
}

document.querySelectorAll('.reg').forEach(el => {
  el.addEventListener('click', () => showRegion(el.dataset.id));
});

buildFlags();
buildAll();
showRegion('lazio');
