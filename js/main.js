const carBody = document.querySelector('.car')
const parts = document.querySelectorAll('.part')
const hint = document.querySelector('.hint')

const data = [
	{ part: 'door', percent: 0 },
	{ part: 'threshold', percent: 0 },
	{ part: 'wing', percent: 0 },
	{ part: 'roof', percent: 0 },
	{ part: 'hood', percent: 0 },
]

if (localStorage.getItem('carConfig')) {
	const currentData = JSON.parse(localStorage.getItem('carConfig'))
	currentData.forEach(el => {
		progressItemToHtml(el.part, el.percent)
		checkPercentValue(el.part)
	})
} else {
	data.forEach(el => {
		progressItemToHtml(el.part, el.percent)
		checkPercentValue(el.part)
	})
	localStorage.setItem('carConfig', JSON.stringify(data))
}

carBody.addEventListener('click', e => {
	if (e.target.parentNode.closest('.part')) {
		const datasetValue = e.target.parentNode.dataset.parts
		updateHint(datasetValue)
		changePanelValue()
		hint.classList.add('visible')

		if (e.pageX + hint.offsetWidth < document.body.offsetWidth) {
			hint.style.top = e.pageY + 10 + 'px'
			hint.style.left = e.pageX + 15 + 'px'
		} else {
			hint.style.top = e.pageY + 10 + 'px'
			hint.style.left = e.pageX - hint.offsetWidth - 10 + 'px'
		}
	} else if (!e.target.parentNode.closest('.car')) {
		hint.classList.remove('visible')
	}
})

function checkPercentValue(datasetValue) {
	const localDate = JSON.parse(localStorage.getItem('carConfig'))
	if (localDate) {
		let inputValue = localDate.filter(item => item.part === datasetValue)
		if (inputValue[0].percent > 0) {
			addPartActive(inputValue[0].part)
		} else if (inputValue[0].percent == 0) {
			removePartActive(inputValue[0].part)
		}
	}
}

function addPartActive (part) {
	parts.forEach(item => {
		if (item.dataset.parts === part) {
			item.classList.add('active')
		}
	})
}

function removePartActive (part) {
	parts.forEach(item => {
		if (item.dataset.parts === part) {
			item.classList.remove('active')
		}
	})
}

const updateHint = datasetValue => {
	const partTitle = document.querySelector('.part-info__title')
	const partInput = document.querySelector('.part-info__input')

	partTitle.textContent = `${datasetValue}`
	partInput.value = `${getInputValue(datasetValue)}`
	partInput.dataset.input = `${datasetValue}`
}

function getInputValue(datasetValue) {
	const localDate = JSON.parse(localStorage.getItem('carConfig'))
	let inputValue = localDate.filter(item => item.part === datasetValue)
	return inputValue[0].percent
}

const partbutton = document.querySelector('.part-info__button')
partbutton.addEventListener('click', e => {
	e.preventDefault()
	hint.classList.remove('visible')
})

function getOffset (per) {
	let radius = 38
	let offset = radius * 2 * Math.PI - (per / 100) * radius * 2 * Math.PI
	return offset
}


function progressItemToHtml(name, per) {
	const carPanelItemsContainer = document.querySelector('.car-panel__items')
	let radius = 38
	let circumference = radius * 2 * Math.PI
	carPanelItemsContainer.innerHTML = ''

	carPanelItemsContainer.insertAdjacentHTML(
		'beforebegin',
		`
		<li class="car-panel__item" data-panel="${name}">
			<div class="car-panel__name">
			${name}
			</div>
			<div class="car-panel__progress progress">
				<div class="progress__item">
				<svg				
					width="100"
					height="100">
					<circle				 
						stroke="#9e9e9e"
						stroke-width="6"
						fill="transparent"
						r="${radius}"
						cx="50"
						cy="50"/>
					<circle
						class="progress-ring"
						stroke-dasharray="${circumference} ${circumference}"
						style="stroke-dashoffset:${getOffset(per)}"
						stroke="#5fdd5a"
						stroke-width="6"
						fill="transparent"
						progress="0"
						r="${radius}"
						cx="50"
						cy="50"/>
					</svg>
					<style>
					.progress-ring {
						transition: stroke-dashoffset 1s;
						transform: rotate(-90deg);
						transform-origin: 50% 50%;	
					}
					</style>
					<div class="progress__percent"><span class="percent">${per}</span>%</div>
				</div>
			</div>
		</li>
		`
	)
}

function updateData() {
	const carPanelItems = document.querySelectorAll('.car-panel__item')
	const currentData = JSON.parse(localStorage.getItem('carConfig'))
	carPanelItems.forEach(item => {
		let element = currentData.filter(el => el.part === item.dataset.panel)
		item.querySelector('.progress-ring').style.strokeDashoffset = getOffset(element[0].percent)
		item.querySelector('.percent').textContent = element[0].percent
	})
}

const resetBtn = document.getElementById('reset')
resetBtn.addEventListener('click', () => resetAll())

const resetAll = () => {
	hint.classList.remove('visible')
	parts.forEach(part => {
		if (part.classList.contains('active')) {
			part.classList.remove('active')
		}
	})
	localStorage.setItem('carConfig', JSON.stringify(data))
	updateData()
}

const hoverPart = () => {
	const panelLinks = document.querySelectorAll('.car-panel__item')
	panelLinks.forEach(link => {
		link.addEventListener('mouseover', e => {
			let linkValue = e.target.dataset.panel.toLowerCase()
			partsHover(linkValue)
		})
		link.addEventListener('mouseout', e => {
			let linkValue = e.target.dataset.panel.toLowerCase()
			partsHover(linkValue)
		})
	})
}
hoverPart()

const partsHover = activeElem => {
	parts.forEach(elem => {
		if (elem.dataset.parts === activeElem) {
			elem.classList.toggle('hover')
		}
	})
}

const currentDate = new Date().getFullYear()
const dateContainer = document.getElementById('date')
dateContainer.innerText = currentDate

function changePanelValue() {
	const input = document.querySelector('.part-info__input')
	input.addEventListener('change', e => {
		if (input.value < 101 && input.value > -1) {
			const localDate = JSON.parse(localStorage.getItem('carConfig'))
			const newDate = []
			localDate.forEach(item => {
				newDate.push(item)
				if (item.part === input.dataset.input) {
					item.percent = +input.value
				}
			})
			localStorage.setItem('carConfig', JSON.stringify(newDate))
			updateData()
			checkPercentValue(input.dataset.input)
		}
	})
}
