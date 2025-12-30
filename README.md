# implementations

1. prepare project

- install TypeScript globally ✔️
- configure typescript ✔️
- refactor all JS code into TS ✔️

2. create sign in HTML page:

- sign in form with email and password fiels ✔️
- design of the page ✔️

3. implement sign in functionality

   installing npm backend dependencies
   npm install bcrypt

# running the program

- front end is on live-server of vsc extension
- back end is on port 3000

to run backend server, run in terminal

- node server.js
- typescript runs with tsc

- database is simply lowDB with employees array (full details), authUsers with hashed passwords + emails, that one is used to sign in,
  first one to display details

# User passwords

hashed passwords are password1, and number changes on id
id=2, password=password2

### protection of pages is a mess

- I couldn't route html pages better, with user story a
  ((1) When the application is opened, the unauthenticated user sees the sign-in page
  with sign-in form.), I did that just by naming it index.html
- there is routes I tried to apply, but it doesn't seem to work

## notes

### sign up

- i did implement server endpoint, and all the functions needed
- there is a bug, won't redirect me to main page
- unfortonutely I don't have enough time to solve it T-T

### remember me

- user is saved into sessionStorage if RememberMe is not checked
- if it is, then into localStorage
- hopefully that's what those user stories meant
  { 3) After successful authentication, the system will remember the user as long as
  the browser tab remains open.,
  1. Implement "Remember Me" Functionality:
     a) Add "Remember Me" checkbox to the Sign-In form
     b) After successful authentication, the system should “Remember” the user
     forever.

}

### overview bugs

- ✔️ search doesn't work and opens 404
- ❓basic search should have single input,
  it still has few inputs, but it works if any field is filled correctly
- ✔️no underline to highlight active search tab
- ✔️ no cursor pointer for clickable areas
- ✔️weird clickable area of address book link
- ? selects are empty
- ✔️remote badge is not visible on the list
- ❓no :hover effects (partially fixed, for next hw)
