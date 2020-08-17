# Diagrasia

A diagram sharing service using [PlantUML](https://plantuml.com/)

## How to setup

### Manual setup

#### Create a GCP project

#### Create a GCS bucket to store tfstate

#### Enable APIs

* [Secret Manager](https://console.cloud.google.com/security/secret-manager)
* [Cloud Build](https://console.cloud.google.com/marketplace/product/google/cloudbuild.googleapis.com)
* [Cloud Run](https://console.developers.google.com/apis/library/run.googleapis.com)

#### Create GitHub token and set it to Secret Manager

This is used by [tfnotify](https://github.com/mercari/tfnotify)

* [Generate new token](https://github.com/settings/tokens)
  * Select the `repo` scope
* [Create a secret to Secret Manager](https://console.cloud.google.com/security/secret-manager)
  * With name: `cloudbuild-terraform-github-token`

#### Connect your repository

https://console.cloud.google.com/cloud-build/triggers/connect

#### Attach Owner role to Cloud Build default service account

https://console.cloud.google.com/iam-admin/iam

`*@cloudbuild.gserviceaccount.com`

### Prepare Firebase Docker image

https://qiita.com/zaru/items/509123b2fbf9c95ed434

### Run initial setup from your laptop

```
$ cd terraform/gcp
$ vi .envrc # Set your project configurations
$ terraform init
$ terraform apply
```

### Create Firebase project

https://console.firebase.google.com/
