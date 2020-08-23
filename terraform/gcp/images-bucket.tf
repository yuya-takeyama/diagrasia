resource "google_storage_bucket" "images" {
  name          = "diagrasia-images"
  location      = "ASIA-NORTHEAST1"
  force_destroy = true

  bucket_policy_only = true
}

resource "google_storage_bucket_iam_policy" "images" {
  bucket = "b/diagrasia-images"

  policy_data = <<POLICY
{
  "bindings": [
    {
      "members": [
        "projectEditor:diagrasia",
        "projectOwner:diagrasia"
      ],
      "role": "roles/storage.legacyBucketOwner"
    },
    {
      "members": [
        "projectViewer:diagrasia"
      ],
      "role": "roles/storage.legacyBucketReader"
    },
    {
      "members": [
        "projectEditor:diagrasia",
        "projectOwner:diagrasia"
      ],
      "role": "roles/storage.legacyObjectOwner"
    },
    {
      "members": [
        "allUsers",
        "projectViewer:diagrasia"
      ],
      "role": "roles/storage.legacyObjectReader"
    }
  ]
}
POLICY

  depends_on = [
    google_storage_bucket.images,
  ]
}
