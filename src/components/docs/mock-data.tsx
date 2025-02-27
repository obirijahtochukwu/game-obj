export const table_of_contents = [
  { label: "Getting Started", list: ["Prerequisites", "Installation"] },
  { label: "Project Structure" },
  // { label: "Environment Variables" },
  { label: "Running the Application" },
  // { label: "Testing" },
  { label: "Deployment" },
  // { label: "Contributing" },
  { label: "Contact" },
];

export const backend_table_of_contents = [
  { label: "Getting Started", list: ["Prerequisites", "Installation"] },
  { label: "Project Structure" },
  { label: "Environment Variables" },
  { label: "API Endpoints" },
  { label: "Running the Server" },
  { label: "Deployment" },
  { label: "Contact" },
];

export const tools = ["Node.js (v16 or higher)", "npm (Node Package Manager)", "Git (optional)"];
export const backend_tools = [
  "Node.js (v16 or higher)",
  "npm (Node Package Manager)",
  "MongoDB (or a MongoDB Atlas connection string)",
  "Git (optional)",
];

export const Installation = [
  { name: "Clone the repository", list: ["git clone https://github.com/B-M-G/webnet.git", "cd webnet"] },
  { name: "Install dependencies", list: ["npm install"] },
  { name: "Start the development server", list: ["npm start"] },
];

export const backend_installation = [
  { name: "Clone the repository", list: ["git clone https://github.com/B-M-G/webnet.git", "cd webnet/backend"] },
  { name: "Install dependencies", list: ["npm install"] },
  {
    name: "Set up environment variables",
    plain: true,
    list: ["Create a .env file in the root directory.", "Add the required environment variables (see Environment Variables)."],
  },
  { name: "Start the development server", list: ["npm start"] },
];

export const project_structure = [
  { folder: "node_modules", desc: "Installed dependencies" },
  { folder: "public", desc: "Static assets", files: [{ file: "index.html", desc: "HTML template" }] },
  {
    folder: "src",
    desc: "Source code",
    files: [
      { file: "assets", desc: "Private assets" },
      {
        file: "auth",
        desc: "Player's authentication",
        list: [
          { file: "login.tsx", desc: "login modal" },
          { file: "signup.tsx", desc: "signup modal" },
          { file: "index.tsx", desc: "Entry point" },
        ],
      },
      {
        file: "components",
        desc: "ui components",
        list: [
          { file: "admin", desc: "admin's ui" },
          { file: "layout", desc: "navigation system" },
          { file: "pages", desc: "Page components" },
          { file: "ui", desc: "Reusable components" },
        ],
      },
      { file: "lib", desc: "helper fuctions and hook store" },
      { file: "App.tsx ", desc: "Main application component" },
      { file: "index.tsx ", desc: " Entry point" },
      { file: "index.css", desc: "global css" },
    ],
  },
  { folder: ".gitignore", desc: "Files to ignore in Git" },
  { folder: "prettier.config.js", desc: "code formatter" },
  { folder: "package.json ", desc: "Project metadata and dependencies" },
  { folder: "tailwind.config.js", desc: "custom tailwind config" },
  { folder: "tsconfig.json", desc: "TypeScript configuration" },
];

export const backend_project_structure = [
  { folder: "node_modules", desc: "Installed dependencies" },
  {
    folder: "src",
    desc: "Source code",
    files: [
      { file: "config", desc: "extarnal api configuration", list: [{ file: "db.js", desc: "database config" }] },
      {
        file: "controllers",
        desc: "Route handlers",
        list: [
          { file: "adminController.js", desc: "Admin api calls" },
          { file: "authController.js", desc: " auth api calls" },
          { file: "gameHistoryController.js", desc: "Game/Sport api calls" },
          { file: "userController.js", desc: " User api calls" },
        ],
      },
      {
        file: "middleware",
        desc: "Custom middleware",
        list: [
          { file: "corsConfig.js", desc: "Cors configurations" },
          { file: "upload-file.js", desc: "File upload func" },
        ],
      },
      {
        file: "models",
        desc: " Database models",
        list: [
          { file: "admin.js", desc: "Admin model" },
          { file: "ads.js", desc: "Ad model" },
          { file: "claim-token.js", desc: " PLayer's token request model" },
          { file: "game-history.js", desc: " Game history model" },
          { file: "user.js", desc: "User model" },
        ],
      },
      {
        file: "routes",
        desc: "API routes",
        list: [
          { file: "adminRoutes.js", desc: "Admin api routes" },
          { file: "authRoutes.js", desc: "Authentication api routes" },
          { file: "userRoutes.js", desc: "User api routes" },
        ],
      },
    ],
  },
  { folder: ".env", desc: "Environment variables" },
  { folder: ".gitignore", desc: "Files to ignore in Git" },
  { folder: "package.json ", desc: "Project metadata and dependencies" },
];

