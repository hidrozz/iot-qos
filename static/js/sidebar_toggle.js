const sidebar = document.getElementById('sidebar');
const toggleTop = document.getElementById('toggleSidebar');
const toggleBottom = document.getElementById('toggleSidebarBottom');
const toggleIcon = document.getElementById('toggleIcon');
const links = document.querySelectorAll('.sidebar-link');

// Fungsi Toggle
function toggleSidebar() {
  sidebar.classList.toggle('collapsed');

  if (sidebar.classList.contains('collapsed')) {
    toggleIcon.classList.remove('fa-angle-double-left');
    toggleIcon.classList.add('fa-angle-double-right');
    toggleBottom.classList.remove('d-none');
  } else {
    toggleIcon.classList.remove('fa-angle-double-right');
    toggleIcon.classList.add('fa-angle-double-left');
    toggleBottom.classList.add('d-none');
  }
}

// Expand otomatis saat menu diklik
links.forEach(link => {
  link.addEventListener('click', () => {
    sidebar.classList.remove('collapsed');
    toggleIcon.classList.remove('fa-angle-double-right');
    toggleIcon.classList.add('fa-angle-double-left');
    toggleBottom.classList.add('d-none');
  });
});

toggleTop.addEventListener('click', toggleSidebar);
toggleBottom.addEventListener('click', toggleSidebar);
