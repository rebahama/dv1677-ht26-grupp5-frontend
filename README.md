# dv1677-ht26-grupp5-frontend

## Gruppmedlemmar

| Namn                 | GitHub        |
| -------------------- | ------------- |
| Rebaz Mohammad Ahmad | rebahama      |
| Tuan Anh Pham        | tuananhpham95 |


## Om projektet
Detta projekt är utvecklat med React, en backend har driftsats och sänder ut olika API routes som konsumeras i detta projekt. Målet är att skapa en modern frontend webbapplikationen som presenterar olika routes ifrån backenden. Repo projektet skapades med Vite som startgrund.

## Kör lokalt

1. git clone <https://github.com/rebahama/dv1677-ht26-grupp5-frontend>
2. cd dv1677-ht26-grupp5-frontend
3. cp .env.example .env
4. npm install
5. npm run dev



**Miljövariabler** :

| Variabel | Beskrivning |
|----------|-------------|
| VITE_API_URL | URL till backend-API:t |


## Installera dependencies 

1. npm install
Detta installerar följande:

* React
* React Router DOM
* Bootstrap
* React Bootstrap


## Bygga för produktion

Kör i root foldern "npm run build"



## Driftsatt

- Frontend: https://rebahama.github.io/dv1677-ht26-grupp5-frontend
- Backend:  https://dv1677-spock.nplab.bth.se

## Tillvägagångssätt

Dokumentera löpande vad ni gjort och hur ni löst problem.

- Vecka 3: React installerades och konfiguerades med hjälp av Vite, även React Bootstrap lades till för styling. React router dom lades till för att kunna navigera runt webbapplikationen. En display API sida React component skapades för att förberedas när API ifrån backend projektet konsumeras på frontenden.

- Vecka 4: När API var driftsatt ifrån backenden kunde arbete påbörjas att konsumera APIn här i frontenden, en display api sida skapades och där API ifrån frontenden displayas och visar innehåll. Sedan lades variabel för backendens url in i Githup pages och en workflow skapades för main. Stötte på lite problem när jag skulle deploya sidan men visade sig att vara felstavningar och routes som var problemet här. Var tvungen att även pusha till main pga felstavning för att säkerhetställa driftsättningen gick korrekt till och displayade rätt utan att skapa en 404 error.


## Tekniker
Projektet är byggd med:
* React: 19.2.8
* React Router Dom: 7.18.4
* Bootstrap: 5.3.8
* React Bootstrap: 2.10.10
* Vite: 8.3.0
* axios: 1.20.0