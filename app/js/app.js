import showInfoMessage from "./modules/info-message.js";
import saveConfig from "./modules/save-config.js";
import pageAnimation from "./modules/animation.js";
import showSavedConfig from "./modules/saved-config-to-show.js";
import {
	getOffset,
	updateData,
	checkPercentValue,
} from "./modules/functions.js";



pageAnimation();
saveConfig();
showSavedConfig();

const carBody = document.querySelector(".car");
const parts = document.querySelectorAll(".part");
const hint = document.querySelector(".hint");

const data = [
	{ part: "door", percent: 0 },
	{ part: "threshold", percent: 0 },
	{ part: "wing", percent: 0 },
	{ part: "roof", percent: 0 },
	{ part: "hood", percent: 0 },
];
const currentData = JSON.parse(localStorage.getItem("carConfig"));
if (localStorage.getItem("carConfig")) {
	currentData.forEach((el) => {
		progressItemToHtml(el.part, el.percent);
		checkPercentValue(el.part);
	});
} else {
	data.forEach((el) => {
		progressItemToHtml(el.part, el.percent);
		checkPercentValue(el.part);
	});
	localStorage.setItem("carConfig", JSON.stringify(data));
}
//======================================================================================
const carPanelItems = document.querySelector(".car-panel__items");
carPanelItems.addEventListener("click", (e) => {
	if (e.target.closest(".car-panel__item")) {
		const datasetValue = e.target.dataset.panel;
		updateHint(datasetValue);
		changePanelValue();
		hint.classList.add("visible");

		if (e.pageX + hint.offsetWidth < document.body.offsetWidth) {
			hint.style.top = e.pageY - 70 + "px";
			hint.style.left = e.pageX + 15 + "px";
		} else {
			hint.style.top = e.pageY - 70 + "px";
			hint.style.left = e.pageX - hint.offsetWidth - 10 + "px";
		}
	} else if (!e.target.closest(".carPanelItems")) {
		hint.classList.remove("visible");
	}
});

//======================================================================================

carBody.addEventListener("click", (e) => {
	if (e.target.parentNode.closest(".part")) {
		const datasetValue = e.target.parentNode.dataset.parts;
		updateHint(datasetValue);
		changePanelValue();
		hint.classList.add("visible");

		if (e.pageX + hint.offsetWidth < document.body.offsetWidth) {
			hint.style.top = e.pageY - 70 + "px";
			hint.style.left = e.pageX + 15 + "px";
		} else {
			hint.style.top = e.pageY + 10 + "px";
			hint.style.left = e.pageX - hint.offsetWidth - 10 + "px";
		}
	} else if (!e.target.parentNode.closest(".car")) {
		hint.classList.remove("visible");
	}
});

const updateHint = (datasetValue) => {
	const partTitle = document.querySelector(".part-info__title");
	const partInput = document.querySelector(".part-info__input");

	partTitle.textContent = `${datasetValue}`;
	partInput.value = `${getInputValue(datasetValue)}`;
	partInput.dataset.input = `${datasetValue}`;
};

function getInputValue(datasetValue) {
	const localDate = JSON.parse(localStorage.getItem("carConfig"));
	let inputValue = localDate.filter((item) => item.part === datasetValue);
	return inputValue[0].percent;
}

const partbutton = document.querySelector(".part-info__button");
partbutton.addEventListener("click", (e) => {
	e.preventDefault();
	hint.classList.remove("visible");
});

function progressItemToHtml(name, per) {
	const carPanelItemsContainer = document.querySelector(".car-panel__items");
	let radius = 28;
	let circumference = radius * 2 * Math.PI;

	carPanelItemsContainer.insertAdjacentHTML(
		"beforeEnd",
		`
		<li class="car-panel__item" data-panel="${name}">
			<div class="car-panel__name">
			${name}
			</div>
			<div class="car-panel__progress progress">
				<div class="progress__item">
				<svg				
					width="80"
					height="80">
					<circle				 
						stroke="#9e9e9e"
						stroke-width="5"
						fill="transparent"
						r="${radius}"
						cx="40"
						cy="40"/>
					<circle
						class="progress-ring"
						stroke-dasharray="${circumference} ${circumference}"
						style="stroke-dashoffset:${getOffset(per)}"
						stroke="#5fdd5a"
						stroke-width="5"
						fill="transparent"
						progress="0"
						r="${radius}"
						cx="40"
						cy="40"/>
					</svg>
					<style>
					.progress-ring {
						transition: stroke-dashoffset 1s;
						transform: rotate(-90deg);
						transform-origin: 50% 50%;	
					}
					</style>
					<div style="display: none;" class="progress__percent"><span class="percent">${per}</span>%</div>

					<div class="percent-block">
						
					</div>
				</div>
			</div>
		</li>
		`
	);
}

