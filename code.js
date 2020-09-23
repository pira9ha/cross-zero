let game = document.querySelector('.game'),
	result = document.querySelector('.result'),
	btnGame = document.querySelector('.restart'),
	area = document.querySelectorAll('.game-area'),
	step = false,
	count = 0,
	circle =
		'<svg class="circle"><circle r="65" cx="98" cy="98" stroke="yellow" stroke-width="10" fill="none" stroke-linecap="round"  /></svg>',
	cross =
		'<svg class="cross"><line class="first" x1="40" y1="40" x2="160" y2="160" stroke="red" stroke-width="10" fill="none" stroke-linecap="round"/><line class="second" x1="160" y1="40" x2="40" y2="160" stroke="red" stroke-width="10" fill="none" stroke-linecap="round"/></svg>';

function stepCross(target) {
	target.innerHTML = cross;
	target.classList.add('x');
	count++;
}

function stepCircle(target) {
	target.innerHTML = circle;
	target.classList.add('o');
	count++;
}

function init(e) {
	if (!step) stepCross(e.target);
	else stepCircle(e.target);
	step = !step;
	winner();
}

function newGame() {
	step = false;
	count = 0;
	result.innerText = '';
	area.forEach((item) => {
		item.innerHTML = '';
		item.classList.remove('x', 'o', 'active');
		game.addEventListener('click', init);
	});
}

function winner() {
	let combination = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

	for (let i = 0; i < combination.length; i++) {
		if (
			area[combination[i][0]].classList.contains('x') &&
			area[combination[i][1]].classList.contains('x') &&
			area[combination[i][2]].classList.contains('x')
		) {
			setTimeout(() => {
				area[combination[i][0]].classList.add('active');
				area[combination[i][1]].classList.add('active');
				area[combination[i][2]].classList.add('active');
				result.innerText = 'Выйграли крестики';
			}, 800);
			game.removeEventListener('click', init);
		} else if (
			area[combination[i][0]].classList.contains('o') &&
			area[combination[i][1]].classList.contains('o') &&
			area[combination[i][2]].classList.contains('o')
		) {
			setTimeout(() => {
				area[combination[i][0]].classList.add('active');
				area[combination[i][1]].classList.add('active');
				area[combination[i][2]].classList.add('active');
				result.innerText = 'Выйграли нолики';
			}, 800);
			game.removeEventListener('click', init);
		} else if (count == 9) {
			setTimeout(() => {
				result.innerText = 'Ничья';
				game.removeEventListener('click', init);
			}, 600);
		}
	}
}

btnGame.addEventListener('click', newGame);
game.addEventListener('click', init);

// адаптив svg
const mediaQuery = window.matchMedia('(max-width: 560px)');
function handleTabletChange(e) {
	if (e.matches) {
		circle =
			'<svg class="circle"><circle r="30" cx="48" cy="48" stroke="yellow" stroke-width="10" fill="none" stroke-linecap="round"  /></svg>';
		cross =
			'<svg class="cross"><line class="first" x1="20" y1="20" x2="80" y2="80" stroke="red" stroke-width="10" fill="none" stroke-linecap="round"/><line class="second" x1="80" y1="20" x2="20" y2="80" stroke="red" stroke-width="10" fill="none" stroke-linecap="round"/></svg>';

		btnGame.addEventListener('click', newGame);
		game.addEventListener('click', init);
	}
}
mediaQuery.addListener(handleTabletChange);
handleTabletChange(mediaQuery);
