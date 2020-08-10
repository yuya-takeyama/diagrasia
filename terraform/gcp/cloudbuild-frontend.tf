resource "google_cloudbuild_trigger" "frontend-deploy" {
  provider = google-beta

  name = "frontend-deploy"

  filename = "frontend/cloudbuild/deploy.yaml"

  included_files = [
    "frontend/**",
  ]

  github {
    owner = "yuya-takeyama"
    name  = "diagrasia"

    push {
      branch = "^master$"
    }
  }
}
