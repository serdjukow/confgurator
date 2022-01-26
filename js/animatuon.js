const pageAnimation = () => {
	function carPanelAnimation() {
		const carPanelItems = document.querySelectorAll('.car-panel__item')
		carPanelItems.forEach(item => {
			item.querySelector('.progress-ring').style.strokeDashoffset = getOffset(100)
			item.querySelector('.percent-block__item').style.top = `-${percentToTop(100)}px`
		})
		setTimeout(updateData, 1000)
	}
	carPanelAnimation()

	const carAnimation = () => {
		const catParts = document.querySelectorAll('.part')
		catParts.forEach((item, index) => {
			if (item.dataset.parts) {
				setTimeout(() => {
					item.classList.add('active')
					if (catParts.length - 1 == index) {
						clearAnimation()
					}
				}, index * 200)
			}
		})
	}
	carAnimation()

	const clearAnimation = () => {
		const catParts = document.querySelectorAll('.part')
		catParts.forEach((item, index) => {
			if (item.dataset.parts) {
				setTimeout(() => {
					checkPercentValue(item.dataset.parts)
				}, index * 200)
			}
		})
	}

	const animateButton = document.getElementById('animation')
	animateButton.addEventListener('click', () => {
		carPanelAnimation()
		carAnimation()
		totalValueAnimation()
	})

	function totalValueAnimation() {
		const totalValueProgress = document.querySelector('.total-value__progress')
		const currentTotalValue = document.querySelector('.total-value__curretnt-value')
		totalValueProgress.style.width = `100%`
		currentTotalValue.textContent = `100%`
	}
	totalValueAnimation()
}

document.addEventListener('DOMContentLoaded', pageAnimation)
