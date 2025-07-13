<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Nexus Calculator Backend

A NestJS backend for the Nexus Calculator application, migrated from Ruby on Rails.

## Prerequisites

- Node.js (v18 or higher)
- Docker (for PostgreSQL)
- Colima (for Docker on macOS)

## Installation

```bash
npm install
```

## Environment Setup

Create a `.env` file in the root directory:

```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=password
DATABASE_NAME=nexus_calc_dev
JWT_SECRET=your-super-secret-key
JWT_EXPIRES_IN=1h
```

## Database Management

### Using npm scripts (Recommended)

```bash
# Start PostgreSQL container
npm run db:start

# Stop PostgreSQL container
npm run db:stop

# Reset PostgreSQL container (stop, remove, start)
npm run db:reset

# Check container status
npm run db:status

# Seed database with initial data
npm run db:seed

# Setup database with initialization scripts
npm run db:setup
```

### Using the database manager script directly

```bash
# Start database
node scripts/db-manager.js start

# Stop database
node scripts/db-manager.js stop

# Reset database
node scripts/db-manager.js reset

# Check status
node scripts/db-manager.js status

# Seed database
node scripts/db-manager.js seed
```

## Development

### Start the development server

```bash
npm run start:dev
```

The server will be available at `http://localhost:3000`

### Build the application

```bash
npm run build
```

### Start production server

```bash
npm run start:prod
```

## Testing

### Authentication Testing

Test the complete authentication flow:

```bash
npm run test:auth
```

This will:
1. Register a new user
2. Login to get a JWT token
3. Test protected endpoints
4. Test unauthorized access

### API Testing

Test all API endpoints:

```bash
npm run test:api
```

This will test:
- Users endpoint
- Characters endpoint
- Creatures endpoint
- Caves endpoint
- Server status

### Unit Testing

```bash
# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:cov

# Run e2e tests
npm run test:e2e
```

## API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login and get JWT token

### Users (Protected)
- `GET /users` - Get all users
- `GET /users/:id` - Get specific user
- `GET /users/profile` - Get current user profile
- `POST /users` - Create user
- `PATCH /users/:id` - Update user
- `DELETE /users/:id` - Delete user

### Characters (Protected)
- `GET /characters` - Get all characters
- `GET /characters/:id` - Get specific character
- `POST /characters` - Create character
- `PATCH /characters/:id` - Update character
- `DELETE /characters/:id` - Delete character

### Creatures (Public)
- `GET /creatures` - Get all creatures
- `GET /creatures/:id` - Get specific creature
- `POST /creatures` - Create creature
- `PATCH /creatures/:id` - Update creature
- `DELETE /creatures/:id` - Delete creature

### Caves (Public)
- `GET /caves` - Get all caves
- `GET /caves/:id` - Get specific cave
- `POST /caves` - Create cave
- `PATCH /caves/:id` - Update cave
- `DELETE /caves/:id` - Delete cave

## Authentication

The application uses JWT (JSON Web Tokens) for authentication. Protected endpoints require a valid JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Database Schema

The application uses PostgreSQL with the following main entities:

- **Users**: Authentication and user management
- **Characters**: Player characters with stats
- **Creatures**: Game creatures and monsters
- **Caves**: Game locations and dungeons

## Development Scripts

```bash
# Code formatting
npm run format

# Linting
npm run lint

# Debug mode
npm run start:debug
```

## Troubleshooting

### Database Connection Issues
1. Make sure PostgreSQL container is running: `npm run db:status`
2. Check environment variables in `.env` file
3. Restart database: `npm run db:reset`

### Authentication Issues
1. Check JWT_SECRET in `.env` file
2. Ensure user exists in database
3. Verify JWT token is not expired

### Server Issues
1. Check if port 3000 is available
2. Verify all dependencies are installed
3. Check logs for specific error messages

## Migration from Rails

This NestJS backend is a migration from the original Ruby on Rails application. Key changes:

- **Framework**: Rails → NestJS
- **Language**: Ruby → TypeScript
- **Database**: PostgreSQL (unchanged)
- **Authentication**: Devise → JWT + Passport
- **ORM**: ActiveRecord → TypeORM

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Static Assets

All static assets (images, backgrounds, etc.) are served from the `public/assets/images/` directory.

### Example Asset URLs

You can access images directly via HTTP:

```
http://localhost:3000/assets/images/Anchorite/bloodbane.gif
http://localhost:3000/assets/images/Assassin/cutthroat.gif
http://localhost:3000/assets/images/Backgrounds/wilderness.png
```

To use these in your frontend, reference the URLs as shown above.

- Place new images in `public/assets/images/` (or subfolders)
- They will be available at `/assets/images/...` on your server

---

## Database Migrations (TypeORM)

### Prerequisites
- Ensure Colima is running and Docker context is set to Colima:
  ```sh
  yarn db:colima-start
  ```
- Ensure your Postgres container is running:
  ```sh
  yarn db:setup
  ```
- Ensure your `.env` file is configured with the correct DB credentials.

### Creating a Migration
1. Make your entity changes in `src/entities/`.
2. Generate a migration (from the backend root):
   ```sh
   yarn ts-node ./node_modules/typeorm/cli.js migration:generate ./migrations/your-migration-name -d ./src/data-source.ts
   ```
   - This will create a new migration file in `migrations/`.
   - If you see "No changes in database schema were found", check your entity changes and database connection.

### Running Migrations
Apply all pending migrations to your database:
```sh
yarn ts-node ./node_modules/typeorm/cli.js migration:run -d ./src/data-source.ts
```

### Troubleshooting
- If you get connection errors, ensure Colima and your Postgres container are running, and your `.env` matches the container credentials.
- If you get permission errors with Docker volumes, make sure your `db/` directory is owned by your user.
- If you see "No changes in database schema were found", your database may already be in sync, or you may need to reset/recreate it.
- If you need to reset the database, stop and remove the Postgres container, then run `yarn db:setup` again.

### Useful Scripts
- `yarn db:colima-start` — Start Colima and set Docker context
- `yarn db:setup` — Start a persistent Postgres container
- `yarn db:colima-status` — Check Colima and Docker context status
