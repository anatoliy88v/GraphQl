# Nest-js GraphQL project

## Start the project

- Clone the project
- Into project directory run these commands:
  - `docker-compose build` (try with "sudo" if you use Ubuntu)
  - `docker-compose up`

Use `docker-compose up` to start the backend server and `docker-compose down` if you want to end your work with server.

## Run migrations

- Run these commands:
  - `docker-compose run web bash`
  - `npm run typeorm:run`

Use `npm run typeorm:migrate <Name>` to generate new migration from changes in entities files.
Or `npm run typeorm:create <Name>` to create empty migration.

Or `typeorm migration:run` to run migration on heroku