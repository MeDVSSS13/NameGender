"use strict";

const getNameGender = async () => {
	try {
		let name = document.getElementById("name").value;
		let response = await fetch(`https://api.genderize.io?name=${name}`);
		let data = await response.json();

		if (!response.ok) {
			throw new Error("Failed to retrieve data. Please try again.");
		}

		console.log(data);
		applyStyles(data.gender, data.probability);
		probabilityDisplay(data.probability, data.gender);

		resetZoom();
	} catch (err) {
		console.error("An error occurred:", err.message);
	}
};
const resetZoom = () => {
	window.scrollTo(0, 0);
};

const onClick = () => {
	getNameGender();
};

const applyStyles = (gender, probability) => {
	let container = document.querySelector(".container");

	// Reset styles
	container.classList.remove(
		"male-high-probability",
		"male-low-probability",
		"female-high-probability",
		"female-low-probability",
		"neutral-style"
	);

	if (probability === 0.5) {
		container.classList.add("neutral-style");
	} else if (gender === "male" && probability >= 0.7) {
		container.classList.add("male-high-probability");
	} else if (gender === "male" && probability < 0.7) {
		container.classList.add("male-low-probability");
	} else if (gender === "female" && probability >= 0.7) {
		container.classList.add("female-high-probability");
	} else if (gender === "female" && probability < 0.7) {
		container.classList.add("female-low-probability");
	}
};

const probabilityDisplay = (percent, gender) => {
	let maleProb = document.getElementById(`maleProb`);
	let femaleProb = document.getElementById(`femaleProb`);
	if (gender === "male") {
		maleProb.textContent = `Probably male: ${percent * 100}%`;
		femaleProb.textContent = `Probably female: ${Math.round(
			(1 - percent) * 100
		)}%`;
	} else if (gender === `female`) {
		femaleProb.textContent = `Probably female: ${percent * 100}%`;
		maleProb.textContent = `Probably male: ${Math.round((1 - percent) * 100)}%`;
	}
};
