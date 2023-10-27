import modalWindow from "../custom-modal/base.js";
import "../custom-modal/plugins/confirm.js";
import "../custom-modal/plugins/modal.js";

console.log(window);

const showSavedConfig = () => {
	const savedConfigItem = document.querySelectorAll('.saved-config__item')



const priceModal = modalWindow.modal({
	title: "Цена на Товар",
	closable: true,
	width: "400px",
	footerButtons: [
		{
			text: "Закрыть",
			type: "primary",
			handler() {
				priceModal.close();
			},
		},
	],
});

document.addEventListener("click", (event) => {
	event.preventDefault();
	const btnType = event.target.dataset.btn;
	const id = +event.target.dataset.id;
	//	const fruit = fruits.find(f => f.id === id)
	if (btnType === "price") {
		priceModal.setContent(`
      <p>Цена на Title: <strong>Price</strong></p>
    `);
		priceModal.open();
	} else if (btnType === "remove") {
		modalWindow
			.confirm({
				title: "Вы уверены?",
				content: `<p>Вы удаляете фрукт: <strong>Title</strong></p>`,
			})
			.then(() => {
				//	fruits = fruits.filter(f => f.id !== id)
				//render()
				console.log("render");
			})
			.catch(() => {
				console.log("Cancel");
			});
	}
});

	
}

export default showSavedConfig