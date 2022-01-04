# Single Sign-On (SSO)

Single sign-on (SSO) is an authentication scheme that allows a user to log in with a single ID and password to any of several related, yet independent, software systems.

---

## SSO Progress:

If a user visits an `consumer` or `user module`-protected service (`foo.sso.example.com`) and does not have a session cookie, they are redirected to `sso-auth` (`sso-auth.example.com`).
   - If the user **does not** have a session cookie for `sso-auth`,
     they are prompted to log in via the `sso-auth`, and then
     redirected back to `consumer` or `user module` (according to their user role) where they will now be logged in (to
     `foo.sso.example.com`)
   - If the user *does* have a session cookie for `sso-auth` (e.g. they
     have already logged into `bar.sso.example.com`), they are
     transparently redirected back to `consumer` where they will be logged in,
     without needing to go through the `sso-auth`

![ Project Schema ]( https://i.imgur.com/X9W9n1B.png )

---

## Tech

- MySQL
- Node.js Restful API
- Log4js
- React
- Mocha.js & Chai.js

---

## Screenshots

#### SSO Auth Login Page

![ SSO Auth Login Page ]( https://i.imgur.com/K1y6uz9.png )

#### Consumer Page

![ Consumer Page ]( https://i.imgur.com/YrFkthU.png )

#### User Module Admin Panel

![ User Module Admin Panel ]( https://i.imgur.com/WLwFwVI.png )

#### In Action

![ Display Text ]( https://i.gyazo.com/e61c6368946414eed0418d6ff7c16c8f.gif )

## Installation & Configuration

#### - Clone Project

```bash
git clone repo clone Alotech-Bootcamp-Grad-Project-Group-1/Alotech-FullStack-Bootcamp-Graduation-Project-Group-1
```

#### - Install dependencies in:

- SsoAuth client
- SsoAuth server
- SsoConsumer client
- UserModule client
- UserModule server

#### - Set Environment Variables

`SALT_PASS` & `JWT_SECRET` in:

- SsoAuth server
- UserModule server

#### - Import database.ddl to mysql

#### - Start Servers using concurrently

- 1st terminal:
```bash
  cd SsoAuth
  npm start
```

- 2nd terminal
```bash
  cd SsoConsumer
  cd client
  npm start
```

- 3rd terminal:
```bash
  cd UserModule
  npm start
```

#### -  Visit `http://127.0.0.1:3010/?redirectURL=${redirectURL}`

> redirectURL should be one of authorized redirects, 

- `http://127.0.0.1:9010`, the user module
- `http://127.0.0.1:5000`, the consumer

> After running the tests, username: `admin` and password `admin` can be used to log in

--- 

## API Reference

#### [ User Module API Reference ]( https://github.com/Alotech-Bootcamp-Grad-Project-Group-1/Alotech-FullStack-Bootcamp-Graduation-Project-Group-1/blob/main/UserModule/server/README.md )

#### [ Sso Auth API Reference ]( https://github.com/Alotech-Bootcamp-Grad-Project-Group-1/Alotech-FullStack-Bootcamp-Graduation-Project-Group-1/blob/main/SsoAuth/server/README.md )

---


## Running Tests

To run tests, run the following command

#### User Module Tests

- 1st Terminal:
```bash
  cd UserModule
  cd server
  npm start
```
- 2nd Terminal:
```bash
  cd UserModule
  cd server
  npm test
```

#### Sso Auth Tests

- 1st Terminal:
```bash
  cd SsoAuth
  cd server
  npm start
```
- 2nd Terminal:
```bash
  cd SsoAuth
  cd server
  npm test
```

---

## Authors

- Coşkun Atak, [@Coskntkk](https://github.com/Coskntkk)

- Nurullah Küçük, [@nrllhkck](https://github.com/nrllhkck)

- Oğuzhan Bayram, [@oguzhan1857](https://github.com/oguzhan1857)

- Shafiqullah Turkmen, [@ShafiqullahTurkmen](https://github.com/ShafiqullahTurkmen)