function createPercentItem(value) {
	const percentItem = document.createElement("div");
	percentItem.classList.add("percent-block__item");
	for (let i = 0; i < value + 1; i++) {
		percentItem.innerHTML += `<span>${i}%</span>`;
	}
	return percentItem;
}

const percentItems = document.querySelectorAll(".percent-block");
if (percentItems) {
	percentItems.forEach((item) => {
		item.insertAdjacentElement("beforeEnd", createPercentItem(100));
	});
}

const resetBtn = document.getElementById("reset");
resetBtn.addEventListener("click", () => resetAll());

const resetAll = () => {
	hint.classList.remove("visible");
	parts.forEach((part) => {
		if (part.classList.contains("active")) {
			part.classList.remove("active");
		}
	});
	localStorage.setItem("carConfig", JSON.stringify(data));
	updateData();
	showInfoMessage("data has been successfully reset", "ok");
};

const hoverPart = () => {
	const panelLinks = document.querySelectorAll(".car-panel__item");
	panelLinks.forEach((link) => {
		link.addEventListener("mouseover", (e) => {
			let linkValue = e.target.dataset.panel.toLowerCase();
			partsHover(linkValue);
		});
		link.addEventListener("mouseout", (e) => {
			let linkValue = e.target.dataset.panel.toLowerCase();
			partsHover(linkValue);
		});
	});
};
hoverPart();

const partsHover = (activeElem) => {
	parts.forEach((elem) => {
		if (elem.dataset.parts === activeElem) {
			elem.classList.toggle("hover");
		}
	});
};

const hoverPanel = () => {
	parts.forEach((link) => {
		link.addEventListener("mouseover", function (e) {
			if (e.target.parentNode.closest(".part")) {
				let linkValue = e.target.parentNode.dataset.parts.toLowerCase();
				panelHover(linkValue);
			}
		});
		link.addEventListener("mouseout", (e) => {
			let linkValue = e.target.parentNode.dataset.parts.toLowerCase();
			panelHover(linkValue);
		});
	});
};
hoverPanel();

const panelHover = (activeElem) => {
	const panelLinks = document.querySelectorAll(".car-panel__item");
	panelLinks.forEach((elem) => {
		if (elem.dataset.panel === activeElem) {
			elem.classList.toggle("hover");
		}
	});
};

const currentDate = new Date().getFullYear();
const dateContainer = document.getElementById("date");
dateContainer.innerText = currentDate;

function changePanelValue() {
	const input = document.querySelector(".part-info__input");
	input.addEventListener("change", (e) => {
		if (input.value < 101 && input.value > -1) {
			const localDate = JSON.parse(localStorage.getItem("carConfig"));
			const newDate = [];
			localDate.forEach((item) => {
				newDate.push(item);
				if (item.part === input.dataset.input) {
					item.percent = +input.value;
				}
			});
			localStorage.setItem("carConfig", JSON.stringify(newDate));
			updateData();
			checkPercentValue(input.dataset.input);
		}
	});
}

const input = document.querySelector(".part-info__input");
const buttonUp = document.querySelector(".up");
const buttonDown = document.querySelector(".down");

buttonUp.onclick = function () {
	let value = parseInt(input.value, 10);
	value = isNaN(value) ? 0 : value;
	value += 10;
	if (value < 101 && value > -1) {
		input.value = value;
		const localDate = JSON.parse(localStorage.getItem("carConfig"));
		const newDate = [];
		localDate.forEach((item) => {
			newDate.push(item);
			if (item.part === input.dataset.input) {
				item.percent = +input.value;
			}
		});
		localStorage.setItem("carConfig", JSON.stringify(newDate));
		updateData();
		checkPercentValue(input.dataset.input);
	}
};

buttonDown.onclick = function () {
	let value = parseInt(input.value, 10);
	value = isNaN(value) ? 0 : value;
	value -= 10;
	if (value < 101 && value > -1) {
		input.value = value;
		const localDate = JSON.parse(localStorage.getItem("carConfig"));
		const newDate = [];
		localDate.forEach((item) => {
			newDate.push(item);
			if (item.part === input.dataset.input) {
				item.percent = +input.value;
			}
		});
		localStorage.setItem("carConfig", JSON.stringify(newDate));
		updateData();
		checkPercentValue(input.dataset.input);
	}
};


