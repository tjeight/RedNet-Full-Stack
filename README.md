# REDNET – Full Stack Application (CI/CD Enabled)

REDNET is a full-stack web application deployed using a **Jenkins-driven CI/CD pipeline** on the college Kubernetes infrastructure.  
The project follows the **standardized deployment process** defined by the institute to ensure security, consistency, and automation.

---

## 🚀 Application Overview

- **Application Name:** REDNET  
- **Type:** Full Stack Web Application  
- **Frontend & Backend:** Next.js  
- **Database & Auth:** Supabase (Cloud-hosted)  
- **Containerization:** Docker  
- **CI/CD Tool:** Jenkins  
- **Container Registry:** Nexus (Docker Hosted)  
- **Orchestration:** Kubernetes  
- **Domain:** `http://2401069.imcc.com`

---

## 🧱 Tech Stack

- **Frontend:** Next.js
- **Backend:** Next.js API Routes
- **Database:** Supabase (PostgreSQL – Managed)
- **Authentication:** Supabase Auth
- **Container:** Docker
- **CI/CD:** Jenkins (Kubernetes Agent)
- **Registry:** Nexus Docker Hosted Repository
- **Cluster:** College Kubernetes Cluster
- **Ingress Controller:** NGINX Ingress

---

## 🔄 CI/CD Pipeline Flow (High Level)

1. Code is pushed to GitHub
2. Jenkins pipeline is triggered automatically
3. Jenkins:
   - Builds Docker image
   - Tags image with build number
   - Pushes image to Nexus
4. Jenkins deploys the application to Kubernetes
5. Kubernetes:
   - Pulls image from **node-local registry**
   - Starts application pod
   - Exposes app via Service & Ingress

> **Important Rule:**  
> All deployments are done **only via Jenkins**.  
> Manual Kubernetes deployments are not used.

---

## 📦 Container Registry Details

- **Registry Type:** Nexus Docker Hosted
- **Registry Access Model:** Node-local registry
- **Registry Address Used by Kubernetes:**

# REDNET – Full Stack Application (CI/CD Enabled)

REDNET is a full-stack web application deployed using a **Jenkins-driven CI/CD pipeline** on the college Kubernetes infrastructure.  
The project follows the **standardized deployment process** defined by the institute to ensure security, consistency, and automation.

---

## 🚀 Application Overview

- **Application Name:** REDNET  
- **Type:** Full Stack Web Application  
- **Frontend & Backend:** Next.js  
- **Database & Auth:** Supabase (Cloud-hosted)  
- **Containerization:** Docker  
- **CI/CD Tool:** Jenkins  
- **Container Registry:** Nexus (Docker Hosted)  
- **Orchestration:** Kubernetes  
- **Domain:** `http://2401069.imcc.com`

---

## 🧱 Tech Stack

- **Frontend:** Next.js
- **Backend:** Next.js API Routes
- **Database:** Supabase (PostgreSQL – Managed)
- **Authentication:** Supabase Auth
- **Container:** Docker
- **CI/CD:** Jenkins (Kubernetes Agent)
- **Registry:** Nexus Docker Hosted Repository
- **Cluster:** College Kubernetes Cluster
- **Ingress Controller:** NGINX Ingress

---

## 🔄 CI/CD Pipeline Flow (High Level)

1. Code is pushed to GitHub
2. Jenkins pipeline is triggered automatically
3. Jenkins:
   - Builds Docker image
   - Tags image with build number
   - Pushes image to Nexus
4. Jenkins deploys the application to Kubernetes
5. Kubernetes:
   - Pulls image from **node-local registry**
   - Starts application pod
   - Exposes app via Service & Ingress

> **Important Rule:**  
> All deployments are done **only via Jenkins**.  
> Manual Kubernetes deployments are not used.

---

## 📦 Container Registry Details

- **Registry Type:** Nexus Docker Hosted
- **Registry Access Model:** Node-local registry
- **Registry Address Used by Kubernetes:**
