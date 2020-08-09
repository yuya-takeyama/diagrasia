resource "google_cloudbuild_trigger" "terraform_plan" {
  provider = google-beta

  name        = "terraform-plan"
  description = "Run terraform plan in Pull Request"

  included_files = [
    "terraform/gcp/cloudbuild/**",
    "terraform/gcp/**",
    "scripts/terraform/**",
  ]

  filename = "terraform/gcp/cloudbuild/plan.yaml"

  github {
    owner = var.github_repo_owner
    name  = var.github_repo_name

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
    "terraform/gcp/cloudbuild/**",
    "terraform/gcp/**",
    "scripts/terraform/**",
  ]

  filename = "terraform/gcp/cloudbuild/apply.yaml"

  github {
    owner = var.github_repo_owner
    name  = var.github_repo_name

    push {
      branch = "^master$"
    }
  }
}
