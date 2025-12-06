
// // apiVersion: apps/v1
// // kind: Deployment
// // metadata:
// //   name: rednet-deployment
// //   namespace: "2401069"
// // spec:
// //   replicas: 1
// //   strategy:
// //     type: RollingUpdate
// //     rollingUpdate:
// //       maxUnavailable: 1
// //       maxSurge: 1
// //   selector:
// //     matchLabels:
// //       app: rednet
// //   template:
// //     metadata:
// //       labels:
// //         app: rednet
// //     spec:
// //       imagePullSecrets:
// //         - name: nexus-secret
// //       terminationGracePeriodSeconds: 30
// //       containers:
// //         - name: rednet
// //           image: nexus-service-for-docker-hosted-registry.nexus.svc.cluster.local:8085/2401069/rednet:${IMAGE_TAG}
// //           imagePullPolicy: Always
// //           ports:
// //             - containerPort: 3000
// //           env:
// //             - name: NODE_ENV
// //               value: "production"
// //             - name: JWT_SECRET
// //               value: "XmpxMBqyicVFC+y74+VEw+d1SUz3gSxqBWpQ33DNGFs8JOIF99v/Qah3Rr18rVaYUjHu+g3Y5y4WzjzUdkZQvQ=="
// //             - name: NEXT_PUBLIC_SUPABASE_URL
// //               value: "https://nypverxdujpsdnyzktdm.supabase.co"
// //             - name: NEXT_PUBLIC_SUPABASE_ANON_KEY
// //               value: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im55cHZlcnhkdWpwc2RueXprdGRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2MjYyNjgsImV4cCI6MjA2NTIwMjI2OH0.0AlveeXieCvf5umY5JSvErhu96pbVPQwIKXTkIpKB-Q"
// //           resources:
// //             requests:
// //               cpu: "100m"
// //               memory: "256Mi"
// //             limits:
// //               cpu: "1000m"
// //               memory: "1Gi"
// //           readinessProbe:
// //             httpGet:
// //               path: /
// //               port: 3000
// //             initialDelaySeconds: 30
// //             periodSeconds: 10
// //             timeoutSeconds: 5
// //             failureThreshold: 3
// //           livenessProbe:
// //             httpGet:
// //               path: /
// //               port: 3000
// //             initialDelaySeconds: 60
// //             periodSeconds: 20
// //             timeoutSeconds: 5
// //             failureThreshold: 3
// //           lifecycle:
// //             preStop:
// //               exec:
// //                 command: ["/bin/sh", "-c", "sleep 10"]
// // ---
// // apiVersion: v1
// // kind: Service
// // metadata:
// //   name: rednet-service
// //   namespace: "2401069"
// // spec:
// //   type: ClusterIP
// //   selector:
// //     app: rednet
// //   ports:
// //     - protocol: TCP
// //       port: 80
// //       targetPort: 3000
// // ---
// // apiVersion: networking.k8s.io/v1
// // kind: Ingress
// // metadata:
// //   name: rednet-ingress
// //   namespace: "2401069"
// //   annotations:
// //     nginx.ingress.kubernetes.io/rewrite-target: /
// // spec:
// //   ingressClassName: nginx
// //   rules:
// //     - host: 2401069.imcc.com
// //       http:
// //         paths:
// //           - path: /
// //             pathType: Prefix
// //             backend:
// //               service:
// //                 name: rednet-service
// //                 port:
// //                   number: 80


// // pipeline {
// //     agent {
// //         kubernetes {
// //             yaml '''
// // apiVersion: v1
// // kind: Pod
// // spec:
// //   containers:

// //   - name: node
// //     image: node:18
// //     command: ["cat"]
// //     tty: true

// //   - name: sonar-scanner
// //     image: sonarsource/sonar-scanner-cli
// //     command: ["cat"]
// //     tty: true

