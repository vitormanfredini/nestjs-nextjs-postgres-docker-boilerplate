# Containerized Full Stack Web Application Boilerplate

- Nest.js with Typescript, Prisma and PostgreSQL on the backend.
- Next.js with Tailwind on the frontend.
- Adminer as a database administration tool for PostgreSQL.

## To run application:

`docker-compose up -d`

## Apply Prisma migrations

`docker exec -it nestjs-backend sh -c "set -a && source .env.development && set +a && npx prisma migrate dev"`

## Generate (and apply) new migration after changing Prisma Schema

`docker exec -it nestjs-backend sh -c "set -a && source .env.development && set +a && npx prisma migrate dev --name description_of_migration"`

## To watch logs from the backend and frontend containers:

```bash
# backend
docker logs -f nestjs-backend

# frontend
docker logs -f nextjs-frontend
```

The frontend will be available on [http://localhost:3000](http://localhost:3000)

The backend will be available on [http://localhost:4000](http://localhost:4000)

Adminer will be available on [http://localhost:8080/?pgsql=postgres&username=admin&db=mydatabase](http://localhost:8080/?pgsql=postgres&username=admin&db=mydatabase). Password is `admin_password`

## API requests and parameters

Use [Bruno Http Client](https://www.usebruno.com/) to load `bruno` folder. It's like Postman, but saves requests in files that can be tracked with version control.

## Future plans

. Integrate SQLite for automated tests
. Add an email provider
