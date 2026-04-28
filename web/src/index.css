@import url('https://fonts.googleapis.com/css2?family=Lora:wght@500;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

/* ─── Design Tokens ─────────────────────────────────────────── */
:root {
  --font-display: 'Lora', Georgia, serif;
  --font-body:    'DM Sans', system-ui, sans-serif;

  --bg:           #f2f1ec;
  --surface:      #ffffff;
  --surface-2:    #f8f7f3;

  --sidebar-bg:   #1c2e3f;
  --sidebar-text: rgba(255, 255, 255, 0.75);
  --sidebar-hover:#253d52;
  --sidebar-active: #2d4d64;
  --sidebar-accent: #5a8f7b;

  --text-primary: #1d2f3e;
  --text-secondary: #4e6070;
  --text-muted:   #8195a5;

  --border:       #e0e5ea;
  --border-light: #eceae4;

  --accent:       #4b7c6e;
  --accent-hover: #3a6358;
  --accent-light: #eaf2ef;

  --warn:         #b07d3a;
  --warn-light:   #fdf3e3;
  --danger:       #8f3a3a;
  --danger-light: #fdf0f0;
  --success:      #3a7a5a;
  --success-light:#e8f5ee;
  --info:         #3a5f8a;
  --info-light:   #e8f0f8;
  --neutral:      #5e718a;
  --neutral-light:#edf0f3;

  --shadow-sm:    0 1px 3px rgba(29, 47, 62, 0.06), 0 1px 2px rgba(29, 47, 62, 0.04);
  --shadow-md:    0 4px 12px rgba(29, 47, 62, 0.08), 0 2px 4px rgba(29, 47, 62, 0.05);
  --shadow-lg:    0 8px 24px rgba(29, 47, 62, 0.1),  0 4px 8px rgba(29, 47, 62, 0.06);

  --radius-sm:    6px;
  --radius-md:    10px;
  --radius-lg:    14px;

  --transition:   0.18s ease;
}

/* ─── Reset & Base ──────────────────────────────────────────── */
*, *::before, *::after { box-sizing: border-box; }

body {
  margin: 0;
  font-family: var(--font-body);
  font-size: 0.9375rem;
  color: var(--text-primary);
  background: var(--bg);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3, h4 {
  font-family: var(--font-display);
  font-weight: 600;
  margin: 0 0 0.5rem;
  line-height: 1.25;
  color: var(--text-primary);
}
h2 { font-size: 1.6rem; }
h3 { font-size: 1.15rem; font-weight: 500; }

p { margin: 0 0 0.75rem; }
a { color: var(--accent); text-decoration: none; transition: color var(--transition); }
a:hover { color: var(--accent-hover); }

/* ─── App Shell (Sidebar Layout) ───────────────────────────── */
#root { min-height: 100vh; }

.app-shell {
  display: grid;
  grid-template-columns: 220px 1fr;
  min-height: 100vh;
}

/* ─── Sidebar ───────────────────────────────────────────────── */
.sidebar {
  background: var(--sidebar-bg);
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0;
  height: 100vh;
  padding: 0;
  z-index: 100;
}

.sidebar-brand {
  padding: 1.5rem 1.25rem 1.25rem;
  border-bottom: 1px solid rgba(255,255,255,0.07);
}

.sidebar-brand .brand-name {
  font-family: var(--font-display);
  font-size: 1.35rem;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: 0.02em;
  display: block;
}

.sidebar-brand .brand-sub {
  font-size: 0.72rem;
  color: var(--sidebar-text);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-top: 0.15rem;
  display: block;
}

.sidebar-nav {
  flex: 1;
  padding: 1rem 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.sidebar-nav a,
.sidebar-nav .nav-item {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.6rem 0.8rem;
  border-radius: var(--radius-sm);
  color: var(--sidebar-text);
  font-size: 0.875rem;
  font-weight: 400;
  transition: background var(--transition), color var(--transition);
  text-decoration: none;
  cursor: pointer;
  border: none;
  background: transparent;
  width: 100%;
  text-align: left;
}

.sidebar-nav a:hover,
.sidebar-nav .nav-item:hover {
  background: var(--sidebar-hover);
  color: rgba(255,255,255,0.95);
}

.sidebar-nav a.active,
.sidebar-nav a[aria-current="page"] {
  background: var(--sidebar-active);
  color: #ffffff;
  font-weight: 500;
  border-left: 2.5px solid var(--sidebar-accent);
  padding-left: calc(0.8rem - 2.5px);
}

.sidebar-footer {
  padding: 1rem 0.75rem;
  border-top: 1px solid rgba(255,255,255,0.07);
}

.sidebar-user {
  font-size: 0.8rem;
  color: var(--sidebar-text);
  margin-bottom: 0.6rem;
  padding: 0 0.25rem;
}

.sidebar-logout {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.55rem 0.8rem;
  border-radius: var(--radius-sm);
  color: rgba(255,255,255,0.6);
  font-size: 0.85rem;
  background: transparent;
  border: 1px solid rgba(255,255,255,0.1);
  width: 100%;
  cursor: pointer;
  transition: background var(--transition), color var(--transition);
}

.sidebar-logout:hover {
  background: rgba(255,255,255,0.07);
  color: rgba(255,255,255,0.9);
}

/* ─── Main Content Area ─────────────────────────────────────── */
.main-area {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow: hidden;
}

.topbar {
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  padding: 0.9rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: var(--shadow-sm);
  position: sticky;
  top: 0;
  z-index: 50;
}

.topbar-title {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-muted);
  font-weight: 500;
}

.content {
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem 2rem;
  flex: 1;
}

/* ─── Stack & Layout Helpers ────────────────────────────────── */
.stack {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.page-header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--border-light);
  margin-bottom: 0.25rem;
}

.page-header h2 { margin: 0; }

/* ─── Panel / Card ──────────────────────────────────────────── */
.panel {
  background: var(--surface);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-light);
}

