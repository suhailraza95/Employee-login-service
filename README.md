# Roadside Assistance — Employee Service

A Node.js and Express backend service for the employee side of the Roadside Assistance platform.

The service handles employee authentication, role-based access, customer-care rescue ticket management, rescue employee assignment, and rescue status updates.

## Features

- Employee authentication using JWT
- Secure password hashing
- Role-based authorization
- Customer-care and rescue employee roles
- Retrieve newly created rescue tickets
- Assign rescue employees to rescue requests
- Retrieve tickets assigned to a rescue employee
- Update rescue status
- REST communication with the RSA User Service
- SMS notification workflow after assignment
- MongoDB persistence with Mongoose
- Centralized error handling

## Employee Roles

### Customer Care

- View rescue tickets with `CREATED` status
- Assign rescue employees
- Coordinate rescue assignments

### Rescue Employee

- View assigned tickets
- Start a rescue request
- Mark a rescue request as completed

## Rescue Ticket Flow

```text
CREATED → ASSIGNED → IN_PROGRESS → COMPLETED
```

The User Service creates the rescue ticket.  
The Employee Service manages the operational rescue workflow.

## Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JSON Web Tokens
- bcryptjs
- Axios
- dotenv
- Morgan

## Project Structure

```text
employee-service/
├── app.js
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── services/
├── utils/
├── package.json
└── README.md
```

## Environment Variables

```env
PORT=5006
APP_ENV=development

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_employee_jwt_secret

USER_SERVICE_URL=http://localhost:5004

API_KEY=your_internal_api_key
```

Keep environment files and real secrets out of Git.

## Installation

Clone the repository:

```bash
git clone <employee-service-repository-url>
cd <employee-service-folder>
```

Install dependencies:

```bash
npm install
```

Add the required environment variables and start the service:

```bash
npm start
```

The Employee Service runs on:

```text
http://localhost:5006
```

## Authentication

Protected requests use:

```http
Authorization: Bearer <employee_access_token>
```

After authentication, role middleware verifies whether the employee can access the requested operation.

## Main API Modules

| Module | Purpose |
|---|---|
| Authentication | Employee login and JWT authentication |
| Customer Care | Retrieve new tickets and assign rescue employees |
| Rescue | Retrieve assigned tickets and update rescue status |

## Employee Model

The Employee model stores:

- Name
- Employee ID
- Employee type
- Email
- Password

Supported employee types:

```text
customerCare
rescue
```

Employee accounts are created through the RSA Admin Service.

## Inter-Service Communication

The Employee Service communicates with the User Service using Axios.

```text
User Service :5004
       ↑
       │ REST API
       ↓
Employee Service :5006
```

Typical flow:

```text
Customer creates rescue request
        ↓
User Service creates ticket
        ↓
Customer Care retrieves CREATED tickets
        ↓
Customer Care assigns rescue employee
        ↓
Ticket becomes ASSIGNED
        ↓
Rescue employee starts the job
        ↓
Ticket becomes IN_PROGRESS
        ↓
Rescue completed
        ↓
Ticket becomes COMPLETED
```

## Authorization

Customer-care operations are restricted to:

```text
customerCare
```

Rescue operations are restricted to:

```text
rescue
```

## Notes

- The User Service must be reachable for inter-service rescue ticket operations.
- Axios is used for communication between the Employee Service and User Service.
- Employee IDs and emails are unique.
- Passwords are hashed before storage.
- Do not commit `.env` files, JWT secrets, API keys, or database credentials.

## DevOps Roadmap

- Docker
- Kubernetes
- CI/CD
- Prometheus
- Grafana
