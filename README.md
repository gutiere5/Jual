# Jual

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

**Jual ** is a full-stack inventory tracking system designed for retail and food service businesses.

## Features

### Current Features

- **Batch Management**: Monitor specific stock batches to track costs and manage expiration dates to prevent spoilage.
- **Waste Tracking**: Dedicated logging for wasted items with specific reasons (Expired, Damaged, Theft, Mistake) to audit losses.
- **Transaction Logging**: Record detailed history of Purchases, Sales, Returns, and Adjustments.
- **Vendor Management**: Maintain supplier databases and link them directly to inventory items.
- **User Management**: Track users and their roles.
- **Dashboard**: A responsive management interface.

### Future Features

- **Integrated Point of Sale (POS)**: A built-in checkout interface to process sales directly within the platform.
- **Mobile Companion App**: A native mobile application for scanning barcodes and performing stock counts on the floor.
- **E-commerce/Website Management**: Tools to sync inventory levels directly with public-facing online stores.

## Tech Stack

This project is a monorepo managed by **Turborepo**.

- **Frontend (`apps/dashboard`):**
  - React 19 & Vite
  - React Router
- **Backend (`apps/backend`):**
  - Node.js & Express
  - Prisma ORM
  - PostgreSQL
  - JWT Authentication (future)
- **DevOps:**
  - TypeScript
  - Docker (Database containerization)

## 📂 Project Structure

```text
.
├── apps
│   ├── backend    # Express server with Prisma ORM
│   └── dashboard  # React frontend application
|   └── ...
├── packages
│   ├── config-eslint      # Shared ESLint configurations
│   └── config-typescript  # Shared tsconfig configurations
|   └── ...
└── turbo.json     # Turborepo pipeline configuration
```
