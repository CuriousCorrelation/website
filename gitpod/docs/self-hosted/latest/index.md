---
section: self-hosted/latest
title: Gitpod Self-Hosted
---

<script context="module">
  export const prerender = true;
</script>
<script lang="ts">
  import OpenGraph from "$lib/components/open-graph.svelte";
</script>

<OpenGraph
data={{
    description:
      "Install and run Gitpod with full control on public cloud providers or self-managed Kubernetes clusters. Enterprise-grade security within corporate firewalls and air-gapped networks. Requirements. Installation. Configuration. GKE. EKS. AKS. Open-source.",
    title: "Gitpod Self-Hosted installation guide",
    keywords: "installation",
  }}
/>

# Gitpod Self-Hosted

Gitpod can be deployed and operated on your own infrastructure. It supports different cloud providers, self-managed Kubernetes clusters, corporate firewalls, and even off-grid / air-gapped networks.

## Prerequisites to Install Gitpod Self-Hosted

- **Kubernetes expertise** <br />
  Gitpod is a Kubernetes application that makes heavy use of various Kubernetes features. It is highly recommended that people who want to install Gitpod have Kubernetes experience already. These docs expect that you are able to create and maintain a Kubernetes cluster that meet our [requirements](./latest/requirements) on your own.

- **Compatible Kubernetes cluster** <br />
  To install Gitpod you need to have a Kubernetes cluster up and running. There are a few [requirements](./latest/requirements) that must be met. For the three main supported cloud providers (_Google Kubernetes Engine_, _Amazon Elastic Kubernetes Service_, and _Microsoft Azure Kubernetes Service_) we provide [samples on how to create compatible clusters](./latest/infrastructure).

- **Cert-Manager** <br />
  Gitpod needs a properly configured [cert-manager](https://cert-manager.io/) that runs in the cluster. It is used to issue internal certificates for the Gitpod installation as well as to create certificates for the Gitpod domain (unless you bring your own domain certificates). _[Read more …](./latest/infrastructure#cert-manager)_

- **DNS setup** <br />
  For your Gitpod installation you need a properly configured domain.

- **Gitpod product license** <br />
  You need a license. We provide a community license for free. You can ask for an enterprise license here.

## Getting Started

The [getting started guide](./latest/getting-started) provides you with step-by-step instructions on how to install Gitpod on your infrastructure.

## Advanved Installation

You want to use your own database, registry, object storage, or source control management system? Gitpod should be run in an air-gap network? The [installation page](./latest/installation) provides you with more information on how to install and configure Gitpod. The page [product compatibility](./latest/compatibility) gives you an overview of compatible 3rd-party products like databases, registries, and source control management systems.

## Troubleshooting

The [troubleshooting guide](./latest/troubleshooting) provides you with solutions for common problems during the installation and operation of a Gitpod instance. Take a look at our [support page](/support) to learn how to reach our community and support team in case this page doesn't cover your issue.
