# To-Do List Application - Full-Stack

A simple and responsive to-do list application built with a Java Spring Boot backend and a React frontend.

**Live Demo:** [https://to-do-list-java-spring-boot.vercel.app/](https://to-do-list-java-spring-boot.vercel.app/)

---

## 🚀 Features

* **Create Tasks:** Add new tasks with a name and a deadline.
* **View Tasks:** See a clean list of all your current tasks.
* **Delete Tasks:** Remove tasks once they are completed.
* **Responsive Design:** Looks great on both desktop and mobile browsers.

---

## 🛠️ Tech Stack

This project is a full-stack application with a clear separation between the frontend and backend.

### Backend

* **Java 17**
* **Spring Boot 3**
* **Maven**
* **Docker** for containerization.
* Deployed on **Render**.

### Frontend

* **React** (with Vite)
* **JavaScript**
* **Axios** for API communication.
* **CSS** for styling.
* Deployed on **Vercel**.

---

## ⚙️ How to Run Locally

To run this project on your own machine, follow these steps:

### Prerequisites

* Java JDK 17 or later
* Node.js and npm
* Maven

### Backend Setup

1.  Clone the repository:
    ```bash
    git clone [https://github.com/Builtfordevlopers/ToDo-List_Java-SpringBoot.git](https://github.com/Builtfordevlopers/ToDo-List_Java-SpringBoot.git)
    ```
2.  Navigate to the backend directory:
    ```bash
    cd ToDo-List_Java-SpringBoot/todolist
    ```
3.  Run the Spring Boot application:
    ```bash
    ./mvnw spring-boot:run
    ```
    The backend will be running on `http://localhost:8080`.

### Frontend Setup

1.  Navigate to the frontend directory:
    ```bash
    cd ../frontend/ToDoList
    ```
2.  Install the required packages:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
    The frontend will be running on `http://localhost:5173`.
