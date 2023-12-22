`use strict`;

const getNameGender = async () => {
	try {
		let name = document.getElementById(`name`).value;
		let response = await fetch(`https://api.genderize.io?name=${name}`);
		let data = await response.json();
		console.log(data);
		genderDisplay(data.gender);
		probabilityDisplay(data.probability);
	} catch (err) {
		console.log(err);
	}
};

const onClick = () => {
	getNameGender();
};

const genderDisplay = (gender) => {
	let genderImage = document.querySelector(`.gender`);
	let maleUrl =
		"https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Mars-male-symbol-pseudo-3D-blue.svg/1200px-Mars-male-symbol-pseudo-3D-blue.svg.png";
	let femaleUrl = `https://img.freepik.com/free-psd/female-symbol-transparent-background-pink-female-symbol-png-download_56104-2302.jpg`;

	if (gender === `male`) {
		genderImage.style.backgroundImage = `url(${maleUrl})`;
	} else {
		genderImage.style.backgroundImage = `url(${femaleUrl})`;
	}
};

const probabilityDisplay = (percent) => {
	let percentage = document.querySelector(`.probability`);
	percentage.innerText = `${percent * 100}%`;
};
