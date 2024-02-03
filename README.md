# Pharmacy API

## Description

This project is a Pharmacy Management System API designed to streamline the operations of a pharmacy.

## Installation

To install and use this app, follow these steps:

1. Clone the repository by running the following command in your terminal:

```bash
git clone https://github.com/greyboolean/pharmacy.git
```

2. Navigate to the project directory:

```bash
cd pharmacy
```

3. Install the dependencies:

```bash
npm install
```

## Configuration

The application uses environment variables for configuration. These are stored in a `.env` file, which should be located in the root directory of the project. A `.env.copy` file is provided in the root directory as a template.

1. Rename the `.env.copy` file to `.env` in the root directory of the project.

2. Open the `.env` file and replace the placeholder values with your actual data:

```properties
MONGODB_URI={Put your MongoDB URI here}
JWT_SECRET={Put your JWT secret here}
JWT_EXPIRES_IN=90d
JWT_COOKIE_EXPIRES_IN=90
```

## Usage

Once the installation is complete, you can start the app by running the following command:

1. To start the development server, run:

```bash
npm run dev
```

2. To start the application, run:

```bash
npm start
```

3. To populate the database with development data, run:

```bash
npm run data generate
```

4. To delete the development data from the database, run:

```bash
npm run data delete
```
