output "frontend_url" {
  value = "http://localhost:${var.frontend_port}"
}

output "backend_api" {
  value = "http://localhost:${var.backend_port}/api/users"
}

output "pgadmin_or_db" {
  value = "PostgreSQL accessible sur port ${var.db_port} (local)"
}
