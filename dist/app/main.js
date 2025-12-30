import { btnSearchBasic, btnSearchAdvanced, btnViewGrid, btnViewList, btnBasicSubmit, loggedIn, btnHeader, container, btnGoBack, searchName, searchID, searchFull, searchLast, toggleForms, toggleViews, switchPages, togglePage, btnLogOff, } from "../ui/dom.js";
import { renderUserBasicGrid, renderUserBasicList, renderHeaderLoggedIn, } from "../ui/render.js";
import { logOff } from "../core/auth.js";
import { loadUserDetails } from "./details.js";
export let users = [];
async function getUsers() {
    try {
        const response = await fetch("http://localhost:3000/users", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok)
            throw new Error("response was not loaded");
        users = await response.json();
        const loggedEmail = localStorage.getItem("loggedInUser") ||
            sessionStorage.getItem("loggedInUser");
        const loggedUser = users.find((u) => u.email === loggedEmail);
        if (loggedUser)
            renderHeaderLoggedIn(loggedUser);
        if (window.location.pathname.endsWith("userDetails.html")) {
            loadUserDetails();
        }
        else {
            initApp();
        }
    }
    catch (error) {
        console.error("messed up", error);
    }
}
function initApp() {
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
btnBasicSubmit?.addEventListener("click", (e) => {
    e.preventDefault();
    handleUserSearch();
});
loggedIn?.addEventListener("click", () => {
    const userId = loggedIn.dataset.id;
    if (!userId)
        return;
    switchPages(`userDetails.html?id=${userId}`);
});
btnHeader?.addEventListener("click", () => switchPages("main.html"));
container?.addEventListener("click", (e) => {
    const target = e.target;
    const clicked = target.closest(".employee-item");
    if (clicked) {
        const clickedId = clicked.dataset.id;
        switchPages(`userDetails.html?id=${clickedId}`);
    }
});
btnGoBack?.addEventListener("click", () => togglePage(true));
function handleUserSearch() {
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
        return (String(u._id) === id ||
            u.first_name.toLowerCase() === firstName ||
            u.last_name.toLowerCase() === lastName ||
            uFull.includes(fullName));
    });
    if (!user) {
        togglePage(false);
    }
    else
        switchPages(`userDetails.html?id=${user._id}`);
}
btnLogOff?.addEventListener("click", () => logOff());
//# sourceMappingURL=main.js.map