.panel h3 {
  color: var(--text-primary);
  margin-bottom: 1.1rem;
  padding-bottom: 0.65rem;
  border-bottom: 1px solid var(--border);
  font-size: 1rem;
  letter-spacing: 0.01em;
}

/* ─── Stat Cards ────────────────────────────────────────────── */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  gap: 1rem;
}

.stat-card {
  background: var(--surface);
  border-radius: var(--radius-md);
  padding: 1.25rem 1.25rem 1.1rem;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-light);
  border-top: 3px solid var(--accent);
  transition: box-shadow var(--transition), transform var(--transition);
  position: relative;
  overflow: hidden;
}

.stat-card::after {
  content: '';
  position: absolute;
  bottom: 0; right: 0;
  width: 60px; height: 60px;
  border-radius: 50% 0 0 0;
  background: var(--accent-light);
  opacity: 0.5;
}

.stat-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-1px);
}

.stat-card:nth-child(2) { border-top-color: var(--warn); }
.stat-card:nth-child(2)::after { background: var(--warn-light); }
.stat-card:nth-child(3) { border-top-color: var(--info); }
.stat-card:nth-child(3)::after { background: var(--info-light); }
.stat-card:nth-child(4) { border-top-color: var(--success); }
.stat-card:nth-child(4)::after { background: var(--success-light); }

.stat-label {
  margin: 0 0 0.4rem;
  color: var(--text-muted);
  font-size: 0.78rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.07em;
}

.stat-card h3 {
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
  color: var(--text-primary);
  border: none;
  padding: 0;
  line-height: 1;
}

/* ─── Forms ─────────────────────────────────────────────────── */
.form-grid {
  display: grid;
  gap: 0.75rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

input,
select,
textarea {
  width: 100%;
  padding: 0.65rem 0.85rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border);
  font-family: var(--font-body);
  font-size: 0.9rem;
  color: var(--text-primary);
  background: var(--surface-2);
  transition: border-color var(--transition), box-shadow var(--transition), background var(--transition);
  outline: none;
  appearance: none;
}

input::placeholder,
textarea::placeholder {
  color: var(--text-muted);
  font-weight: 300;
}

input:focus,
select:focus,
textarea:focus {
  border-color: var(--accent);
  background: var(--surface);
  box-shadow: 0 0 0 3px rgba(75, 124, 110, 0.12);
}

select {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%238195a5' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.85rem center;
  padding-right: 2.5rem;
  cursor: pointer;
}

textarea {
  resize: vertical;
  min-height: 90px;
  line-height: 1.5;
}

.field-label {
  display: block;
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 0.35rem;
}

/* ─── Buttons ───────────────────────────────────────────────── */
button,
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.1rem;
  border-radius: var(--radius-sm);
  font-family: var(--font-body);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background var(--transition), box-shadow var(--transition), transform var(--transition);
  border: none;
  white-space: nowrap;
}

button[type="submit"],
.btn-primary {
  background: var(--accent);
  color: #fff;
  box-shadow: 0 1px 3px rgba(75, 124, 110, 0.3);
}

button[type="submit"]:hover,
.btn-primary:hover {
  background: var(--accent-hover);
  box-shadow: 0 2px 8px rgba(75, 124, 110, 0.35);
  transform: translateY(-0.5px);
}

