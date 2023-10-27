const infoMessages = document.querySelector(".info-messages");
const infoMessagesBody = document.querySelector(".info-messages__body");

function showInfoMessage(message, status) {
	const ok = "ok.svg";
	const error = "error.svg";

	infoMessages.classList.add("show");
	infoMessagesBody.innerHTML = `
	<div class="info-messages__img">
		<div class="info-messages__img-container">
			<img src="./images/dist/${status === "ok" ? ok : error}" alt="${message}">
		</div>
		</div>
		<div class="info-messages__message">
			<span>${message}</span>
		</div>
	`;

	setTimeout(() => {
		infoMessages.classList.remove("show");
		infoMessagesBody.textContent = "";
	}, 3000);
}

export default showInfoMessage;
