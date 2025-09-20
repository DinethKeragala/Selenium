# Selenium + API + Unit Tests

This project demonstrates:
- 2 Selenium UI tests (using saucedemo.com)
- 2 API tests (Postman collection run via Newman against reqres.in)
- 2 Unit tests
- GitHub Actions CI to run them headlessly

## Prereqs
- Node.js 18+
- Google Chrome installed

## Setup
1. Install dependencies
```
npm install
```
2. (Optional) Create a `.env` file to configure UI behavior:
```
UI_BASE_URL=https://www.saucedemo.com/
UI_HEADLESS=true
```

## Run tests
- Unit tests:
```
npm run test:unit
```
- UI tests (headless):
```
npm run test:ui
```
- API tests (Newman):
```
npm run test:api
```
- Run everything:
```
npm test
```

## Notes
- UI tests use saucedemo public credentials.
- API tests use public reqres.in endpoints.
