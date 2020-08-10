resource "google_cloudbuild_trigger" "terraform_plan" {
  provider = google-beta

  name        = "terraform-plan"
  description = "Run terraform plan in Pull Request"

  included_files = [
    "force-update-all-services.txt",
    "terraform/gcp/**",
    "scripts/terraform/**",
  ]

  filename = "terraform/gcp/cloudbuild/plan.yaml"

  github {
    owner = "yuya-takeyama"
    name  = "diagrasia"

    pull_request {
      branch = ".*"
    }
  }
}

resource "google_cloudbuild_trigger" "terraform_apply" {
  provider = google-beta

  name        = "terraform-apply"
  description = "Run terraform apply when merged into master"

  included_files = [
    "force-update-all-services.txt",
    "terraform/gcp/**",
    "scripts/terraform/**",
  ]

  filename = "terraform/gcp/cloudbuild/apply.yaml"

  github {
    owner = "yuya-takeyama"
    name  = "diagrasia"

    push {
      branch = "^master$"
    }
  }
}
