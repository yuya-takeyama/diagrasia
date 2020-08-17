terraform {
  backend "gcs" {
    bucket = "diagrasia-tfstate"
  }
}
