document.addEventListener('DOMContentLoaded', function () {
	const COLLAPSE_BREAKPOINT = 992; // match navbar-expand-lg

	function isMobile() {
		return window.innerWidth < COLLAPSE_BREAKPOINT;
	}

	// Enhance dropdown toggles: ARIA, keyboard navigation, and mobile click-to-expand
	document.querySelectorAll('.nav-item.dropdown .dropdown-toggle').forEach(function (toggler) {
		const menu = toggler.nextElementSibling;
		if (!menu) return;

		// Ensure ARIA attributes
		toggler.setAttribute('aria-haspopup', 'true');
		if (!toggler.hasAttribute('aria-expanded')) toggler.setAttribute('aria-expanded', 'false');
		if (!menu.hasAttribute('role')) menu.setAttribute('role', 'menu');
		menu.setAttribute('aria-hidden', 'true');

		// Mark menu items for keyboard navigation
		const menuItems = Array.from(menu.querySelectorAll('a')).map(function (a) {
			a.setAttribute('role', 'menuitem');
			a.setAttribute('tabindex', '-1');
			return a;
		});

		function openMenu() {
			menu.classList.add('show');
			menu.setAttribute('aria-hidden', 'false');
			toggler.setAttribute('aria-expanded', 'true');
		}

		function closeMenu() {
			menu.classList.remove('show');
			menu.setAttribute('aria-hidden', 'true');
			toggler.setAttribute('aria-expanded', 'false');
		}

		// Mobile: click toggles (prevent default navigation)
		toggler.addEventListener('click', function (e) {
			if (isMobile()) {
				e.preventDefault();
				if (menu.classList.contains('show')) {
					closeMenu();
				} else {
					openMenu();
					// focus first item
					if (menuItems.length) menuItems[0].focus();
				}
			}
		});

		// Keyboard handling on toggler
		toggler.addEventListener('keydown', function (e) {
			if (e.key === 'Enter' || e.key === ' ') {
				e.preventDefault();
				if (menu.classList.contains('show')) {
					closeMenu();
				} else {
					openMenu();
					if (menuItems.length) menuItems[0].focus();
				}
			}

			if (e.key === 'ArrowDown') {
				e.preventDefault();
				openMenu();
				if (menuItems.length) menuItems[0].focus();
			}

			if (e.key === 'Escape') {
				closeMenu();
				toggler.focus();
			}
		});

		// Keyboard navigation inside menu
		menu.addEventListener('keydown', function (e) {
			const items = Array.from(menu.querySelectorAll('[role="menuitem"]'));
			if (!items.length) return;
			let idx = items.indexOf(document.activeElement);

			if (e.key === 'ArrowDown') {
				e.preventDefault();
				idx = (idx + 1) % items.length;
				items[idx].focus();
			}

			if (e.key === 'ArrowUp') {
				e.preventDefault();
				idx = (idx - 1 + items.length) % items.length;
				items[idx].focus();
			}

			if (e.key === 'Home') {
				e.preventDefault();
				items[0].focus();
			}

			if (e.key === 'End') {
				e.preventDefault();
				items[items.length - 1].focus();
			}

			if (e.key === 'Escape') {
				closeMenu();
				toggler.focus();
			}
		});

		// Close menu if clicking outside
		document.addEventListener('click', function (ev) {
			if (!menu.contains(ev.target) && !toggler.contains(ev.target)) {
				closeMenu();
			}
		});
	});

	// When collapse hides, close any open dropdown menus
	const mainNav = document.getElementById('mainNav');
	if (mainNav) {
		mainNav.addEventListener('hidden.bs.collapse', function () {
			document.querySelectorAll('.dropdown-menu.show').forEach(function (m) {
				m.classList.remove('show');
				m.setAttribute('aria-hidden', 'true');
			});
		});
	}

	// Close collapsed navbar when clicking outside
	document.addEventListener('click', function (e) {
		const navbar = document.querySelector('.navbar');
		if (!navbar) return;
		const collapseEl = document.getElementById('mainNav');
		if (!collapseEl) return;
		const bsCollapse = bootstrap.Collapse.getInstance(collapseEl) || new bootstrap.Collapse(collapseEl, { toggle: false });
		if (collapseEl.classList.contains('show') && !navbar.contains(e.target)) {
			bsCollapse.hide();
		}
	});
});