button:not([type="submit"]) {
  background: var(--surface-2);
  color: var(--text-secondary);
  border: 1px solid var(--border);
}

button:not([type="submit"]):hover {
  background: var(--border);
  color: var(--text-primary);
}

button:active { transform: translateY(0); }

/* ─── Tables ─────────────────────────────────────────────────── */
.table-wrap {
  overflow-x: auto;
  border-radius: var(--radius-md);
  border: 1px solid var(--border);
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.885rem;
}

thead {
  background: var(--surface-2);
}

th {
  padding: 0.7rem 1rem;
  text-align: left;
  font-size: 0.72rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: var(--text-muted);
  border-bottom: 1px solid var(--border);
  white-space: nowrap;
}

td {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--border-light);
  color: var(--text-secondary);
  vertical-align: middle;
}

tbody tr:last-child td { border-bottom: none; }

tbody tr {
  transition: background var(--transition);
}

tbody tr:hover {
  background: var(--surface-2);
}

/* ─── Badges ─────────────────────────────────────────────────── */
.badge {
  display: inline-block;
  padding: 0.2rem 0.65rem;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.badge.draft     { background: var(--neutral-light); color: var(--neutral); }
.badge.submitted { background: var(--warn-light);    color: var(--warn); }
.badge.reviewed  { background: var(--info-light);    color: var(--info); }
.badge.approved  { background: var(--success-light); color: var(--success); }
.badge.rejected  { background: var(--danger-light);  color: var(--danger); }

/* ─── Notifications ──────────────────────────────────────────── */
.notification-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.75rem;
}

.notification-list li {
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 1rem 1.1rem;
  transition: border-color var(--transition);
  border-left: 3px solid var(--accent);
}

.notification-list li.read {
  opacity: 0.6;
  border-left-color: var(--border);
}

.notification-list li strong {
  display: block;
  color: var(--text-primary);
  margin-bottom: 0.2rem;
  font-size: 0.9rem;
}

.notification-list li p {
  color: var(--text-secondary);
  font-size: 0.875rem;
  margin: 0 0 0.4rem;
}

.notification-list li small {
  color: var(--text-muted);
  font-size: 0.75rem;
}

.notification-list li button {
  margin-top: 0.6rem;
  padding: 0.3rem 0.8rem;
  font-size: 0.8rem;
}

/* ─── Auth Pages ─────────────────────────────────────────────── */
.auth-wrap {
  display: grid;
  place-content: center;
  min-height: 80vh;
  padding: 2rem 1rem;
}

.auth-panel {
  background: var(--surface);
  border-radius: var(--radius-lg);
  padding: 2.5rem;
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--border-light);
  width: min(440px, 100%);
}

.auth-panel h2 {
  margin-bottom: 0.3rem;
}

.auth-panel .auth-sub {
  color: var(--text-muted);
  font-size: 0.875rem;
  margin-bottom: 1.75rem;
}

.auth-panel p {
  margin-top: 1.25rem;
  text-align: center;
  color: var(--text-muted);
  font-size: 0.875rem;
}

/* ─── Admin List ─────────────────────────────────────────────── */
.placement-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.5rem;
}

.placement-list li {
  padding: 0.7rem 0.9rem;
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  font-size: 0.875rem;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.placement-list li::before {
  content: '';
  display: block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--sidebar-accent);
  flex-shrink: 0;
}

/* ─── Utilities ──────────────────────────────────────────────── */
.centered {
  display: grid;
  place-content: center;
  min-height: 60vh;
  color: var(--text-muted);
  font-size: 0.9rem;
}

.muted {
  color: var(--text-muted);
  font-size: 0.85rem;
  line-height: 1.5;
}

.card { background: var(--surface); border-radius: var(--radius-md); }

/* ─── Responsive ─────────────────────────────────────────────── */
@media (max-width: 768px) {
  .app-shell {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
  }

  .sidebar {
    position: static;
    height: auto;
    flex-direction: row;
    align-items: center;
    padding: 0.75rem 1rem;
  }

  .sidebar-brand { border: none; padding: 0; }
  .sidebar-brand .brand-sub { display: none; }
  .sidebar-nav {
    flex-direction: row;
    padding: 0;
    margin: 0 auto;
    gap: 0.25rem;
  }
  .sidebar-footer { padding: 0; border: none; }
  .sidebar-user { display: none; }

  .content { padding: 1.25rem 1rem; }
  .form-row { grid-template-columns: 1fr; }
  .stats-grid { grid-template-columns: 1fr 1fr; }
}

