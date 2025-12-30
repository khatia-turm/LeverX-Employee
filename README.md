# implemented

Add RTK to your existing project

1. Prepare project: ✔️
   a) Install RTK. ✔️
   b) Configure store, reducers, slices and middleware (if needed). ✔️
2. Refactor project architecture: ✔️
   a) Move all necessary data to the store. ✔️
   b) Instead of using fetch API and XmlHttpRequest use RTK Query. ✔️

### Tasks:

3. Resolve all of the bugs and comments from previous MRs.
4. Add Detailed README file. ✔️
5. Integrate linter into the project. ✔️
6. Iron out the code ( refactor and improve it ) ✔️

### advanced

1. Complete all Advanced features (If you haven’t done it yet). ✔️✖️ (partially)
2. Implement transitions all-over the app. ✔️
3. Deploy your app. ✖️

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
- [ ] **Standardize error handling** - Use consistent error handling pattern throughout ✔️✖️
- **Update SCSS syntax** - Migrate from `@import` to `@use`/`@forward`✔️

## homewrok 5 fixes

- pending MR

###

password for users are password${id}
admin is anno.hideaki@leverx.com (password11)