// //   - name: kubectl
// //     image: bitnami/kubectl:latest
// //     command: ["cat"]
// //     tty: true
// //     securityContext:
// //       runAsUser: 0
// //       readOnlyRootFilesystem: false
// //     env:
// //       - name: KUBECONFIG
// //         value: /kube/config
// //     volumeMounts:
// //       - name: kubeconfig-secret
// //         mountPath: /kube/config
// //         subPath: kubeconfig

// //   - name: dind
// //     image: docker:24.0-dind
// //     securityContext:
// //       privileged: true
// //     args:
// //       - "--storage-driver=overlay2"
// //       - "--insecure-registry=nexus-service-for-docker-hosted-registry.nexus.svc.cluster.local:8085"
// //     env:
// //       - name: DOCKER_TLS_CERTDIR
// //         value: ""
// //     volumeMounts:
// //       - name: docker-storage
// //         mountPath: /var/lib/docker

// //   volumes:
// //     - name: kubeconfig-secret
// //       secret:
// //         secretName: kubeconfig-secret

// //     - name: docker-storage
// //       emptyDir: {}
// // '''
// //         }
// //     }

// //     environment {
// //         REGISTRY = "nexus-service-for-docker-hosted-registry.nexus.svc.cluster.local:8085"
// //         IMAGE    = "2401069/rednet"
// //         VERSION  = "v${BUILD_NUMBER}"
// //     }

// //     stages {

// //         /* ------------------------- DOCKER BUILD --------------------------- */
// //         stage('Build Docker Image') {
// //             steps {
// //                 container('dind') {
// //                     sh '''
// //                         echo "Waiting for Docker daemon..."
// //                         timeout 30 sh -c 'until docker info > /dev/null 2>&1; do sleep 2; done'

// //                         echo "Building Docker image..."
// //                         docker build -t $IMAGE:$VERSION .
// //                     '''
// //                 }
// //             }
// //         }

// //         /* ------------------------- SONARQUBE ------------------------------ */
// //         stage('SonarQube Analysis') {
// //             steps {
// //                 container('sonar-scanner') {
// //                     sh '''
// //                         sonar-scanner \
// //                           -Dsonar.projectKey=2401069_rednet \
// //                           -Dsonar.sources=. \
// //                           -Dsonar.host.url=http://my-sonarqube-sonarqube.sonarqube.svc.cluster.local:9000 \
// //                           -Dsonar.login=sqp_23bc67fb7f5ada4327208dd40e2f16bea7840893
// //                     '''
// //                 }
// //             }
// //         }

// //         /* ---------------------- DOCKER LOGIN & PUSH ----------------------- */
// //         stage('Push to Nexus') {
// //             steps {
// //                 container('dind') {
// //                     sh '''
// //                         echo "Logging into Nexus..."
// //                         docker login $REGISTRY -u admin -p Changeme@2025

// //                         echo "Tagging image..."
// //                         docker tag $IMAGE:$VERSION $REGISTRY/$IMAGE:$VERSION

// //                         echo "Pushing image..."
// //                         docker push $REGISTRY/$IMAGE:$VERSION
// //                     '''
// //                 }
// //             }
// //         }

// //         /* ---------------------- DEPLOY TO K8S ----------------------------- */
// //         stage('Deploy to Kubernetes') {
// //             steps {
// //                 container('kubectl') {
// //                     sh """
// //                         echo "Killing old pods if stuck..."
// //                         kubectl delete pod -l app=rednet -n 2401069 --grace-period=0 --force || true
                        
// //                         echo "Deploying RedNet to Kubernetes namespace 2401069..."
// //                         export IMAGE_TAG=$VERSION
// //                         envsubst < k8s/deployment.yaml | kubectl apply -f - -n 2401069

// //                         echo "Waiting for deployment..."
// //                         kubectl rollout status deployment/rednet-deployment -n 2401069 --timeout=10m || {
// //                             echo "Deployment failed, checking pod status..."
// //                             kubectl get pods -n 2401069 -l app=rednet
// //                             kubectl describe pods -n 2401069 -l app=rednet
// //                             kubectl logs -n 2401069 -l app=rednet --tail=50 || true
// //                             exit 1
// //                         }
                        
