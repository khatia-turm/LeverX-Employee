import { IEmployee } from "../types/type.js";
import {
  btnSearchBasic,
  btnSearchAdvanced,
  btnViewGrid,
  btnViewList,
  btnBasicSubmit,
  loggedIn,
  btnHeader,
  container,
  btnGoBack,
  searchName,
  searchID,
  searchFull,
  searchLast,
  toggleForms,
  toggleViews,
  switchPages,
  togglePage,
  btnLogOff,
} from "../ui/dom.js";
import {
  renderUserBasicGrid,
  renderUserBasicList,
  renderHeaderLoggedIn,
} from "../ui/render.js";
import { logOff } from "../core/auth.js";
import { loadUserDetails } from "./details.js";
// /* declaring users array so i can use it throughout the code
// otherwise, since function is async, it will be undefined */
export let users: IEmployee[] = [];
// testing;
async function getUsers(): Promise<void> {
  try {
    const response = await fetch("http://localhost:3000/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) throw new Error("response was not loaded");

    users = await response.json();
    const loggedEmail =
      localStorage.getItem("loggedInUser") ||
      sessionStorage.getItem("loggedInUser");
    const loggedUser = users.find((u) => u.email === loggedEmail);
    if (loggedUser) renderHeaderLoggedIn(loggedUser);

    if (window.location.pathname.endsWith("userDetails.html")) {
      loadUserDetails();
    } else {
      initApp();
    }
  } catch (error) {
    console.error("messed up", error);
  }
}

/*initializes the app with all the methods that use data array */
function initApp(): void {
  users.forEach((u) => {
    renderUserBasicGrid(u);
    renderUserBasicList(u);
  });
}

getUsers();
btnSearchBasic?.addEventListener("click", () => toggleForms(true));
btnSearchAdvanced?.addEventListener("click", () => toggleForms(false));

btnViewGrid?.addEventListener("click", () => toggleViews(true));
btnViewList?.addEventListener("click", () => toggleViews(false));

btnBasicSubmit?.addEventListener("click", (e: Event) => {
  e.preventDefault();
  handleUserSearch();
});

loggedIn?.addEventListener("click", () => {
  const userId = loggedIn.dataset.id;
  if (!userId) return;

  switchPages(`userDetails.html?id=${userId}`);
});

// // interactive header

btnHeader?.addEventListener("click", () => switchPages("main.html"));

// // click on user in list opens its details page

container?.addEventListener("click", (e: Event) => {
  const target = e.target as HTMLElement;
  const clicked = target.closest(".employee-item") as HTMLElement;
  //  e.target.closest doesn't work fsr
  if (clicked) {
    // neither does dataset?
    const clickedId = clicked.dataset.id;
    switchPages(`userDetails.html?id=${clickedId}`);
  }
});

btnGoBack?.addEventListener("click", () => togglePage(true));

// // IMPLEMENTING BASIC SEARCH

function handleUserSearch(): void {
  const firstName = searchName?.value.trim().toLowerCase();
  const lastName = searchLast?.value.trim().toLowerCase();
  const fullName = searchFull?.value.trim().toLowerCase();
  const id = searchID?.value.trim();
  if (!firstName && !lastName && !fullName && !id) {
    return;
  }

  [searchName, searchLast, searchFull, searchID].forEach((i) => (i.value = ""));

  const user = users.find((u) => {
    const uFull = `${u.first_name} ${u.last_name}`.toLocaleLowerCase();
    return (
      String(u._id) === id ||
      u.first_name.toLowerCase() === firstName ||
      u.last_name.toLowerCase() === lastName ||
      uFull.includes(fullName)
    );
  });
  if (!user) {
    togglePage(false);
  } else switchPages(`userDetails.html?id=${user._id}`);
  // window.location.href = `userDetails.html?id=${user._id}`;
}

btnLogOff?.addEventListener("click", () => logOff());
