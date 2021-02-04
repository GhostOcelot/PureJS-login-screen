import { route } from "./router"

let username

route("/", "login", function () {
	this.where = "here"
	this.$on(".auth-form", "submit", e => {
		e.preventDefault()
		const usernameInput = document.querySelector(".auth-username")
		const passwordInput = document.querySelector(".auth-password")
		if (usernameInput.value && passwordInput.value) {
			fetch("https://zwzt-zadanie.netlify.app/api/login", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ username: usernameInput.value, password: passwordInput.value }),
			})
				.then(response => response.json())
				.then(data => {
					if (data.error) {
						console.log(data)
						document.querySelector(".warning").textContent = data.message
						document.querySelector(".warning").style.visibility = "visible"
					} else {
						document.querySelector(".warning").textContent = "."
						document.querySelector(".warning").style.visibility = "hidden"
						username = usernameInput.value
						window.location.href = "#/success"
					}
				})
		} else {
			document.querySelector(".warning").textContent = "Please fill username and password fields"
			document.querySelector(".warning").style.visibility = "visible"
		}
	})
})

route("/success", "success", function () {
	this.title = username ? `Welcome, ${username}!` : "Welcome!"
})

route("*", "404", function () {})