// //                         echo "Deployment successful!"
// //                         kubectl get pods -n 2401069 -l app=rednet
// //                     """
// //                 }
// //             }
// //         }
// //     }
// // }


// // pipeline {
// //     agent {
// //         kubernetes {
// //             yaml '''
// // apiVersion: v1
// // kind: Pod
// // spec:
// //   containers:

// //   - name: node
// //     image: node:18
// //     command: ["cat"]
// //     tty: true

// //   - name: sonar-scanner
// //     image: sonarsource/sonar-scanner-cli
// //     command: ["cat"]
// //     tty: true

// //   - name: kubectl
// //     image: bitnami/kubectl:latest
// //     command: ["cat"]
// //     tty: true
// //     securityContext:
// //       runAsUser: 0
// //       readOnlyRootFilesystem: false
// //     env:
// //       - name: KUBECONFIG
// //         value: /kube/config
// //     volumeMounts:
// //       - name: kubeconfig-secret
// //         mountPath: /kube/config
// //         subPath: kubeconfig

// //   - name: dind
// //     image: docker:24.0-dind
// //     securityContext:
// //       privileged: true
// //     args:
// //       - "--storage-driver=overlay2"
// //       - "--insecure-registry=nexus-service-for-docker-hosted-registry.nexus.svc.cluster.local:8085"
// //     env:
// //       - name: DOCKER_TLS_CERTDIR
// //         value: ""
// //     volumeMounts:
// //       - name: docker-storage
// //         mountPath: /var/lib/docker

// //   volumes:
// //     - name: kubeconfig-secret
// //       secret:
// //         secretName: kubeconfig-secret

// //     - name: docker-storage
// //       emptyDir: {}
// // '''
// //         }
// //     }

// //     environment {
// //         REGISTRY = "nexus-service-for-docker-hosted-registry.nexus.svc.cluster.local:8085"
// //         IMAGE    = "2401069/rednet"
// //         VERSION  = "v${BUILD_NUMBER}"
// //     }

// //     stages {

// //         /* ------------------------- DOCKER BUILD --------------------------- */
// //         stage('Build Docker Image') {
// //             steps {
// //                 container('dind') {
// //                     sh '''
// //                         echo "Waiting for Docker daemon..."
// //                         timeout 30 sh -c 'until docker info > /dev/null 2>&1; do sleep 2; done'

// //                         echo "Building Docker image..."
// //                         docker build -t $IMAGE:$VERSION .
// //                     '''
// //                 }
// //             }
// //         }

// //         /* ------------------------- SONARQUBE ------------------------------ */
// //         stage('SonarQube Analysis') {
// //             steps {
// //                 container('sonar-scanner') {
// //                     sh '''
// //                         sonar-scanner \
// //                           -Dsonar.projectKey=2401069_rednet \
// //                           -Dsonar.sources=. \
// //                           -Dsonar.host.url=http://my-sonarqube-sonarqube.sonarqube.svc.cluster.local:9000 \
// //                           -Dsonar.login=sqp_23bc67fb7f5ada4327208dd40e2f16bea7840893
// //                     '''
// //                 }
// //             }
// //         }

// //         /* ---------------------- DOCKER LOGIN & PUSH ----------------------- */
// //         stage('Push to Nexus') {
// //             steps {
// //                 container('dind') {
// //                     sh '''
// //                         echo "Logging into Nexus..."
// //                         docker login $REGISTRY -u admin -p Changeme@2025

// //                         echo "Tagging image..."
// //                         docker tag $IMAGE:$VERSION $REGISTRY/$IMAGE:$VERSION

// //                         echo "Pushing image..."
// //                         docker push $REGISTRY/$IMAGE:$VERSION
// //                     '''
// //                 }
// //             }
// //         }

