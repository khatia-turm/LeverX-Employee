export function route(e) {
    e.preventDefault();
    const target = e.target;
    if (!target)
        return;
    window.history.pushState({}, "", target.href);
}
window.route = route;
//# sourceMappingURL=route.js.map