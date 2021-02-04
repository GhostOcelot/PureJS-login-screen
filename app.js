import { route } from "./router"

let username

route("/", "login", function () {
	this.where = "here"
	this.$on(".auth-form", "submit", e => {
		e.preventDefault()
		const usernameInput = document.querySelector(".auth-username")
		const passwordInput = document.querySelector(".auth-password")
		const warning = document.querySelector(".warning")
		if (usernameInput.value && passwordInput.value) {
			fetch("https://zwzt-zadanie.netlify.app/api/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ username: usernameInput.value, password: passwordInput.value }),
			})
				.then(response => response.json())
				.then(data => {
					console.log(data)
					if (data.error) {
						warning.textContent = data.message
						warning.style.visibility = "visible"
					} else {
						warning.textContent = "."
						warning.style.visibility = "hidden"
						username = usernameInput.value
						window.location.href = "#/success"
					}
				})
		} else {
			warning.textContent = "Please fill username and password fields"
			warning.style.visibility = "visible"
		}
	})
})

route("/success", "success", function () {
	this.title = username ? `Welcome, ${username}!` : "Welcome!"
	this.$on(".home-btn", "click", () => (window.location.href = "#"))
})

route("*", "404", function () {
	this.$on(".home-btn", "click", () => (window.location.href = "#"))
})
