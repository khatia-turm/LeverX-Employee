import { IEmployee, IDateOfBirth, IVisa } from "../types/type.js";
import { gridView, listView, getElement } from "./dom.js";

// RENDERING USERS
export function renderUserBasicGrid(user: IEmployee): void {
  let html = `
        <div class="employee-ind employee-item" data-id="${user._id}">
        <div class="wrapper">  
        <img
            src="../${user.user_avatar}"
            alt="${user.first_name}"
            class="employee-grid--img"
          />${
            user.isRemoteWork
              ? `<div class="home-box">
              <img src="../svgs/home-icon.svg" alt="home icon" class="avatar-section--home"/>
            </div>`
              : ""
          }</div>
          <p class="employee-grid--name">${user.first_name} ${
    user.last_name
  }</p>
          <span class="border"></span>
          <div class="employee--flex-container">
            <div class="employee--flex-item">
              <img src="../svgs/briefcase-icon.svg" alt="briefcase icon" class="employee--icon"/>
              <p class="employee-grid-job">${user.department}</p>
            </div>
            <div class="employee--flex-item">
              <img src="../svgs/door-icon.svg" alt="door-icon" class="employee--icon"/>
              <p class="employee-grid-job">${user.room}</p>
            </div>

        </div>
  `;

  gridView?.insertAdjacentHTML("beforeend", html);
}

export function renderUserBasicList(user: IEmployee): void {
  let html = `
        <div class="employee-row employee-item" data-id="${user._id}">
        <div class="wrapper">  
        <img
            src="../${user.user_avatar}"
            alt="${user.first_name}"
            class="employee-menu--img"
          />${
            user.isRemoteWork
              ? `<div class="home-box">
              <img src="../svgs/home-icon.svg" alt="home icon" class="home-icon-list"/>
            </div>`
              : ""
          }</div>
          <p class="employee-menu--name">${user.first_name} ${
    user.last_name
  }</p>
          <p class="employee-menu--department">${user.department}</p>
          <p class="employee-menu--room">${user.room}</p>
        </div>`;

  listView?.insertAdjacentHTML("beforeend", html);
}

// // refactoring displayDetailedUser to remove duplicate code
export function formatDateOfBirth(date: IDateOfBirth): string {
  const dat = new Date(date.year, date.month - 1, date.day);
  return dat.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function createRow(
  icon: string,
  label: string,
  value: string,
  isLink: boolean = false
): string {
  const content = isLink
    ? `<strong><a href="${value}>${value}</a></strong>`
    : `<p><strong>${value}</strong></p>`;
  return `
    <div class="details-section--row">
      <div class="flex--horizontal">
        <img src="../svgs/${icon}" class="details-section-icon" alt="${label} icon"/>
        <p>${label}:</p>
      </div>
      ${content}
    </div>
  `;
}

export function createVisaRows(visas: IVisa[]): string {
  if (!Array.isArray(visas) || visas.length === 0)
    return createRow("calendar-icon.svg", "Visa", "-");

  const now = Date.now();
  return visas
    .map((v, index) => {
      const start = new Date(v.start_date).toLocaleDateString(undefined, {
        day: "numeric",
        month: "short",
        year: "numeric",
      });

      const end = new Date(v.end_date).toLocaleDateString(undefined, {
        day: "numeric",
        month: "short",
        year: "numeric",
      });

      const expired = v.end_date < now ? " (expired)" : "";

      const visaRow = createRow(
        "visa-icon.svg",
        `Visa ${index + 1}`,
        `${v.issuing_country} - ${v.type}`
      );

      const dateRow = createRow(
        "calendar-icon.svg",
        `Visa ${index + 1} ${expired}`,
        `${start} / ${end}`
      );

      return visaRow + dateRow;
    })
    .join("");
}

export function displayDetailedUser(user: IEmployee): void {
  const userDetails = getElement<HTMLElement>(".user--details");
  let html = `
    <div class="avatar-section">
    <div class="wrapper">
      <img src="../${
        user.user_avatar
      }" alt="employee" class="avatar-section--img"/>
      ${
        user.isRemoteWork
          ? `<div class="home-box">
              <img src="../svgs/home-icon.svg" alt="home icon" class="avatar-section--home"/>
            </div>`
          : ""
      } </div>
      <h3 class="avatar-section--full">${user.first_name} ${user.last_name}</h3>
      <p class="avatar-section--native">${user.first_native_name} ${
    user.middle_native_name
  } ${user.last_native_name}</p>

      <button class="flex--horizontal avatar-section--copy">
        <img src="../svgs/link-icon.svg" class="avatar-section--link">
        <p>Copy link</p>
      </button>

      <button class="avatar-section--edit">
        <div class="flex--horizontal">
          <img src="../svgs/edit-icon.svg" alt="edit icon" class="avatar-section--edit-icon icon"/>
          <p>edit</p>
        </div>
      </button>
    </div>

    <div class="details-section">
      <h2 class="details-section--general">General Info</h2>
    ${createRow("briefcase-icon.svg", "Department", user.department)}
    ${createRow("building-icon.svg", "Building", user.building)}
    ${createRow("door-icon.svg", "Room", user.room)}
    ${createRow("hashtag-icon.svg", "Desk Number", user.desk_number.toString())}
    ${createRow(
      "calendar-icon.svg",
      "Date Of Birth",
      formatDateOfBirth(user.date_birth)
    )}
    ${createRow(
      "user-icon.svg",
      "Manager",
      `${user.manager.first_name} ${user.manager.last_name}`
    )}

      <h2 class="details-section--general">Contacts</h2>
      ${createRow("mobile-icon.svg", "Mobile Phone", user.phone)}
      ${createRow("at-icon.svg", "Email", user.email)}
      ${createRow("zoom-icon.svg", "Zoom ID", user.zoom_id)}
      ${createRow("zoom-icon.svg", "Zoom Link", user.zoom_link)}

      <h2 class="details-section--general">Travel Info</h2>
      ${createRow("globe-icon.svg", "Citizenship", user.citizenship)}
      ${createVisaRows(user.visa)}
      `;
  userDetails.innerHTML = html;
  const copyUserLink = getElement<HTMLElement>(".avatar-section--copy");

  copyUserLink?.addEventListener("click", () => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (!loggedInUser) return;
    navigator.clipboard.writeText(window.location.href);
  });
}

export function renderHeaderLoggedIn(user: IEmployee): void {
  let html = `
        <button
          class="flex--horizontal header--logged-in"
          data-id="${user._id}"
        >
          <img src="../${user.user_avatar}"
            alt="employee ${user.first_name}"
            class="header--employee-img"
          />

          <p class="header--employee">${user.first_name} ${user.last_name}</p>
        </button>
  `;
  const headerUser = getElement<HTMLElement>(".header--user");

  headerUser.insertAdjacentHTML("afterbegin", html);
}
