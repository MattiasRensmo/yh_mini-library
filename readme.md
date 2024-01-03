# Mini library

## Inlämning

Inlämnad klockan 12.10 den 3 januari 2024. Jag anser mig ha uppfyllt kraven för väl godkänt.

Länk till sidan på github pages: https://mattiasrensmo.github.io/yh_mini-library/dist/

## Instruktioner

Du ska göra ett bibliotek av barnböcker. Man ska kunna se alla böcker och klicka sig vidare och få mer information.

### Funktionalitet

- Lista alla böcker från API:et ✅
- När jag klickar på en bok ska den visas med mer information. ✅

### API

URL: `https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books`

### Figmaskiss

**Uppgiften behöver inte se ut som skissen men ifall man vill ha inspiration / öva HTML och CSS.**

https://www.figma.com/file/lm4l7OViUO8ypfQn9IBG91/Mini-Library?t=G97VVkLbj5c4IDtU-0

### Betygskriterier

**För att få Godkänt ska du:**

- Uppfylla alla krav på funktionalitet ✅
- Gjort i Typescript ✅
- Ha en tsconfig.json ✅
- En dist-mapp och src-mapp. ✅
- Använda dig av statiska typer och interface ✅
- API-svaret (arrayen du får tillbaka) ska ha en datatyp och får inte vara `any`. Ex: `const data: Dog[] = await response.json();` ✅

**För att få Väl Godkänt ska du:**

- Ha delat upp din kod i moduler i Typescript, alla interface ska ligga i en egen modul och importeras. ✅
- Det ska gå att söka på en specifik bok via ett inputfält och få information om denna. ✅
