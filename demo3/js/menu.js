document.addEventListener('DOMContentLoaded', function () {
	// Add 'has-sub' class to items that contain nested ULs
	var nav = document.querySelector('nav.navbar');
	if (!nav) return;
	var topUL = nav.querySelector('ul');
	if (!topUL) return;

	var items = topUL.querySelectorAll('li');
	items.forEach(function (li) {
		var sub = li.querySelector('ul');
		if (sub) {
			li.classList.add('has-sub');
		}
	});

	// Mobile/touch fallback: toggle submenu by click
	topUL.addEventListener('click', function (e) {
		var w = window.innerWidth || document.documentElement.clientWidth;
		if (w < 992) {
			var t = e.target;
			// find parent li
			while (t && t !== topUL && t.tagName !== 'LI') t = t.parentNode;
			if (!t || t === topUL) return;
			var sub = t.querySelector('ul');
			var link = t.querySelector('a');
			if (sub && link && (t === e.target || link.contains(e.target))) {
				// prevent navigation and toggle
				e.preventDefault();
				var opened = t.classList.toggle('open');
				// close siblings
				Array.prototype.forEach.call(t.parentNode.children, function (sibling) {
					if (sibling !== t) sibling.classList.remove('open');
				});
			}
		}
	});

	// Close open submenus when clicking outside (mobile)
	document.addEventListener('click', function (e) {
		var w = window.innerWidth || document.documentElement.clientWidth;
		if (w < 992) {
			if (!nav.contains(e.target)) {
				var opened = nav.querySelectorAll('li.open');
				opened.forEach(function (li) { li.classList.remove('open'); });
			}
		}
	});
});

 

