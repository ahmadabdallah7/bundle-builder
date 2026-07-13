# Bundle Builder

A responsive full-stack security system bundle builder built with **React**, **TypeScript**, **Tailwind CSS**, **Node.js**, and **Express.js**.

The application allows users to build a personalized home security system through a guided multi-step interface. Product data is served from an Express backend, while the React frontend provides a responsive experience across desktop, tablet, and mobile layouts.

---

## Tech Stack

### Frontend

- React
- TypeScript
- Tailwind CSS
- Vite

### Backend

- Node.js
- Express.js
- TypeScript

---

## Project Structure

```
bundle-builder/
├── client/          # React frontend
├── server/          # Express backend + product data
└── README.md
└── package.json
```

---

## Installation

Clone the repository:

```bash
git clone https://github.com/ahmadabdallah7/bundle-builder.git
cd bundle-builder
```

Install the frontend dependencies:

```bash
npm run client-dependencies
```

Install the backend dependencies:

```bash
npm run server-dependencies
```

---

## Running the Application

Start the backend server:

```bash
npm run server
```

Open a second terminal and start the frontend:

```bash
npm run client
```

The application will then be available at:

Frontend:

```
http://localhost:5173
```

Backend:

```
http://localhost:3000
```

---

## Available Scripts

| Command                       | Description                          |
| ----------------------------- | ------------------------------------ |
| `npm run client-dependencies` | Install frontend dependencies        |
| `npm run server-dependencies` | Install backend dependencies         |
| `npm run client`              | Start the React development server   |
| `npm run server`              | Start the Express development server |

---

## Features

- Multi-step bundle builder
- Responsive Desktop, Tablet, and Mobile layouts
- Camera variant selection
- Quantity management
- Live review panel
- Dynamic pricing calculations
- Savings calculation
- Local Storage persistence
- Data-driven UI powered by a backend API
- Reusable React components

---

## Notes

### Design Decisions

- Product data is served from a lightweight Express backend using a JSON data source.
- The UI is built using reusable React components (ProductCard, PlanCard, Accordion, ReviewPanel, ReviewItem, etc.) to minimize duplication and improve maintainability.
- Bundle state is centralized in a custom `useBundleBuilder` hook to separate business logic from presentation.
- The application closely follows the provided Figma design, with minor layout refinements made where appropriate to improve consistency and responsiveness.

---

## Screenshots

### Desktop

### Tablet

### Mobile
