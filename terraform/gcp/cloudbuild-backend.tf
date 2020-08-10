resource "google_cloudbuild_trigger" "backend-deploy" {
  provider = google-beta

  name = "backend-deploy"

  filename = "backend/cloudbuild/deploy.yaml"

  included_files = [
    "force-update-all-services.txt",
    "backend/**",
  ]

  github {
    owner = "yuya-takeyama"
    name  = "diagrasia"

    push {
      branch = "^master$"
    }
  }
}
