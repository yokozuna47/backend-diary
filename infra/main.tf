terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 3.0"
    }
  }
}

provider "docker" {}

# Réseau docker pour relier tous les conteneurs
resource "docker_network" "diary_net" {
  name = "diary_network"
}

# ======================================
# 📦 PostgreSQL
# ======================================
resource "docker_image" "postgres" {
  name = "postgres:15"
}

resource "docker_container" "db" {
  name  = "diary-db"
  image = docker_image.postgres.name
  networks_advanced {
    name = docker_network.diary_net.name
  }
  env = [
    "POSTGRES_PASSWORD=${var.db_password}",
    "POSTGRES_USER=postgres",
    "POSTGRES_DB=diary"
  ]
  ports {
    internal = 5432
    external = var.db_port
  }
}

# ======================================
# 📦 Backend Node.js
# ======================================
resource "docker_image" "backend" {
  name         = "diary-backend"
  build {
    context = "${path.module}/../"
    dockerfile = "Dockerfile"
  }
}

resource "docker_container" "backend" {
  name  = "diary-backend"
  image = docker_image.backend.name
  depends_on = [docker_container.db]
  networks_advanced {
    name = docker_network.diary_net.name
  }
  env = [
    "DB_USER=postgres",
    "DB_PASSWORD=${var.db_password}",
    "DB_NAME=diary",
    "DB_HOST=diary-db",
    "DB_PORT=5432",
    "JWT_SECRET=${var.jwt_secret}"
  ]
  ports {
    internal = 3000
    external = var.backend_port
  }
}

# ======================================
# 📦 Frontend React (Vite)
# ======================================
resource "docker_image" "frontend" {
  name = "diary-frontend"
  build {
    context = "${path.module}/../frontend"
    dockerfile = "Dockerfile"
  }
}

resource "docker_container" "frontend" {
  name  = "diary-frontend"
  image = docker_image.frontend.name
  depends_on = [docker_container.backend]
  networks_advanced {
    name = docker_network.diary_net.name
  }
  ports {
    internal = 80
    external = var.frontend_port
  }
}
