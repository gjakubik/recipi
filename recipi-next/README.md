# Recipi

Welcome to Recipi, a Next.js project that harnesses the power of Next.js 13 app
router along with a suite of modern development tools.

## Table of Contents

- [About](#about)
- [Getting Started](#getting-started)
- [Built With](#built-with)
- [Drizzle Studio](#drizzle-studio)
- [Authors](#authors)
- [Acknowledgments](#acknowledgments)

## About

Recipi is a recipe management application that allows users to create, store,
and share recipes. The application is built using Next.js 13, a React framework
for production, and Tailwind CSS, a utility-first CSS framework for rapid UI
development. The application is powered by a MySQL database hosted on
Planetscale, a scalable MySQL platform for developers. The application also uses
Next Auth for authentication and React Hook Form for form management.

## Getting Started

These instructions will get you a copy of the project up and running on your
local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (LTS version recommended)
- npm (comes with Node.js)

### Installing

A step-by-step series of examples that tell you how to get a development
environment running:

1. Clone the repository:

```bash
git clone https://github.com/gjakubik/recipi.git
```

2. Navigate to the project directory:

```bash
cd recipi
```

3. Install dependencies:

```bash
npm install
```

4. Set up environment variables

Environment variable setup is required to allow a developer to connect to each
version of the database securely in different develpment modes. To set up env
variables, ask the owner of the project for the following files:

- .env
- .env.development.local
- .env.production.local
- .env.local

There are comments describing the use case for each of these files within their
corresponding example files

```bash
cp .env.example .env
```

Then edit .env with our specific project values

5. Start the development server

**NOTE** - This runs agains dev DB branch by default

```bash
npm run dev
```

6. Start the production build locally

**NOTE** - This runs agains production DB branch by default

```bash
npm run build
npm run start
```

### Built With

This project is built using several key technologies:

- [Next.js](https://nextjs.org/) - The React framework for production
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for
  rapid UI development
- [shadcn/ui](https://ui.shadcn.com/) - A React component library for building
  modern applications
- [Drizzle ORM](https://github.com/drizzle-orm/drizzle) - Object Relational
  Mapping library for managing database state
- [Next Auth](https://next-auth.js.org/) - Authentication for Next.js
  applications
- [Planetscale](https://planetscale.com/) - Scalable MySQL platform for
  developers
- [React Hook Form](https://react-hook-form.com/) - Performant, flexible and
  extensible forms with easy-to-use validation

## Drizzle Studio

To run Drizzle Studio, run the following command:

```bash
npx drizzle-kit studio
```

## Authors

- Gavin Jakubik - [gjakubik](https://github.com/gjakubik)

## Acknowlegments

- [shadcn-ui/taxonomy](https://github.com/shadcn-ui/taxonomy): Design and
  architecture inspiration
