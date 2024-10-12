![Screenshot 2024-10-13 015722](https://github.com/user-attachments/assets/29bfc6a1-54e9-4a12-b39b-0bbf35cc5f04)

# Decorz Website
Demo Link: https://interior2.onrender.com

Welcome to Decorz, an interior design website built using the MERN stack along with EJS (Embedded JavaScript) templating. This README will guide you through the project's setup, structure, and key functionalities.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Decorz is a web application that offers interior design ideas and inspirations. It allows the admin to manage blog posts via a dedicated admin page. The blog data is stored in MongoDB.

## Features

- **Home Page:** Displays a variety of interior design ideas.
- **Blog Section:** Showcases blog posts related to interior design.
- **Admin Page:** Allows admin users to create, edit, and delete blog posts.
- **Responsive Design:** Optimized for both desktop and mobile devices.

## Tech Stack

### MERN Stack
The MERN stack comprises the following technologies:
- **MongoDB:** A NoSQL database for storing blog data.
- **Express.js:** A web application framework for Node.js.
- **React.js:** A JavaScript library for building user interfaces.
- **Node.js:** A JavaScript runtime for the server-side.

### Additional Technology
- **EJS (Embedded JavaScript):** A templating engine used for rendering HTML pages with dynamic content on the server-side.

## Installation

### Prerequisites
- Node.js and npm installed on your machine
- MongoDB installed and running

### Steps
1. **Clone the Repository:**
   ```sh
   git clone https://github.com/yourusername/decorz.git
   cd decorz
   ```

2. **Install Dependencies:**
   ```sh
   npm install
   ```

3. **Set Up Environment Variables:**
   Create a `.env` file in the root directory and add the following:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   PORT=your_port_number
   ```

4. **Run the Application:**
   ```sh
   npm start
   ```

The application will be running at `http://localhost:your_port_number`.

## Usage

### Blog Management
- **Create Post:** Fill out the form with title, content, and images.
- **Edit Post:** Update existing blog posts.
- **Delete Post:** Remove blog posts that are no longer needed.

## Project Structure

```plaintext
decorz/
├── public/
│   ├── css/
│   ├── images/
│   └── js/
├── views/
│   ├── admin/
│   ├── partials/
│   ├── blog.ejs
│   ├── index.ejs
│   └── layout.ejs
├── models/
│   └── blog.js
├── routes/
│   ├── admin.js
│   ├── blog.js
│   └── index.js
├── .env
├── app.js
├── package.json
└── README.md
```

## Contributing

We welcome contributions to enhance the features and improve the project. Please fork the repository and create a pull request for any changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Thank you for using Decorz! We hope you find it useful for all your interior design inspiration needs. If you have any questions or need further assistance, feel free to contact us.
