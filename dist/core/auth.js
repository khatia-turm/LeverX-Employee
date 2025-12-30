import { errorMessage, switchPages, loggedIn, rememberMe, signUpError, } from "../ui/dom.js";
export async function sendSignInRequest(email, password) {
    if (!email || !password) {
        errorMessage.textContent = "Please enter both email and password";
        errorMessage?.classList.remove("hidden");
        return;
    }
    errorMessage?.classList.add("hidden");
    try {
        const response = await fetch("http://localhost:3000/sign-in", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });
        if (!response.ok) {
            errorMessage.textContent = "Invalid email or password";
            errorMessage?.classList.remove("hidden");
            return;
        }
        if (rememberMe.checked) {
            localStorage.setItem("loggedInUser", email);
        }
        else {
            sessionStorage.setItem("loggedInUser", email);
        }
        if (!loggedIn)
            switchPages("index.html");
        switchPages("../html/main.html");
    }
    catch (error) {
        console.error("Error during sign-in:", error);
        errorMessage.textContent = "An error occurred. Please try again later.";
        errorMessage?.classList.remove("hidden");
    }
}
export async function sendSignUpRequest(first_name, last_name, email, password) {
    try {
        const res = await fetch("http://localhost:3000/sign-up", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ first_name, last_name, email, password }),
        });
        const data = await res.json();
        if (!res.ok) {
            signUpError.textContent = "Sign up failed";
            signUpError.classList.remove("hidden");
            return;
        }
        if (rememberMe.checked) {
            localStorage.setItem("loggedInUser", email);
        }
        else {
            sessionStorage.setItem("loggedInUser", email);
        }
        switchPages("../html/main.html");
    }
    catch {
        signUpError.textContent = "An error occurred during signup.";
        signUpError.classList.remove("hidden");
    }
}
export function checkLoggedIn() {
    const loggedInUser = localStorage.getItem("loggedInUser") ||
        sessionStorage.getItem("loggedInUser");
    if (loggedInUser) {
        if (!loggedIn)
            switchPages("index.html");
        switchPages("../html/main.html");
    }
    else {
        switchPages("index.html");
    }
}
export function logOff() {
    localStorage.removeItem("loggedInUser");
    sessionStorage.removeItem("loggedInUser");
    switchPages("../index.html");
}
//# sourceMappingURL=auth.js.map