export const getOffset = (per) => {
	let radius = 28;
	let offset = radius * 2 * Math.PI - (per / 100) * radius * 2 * Math.PI;
	return offset;
};

export const percentToTop = (value) => {
	const percentBlockItem = document.querySelector(".percent-block__item");
	let percentElementHight = percentBlockItem.offsetHeight / 101;
	let percentЕrek = percentElementHight * value;
	return percentЕrek;
};

function totalValue() {
	const totalValueProgress = document.querySelector(".total-value__progress");
	const currentTotalValue = document.querySelector(
		".total-value__curretnt-value"
	);

	const localDate = JSON.parse(localStorage.getItem("carConfig"));
	let totalValue = localDate
		.map((item) => item.percent)
		.reduce((prev, curr) => prev + curr, 0);
	totalValueProgress.style.width = `${totalValue / localDate.length}%`;
	currentTotalValue.textContent = `${totalValue / localDate.length}%`;
}

export function updateData() {
	const carPanelItems = document.querySelectorAll(".car-panel__item");
	const currentData = JSON.parse(localStorage.getItem("carConfig"));
	carPanelItems.forEach((item) => {
		let element = currentData.filter((el) => el.part === item.dataset.panel);
		item.querySelector(".progress-ring").style.strokeDashoffset = getOffset(
			element[0].percent
		);
		item.querySelector(".percent").textContent = element[0].percent;
		item.querySelector(".percent-block__item").style.top = `-${percentToTop(
			element[0].percent
		)}px`;
	});
	totalValue();
}

export function checkPercentValue(datasetValue) {
	const localDate = JSON.parse(localStorage.getItem("carConfig"));
	if (localDate) {
		let inputValue = localDate.filter((item) => item.part === datasetValue);
		if (inputValue[0].percent > 0) {
			addPartActive(inputValue[0].part);
		} else if (inputValue[0].percent == 0) {
			removePartActive(inputValue[0].part);
		}
	}
}

const parts = document.querySelectorAll(".part");
function addPartActive(part) {
	parts.forEach((item) => {
		if (item.dataset.parts === part) {
			item.classList.add("active");
		}
	});
}

function removePartActive(part) {
	parts.forEach((item) => {
		if (item.dataset.parts === part) {
			item.classList.remove("active");
		}
	});
}
