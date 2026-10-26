# CRUD Node + Autenticació JWT

## Rutes

### Autenticació

| Mètode | Endpoint | Funcionament |
|---|---|---|
| GET | `/auth/login` | Mostra el formulari d'inici de sessió. |
![Captura de l'aplicació](public/img/login.png)
| POST | `/auth/login` | Valida les credencials i inicia sessió amb una cookie JWT. |
![Captura de l'aplicació](public/img/loginPost.png)
| GET | `/auth/register` | Mostra el formulari de registre. |
![Captura de l'aplicació](public/img/registerGet.png)
| POST | `/auth/register` | Crea el compte i inicia sessió amb una cookie JWT. |
![Captura de l'aplicació](public/img/registerPost.png)
| GET | `/auth/protected` | Mostra el panell d'administració si hi ha una sessió vàlida. |
![Captura de l'aplicació](public/img/authProtected.png)
| POST | `/auth/logout` | Tanca la sessió eliminant la cookie JWT. |
![Captura de l'aplicació](public/img/authLogout.png)

### Productes i cançons

Les rutes següents requereixen una sessió vàlida. Els canvis es desen a `db/db.json`.

| Mètode | Endpoint | Funcionament |
|---|---|---|
| GET | `/products` | Mostra el llistat de productes. |
![Captura de l'aplicació](public/img/products.png)
| GET | `/products/create_product` | Mostra el formulari per crear un producte. |
![Captura de l'aplicació](public/img/productsCreateGet.png)
| GET | `/products/:id` | Mostra el formulari per editar un producte. |
![Captura de l'aplicació](public/img/productsId.png)
| POST | `/products` | Crea un producte. |
![Captura de l'aplicació](public/img/productsCreatePost.png)
| PUT | `/products/:id` | Actualitza un producte. |
![Captura de l'aplicació](public/img/productsPut.png)
| DELETE | `/products/:id` | Elimina un producte. |
![Captura de l'aplicació](public/img/productsDelete.png)
| GET | `/songs` | Mostra el llistat de cançons. |
![Captura de l'aplicació](public/img/songs.png)
| GET | `/songs/create_song` | Mostra el formulari per crear una cançó. |
![Captura de l'aplicació](public/img/songsCreateGet.png)
| GET | `/songs/:id` | Mostra el formulari per editar una cançó. |
![Captura de l'aplicació](public/img/songsIdGet.png)
| POST | `/songs` | Crea una cançó. |
![Captura de l'aplicació](public/img/songsCreatePost.png)
| PUT | `/songs/:id` | Actualitza una cançó. |
![Captura de l'aplicació](public/img/songsPut.png)
| DELETE | `/songs/:id` | Elimina una cançó. |
![Captura de l'aplicació](public/img/songsDelete.png)