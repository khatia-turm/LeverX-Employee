import { togglePage } from "../ui/dom.js";
import { displayDetailedUser } from "../ui/render.js";
import { users } from "./main.js";
export function loadUserDetails() {
    const par = new URLSearchParams(window.location.search);
    const userId = par.get("id");
    if (!userId)
        return;
    const user = users.find((u) => String(u._id) === String(userId));
    if (!user) {
        togglePage(false);
    }
    else {
        displayDetailedUser(user);
    }
}
//# sourceMappingURL=details.js.map