export function getElement(selector) {
    return document.querySelector(selector);
}
export const searchContainer = getElement(".search--container");
export const btnSearchBasic = getElement(".search--basic");
export const btnSearchAdvanced = getElement(".search--advanced");
export const formBasic = getElement(".search--basic-form");
export const btnBasicSubmit = getElement(".basic--submit");
export const formAdvanced = getElement(".search--advanced-form");
export const gridView = getElement(".employee-grid");
export const listView = getElement(".employee-menu");
export const btnViewGrid = getElement(".view--grid");
export const btnViewList = getElement(".view--menu");
export const gridIcon = getElement(".grid--icon");
export const listIcon = getElement(".menu--icon");
export const container = getElement(".grid-container");
export let searchName = getElement(".basic-form--name");
export let searchLast = getElement(".basic-form--last");
export let searchFull = getElement(".basic-form--full");
export let searchID = getElement(".input-id");
export const btnHeader = getElement(".header--heading");
export const loggedIn = getElement(".header--logged-in");
export const btnLogOff = getElement(".header--logoff");
export const wholePage = getElement(".whole--page");
export const notFound = getElement(".nothing--found");
export const btnGoBack = getElement(".go-back");
export const emailInput = getElement(".email--input");
export const passwordInput = getElement(".password--input");
export const btnSignIn = getElement(".btn--sign-in");
export const btnHeaderSignUp = getElement(".header--sign-up-btn");
export const btnHeaderSignIn = getElement(".header--sign-in-btn");
export const errorMessage = getElement(".error--message");
export const signIn = getElement(".form--sign-in");
export const rememberMe = getElement(".remember-me--check");
export const copyUserLink = getElement(".avatar-section--copy");
export const signUpForm = getElement(".form--sign-up");
export const signUpFirstName = getElement(".signup--first-name");
export const signUpLastName = getElement(".signup--last-name");
export const signUpEmail = getElement(".signup--email");
export const signUpPassword = getElement(".signup--password");
export const signUpError = getElement(".signup--error");
export function toggleForms(showBasic) {
    formBasic.classList.toggle("hidden", !showBasic);
    formAdvanced.classList.toggle("hidden", showBasic);
    btnSearchBasic.classList.toggle("active", showBasic);
    btnSearchAdvanced.classList.toggle("active", !showBasic);
}
export function toggleViews(showGrid) {
    gridView.classList.toggle("hidden", !showGrid);
    listView.classList.toggle("hidden", showGrid);
    listIcon.classList.toggle("clicked", !showGrid);
    gridIcon.classList.toggle("clicked", showGrid);
}
export function togglePage(showPage) {
    notFound.classList.toggle("hidden", showPage);
    wholePage.classList.toggle("hidden", !showPage);
}
export function switchPages(page) {
    window.location.href = page;
}
export function toggleSign(showSignIn) {
    signIn.classList.toggle("hidden", !showSignIn);
    signUpForm.classList.toggle("hidden", showSignIn);
    btnHeaderSignIn.classList.toggle("hidden", showSignIn);
    btnHeaderSignUp.classList.toggle("hidden", !showSignIn);
}
//# sourceMappingURL=dom.js.map