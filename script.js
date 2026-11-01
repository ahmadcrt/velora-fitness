'use strict';
const IMG = (id, w) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`;
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];

const programs = [
  { name: 'Strength Training', img: '1534438327276-14e5300c3a48', text: 'Barbell and machine work built on progressive overload for lasting strength.' },
  { name: 'Personal Training', img: '1571902943202-507ec2618e8f', text: 'One-to-one coaching with a plan shaped around your goals and schedule.' },
  { name: 'Cardio & Endurance', img: '1538805060514-97d9cc17730c', text: 'Build stamina and heart health with rowing, running and bike intervals.' },
  { name: 'HIIT Training', img: '1517836357463-d25dfeac3438', text: 'Short, intense circuits that burn fat and sharpen conditioning.' },
  { name: 'Functional Fitness', img: '1599058917212-d750089bc07e', text: 'Train movement patterns that make daily life and sport feel easier.' },
  { name: 'Group Fitness', img: '1549060279-7e168fcee0c2', text: 'High-energy classes where the room pushes you further.' }
];
const trainers = [
  { name: 'Tunde Adeyemi', role: 'Strength & Conditioning', img: '1567013127542-490d757e51fc', bio: 'Former sprinter turned strength coach who loves clean technique and steady progress.' },
  { name: 'Amara Okoye', role: 'HIIT & Group Fitness', img: '1594381898411-846e7d193883', bio: 'Leads our busiest classes with big energy and clear, friendly coaching.' },
  { name: 'Chidi Bello', role: 'Functional & Mobility', img: '1548690312-e3b507d8c110', bio: 'Helps members move better, recover faster and train without pain.' }
];
const plans = [
  { name: 'Starter', price: '₦15,000', features: ['Gym access', 'Basic equipment access', 'Flexible training'] },
  { name: 'Pro', price: '₦35,000', features: ['Full gym access', 'Group fitness classes', 'Fitness assessment'], featured: true },
  { name: 'Elite', price: '₦75,000', features: ['Full gym access', 'Personal training sessions', 'Priority class booking'] }
];
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const classes = [
  ['Power Lift', 0, '6:00 AM', 'Tunde Adeyemi'], ['HIIT Blast', 0, '6:00 PM', 'Amara Okoye'],
  ['Mobility Flow', 1, '7:00 AM', 'Chidi Bello'], ['Strength Basics', 1, '5:30 PM', 'Tunde Adeyemi'],
  ['Cardio Engine', 2, '6:30 AM', 'Amara Okoye'], ['Functional Circuit', 2, '6:00 PM', 'Chidi Bello'],
  ['Power Lift', 3, '6:00 AM', 'Tunde Adeyemi'], ['HIIT Blast', 3, '6:30 PM', 'Amara Okoye'],
  ['Group Burn', 4, '7:00 AM', 'Amara Okoye'], ['Mobility Flow', 4, '5:00 PM', 'Chidi Bello'],
  ['Saturday Strength', 5, '9:00 AM', 'Tunde Adeyemi'], ['Group Burn', 5, '11:00 AM', 'Amara Okoye'],
  ['Recovery & Stretch', 6, '10:00 AM', 'Chidi Bello']
].map(([name, d, time, trainer]) => ({ name, day: days[d], time, trainer }));
const gallery = [
  ['1534438327276-14e5300c3a48', 'Barbell lift', '3/4'], ['1571019613454-1cb2f99b2d8b', 'Gym floor', '4/3'],
  ['1517836357463-d25dfeac3438', 'Post-workout focus', '3/4'], ['1599058917212-d750089bc07e', 'Functional training', '1/1'],
  ['1549060279-7e168fcee0c2', 'Group session', '4/3'], ['1583454110551-21f2fa2afe61', 'Dumbbell rack', '3/4']
];
const testimonials = [
  ['I finally train three times a week without forcing myself. The classes make it easy.', 'Sample member A'],
  ['My coach tracked every lift and showed me the numbers. I am stronger than I have ever been.', 'Sample member B'],
  ['The assessment gave me a clear starting point and a plan I could follow.', 'Sample member C']
];

/* Images: load remotely, fall back to a branded placeholder if a source fails */
function hydrateImages(root = document) {
  $$('img[data-img]', root).forEach(img => {
    img.addEventListener('error', () => { img.removeAttribute('src'); img.closest('.media')?.classList.add('img-fail'); img.style.visibility = 'hidden'; }, { once: true });
    img.src = IMG(img.dataset.img, img.dataset.w || 700);
  });
}
const mediaHTML = (id, alt, w = 700, lazy = true) => `<div class="media"><img data-img="${id}" data-w="${w}" alt="${alt}"${lazy ? ' loading="lazy"' : ''}></div>`;

/* Render sections */
$('#program-grid').innerHTML = programs.map(p => `
  <article class="card">${mediaHTML(p.img, p.name + ' session')}
    <div class="card-body"><h3>${p.name}</h3><p>${p.text}</p>
    <button class="btn btn-ghost btn-sm" data-program="${p.name}">Learn More</button></div></article>`).join('');
$('#trainer-grid').innerHTML = trainers.map(t => `
  <article class="card trainer">${mediaHTML(t.img, 'Portrait of fictional trainer ' + t.name, 600)}
    <div class="card-body"><h3>${t.name}</h3><span class="role">${t.role}</span><p>${t.bio}</p><p class="note">Fictional demo profile</p></div></article>`).join('');
$('#plan-grid').innerHTML = plans.map(p => `
  <article class="card plan${p.featured ? ' pro' : ''}">${p.featured ? '<span class="badge">Most popular</span>' : ''}
    <h3>${p.name}</h3><div class="price">${p.price}<small> / month (demo)</small></div>
    <ul>${p.features.map(f => `<li>${f}</li>`).join('')}</ul>
    <button class="btn btn-primary" data-plan="${p.name}">Choose ${p.name}</button></article>`).join('');
$('#testimonial-grid').innerHTML = testimonials.map(([q, a]) => `
  <figure class="card testimonial"><blockquote>“${q}”</blockquote><cite>${a}. Demonstration content, not a genuine review.</cite></figure>`).join('');
$('#gallery-grid').innerHTML = gallery.map(([id, alt, ar], i) => `
  <button class="g-item" data-index="${i}" aria-label="Enlarge: ${alt}"><div class="media" style="--ar:${ar}"><img data-img="${id}" data-w="800" alt="${alt}" loading="lazy"></div></button>`).join('');
$('#plan').innerHTML += plans.map(p => `<option>${p.name}</option>`).join('');
$('#program').innerHTML += programs.map(p => `<option>${p.name}</option>`).join('');
$('#year').textContent = new Date().getFullYear();
hydrateImages();

/* Mobile nav */
const toggle = $('.nav-toggle'), menu = $('#nav-menu');
const setNav = open => { menu.classList.toggle('open', open); toggle.setAttribute('aria-expanded', open); toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu'); };
toggle.addEventListener('click', () => setNav(!menu.classList.contains('open')));
menu.addEventListener('click', e => { if (e.target.closest('a')) setNav(false); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') setNav(false); });

/* Schedule filters */
const filterBox = $('#day-filters'), body = $('#schedule-body');
['All', ...days].forEach((d, i) => filterBox.insertAdjacentHTML('beforeend', `<button class="chip" aria-pressed="${i === 0}" data-day="${d}">${d === 'All' ? 'All days' : d}</button>`));
function renderSchedule(day) {
  const rows = classes.filter(c => day === 'All' || c.day === day);
  body.innerHTML = rows.map(c => `<tr><td>${c.name}</td><td>${c.day}</td><td>${c.time}</td><td>${c.trainer}</td></tr>`).join('');
  $('#schedule-empty').hidden = rows.length > 0;
}
filterBox.addEventListener('click', e => {
  const b = e.target.closest('.chip'); if (!b) return;
  $$('.chip', filterBox).forEach(c => c.setAttribute('aria-pressed', c === b));
  renderSchedule(b.dataset.day);
});
renderSchedule('All');

/* Plan & program buttons pre-fill the form */
function goToForm(field, value) {
  $('#' + field).value = value;
  $('#register').scrollIntoView({ behavior: 'smooth' });
  setTimeout(() => $('#name').focus({ preventScroll: true }), 600);
}
document.addEventListener('click', e => {
  const p = e.target.closest('[data-plan]'), g = e.target.closest('[data-program]');
  if (p) goToForm('plan', p.dataset.plan);
  if (g) goToForm('program', g.dataset.program);
});

/* Lightbox */
const lb = $('#lightbox'), lbImg = $('#lb-img'); let current = 0, lastFocus = null;
function showImage(i) {
  current = (i + gallery.length) % gallery.length;
  lbImg.src = IMG(gallery[current][0], 1400); lbImg.alt = gallery[current][1];
}
function openLb(i) { lastFocus = document.activeElement; lb.hidden = false; document.body.style.overflow = 'hidden'; showImage(i); $('.lb-close').focus(); }
function closeLb() { lb.hidden = true; document.body.style.overflow = ''; lastFocus?.focus(); }
$('#gallery-grid').addEventListener('click', e => { const b = e.target.closest('.g-item'); if (b) openLb(+b.dataset.index); });
$('.lb-close').addEventListener('click', closeLb);
$('.prev').addEventListener('click', () => showImage(current - 1));
$('.next').addEventListener('click', () => showImage(current + 1));
lb.addEventListener('click', e => { if (e.target === lb) closeLb(); });
document.addEventListener('keydown', e => {
  if (lb.hidden) return;
  if (e.key === 'Escape') closeLb();
  if (e.key === 'ArrowLeft') showImage(current - 1);
  if (e.key === 'ArrowRight') showImage(current + 1);
});

/* Form validation */
const form = $('#reg-form');
const rules = {
  name: v => v.trim().length >= 3 || 'Enter your full name (at least 3 characters).',
  email: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) || 'Enter a valid email like name@example.com.',
  phone: v => /^\+?\d{10,14}$/.test(v.replace(/[\s-]/g, '')) || 'Enter a phone number with 10 to 14 digits.',
  plan: v => !!v || 'Choose a membership plan.',
  program: v => !!v || 'Choose a training programme.'
};
function check(name) {
  const input = form.elements[name], res = rules[name](input.value), field = input.closest('.field');
  field.classList.toggle('invalid', res !== true);
  input.setAttribute('aria-invalid', res !== true);
  $('.err', field).textContent = res === true ? '' : res;
  return res === true;
}
Object.keys(rules).forEach(n => form.elements[n].addEventListener('blur', () => check(n)));
form.addEventListener('submit', e => {
  e.preventDefault();
  const ok = Object.keys(rules).map(check).every(Boolean);
  const msg = $('#form-success');
  if (!ok) { msg.hidden = true; form.querySelector('[aria-invalid=true]')?.focus(); return; }
  const first = form.elements.name.value.trim().split(' ')[0];
  msg.textContent = `Thanks, ${first}. Your details passed validation. This is a front-end demo, so nothing was sent and no real membership was created.`;
  msg.hidden = false; form.reset();
});
