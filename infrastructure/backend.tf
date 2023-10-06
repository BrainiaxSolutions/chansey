terraform {
  backend "s3" {
    bucket = "pluvial-lambdas-tf-state-bucket"
    region = "us-east-1"
    key    = "chansey/terraform.tfstate"
  }
}

provider "aws" {
  region = "us-east-1"
}