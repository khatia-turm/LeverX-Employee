import { sendSignInRequest, sendSignUpRequest } from "../core/auth.js";
import {
  signIn,
  emailInput,
  passwordInput,
  btnHeaderSignUp,
  toggleSign,
  btnHeaderSignIn,
  signUpForm,
  signUpFirstName,
  signUpLastName,
  signUpEmail,
  signUpPassword,
} from "../ui/dom.js";

signIn?.addEventListener("submit", async (e: Event) => {
  e.preventDefault();

  const email = emailInput?.value.trim();
  const password = passwordInput?.value.trim();

  await sendSignInRequest(email, password);
});

btnHeaderSignUp?.addEventListener("click", () => {
  toggleSign(false);
});

btnHeaderSignIn?.addEventListener("click", () => {
  toggleSign(true);
});

signIn?.addEventListener("submit", async (e: Event) => {
  e.preventDefault();

  const email = emailInput?.value.trim();
  const password = passwordInput?.value.trim();

  await sendSignInRequest(email, password);
});

signUpForm?.addEventListener("submit", async (e: Event) => {
  e.preventDefault();
  const first_name = signUpFirstName?.value.trim();
  const last_name = signUpLastName?.value.trim();
  const email = signUpEmail?.value.trim();
  const password = signUpPassword?.value.trim();
  await sendSignUpRequest(first_name, last_name, email, password);
});
