# Diagrasia

A diagram sharing service using [PlantUML](https://plantuml.com/)

## How to setup

### Manual setup

1. Create a GCP project
1. Create a GCS bucket to store tfstate
1. [Connect your repository](https://console.cloud.google.com/cloud-build/triggers/connect)


### Run initial setup from your laptop

```
$ cd terraform/gcp
$ vi .envrc # Set your project configurations
```
