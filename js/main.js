// Renders the specialties, projects, and team sections from SITE_DATA,
// and wires up the "Email us" button. No framework, no build step.

function renderSpecialties() {
  const container = document.getElementById('specialties-grid');
  container.innerHTML = SITE_DATA.specialties
    .map(
      (s) => `
      <div class="spec-card">
        <span class="spec-tag">${s.tag}</span>
        <h3>${s.title}</h3>
        <p>${s.body}</p>
      </div>
    `
    )
    .join('');
}

function renderProjects() {
  const container = document.getElementById('projects-grid');
  container.innerHTML = SITE_DATA.projects
    .map(
      (p) => `
      <div class="proj-card">
        <div class="proj-tag mono">${p.tag}</div>
        <h3>${p.title}</h3>
        <p>${p.body}</p>
        <div class="stack">
          ${p.stack.map((s) => `<span>${s}</span>`).join('')}
        </div>
      </div>
    `
    )
    .join('');
}

function renderTeam() {
  const container = document.getElementById('team-grid');
  container.innerHTML = SITE_DATA.team
    .map(
      (t) => `
      <div class="team-card">
        <div class="avatar-mark">${t.initials}</div>
        <h3>${t.name}</h3>
        <div class="team-role mono">${t.role}</div>
        <div class="status-line">
          <span class="status-dot"></span>
          Available for freelance work
        </div>
        <p class="team-bio">${t.bio}</p>
        <div class="team-links">
          <a class="team-email" href="mailto:${t.email}">${t.email}</a>
          <a class="team-resume" href="${t.resumeUrl || SITE_DATA.resumeUrl}" target="_blank" rel="noopener">View résumé →</a>
        </div>
      </div>
    `
    )
    .join('');
}

function wireContactButton() {
  const bothEmails = SITE_DATA.team.map((t) => t.email).join(',');
  const button = document.getElementById('email-us-btn');
  if (button) {
    button.href = `mailto:${bothEmails}`;
  }
}

function setFooterYear() {
  const yearEl = document.getElementById('footer-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderSpecialties();
  renderProjects();
  renderTeam();
  wireContactButton();
  setFooterYear();
});
