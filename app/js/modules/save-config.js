import showInfoMessage from './info-message.js'

const saveConfig = () => {
	const startConfig = () => {
		if (localStorage.getItem('fullCarConfig')) {
			renderSavedConfig()
		}
	}
	startConfig()

	function addNewConfig() {
		const localDate = JSON.parse(localStorage.getItem('carConfig'))
		const currentCarsConfig = JSON.parse(localStorage.getItem('fullCarConfig'))
		const fullCarConfig = [...currentCarsConfig, localDate]
		localStorage.setItem('fullCarConfig', JSON.stringify(fullCarConfig))
		renderSavedConfig()
		showInfoMessage('successfully saved', 'ok')
	}

	const saveNewConfig = () => {
		const saveConfigButton = document.getElementById('save-config')
		saveConfigButton.addEventListener('click', () => {
			const localDate = JSON.parse(localStorage.getItem('carConfig'))

			if (percentSum(localDate)) {
				if (localStorage.getItem('fullCarConfig')) {
					checkCarsConfig()
				} else if (!localStorage.getItem('fullCarConfig')) {
					localStorage.setItem('fullCarConfig', JSON.stringify([localDate]))
					renderSavedConfig()
					showInfoMessage('successfully saved', 'ok')
				}
			} else {
				showInfoMessage(`create configurations`, 'error')
			}
		})
	}
	saveNewConfig()

	function checkCarsConfig() {
		const localDate = JSON.parse(localStorage.getItem('carConfig'))
		const currentCarsConfig = JSON.parse(localStorage.getItem('fullCarConfig'))
		let lastValue = currentCarsConfig.filter((elem, id) => id === currentCarsConfig.length - 1)
		if (currentCarsConfig.length < 3) {
			if (!isEqual(lastValue[0], localDate)) {
				addNewConfig()
			} else {
				showInfoMessage(`This configuration has already been saved`, 'error')
			}
		} else {
			showInfoMessage(`the maximum quantity of configurations is - 3`, 'error')
		}
	}

	function percentSum(el) {
		let currValue = el.map(item => item.percent).reduce((prev, curr) => prev + curr, 0) / el.length
		return currValue
	}

	function renderSavedConfig() {
		const savedConfigItems = document.querySelector('.saved-config__items')
		savedConfigItems.innerHTML = ''
		const currentCarsConfig = JSON.parse(localStorage.getItem('fullCarConfig'))
		currentCarsConfig.forEach((elem, index) => {
			savedConfigToHtml(elem, index)
			parseSavedValue()
		})
	}

	function renderItemsValue(elem) {
		const configLiContainer = document.createElement('div')
		elem.forEach(el => {
			configLiContainer.insertAdjacentHTML(
				'beforeEnd',
				`
				<li class="config__li">
					<span class="config__part">${el.part}:</span>
					<span class="config__value">${el.percent}%</span>	
				</li>
			`
			)
		})
		return configLiContainer.innerHTML
	}

	function savedConfigToHtml(elem, index) {
		const savedConfigItems = document.querySelector('.saved-config__items')
		savedConfigItems.insertAdjacentHTML(
			'beforeEnd',
			`
			<div id="config_${index}" class="saved-config__item config">
				<fieldset>
					<legend class="config__title" align="right">Config ${index + 1}</legend>
						<ul class="config__list">
							${renderItemsValue(elem)}
							<li class="config__li total">
								<span class="config__part">Total:</span>
								<span class="config__value">${percentSum(elem)}%</span>	
							</li>
						</ul>
						<div class="config__buttons">
						<button id="btn_${index}" class="config__button">
							<img src="images/dist/delete.svg" alt="delete">
						</button>
					</div>
				</fieldset>
			</div>
			`
		)
	}

	function deleteConfig() {
		const savedConfigItems = document.querySelector('.saved-config__items')
		savedConfigItems.addEventListener('click', e => {
			e.preventDefault()
			const currentCarsConfig = JSON.parse(localStorage.getItem('fullCarConfig'))
			if (e.target.parentNode.classList.contains('config__button')) {
				let elem = e.target.parentNode
				let id = +elem.id.split('_')[1]

				const newArr = currentCarsConfig.filter((el, index) => index !== id)
				localStorage.setItem('fullCarConfig', JSON.stringify(newArr))
				renderSavedConfig()
				if (currentCarsConfig.length < 2) {
					localStorage.removeItem('fullCarConfig')
					parseSavedValue()
					savedConfigItems.textContent = 'No saved config'
				}
				showInfoMessage('successfully deleted', 'ok')
			}
		})
	}
	deleteConfig()

	function openSavedConfig() {
		const savedConfig = document.querySelector('.saved-config')
		const savedConfigButton = document.querySelector('.saved-config__button')
		savedConfigButton.addEventListener('click', () => {
			savedConfig.classList.toggle('show')
		})
	}
	openSavedConfig()

	function parseSavedValue() {
		const savedConfigCtems = document.querySelector('.saved-config__items')
		const savedConfigSum = document.querySelector('.saved-config__sum')
		savedConfigSum.textContent = '0'
		savedConfigSum.textContent = savedConfigCtems.childElementCount
	}
	parseSavedValue()

	function isEqual(object1, object2) {
		const props1 = Object.getOwnPropertyNames(object1)
		const props2 = Object.getOwnPropertyNames(object2)

		if (props1.length !== props2.length) {
			return false
		}

		for (let i = 0; i < props1.length; i += 1) {
			const prop = props1[i]
			const bothAreObjects = typeof object1[prop] === 'object' && typeof object2[prop] === 'object'

			if ((!bothAreObjects && object1[prop] !== object2[prop]) || (bothAreObjects && !isEqual(object1[prop], object2[prop]))) {
				return false
			}
		}

		return true
	}
}

export default saveConfig
