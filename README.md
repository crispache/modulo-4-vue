## Filtrado de organización miembros Github
Mostrar un listado de miembros que pertenencen a una organización en Github. Para ello, vamos a usar la API de Github.


### Enunciado

- Crear una aplicación que muestre, por defecto, el listado de los miembros de Lemoncode en Github, utilizando la API de Github.
- Añadir un campo de búsqueda y un botón para buscar por nombre de organización. Este campo tiene como valor por defecto Lemoncode y la búsqueda se realiza cada vez que se pulsa el botón.
- Mostrar en la lista, al menos, una foto de cada miembro y su nombre.
- Si no se encuentra ningún miembro o dicha organización, mostrar un mensaje de error.
- El usuario puede teclear otro nombre de organizacíon, por ejemplo, "microsoft" en el campo de búsqueda; y al pulsar el botón, te muestra los miembros de dicha organización.
- Al clickar en uno de los miembros, navegar a una vista de detalle de ese miembro.
- En la vista de detalle, mostrar la foto del miembro, su nombre, mail, bio, y el nombre de la organización (esto no viene en la info del usuario, habrá que compartir este dato en la app).
- Al volver a la vista de listado, se debería seguir mostrando el listado que había, sin necesidad de tener que realizar la búsqueda de nuevo y el formulario debería conservar el valor de búsqueda que se había usado.


#### Recomendado
- Hacer el ejercicio con Nuxt 3 (y Pinia para conservar los datos del campo de búsqueda y el listado).


#### Opcional
- Añadir tests unitarios de componentes de Vue o composables.





## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