// //         /* ---------------------- DEPLOY TO K8S ----------------------------- */
// //         stage('Deploy to Kubernetes') {
// //             steps {
// //                 container('kubectl') {
// //                     sh """
// //                         echo "Getting Nexus service IP..."
// //                         NEXUS_IP=\$(kubectl get svc nexus-service-for-docker-hosted-registry -n nexus -o jsonpath='{.spec.clusterIP}')
// //                         echo "Nexus IP: \$NEXUS_IP"
                        
// //                         echo "Killing old pods if stuck..."
// //                         kubectl delete pod -l app=rednet -n 2401069 --grace-period=0 --force || true
                        
// //                         echo "Deploying RedNet to Kubernetes namespace 2401069..."
// //                         export IMAGE_TAG=$VERSION
// //                         export NEXUS_IP=\$NEXUS_IP
// //                         envsubst < k8s/deployment.yaml | kubectl apply -f - -n 2401069

// //                         echo "Waiting for deployment..."
// //                         kubectl rollout status deployment/rednet-deployment -n 2401069 --timeout=10m || {
// //                             echo "Deployment failed, checking pod status..."
// //                             kubectl get pods -n 2401069 -l app=rednet
// //                             kubectl describe pods -n 2401069 -l app=rednet | tail -50
// //                             kubectl logs -n 2401069 -l app=rednet --tail=50 || true
// //                             exit 1
// //                         }
                        
// //                         echo "Deployment successful!"
// //                         kubectl get pods -n 2401069 -l app=rednet
// //                     """
// //                 }
// //             }
// //         }
// //     }
// // }


// // pipeline {
// //     agent {
// //         kubernetes {
// //             yaml '''
// // apiVersion: v1
// // kind: Pod
// // spec:
// //   containers:

// //   - name: node
// //     image: node:18
// //     command: ["cat"]
// //     tty: true

// //   - name: sonar-scanner
// //     image: sonarsource/sonar-scanner-cli
// //     command: ["cat"]
// //     tty: true

// //   - name: kubectl
// //     image: bitnami/kubectl:latest
// //     command: ["cat"]
// //     tty: true
// //     securityContext:
// //       runAsUser: 0
// //       readOnlyRootFilesystem: false
// //     env:
// //       - name: KUBECONFIG
// //         value: /kube/config
// //     volumeMounts:
// //       - name: kubeconfig-secret
// //         mountPath: /kube/config
// //         subPath: kubeconfig

// //   - name: dind
// //     image: docker:24.0-dind
// //     securityContext:
// //       privileged: true
// //     args:
// //       - "--storage-driver=overlay2"
// //       - "--insecure-registry=nexus-service-for-docker-hosted-registry.nexus.svc.cluster.local:8085"
// //       - "--insecure-registry=10.43.21.172:8085"
// //     env:
// //       - name: DOCKER_TLS_CERTDIR
// //         value: ""
// //     volumeMounts:
// //       - name: docker-storage
// //         mountPath: /var/lib/docker

// //   volumes:
// //     - name: kubeconfig-secret
// //       secret:
// //         secretName: kubeconfig-secret

// //     - name: docker-storage
// //       emptyDir: {}
// // '''
// //         }
// //     }

// //     environment {
// //         REGISTRY = "nexus-service-for-docker-hosted-registry.nexus.svc.cluster.local:8085"
// //         IMAGE    = "2401069/rednet"
// //         VERSION  = "v${BUILD_NUMBER}"
// //         // Use external IP that nodes can reach
// //         EXTERNAL_REGISTRY = "192.168.20.250:8085"
// //     }

// //     stages {

// //         /* ------------------------- DOCKER BUILD --------------------------- */
// //         stage('Build Docker Image') {
// //             steps {
// //                 container('dind') {
// //                     sh '''
// //                         echo "Waiting for Docker daemon..."
// //                         timeout 30 sh -c 'until docker info > /dev/null 2>&1; do sleep 2; done'

