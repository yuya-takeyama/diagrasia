terraform {
  backend "gcs" {
    bucket = "mome-dev-tfstate"
  }
}
