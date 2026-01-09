# EventTracker

EventTracker is an interview assignment implemented in 8 hours (1 day) to demonstrate my skills and ability to deliver a project quickly.

Language: Typescript
Framework: Fastify
DB: MongoDB
Test: ViTest
Virtualization: Docker & Docker-compose


## Features

- Create and query events
- Store events in MongoDB
- Redis cache (not implemented)

## Installation

```bash
git clone https://github.com/madjid80/EventTracker.git
cd eventTracker
# Follow project-specific setup instructions
```

Install dependencies using NPM or PNPM (PNPM preferred):

```bash
pnpm install
```

Build the project:

```bash
pnpm build
```

Alternatively, use Docker Compose if you prefer not to install locally:

```bash
docker-compose build
```

## Usage

1. Set up dependencies as described in [Installation](#installation).
2. To run the application with Docker Compose (recommended):

    ```bash
    docker-compose up
    ```

   Or, to run locally, configure environment variables as explained in [Config](#config) and start the application:

    ```bash
    pnpm start
    ```

3. To verify the system is running, execute:

    ```bash
    curl --location 'localhost:3000/version'
    ```

   Expected response: `v1`

4. To send a new user event:

    ```bash
    curl --location 'localhost:3000/v1/users/events' \
    --header 'Content-Type: application/json' \
    --data '{
        "user_id": "13",
        "event_type": "PURCHASE",
        "timestamp": 14223343
    }'
    ```

5. To query user points:

    ```bash
    curl --location 'localhost:3000/v1/users/events/?user_id=13'
    ```

## Config

Configuration files are located in the `./config` folder, including environment variables for each environment (local, production, development) and `events.yml` for event point settings.

Environment variables:

```bash
# Environment variables schema
NODE_ENV= # 'development' | 'production' | 'test' | 'local'

# API Server Configurations
API_SERVER_PORT= # default: 8000
API_SERVER_HOST= # default: '0.0.0.0'

# Logging Configurations
LOG_LEVEL= # 'error' | 'warn' | 'info' | 'debug'

# MongoDB Configurations
MONGO_URL= # MongoDB connection string URL

# Events
EVENTS_POINTS_PATH= # Path to events configuration file
```

To configure a new event, update two files:

1. `./config/events.yaml` — Add your event:

    ```yaml
    events:
      - name: LOGIN
        description: User logged in
        point: 1
      - name: PURCHASE
        description: User made a purchase
        point: 10
      - name: REFERRAL
        description: User referred another user
        point: 20
    ```

2. `./src/api/models/events/eventTypes.schema.ts` — Add the event name to the enum array.

## Tests
There are two tests implemented in this project, primarily to demonstrate my testing skills; these do not meet the minimum requirements for comprehensive coverage. Vitest is used as the testing framework.

You can find the integration test in the `./test/integration` folder. It utilizes Fastify's testing features. For larger projects, I would prefer using Postman for integration testing.

Run tests with the following commands:

```bash
# Run all tests
pnpm run test

# Run integration tests only
pnpm run test:integration 

# Run unit tests only
pnpm run test:units
```

## Please Note

This project was completed in 8 hours to demonstrate my capabilities and skillset within a typical workday. Given more time, I would add CI/CD pipelines, Prettier, ESLint, additional unit and integration tests, a Postman collection, and a caching system.

Currently, the point system is implemented using MongoDB's aggregation feature. In a real-world scenario, I would prefer an event-driven approach combined with Redis for scalability, as aggregation is not ideal for scaling. However, as specified in the assignment, the project is designed for local development standards and does not include scaling solutions.

## License

This project is licensed under the MIT License.

## Contact

For questions or support, please contact [madjid.80@gmail.com](mailto:madjid.80@gmail.com).