// //                         echo "Building Docker image..."
// //                         docker build -t $IMAGE:$VERSION .
// //                     '''
// //                 }
// //             }
// //         }

// //         /* ------------------------- SONARQUBE ------------------------------ */
// //         stage('SonarQube Analysis') {
// //             steps {
// //                 container('sonar-scanner') {
// //                     sh '''
// //                         sonar-scanner \
// //                           -Dsonar.projectKey=2401069_rednet \
// //                           -Dsonar.sources=. \
// //                           -Dsonar.host.url=http://my-sonarqube-sonarqube.sonarqube.svc.cluster.local:9000 \
// //                           -Dsonar.login=sqp_23bc67fb7f5ada4327208dd40e2f16bea7840893
// //                     '''
// //                 }
// //             }
// //         }

// //         /* ---------------------- DOCKER LOGIN & PUSH ----------------------- */
// //         stage('Push to Nexus') {
// //             steps {
// //                 container('dind') {
// //                     sh '''
// //                         echo "Logging into Nexus..."
// //                         docker login $REGISTRY -u admin -p Changeme@2025

// //                         echo "Tagging image for internal registry..."
// //                         docker tag $IMAGE:$VERSION $REGISTRY/$IMAGE:$VERSION
                        
// //                         echo "Tagging image for external registry..."
// //                         docker tag $IMAGE:$VERSION $EXTERNAL_REGISTRY/$IMAGE:$VERSION

// //                         echo "Pushing to Nexus..."
// //                         docker push $REGISTRY/$IMAGE:$VERSION
                        
// //                         echo "Logging into external registry..."
// //                         docker login $EXTERNAL_REGISTRY -u admin -p Changeme@2025
                        
// //                         echo "Pushing to external registry..."
// //                         docker push $EXTERNAL_REGISTRY/$IMAGE:$VERSION
// //                     '''
// //                 }
// //             }
// //         }

// //         /* ---------------------- DEPLOY TO K8S ----------------------------- */
// //         stage('Deploy to Kubernetes') {
// //             steps {
// //                 container('kubectl') {
// //                     sh """
// //                         echo "Killing old pods..."
// //                         kubectl delete pod -l app=rednet -n 2401069 --force --grace-period=0 || true
// //                         sleep 5
                        
// //                         echo "Deploying RedNet..."
// //                         export IMAGE_TAG=$VERSION
// //                         envsubst < k8s/deployment.yaml | kubectl apply -f - -n 2401069

// //                         echo "Waiting for pod to be ready..."
// //                         sleep 10
                        
// //                         kubectl wait --for=condition=ready pod -l app=rednet -n 2401069 --timeout=5m || {
// //                             echo "FAILED - Pod status:"
// //                             kubectl get pods -n 2401069 -l app=rednet
// //                             kubectl describe pods -n 2401069 -l app=rednet | grep -A 20 "Events:"
// //                             exit 1
// //                         }
                        
// //                         echo "SUCCESS!"
// //                         kubectl get pods -n 2401069 -l app=rednet
// //                     """
// //                 }
// //             }
// //         }
// //     }
// // }


// // pipeline {
// //     agent {
// //         kubernetes {
// //             yaml '''
// // apiVersion: v1
// // kind: Pod
// // spec:
// //   containers:

// //   - name: node
// //     image: node:18
// //     command: ["cat"]
// //     tty: true

// //   - name: sonar-scanner
// //     image: sonarsource/sonar-scanner-cli
// //     command: ["cat"]
// //     tty: true

// //   - name: kubectl
// //     image: bitnami/kubectl:latest
// //     command: ["cat"]
// //     tty: true
// //     securityContext:
// //       runAsUser: 0
// //       readOnlyRootFilesystem: false
// //     env:
// //       - name: KUBECONFIG
// //         value: /kube/config
// //     volumeMounts:
// //       - name: kubeconfig-secret
// //         mountPath: /kube/config
// //         subPath: kubeconfig