export const backend_environment_variables = [
  { name: "PORT", desc: "Port for the server to run on", value: "5000" },
  { name: "DATABASE_URL", desc: "MongoDB connection string", value: "mongodb://localhost:27017" },
  { name: "JWT_SECRET", desc: "Secret key for JWT authentication", value: "mysecretkey" },
  { name: "CLOUDINARY_CLOUD_NAME", desc: "Cloudinary cloud name", value: "your_cloud_name" },
  { name: "CLOUDINARY_API_KEY", desc: "Cloudinary API key", value: "your_api_key" },
  { name: "CLOUDINARY_API_SECRET", desc: "Cloudinary API secret", value: "your_api_secret" },
];

export const routeEndpoints = [
  {
    name: "Authentication",
    data: [
      {
        method: "POST",
        endpoint: "/signup",
        description: "Registers a new user account.",
      },
      {
        method: "POST",
        endpoint: "/login",
        description: "Authenticates a user and generates a login token.",
      },
      {
        method: "POST",
        endpoint: "/logout",
        description: "Invalidates a user's login token.",
      },
      {
        method: "POST",
        endpoint: "/admin/signup",
        description: "Registers a new administrator account.",
      },
    ],
  },
  {
    name: "user",
    data: [
      {
        method: "GET",
        endpoint: "/user/:token",
        description: "Retrieves user information based on the provided token.",
      },
      {
        method: "GET",
        endpoint: "/game-history",
        description: "Fetches the game history for the authenticated user.",
      },
      {
        method: "POST",
        endpoint: "/add-game",
        description: "Adds a new game entry to the user's history.",
      },
      {
        method: "POST",
        endpoint: "/plinko",
        description: "Handles Plinko game requests and logic.",
      },
      {
        method: "POST",
        endpoint: "/claim-token",
        description: "Allows a user to claim a token or reward.",
      },
      {
        method: "PUT",
        endpoint: "/edit",
        description: "Updates user profile information, including profile image upload.",
      },
      {
        method: "GET",
        endpoint: "/terms_of_service",
        description: "Retrieves the terms of service document.",
      },
      {
        method: "GET",
        endpoint: "/get-ads",
        description: "Fetches advertisement data.",
      },
    ],
  },
  {
    name: "Admin",
    data: [
      {
        method: "PUT",
        endpoint: "/add_page_view",
        description: "Increments the page view counter.",
      },
      {
        method: "GET",
        endpoint: "/new_signups",
        description: "Retrieves a list of new user signups.",
      },
      {
        method: "GET",
        endpoint: "/admin-data",
        description: "Fetches administrative dashboard data.",
      },
      {
        method: "GET",
        endpoint: "/order-list",
        description: "Retrieves a list of orders.",
      },
      {
        method: "GET",
        endpoint: "/admin/player/:id",
        description: "Retrieves player data based on the provided ID.",
      },
      {
        method: "PUT",
        endpoint: "/approve-token",
        description: "Approves a token or reward.",
      },
      {
        method: "PUT",
        endpoint: "/gift-token",
        description: "Gifts a token or reward to a user.",
      },
      {
        method: "POST",
        endpoint: "/create-ad",
        description: "Creates a new advertisement, including image upload.",
      },
      {
        method: "PUT",
        endpoint: "/update-terms-of-ervices",
        description: "Updates the terms of service document.",
      },
      {
        method: "DELETE",
        endpoint: "/delete-user/:id",
        description: "Deletes a user account based on the provided ID.",
      },
    ],
  },
];

export const running_application = [
  { label: "Development", code: ["npm start"], list: "Starts the development server with hot reloading." },
  { label: "Production Build", code: ["npm run build"], list: "Creates an optimized production build in the build folder" },
  {
    label: "Serve Production Build Locally",
    code: ["npm install -g serve", "serve -s build"],
    list: "Serves the production build locally.",
  },
];

export const backend_running_application = [
  { label: "Development", code: ["npm start"], list: `Starts the server with "nodemon" for automatic reloading` },
  { label: "Production Build", code: ["npm start"], list: "Starts the server in production mode." },
];

export const deployment = [
  {
    label: "Deploy to Vercel",
    list: [
      { title: "Install the Vercel CLI", code: ["npm install -g vercel"] },
      { title: "Deploy the app", code: ["vercel"] },
    ],
  },
  {
    label: "Deploy to Netlify",
    list: [{ title: "Push your code to GitHub." }, { title: "Connect your repository to Netlify" }, { title: "Deploy the app" }],
  },
  {
    label: "Deploy to GitHub Pages",
    list: [
      { title: "Install the gh-pages package", code: ["npm install --save-dev gh-pages"] },
      {
        title: "npm install --save-dev gh-pages",
        code: [`"scripts": {`, `"predeploy": "npm run build",`, `"deploy": "gh-pages -d build"`, `}`],
      },
      { title: "Deploy the app", code: ["npm run deploy"] },
    ],
  },
];

export const backend_deployment = [
  {
    label: "Deploy to Vercel",
    list: [
      { title: "Install the Vercel CLI", code: ["npm install -g vercel"] },
      { title: "Deploy the app", code: ["vercel"] },
    ],
  },
  {
    label: "Deploy to Heroku",
    list: [
      { title: "Create a Heroku app", code: ["heroku create"] },
      { title: "Push your code to Heroku", code: ["git push heroku main"] },
    ],
  },
];
