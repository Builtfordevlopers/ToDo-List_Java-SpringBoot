# Use an official OpenJDK 17 image
FROM openjdk:17-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the Maven wrapper and project file
COPY .mvn/ .mvn
COPY mvnw pom.xml ./

# Add execute permissions to the Maven wrapper
RUN chmod +x mvnw

# Download dependencies
RUN ./mvnw dependency:go-offline

# Copy your application's source code
COPY src ./src

# Build the application into a JAR file
RUN ./mvnw package -DskipTests

# Expose port 8080
EXPOSE 8080

# The command to run when the container starts
ENTRYPOINT ["java", "-jar", "target/todolist-0.0.1-SNAPSHOT.jar"]