// //   - name: dind
// //     image: docker:dind
// //     securityContext:
// //       privileged: true
// //     args:
// //       - "--insecure-registry=nexus-service-for-docker-hosted-registry.nexus.svc.cluster.local:8085"
// //       - "--insecure-registry=127.0.0.1:30085"
// //     env:
// //       - name: DOCKER_TLS_CERTDIR
// //         value: ""
// //     volumeMounts:
// //       - name: docker-storage
// //         mountPath: /var/lib/docker

// //   volumes:
// //     - name: kubeconfig-secret
// //       secret:
// //         secretName: kubeconfig-secret
// //     - name: docker-storage
// //       emptyDir: {}
// // '''
// //         }
// //     }

// //     environment {
// //         REGISTRY = "nexus-service-for-docker-hosted-registry.nexus.svc.cluster.local:8085"
// //         IMAGE    = "2401069/rednet"
// //         VERSION  = "v${BUILD_NUMBER}"
// //     }

// //     stages {

// //         /* ------------------------- DOCKER BUILD --------------------------- */
// //         stage('Build Docker Image') {
// //             steps {
// //                 container('dind') {
// //                     sh '''
// //                         echo "Waiting for Docker daemon..."
// //                         sleep 15
// //                         docker version

// //                         echo "Building Docker image..."
// //                         docker build -t $IMAGE:$VERSION .
// //                         docker image ls
// //                     '''
// //                 }
// //             }
// //         }

// //         /* ------------------------- SONARQUBE ------------------------------ */
// //         stage('SonarQube Analysis') {
// //             steps {
// //                 container('sonar-scanner') {
// //                     sh '''
// //                         sonar-scanner \
// //                           -Dsonar.projectKey=2401069_rednet \
// //                           -Dsonar.sources=. \
// //                           -Dsonar.host.url=http://my-sonarqube-sonarqube.sonarqube.svc.cluster.local:9000 \
// //                           -Dsonar.login=sqp_23bc67fb7f5ada4327208dd40e2f16bea7840893
// //                     '''
// //                 }
// //             }
// //         }

// //         /* ---------------------- DOCKER LOGIN & PUSH ----------------------- */
// //         stage('Login to Docker Registry') {
// //             steps {
// //                 container('dind') {
// //                     sh '''
// //                         echo "Logging into Nexus..."
// //                         sleep 10
// //                         docker login $REGISTRY -u admin -p Changeme@2025
// //                     '''
// //                 }
// //             }
// //         }

// //         stage('Build - Tag - Push') {
// //             steps {
// //                 container('dind') {
// //                     sh '''
// //                         echo "Tagging image..."
// //                         docker tag $IMAGE:$VERSION $REGISTRY/$IMAGE:$VERSION

// //                         echo "Pushing image..."
// //                         docker push $REGISTRY/$IMAGE:$VERSION
                        
// //                         echo "Verifying push..."
// //                         docker pull $REGISTRY/$IMAGE:$VERSION
// //                         docker image ls
// //                     '''
// //                 }
// //             }
// //         }

// //         /* ---------------------- DEPLOY TO K8S ----------------------------- */
// //         stage('Deploy to Kubernetes') {
// //             steps {
// //                 container('kubectl') {
// //                     sh """
// //                         echo "Applying deployment..."
// //                         export IMAGE_TAG=$VERSION
// //                         envsubst < k8s/deployment.yaml | kubectl apply -f -

// //                         echo "Waiting for rollout..."
// //                         kubectl rollout status deployment/rednet-deployment -n 2401069
                        
// //                         echo "Deployment successful!"
// //                         kubectl get pods -n 2401069 -l app=rednet
// //                     """
// //                 }
// //             }
// //         }
// //     }
// // }



// pipeline {
//     agent {
//         kubernetes {
//             yaml '''
// apiVersion: v1
// kind: Pod
// spec:
//   containers:

