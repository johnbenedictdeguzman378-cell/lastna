'use strict';

// Replace these values with your real details. Leave unavailable links empty.
const CONFIG = {
  email: '',
  github: '',
  linkedin: '',
  resume: 'assets/resume/Benedict-Resume.pdf',
  projects: [
    { title: 'StudentHub Application', image: 'assets/images/studenthub.svg', repository: '', description: 'A student management application designed to help students organize schedules, access information, and manage laboratory reservations.', technologies: ['Kotlin', 'Android Studio', 'Firebase'], features: ['Schedule organization', 'Student information access', 'Laboratory reservation management'] },
    { title: 'Computer Laboratory Monitoring System', image: 'assets/images/lab-monitoring.svg', repository: '', description: 'A Python-based computer laboratory monitoring and accountability system using Student ID authentication and real-time scheduling.', technologies: ['Python', 'SQLite', 'Database Management'], features: ['Student ID authentication', 'Computer laboratory monitoring and accountability', 'Real-time scheduling'] },
    { title: 'Personal Portfolio Website', image: 'assets/images/portfolio.svg', repository: '', description: 'A responsive personal portfolio website designed to showcase my skills, projects, and experience as an aspiring developer.', technologies: ['HTML', 'CSS', 'JavaScript'], features: ['Responsive layouts and navigation', 'Accessible project detail dialogs', 'Contact validation and resume availability checks'] }
  ]
};

const skills = [['HTML5','html5','#ef7046'],['CSS3','css3','#4e9fed'],['JavaScript','javascript','#f4d95c'],['Python','python','#70a9de'],['Java','java','#ee8c63'],['Kotlin','kotlin','#a47dff'],['Android Development','android','#6bd499'],['SQL','azuresqldatabase','#65b6e9'],['Git','git','#f47a60'],['GitHub','github','#d8e2f3']];
const escapeHTML = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const safeURL = value => { try { const url = new URL(value); return url.protocol === 'https:' || url.protocol === 'http:' ? url.href : ''; } catch { return ''; } };
const badges = values => `<div class="badges">${values.map(value => `<span>${escapeHTML(value)}</span>`).join('')}</div>`;
document.querySelector('#skills-grid').innerHTML = skills.map(([name, icon, color]) => `<div class="skill-card reveal"><i class="devicon-${icon}-plain" style="color:${color}" aria-hidden="true"></i><span>${name}</span></div>`).join('');
document.querySelector('#projects-grid').innerHTML = CONFIG.projects.map((project, index) => `<article class="project-card reveal"><div class="project-image"><img src="${project.image}" alt="Illustrative ${escapeHTML(project.title)} concept preview" width="640" height="388" loading="lazy"><span class="mockup-label">CONCEPT PREVIEW</span></div><div class="project-body"><span class="project-number">PROJECT / 0${index + 1}</span><h3>${project.title}</h3><p>${project.description}</p>${badges(project.technologies)}<div class="project-actions"><button data-project="${index}" aria-label="View ${project.title} details">View Project ↗</button>${safeURL(project.repository) ? `<a class="repo-link" href="${escapeHTML(safeURL(project.repository))}" target="_blank" rel="noopener noreferrer"><i class="devicon-github-original" aria-hidden="true"></i> GitHub Repository ↗</a>` : '<button class="repo-link" data-unavailable="Repository link has not been added yet."><i class="devicon-github-original" aria-hidden="true"></i> GitHub Repository ↗</button>'}</div></div></article>`).join('');

let toastTimer;
function notify(message) { const toast = document.querySelector('#toast'); toast.textContent = message; toast.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove('show'), 5000); }
document.addEventListener('click', event => { const button = event.target.closest('[data-unavailable]'); if (button) notify(button.dataset.unavailable); });
const contacts = [{label:'Email',display:CONFIG.email || 'your.email@example.com',icon:'@',url:CONFIG.email ? `mailto:${CONFIG.email}` : ''},{label:'GitHub',display:CONFIG.github || 'github.com/your-username',icon:'<i class="devicon-github-original" aria-hidden="true"></i>',url:safeURL(CONFIG.github)},{label:'LinkedIn',display:CONFIG.linkedin || 'linkedin.com/in/your-username',icon:'<i class="devicon-linkedin-plain" aria-hidden="true"></i>',url:safeURL(CONFIG.linkedin)}];
document.querySelector('#contact-links').innerHTML = contacts.map(contact => `<div class="contact-item"><span class="contact-icon" aria-hidden="true">${contact.icon}</span><div><strong>${contact.label}</strong>${contact.url ? `<a href="${escapeHTML(contact.url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(contact.display)} ↗</a>` : `<button data-unavailable="${contact.label} details have not been configured yet.">${escapeHTML(contact.display)}</button>`}</div></div>`).join('');
document.querySelector('#footer-socials').innerHTML = contacts.map(contact => contact.url ? `<a href="${escapeHTML(contact.url)}" target="_blank" rel="noopener noreferrer" aria-label="${contact.label}">${contact.icon}</a>` : `<button aria-label="${contact.label} not configured" data-unavailable="${contact.label} details have not been configured yet.">${contact.icon}</button>`).join('');
if (CONFIG.email || CONFIG.github || CONFIG.linkedin) document.querySelector('#contact-links + .small-note').textContent = 'Let’s connect and start a conversation.';

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() { navigation.classList.remove('open'); menuButton.setAttribute('aria-expanded','false'); menuButton.setAttribute('aria-label','Open navigation'); }
menuButton.addEventListener('click', () => { const open = navigation.classList.toggle('open'); menuButton.setAttribute('aria-expanded',String(open)); menuButton.setAttribute('aria-label',open ? 'Close navigation' : 'Open navigation'); });
navigation.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('click', event => { if (!event.target.closest('.nav-wrap')) closeMenu(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && navigation.classList.contains('open')) { closeMenu(); menuButton.focus(); } });
window.matchMedia('(min-width: 761px)').addEventListener('change', event => { if (event.matches) closeMenu(); });

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if ('IntersectionObserver' in window) {
  if (!reducedMotion.matches) document.documentElement.classList.add('js-motion');
  const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); } }), {threshold:0.08});
  document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));
}
const sections = [...document.querySelectorAll('main section[id]')];
let scheduled = false;
function updateNavigation() { const current = [...sections].reverse().find(section => section.getBoundingClientRect().top <= 150) || sections[0]; navigation.querySelectorAll('a').forEach(link => { const active = link.hash === `#${current.id}`; link.classList.toggle('active',active); if (active) link.setAttribute('aria-current','location'); else link.removeAttribute('aria-current'); }); scheduled = false; }
window.addEventListener('scroll', () => { if (!scheduled) { scheduled = true; requestAnimationFrame(updateNavigation); } }, {passive:true});
updateNavigation();
if (!reducedMotion.matches) { const typing = document.querySelector('#typing'); const title = typing.textContent; let position = 0; typing.textContent = ''; const timer = setInterval(() => { typing.textContent = title.slice(0, ++position); if (position >= title.length) clearInterval(timer); },65); }

