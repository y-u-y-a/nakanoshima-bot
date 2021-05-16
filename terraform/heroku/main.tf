provider "heroku" {
  email = var.heroku_email
  api_key = var.heroku_api_key
}

// app
resource "heroku_app" "main" {
  region = "us"
  name = var.app_name
}

// build(デプロイ対象のディレクトリを指定)
resource "heroku_build" "main" {
  app = heroku_app.main.id
  source = {
    path = "../../app"
  }
}

// database
resource "heroku_addon" "main" {
  app  = heroku_app.main.name
  plan = "jawsdb:kitefin"
}

// set env
resource "heroku_config" "main" {
  vars = {
    NODE_ENV = var.node_env
  }
}
// config:add
resource "heroku_app_config_association" "main" {
  app_id = heroku_app.main.id
  vars = heroku_config.main.vars
}

// output
output "app_url" {
  value = "https://${heroku_app.main.name}.herokuapp.com"
}