//   - name: node
//     image: node:18
//     command: ["cat"]
//     tty: true

//   - name: sonar-scanner
//     image: sonarsource/sonar-scanner-cli
//     command: ["cat"]
//     tty: true

//   - name: kubectl
//     image: bitnami/kubectl:latest
//     command: ["cat"]
//     tty: true
//     securityContext:
//       runAsUser: 0
//       readOnlyRootFilesystem: false
//     env:
//       - name: KUBECONFIG
//         value: /kube/config
//     volumeMounts:
//       - name: kubeconfig-secret
//         mountPath: /kube/config
//         subPath: kubeconfig

//   - name: dind
//     image: docker:dind
//     securityContext:
//       privileged: true
//     args:
//       - "--insecure-registry=nexus-service-for-docker-hosted-registry.nexus.svc.cluster.local:8085"
//     env:
//       - name: DOCKER_TLS_CERTDIR
//         value: ""
//     volumeMounts:
//       - name: docker-storage
//         mountPath: /var/lib/docker

//   volumes:
//     - name: kubeconfig-secret
//       secret:
//         secretName: kubeconfig-secret
//     - name: docker-storage
//       emptyDir: {}
// '''
//         }
//     }

//     environment {
//         REGISTRY = "nexus-service-for-docker-hosted-registry.nexus.svc.cluster.local:8085"
//         IMAGE    = "2401069/rednet"
//         VERSION  = "v${BUILD_NUMBER}"
//     }

//     stages {

//         /* ------------------------- DOCKER BUILD --------------------------- */
//         stage('Build Docker Image') {
//             steps {
//                 container('dind') {
//                     sh '''
//                         echo "Waiting for Docker daemon..."
//                         sleep 15
//                         docker version

//                         echo "Building Docker image..."
//                         docker build -t $IMAGE:$VERSION .
//                         docker image ls
//                     '''
//                 }
//             }
//         }

//         /* ------------------------- SONARQUBE ------------------------------ */
//         stage('SonarQube Analysis') {
//     steps {
//         container('sonar-scanner') {
//             sh '''
//                 sonar-scanner \
//                   -Dsonar.projectKey=2401069_rednet \
//                   -Dsonar.sources=. \
//                   -Dsonar.host.url=http://my-sonarqube-sonarqube.sonarqube.svc.cluster.local:9000 \
//                   -Dsonar.token=sqp_af32fdccc94be1144e1dab74ecf97fce15863cb9
//             '''
//         }
//     }
// }

//         /* ---------------------- DOCKER LOGIN & PUSH ----------------------- */
//         stage('Login to Docker Registry') {
//             steps {
//                 container('dind') {
//                     sh '''
//                         echo "Logging into Nexus..."
//                         sleep 10
//                         docker login $REGISTRY -u admin -p Changeme@2025
//                     '''
//                 }
//             }
//         }

//         stage('Build - Tag - Push') {
//             steps {
//                 container('dind') {
//                     sh '''
//                         echo "Tagging image..."
//                         docker tag $IMAGE:$VERSION $REGISTRY/$IMAGE:$VERSION

//                         echo "Pushing image..."
//                         docker push $REGISTRY/$IMAGE:$VERSION
                        
//                         echo "Verifying push..."
//                         docker pull $REGISTRY/$IMAGE:$VERSION
//                         docker image ls
//                     '''
//                 }
//             }
//         }

//         /* ---------------------- DEPLOY TO K8S ----------------------------- */
//         stage('Deploy to Kubernetes') {
//             steps {
//                 container('kubectl') {
//                     sh """
//                         echo "Force deleting old pods..."
//                         kubectl delete pod -l app=rednet -n 2401069 --force --grace-period=0 || true
//                         sleep 5
                        
//                         echo "Applying deployment..."
//                         export IMAGE_TAG=$VERSION
//                         envsubst < k8s/deployment.yaml | kubectl apply -f -

