const links = document.querySelectorAll('#categories a');

const searchBar = document.getElementById('search-bar');

const items = document.querySelectorAll('.grid .item img');
const overlay = document.getElementById('overlay');

const grid = new Muuri('.grid', {
	layout: {
		rounding: false,
	},
});

window.addEventListener('load', () => {
	grid.refreshItems().layout();
	document.getElementById('grid').classList.add('uploaded-images');
});

links.forEach((link) => {
	link.addEventListener('click', (e) => {
		e.preventDefault();

		// remove active class for others links
		links.forEach((l) => {
			l.classList.remove('active');
		});

		// set class active to clicked link
		e.target.classList.add('active');

		const category = e.target.innerHTML.toLowerCase();

		// filter by category
		if (category !== 'all') {
			grid.filter(`[data-category="${category}"]`);
		} else {
			grid.filter(`[data-category]`);
		}
	});
});

searchBar.addEventListener('input', (e) => {
	const label = e.target.value.toLowerCase();

	grid.filter((item) => item.getElement().dataset.labels.includes(label));
});

items.forEach((item) => {
	const url = item.getAttribute('src');
	const desc = item.parentElement.parentElement.getAttribute('data-desc');

	item.addEventListener('click', () => {
		overlay.classList.add('active');

		document.querySelector('#overlay img').src = url;
		document.querySelector('#overlay p').innerHTML = desc;
	});
});

document.querySelector('#close-popup').addEventListener('click', () => {
	overlay.classList.remove('active');
});

overlay.addEventListener('click', (e) => {
	if (e.target.id === 'overlay') overlay.classList.remove('active');
});
