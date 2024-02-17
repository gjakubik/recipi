# Recipi Project Overview

This document serves as a comprehensive guide to the Recipi project, encapsulating both the frontend and backend components. The Recipi application is a recipe management tool designed to streamline the process of creating, storing, and sharing recipes, utilizing cutting-edge technology stacks for both web and server-side development.

## Table of Contents

- [Introduction](#introduction)
- [Getting Started](#getting-started)
- [Technology Stack](#technology-stack)
- [Development Setup](#development-setup)
- [Contributors](#contributors)
- [Further Development](#further-development)

## Introduction

Recipi leverages the power of Next.js 13 and Rust, providing a robust and scalable solution for recipe management. The application integrates modern development practices and tools, offering an intuitive user experience and efficient backend processing for hardware-intensive tasks.

## Release Process

The repository has two main important branches:

- `main`: This branch is the main branch and is used for production releases. It is always stable and contains the latest stable release.
- `staging`: This branch is used for staging releases. It is used to test and develop the latest features and bug fixes before they are merged into the main branch. This is to be kept semi-stable and should be used for testing purposes.

To develop new features, create a feature branch `my-feature-branch` from the `staging` branch. Once the feature is complete, create a pull request to merge the feature branch into the `staging` branch. This PR will create a preview environment in vercel, which will give you a link in the PR comments to go view the app with your change live. Once the feature is tested and ready to be integrated with other new features being tested for production, merge the PR from `my-feature-branch` to `staging` using the **Squash and Merge** method.

When we are ready to do a production release, then we will create a new pull request to merge the `staging` branch into the `main` branch. Once we are ready to officially release, we will merge the PR from `staging` to `main` using the **Create a Merge Commit** method. This will trigger a production deployment in vercel, and the new release will be live. It will also preserve all of the commits from staging to main, keeping them in sync and git up to date. This is what we want as each commit should theoretically map to a feature or bug fix.

## Getting Started

To contribute to the Recipi project, you will need to set up both the frontend and backend development environments. Specific instructions for each component are detailed in their respective directories.

### Prerequisites

Ensure you have Node.js (LTS version), npm, and Rust installed on your local machine.

## Technology Stack

- **Frontend:**
  - **Framework:** Next.js 13
  - **Styling:** Tailwind CSS
  - **Component Library:** shadcn/ui
  - **Authentication:** Next Auth
  - **Form Management:** React Hook Form
  - **Database:** MySQL with Planetscale
- **Backend:**
  - **Language:** Rust
  - **Framework:** Axum
  - **DB Connection Pool:** sqlx
  - **Database:** MySQL with Planetscale

## Development Setup

Follow the setup instructions in each subfolder to prepare your development environment for both the frontend and backend components of the project. This includes installing dependencies, setting up environment variables, and starting development servers.

## Contributors

- **Frontend:** Gavin Jakubik - [gjakubik](https://github.com/gjakubik)
- **Backend:** Michael Lee - [michaeldlee1](https://github.com/michaeldlee1)

## Further Development

As Recipi continues to evolve, further details regarding development practices, project structure, and contribution guidelines will be added. Stay tuned for updates and enhancements to both the frontend and backend components.