//                         echo "Waiting for rollout..."
//                         kubectl rollout status deployment/rednet-deployment -n 2401069 --timeout=5m
                        
//                         echo "Deployment successful!"
//                         kubectl get pods -n 2401069 -l app=rednet
//                     """
//                 }
//             }
//         }
//     }
// }
pipeline {
    agent {
        kubernetes {
            defaultContainer 'jnlp'
            yaml '''
apiVersion: v1
kind: Pod
spec:
  containers:
  - name: jnlp
    image: jenkins/inbound-agent:alpine-jdk17
    resources:
      limits:
        memory: "1024Mi"
        cpu: "1000m"
      requests:
        memory: "512Mi"
        cpu: "500m"

  - name: dind
    image: docker:dind
    securityContext:
      privileged: true
    env:
      - name: DOCKER_TLS_CERTDIR
        value: ""
    args:
      - "--insecure-registry=nexus-service-for-docker-hosted-registry.nexus.svc.cluster.local:8085"
    resources:
      limits:
        memory: "2Gi"
        cpu: "1500m"

  - name: sonar
    image: sonarsource/sonar-scanner-cli:latest
    command: ["sleep"]
    args: ["999999"]
    resources:
      limits:
        memory: "1536Mi"      # ← THIS IS THE FIX (1.5 GiB instead of 1 GiB)
      requests:
        memory: "1024Mi"

  - name: kubectl
    image: bitnami/kubectl:latest
    command: ["sleep"]
    args: ["999999"]
    resources:
      limits:
        memory: "256Mi"
      requests:
        memory: "64Mi"
    env:
      - name: KUBECONFIG
        value: "/kube/config"
    volumeMounts:
      - name: kubeconfig
        mountPath: /kube/config
        subPath: kubeconfig

  volumes:
  - name: kubeconfig
    secret:
      secretName: kubeconfig-secret
'''
        }
    }
        environment {
        REGISTRY = "nexus-service-for-docker-hosted-registry.nexus.svc.cluster.local:8085"
        IMAGE    = "2401069/rednet"
        VERSION  = "v${BUILD_NUMBER}"
        SONAR_HOST = "http://my-sonarqube-sonarqube.sonarqube.svc.cluster.local:9000"
        SONAR_TOKEN = "sqp_af32fdccc94be1144e1dab74ecf97fce15863cb9"
    }

    stages {

        /* -------------------- 1. BUILD DOCKER IMAGE -------------------- */
        stage("Build Image") {
            steps {
                container("dind") {
                    sh '''
                        echo "Waiting for Docker daemon..."
                        sleep 10
                        docker build -t $IMAGE:$VERSION .
                    '''
                }
            }
        }

        /* -------------------- 2. SONAR SCAN ------------------------------ */
        stage("Sonar Scan") {
            steps {
                container("sonar") {
                    sh '''
                        sonar-scanner \
                          -Dsonar.projectKey=2401069_rednet \
                          -Dsonar.sources=. \
                          -Dsonar.host.url=$SONAR_HOST \
                          -Dsonar.token=$SONAR_TOKEN
                    '''
                }
            }
        }

        /* -------------------- 3. PUSH IMAGE TO NEXUS -------------------- */
        stage("Push Image") {
            steps {
                container("dind") {
                    sh '''
                        docker login $REGISTRY -u admin -p Changeme@2025
                        docker tag $IMAGE:$VERSION $REGISTRY/$IMAGE:$VERSION
                        docker push $REGISTRY/$IMAGE:$VERSION
                    '''
                }
            }
        }

        /* -------------------- 4. DEPLOY TO KUBERNETES -------------------- */
        stage("Deploy to Kubernetes") {
            steps {
                container("kubectl") {
                    sh '''
                        export IMAGE_TAG=$VERSION
                        envsubst < k8s/deployment.yaml | kubectl apply -f - -n 2401069
                        kubectl rollout status deployment/rednet-deployment -n 2401069
                    '''
                }
            }
        }
    }
}