const modal = document.querySelector('#project-modal');
let modalTrigger;
document.querySelector('#projects-grid').addEventListener('click', event => { const trigger = event.target.closest('[data-project]'); if (!trigger) return; const project = CONFIG.projects[Number(trigger.dataset.project)]; modalTrigger = trigger; document.querySelector('#modal-content').innerHTML = `<img class="modal-image" src="${project.image}" alt="Illustrative project concept preview"><span class="modal-label">ILLUSTRATIVE MOCKUP · Replace with actual screenshots</span><h2 id="modal-title">${project.title}</h2><p>${project.description}</p><h3>Project focus</h3><ul>${project.features.map(feature => `<li>${feature}</li>`).join('')}</ul><h3>Technologies used</h3>${badges(project.technologies)}<p class="small-note">Project information is based on the supplied description. Add real screenshots and repository links to share implementation details.</p>`; modal.showModal(); document.body.style.overflow = 'hidden'; });
document.querySelector('.modal-close').addEventListener('click', () => modal.close());
modal.addEventListener('click', event => { const bounds = modal.getBoundingClientRect(); if (event.target === modal && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) modal.close(); });
modal.addEventListener('close', () => { document.body.style.overflow = ''; modalTrigger?.focus(); });

let resumeAvailable = false;
async function checkResume() {
  try { const response = await fetch(CONFIG.resume,{cache:'no-store'}); if (!response.ok) return; const bytes = new Uint8Array(await response.arrayBuffer()); resumeAvailable = new TextDecoder().decode(bytes.slice(0,5)) === '%PDF-'; } catch { resumeAvailable = false; }
  document.querySelector('#resume-status').textContent = resumeAvailable ? 'Resume PDF is ready to view or download.' : 'Resume PDF has not been added yet.';
}
if (location.protocol !== 'file:') checkResume(); else document.querySelector('#resume-status').textContent = 'Use Live Server to check and download the resume PDF.';
document.querySelectorAll('[data-resume]').forEach(button => button.addEventListener('click', () => { if (!resumeAvailable) { notify(location.protocol === 'file:' ? 'Open the portfolio with Live Server to check the resume.' : 'Resume coming soon. Add assets/resume/Benedict-Resume.pdf to enable this button.'); return; } const link = document.createElement('a'); link.href = CONFIG.resume; if (button.dataset.resume === 'download') link.download = 'Benedict-Resume.pdf'; else { link.target = '_blank'; link.rel = 'noopener noreferrer'; } document.body.append(link); link.click(); link.remove(); }));

const form = document.querySelector('#contact-form');
form.addEventListener('input', event => event.target.removeAttribute('aria-invalid'));
form.addEventListener('submit', event => {
  event.preventDefault(); const status = document.querySelector('#form-status'); const fields = [...form.querySelectorAll('input,textarea')];
  const invalid = fields.filter(field => !field.value.trim() || !field.checkValidity()); fields.forEach(field => field.setAttribute('aria-invalid',String(invalid.includes(field))));
  if (invalid.length) { status.textContent = invalid.some(field => field.name === 'email' && field.value.trim()) ? 'Please enter a valid email address and complete all required fields.' : 'Please complete all required fields.'; invalid[0].focus(); return; }
  if (!CONFIG.email) { status.textContent = 'Email is not configured yet. Your message has not been sent. Add your email in js/script.js to enable the email app fallback.'; return; }
  const data = new FormData(form); const body = `From: ${data.get('name')} <${data.get('email')}>\n\n${data.get('message')}`;
  location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent(data.get('subject'))}&body=${encodeURIComponent(body)}`;
  status.textContent = 'Your email app has been requested. Review and send the draft there. This website has not sent your message.';
});
