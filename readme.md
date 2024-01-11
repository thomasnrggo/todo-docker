# My Full Stack Application

## Description

This project is a full-stack web application consisting of a React frontend, a Node.js backend, and a MongoDB database. It's structured as a monorepo with Docker Compose for easy development and deployment.

## Getting Started

### Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Git](https://git-scm.com/downloads) (for version control)

### Installation

1. **Clone the Repository**
2. run `docker-compose up -d`

### Accessing the Application

- Frontend: Open your browser and navigate to http://localhost:3000.
- Backend: The backend API is accessible at http://localhost:6969.

### Development

#### Making Changes

After making changes to the code, you can rebuild and restart the services using:

`docker-compose up -d --build`
