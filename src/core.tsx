import { IEmployee, IDateOfBirth } from "./types/type";

// getting logged in user
export const getLoggedInUser = (users: IEmployee[]): IEmployee | undefined => {
  const loggedEmail =
    localStorage.getItem("loggedInUser") ||
    sessionStorage.getItem("loggedInUser");
  return users.find((u) => u.email === loggedEmail);
};

export function canEdit(
  loggedIn: IEmployee | undefined,
  target: IEmployee
): boolean {
  if (!loggedIn) return false;

  return loggedIn.role === "Admin" || loggedIn._id === target.manager?._id;
}

export function formatDateOfBirth(
  date: IDateOfBirth | null | undefined
): string {
  if (!date) return "no date";
  if (!date.year || !date.month || !date.day) {
    return "invalid date data";
  }
  const dat = new Date(date.year, date.month - 1, date.day);
  return dat.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
