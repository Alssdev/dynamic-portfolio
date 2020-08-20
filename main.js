const links = document.querySelectorAll('#categories a');
const searchBar = document.getElementById('search-bar');

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
