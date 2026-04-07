import type { CssPreset, BreakpointOption } from "@/types/css-playground";

export const flexboxPreset: CssPreset = {
  name: "Flexbox",
  description: "Explore flexbox alignment, direction, wrapping, and gap",
  panelType: "flex",
  html: `<div class="container">
  <div class="box">1</div>
  <div class="box">2</div>
  <div class="box">3</div>
  <div class="box">4</div>
  <div class="box">5</div>
</div>`,
  css: `.container {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: stretch;
  flex-wrap: nowrap;
  gap: 8px;
  padding: 16px;
  min-height: 200px;
  background: #f1f5f9;
  border-radius: 8px;
}

.box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background: #6366f1;
  color: white;
  font-weight: bold;
  font-size: 1.2rem;
  border-radius: 6px;
}`,
};

export const gridPreset: CssPreset = {
  name: "Grid",
  description: "Explore CSS Grid columns, rows, gap, and placement",
  panelType: "grid",
  html: `<div class="container">
  <div class="box">1</div>
  <div class="box">2</div>
  <div class="box">3</div>
  <div class="box">4</div>
  <div class="box">5</div>
  <div class="box">6</div>
</div>`,
  css: `.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  gap: 8px;
  padding: 16px;
  min-height: 200px;
  background: #f1f5f9;
  border-radius: 8px;
}

.box {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background: #10b981;
  color: white;
  font-weight: bold;
  font-size: 1.2rem;
  border-radius: 6px;
}`,
};

export const responsivePreset: CssPreset = {
  name: "Responsive",
  description: "Media queries that adapt layout across breakpoints",
  panelType: "responsive",
  html: `<div class="container">
  <header class="header">Header</header>
  <nav class="sidebar">Sidebar</nav>
  <main class="content">Main Content</main>
  <footer class="footer">Footer</footer>
</div>`,
  css: `.container {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  gap: 8px;
  padding: 16px;
  min-height: 300px;
  font-family: sans-serif;
}

.header, .sidebar, .content, .footer {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  border-radius: 6px;
  font-weight: bold;
  color: white;
}

.header  { background: #6366f1; }
.sidebar { background: #f59e0b; }
.content { background: #10b981; min-height: 120px; }
.footer  { background: #ef4444; }

/* Tablet */
@media (min-width: 640px) {
  .container {
    grid-template-columns: 200px 1fr;
    grid-template-rows: auto 1fr auto;
  }
  .header  { grid-column: 1 / -1; }
  .footer  { grid-column: 1 / -1; }
}

/* Desktop */
@media (min-width: 1024px) {
  .container {
    grid-template-columns: 250px 1fr;
  }
}`,
};

export const allPresets: CssPreset[] = [
  flexboxPreset,
  gridPreset,
  responsivePreset,
];

export const breakpointOptions: BreakpointOption[] = [
  { name: "mobile", label: "Mobile", width: 375 },
  { name: "tablet", label: "Tablet", width: 768 },
  { name: "desktop", label: "Desktop", width: 1200 },
  { name: "full", label: "Full Width", width: 0 },
];
