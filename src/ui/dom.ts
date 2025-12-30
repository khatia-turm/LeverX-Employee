export function getElement<T extends HTMLElement>(selector: string): T {
  return document.querySelector(selector) as T;
}

export const searchContainer = getElement<HTMLElement>(".search--container");
export const btnSearchBasic = getElement<HTMLElement>(".search--basic");
export const btnSearchAdvanced = getElement<HTMLElement>(".search--advanced");
export const formBasic = getElement<HTMLElement>(".search--basic-form");
export const btnBasicSubmit = getElement<HTMLElement>(".basic--submit");
export const formAdvanced = getElement<HTMLElement>(".search--advanced-form");

export const gridView = getElement<HTMLElement>(".employee-grid");
export const listView = getElement<HTMLElement>(".employee-menu");
export const btnViewGrid = getElement<HTMLElement>(".view--grid");
export const btnViewList = getElement<HTMLElement>(".view--menu");
export const gridIcon = getElement<HTMLElement>(".grid--icon");
export const listIcon = getElement<HTMLElement>(".menu--icon");
export const container = getElement<HTMLElement>(".grid-container");

export let searchName = getElement<HTMLInputElement>(".basic-form--name");
export let searchLast = getElement<HTMLInputElement>(".basic-form--last");
export let searchFull = getElement<HTMLInputElement>(".basic-form--full");
export let searchID = getElement<HTMLInputElement>(".input-id");

export const btnHeader = getElement<HTMLElement>(".header--heading");
export const loggedIn = getElement<HTMLElement>(".header--logged-in");
export const btnLogOff = getElement<HTMLElement>(".header--logoff");

export const wholePage = getElement<HTMLElement>(".whole--page");
export const notFound = getElement<HTMLElement>(".nothing--found");
export const btnGoBack = getElement<HTMLElement>(".go-back");

export const emailInput = getElement<HTMLInputElement>(".email--input");
export const passwordInput = getElement<HTMLInputElement>(".password--input");
export const btnSignIn = getElement<HTMLElement>(".btn--sign-in");
export const btnHeaderSignUp = getElement<HTMLElement>(".header--sign-up-btn");
export const btnHeaderSignIn = getElement<HTMLElement>(".header--sign-in-btn");
export const errorMessage = getElement<HTMLElement>(".error--message");
export const signIn = getElement<HTMLElement>(".form--sign-in");
export const rememberMe = getElement<HTMLInputElement>(".remember-me--check");

export const copyUserLink = getElement<HTMLElement>(".avatar-section--copy");

export const signUpForm = getElement<HTMLElement>(".form--sign-up");
export const signUpFirstName = getElement<HTMLInputElement>(
  ".signup--first-name"
);
export const signUpLastName =
  getElement<HTMLInputElement>(".signup--last-name");
export const signUpEmail = getElement<HTMLInputElement>(".signup--email");
export const signUpPassword = getElement<HTMLInputElement>(".signup--password");
export const signUpError = getElement<HTMLElement>(".signup--error");
export function toggleForms(showBasic: boolean): void {
  formBasic.classList.toggle("hidden", !showBasic);
  formAdvanced.classList.toggle("hidden", showBasic);
  btnSearchBasic.classList.toggle("active", showBasic);
  btnSearchAdvanced.classList.toggle("active", !showBasic);
}

export function toggleViews(showGrid: boolean): void {
  gridView.classList.toggle("hidden", !showGrid);
  listView.classList.toggle("hidden", showGrid);
  listIcon.classList.toggle("clicked", !showGrid);
  gridIcon.classList.toggle("clicked", showGrid);
}

export function togglePage(showPage: boolean): void {
  notFound.classList.toggle("hidden", showPage);
  wholePage.classList.toggle("hidden", !showPage);
}

export function switchPages(page: string): void {
  window.location.href = page;
}

export function toggleSign(showSignIn: boolean): void {
  signIn.classList.toggle("hidden", !showSignIn);
  signUpForm.classList.toggle("hidden", showSignIn);
  btnHeaderSignIn.classList.toggle("hidden", showSignIn);
  btnHeaderSignUp.classList.toggle("hidden", !showSignIn);
}
