terraform {
  required_providers {
    azurerm = {
      source = "hashicorp/azurerm",
      version = "=2.89.0"
    }
  }
}

provider "azurerm" {
    features {}
}

provider "tls" {
    version = "2.1.0"
}