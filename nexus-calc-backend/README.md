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

# NexusCalculator Backend

A NestJS backend for the NexusCalculator application, migrated from Ruby on Rails.

## Prerequisites

- Node.js (v18 or higher)
- Docker (via Colima)
- PostgreSQL (via Docker)

## Development Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Colima and PostgreSQL

#### Start Colima (if not running)
```bash
colima start
```

#### Start PostgreSQL Container
```bash
# Run the setup script
./scripts/setup-db.sh

# Or manually:
docker run --name nexus-postgres \
  -e POSTGRES_DB=nexus_calc_dev \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -p 5432:5432 \
  -d postgres:15
```

### 3. Environment Configuration

Create a `.env` file in the root directory:

```env
# Database configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=nexus_calc_dev
```

### 4. Start Development Server

```bash
npm run start:dev
```

The API will be available at `http://localhost:3000`

## Database Management

### Setup Database
```bash
./scripts/setup-db.sh
```

### Seed Database
```bash
./scripts/seed-db.sh
```

### Reset Database
```bash
./scripts/reset-db.sh
```

## API Endpoints

### Users
- `POST /user` - Create user
- `GET /user` - Get all users
- `GET /user/:id` - Get user by ID
- `PATCH /user/:id` - Update user
- `DELETE /user/:id` - Delete user

### Characters
- `POST /character` - Create character
- `GET /character` - Get all characters
- `GET /character/:id` - Get character by ID
- `PATCH /character/:id` - Update character
- `DELETE /character/:id` - Delete character

### Caves
- `POST /cave` - Create cave
- `GET /cave` - Get all caves
- `GET /cave/:id` - Get cave by ID
- `PATCH /cave/:id` - Update cave
- `DELETE /cave/:id` - Delete cave

### Creatures
- `POST /creature` - Create creature
- `GET /creature` - Get all creatures
- `GET /creature/:id` - Get creature by ID
- `PATCH /creature/:id` - Update creature
- `DELETE /creature/:id` - Delete creature

## Data Models

### User
- `email` (string, unique)
- `encrypted_password` (string)
- Devise fields for authentication

### Character
- `name` (string)
- `path` (string)
- `subpath` (string, optional)
- `vita`, `mana`, `might`, `will`, `grace` (integers)
- `alignment` (string)
- `title`, `clan`, `clantitle` (strings, optional)
- `imagelocation` (string, optional)
- `user` (relationship to User)

### Cave
- `cavename` (string)
- `requirements` (string, optional)
- `coordinates` (string, optional)
- `boss` (string, optional)
- `drops` (string, optional)
- `creatures` (relationship to Creature)

### Creature
- `creaturename` (string)
- `vita`, `ac` (integers)
- `imagelocation` (string, optional)
- `cave` (relationship to Cave)

## Development Commands

```bash
# Start development server
npm run start:dev

# Build for production
npm run build

# Run tests
npm run test

# Run e2e tests
npm run test:e2e

# Lint code
npm run lint
```

## Docker Commands

```bash
# Start PostgreSQL
docker start nexus-postgres

# Stop PostgreSQL
docker stop nexus-postgres

# Remove PostgreSQL container
docker rm nexus-postgres

# View PostgreSQL logs
docker logs nexus-postgres
```

## Troubleshooting

### Database Connection Issues
1. Ensure Colima is running: `colima status`
2. Check if PostgreSQL container is running: `docker ps`
3. Verify `.env` file has correct database settings
4. Restart the development server

### Port Conflicts
If port 5432 is already in use, modify the Docker run command to use a different port:
```bash
docker run --name nexus-postgres \
  -e POSTGRES_DB=nexus_calc_dev \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -p 5433:5432 \
  -d postgres:15
```
Then update your `.env` file to use port 5433.

## Migration from Rails

This backend replaces the original Ruby on Rails application with:
- TypeScript/NestJS backend
- TypeORM for database management
- PostgreSQL database (same as original)
- RESTful API endpoints
- Validation using class-validator
- Modular architecture with separate modules for each entity
