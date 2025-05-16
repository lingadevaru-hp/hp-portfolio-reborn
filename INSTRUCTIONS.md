# Portfolio Website - Exported Code

This document provides instructions on how to run and deploy the updated portfolio website codebase.

## Project Overview

The website has been rebuilt with a Disney+ Hotstar-inspired design, featuring a floating sidebar menu, a dark minimalist aesthetic, and updated section layouts. The codebase is in React/TypeScript and uses Vite for building and Tailwind CSS for styling.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

*   **Node.js** (which includes npm or yarn). It is recommended to use a recent LTS version of Node.js (e.g., v18.x or v20.x).
*   **Git** (optional, but useful for version control if you plan to continue development).

## Getting Started

1.  **Extract the Code:**
    Unzip the provided `lingadevaru-portfolio-redesigned.zip` file to a directory of your choice on your local machine.

2.  **Navigate to Project Directory:**
    Open your terminal or command prompt and navigate into the extracted project folder:
    ```bash
    cd path/to/lingadevaru-portfolio-redesigned
    ```

3.  **Install Dependencies:**
    Install the project dependencies using npm (or yarn if you prefer):
    ```bash
    npm install
    ```
    This command will download and install all the necessary packages defined in `package.json`.

## Running the Project Locally (Development Mode)

Once the dependencies are installed, you can start the development server:

```bash
npm run dev
```

This will start the Vite development server, typically on `http://localhost:8080` (the exact port might vary if 8080 is in use; check your terminal output for the correct URL).

Open your web browser and navigate to the provided local URL to view the website.

## Building the Project for Production

When you are ready to deploy the website, you need to create a production build. This process optimizes the code and assets for performance.

Run the following command:

```bash
npm run build
```

This command will generate a `dist` folder in your project directory. The `dist` folder contains all the static files (HTML, CSS, JavaScript, images) that make up your website and are ready for deployment.

## Deployment

The `dist` folder generated in the previous step can be deployed to any static web hosting service. Some popular options include:

*   **Netlify:** You can drag and drop the `dist` folder to Netlify's deploy interface, or connect your Git repository for continuous deployment.
    *   Build command: `npm run build` (or `vite build`)
    *   Publish directory: `dist`
*   **Vercel:** Similar to Netlify, Vercel offers easy deployment for static sites and React projects.
    *   Build command: `npm run build` (or `vite build`)
    *   Output Directory: `dist`
*   **GitHub Pages:** You can host your static site directly from a GitHub repository.
*   **Other Cloud Providers:** AWS S3, Google Cloud Storage, Azure Static Web Apps, etc., can also host static websites.

**General Steps for Static Hosting:**

1.  Build your project (`npm run build`).
2.  Upload the contents of the `dist` folder to your chosen hosting provider.
3.  Configure any necessary domain settings.

## Code Structure Highlights

*   **`src/`**: Contains the main application code.
    *   **`components/`**: Reusable React components, including the new `Sidebar.tsx` and section-specific components like `ProjectsSection.tsx`, `YogaSection.tsx`, etc.
    *   **`pages/`**: Components representing different pages/routes of the website.
    *   **`index.css`**: Global styles and Tailwind CSS base/component/utility layers. Includes the Hotstar dark theme and Inter font setup.
    *   **`main.tsx`**: The main entry point for the React application.
*   **`tailwind.config.ts`**: Configuration for Tailwind CSS, including custom colors (e.g., `hotstar-dark`), fonts (Inter), and the sidebar gradient colors.
*   **`public/`**: Static assets that are copied directly to the build output.

## Customization

*   **Content:** Most page content is managed within the respective components in `src/components/` (e.g., `HeroSection.tsx`, `AboutSection.tsx`) or `src/pages/`.
*   **Styling:** Primarily handled by Tailwind CSS utility classes directly in the TSX files. Global styles and theme customizations are in `src/index.css` and `tailwind.config.ts`.
*   **Sidebar Navigation:** Items are defined in `src/components/Sidebar.tsx` within the `navItems` array.

Should you have any questions or require further assistance, please refer to the documentation of the respective technologies used (React, Vite, Tailwind CSS).
