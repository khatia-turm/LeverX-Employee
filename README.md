# fix

- in AvatarSection.tsx move button to reusable components
  - always providewidth and height. also weird class name for the image, better create reusable Icon component, also no alt (avatar-section\_\_link?)
- DetailRow.tsx - add reusable input components
- EmployeeEdtForm.tsx move validateForm in helpers
- EmployeeView.tsx can be optimized to render sections with rows using proper data format and using .map() to avoid code duplication
  (implement Section component and pass the fields via props)
- avoid creating components inside components
- EmployeeHeader.tsx don't use inline svg, cleate single component for maintaining all the icons
- Main.tsx filtering should be done on BE?
  - handling for {loading, error}
  - pass search to the query args and make it filter on BE ?
- styles are off?

# BUGS

- search on main shouldn't open details page. it's supposed to search and show filtered results in the list
- sign in/up should be route, using root route rn T-T seperate routes for each

# CRITICAL BUGS

- email is not trimmed during sign in ✔️
- the sign in error message has [object Object]? what ✔️
- after signup all users removed? ✔️
- invalid data date in details page ✔️

## launching

npm run dev {runs script for webpack}
BE port is 3000, and file is in server/server.js (node server.js)

## homework 4 fixees

- **Add route protection** - Check Admin role in roles.ts before allowing page access ✔️
- **Complete edit functionality** - Add first name, last name, and native name fields to edit form ✔️
- **Fix visa editing** - Add `name` attributes to visa inputs and ensure they're collected in form submission
- **Remove console statements** - Clean up debug code or implement proper logging ✔️
- **Improve type safety** - Replace `any` types with proper TypeScript types ✔️
- **Add input validation** - Validate form inputs before sending requests ✔️
- **Extract duplicated code** - Create utility function for getting logged-in user ✔️
- **Fix manager display bug** - Correct string concatenation on line 144 ✔️
- [ ] **Standardize error handling** - Use consistent error handling pattern throughout ✔️
- **Update SCSS syntax** - Migrate from `@import` to `@use`/`@forward`✔️

## homewrok 5 fixes

- pending MR

###

password for users are password${id}
admin is anno.hideaki@leverx.com (password11)
