gomb.addEventListener("click", async (e) => {
	if (ans.classList.contains("seen")) {
		ans.classList.toggle("seen");
	}

	let szervervalasz_szotar = await olvaso_fetch("https://yesno.wtf/api");

	ans.src = szervervalasz_szotar["image"];
	ans.alt = szervervalasz_szotar["answer"];
});

async function olvaso_fetch(url) {
	const response = await fetch(url);
	const json_promise = await response.json();
	return json_promise;
}

darkmode.addEventListener("click", () => {
	document.body.classList.toggle("dark-mode");
});


