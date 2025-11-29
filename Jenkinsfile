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
//     image: docker:24.0-dind
//     securityContext:
//       privileged: true
//     args:
//       - "--storage-driver=overlay2"
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

//         /* ------------------------- FRONTEND BUILD ------------------------- */
//         stage('Install + Build Frontend') {
//             steps {
//                 container('node') {
//                     sh '''
//                         echo "Installing pnpm..."
//                         npm install -g pnpm

//                         echo "Installing dependencies..."
//                         pnpm install --frozen-lockfile

//                         echo "Building Next.js project..."
//                         npm run build
//                     '''
//                 }
//             }
//         }

//         /* ------------------------- DOCKER BUILD --------------------------- */
//         stage('Build Docker Image') {
//             steps {
//                 container('dind') {
//                     sh '''
//                         echo "Waiting for Docker daemon..."
//                         sleep 10

//                         echo "Docker version:"
//                         docker version

//                         echo "Building Docker image..."
//                         docker build -t $IMAGE:$VERSION .
//                     '''
//                 }
//             }
//         }

//         /* ------------------------- SONARQUBE ------------------------------ */
//         stage('SonarQube Analysis') {
//             steps {
//                 container('sonar-scanner') {
//                     sh '''
//                         sonar-scanner \
//                           -Dsonar.projectKey=2401069_rednet \
//                           -Dsonar.sources=. \
//                           -Dsonar.host.url=http://my-sonarqube-sonarqube.sonarqube.svc.cluster.local:9000 \
//                           -Dsonar.login=sqp_23bc67fb7f5ada4327208dd40e2f16bea7840893
//                     '''
//                 }
//             }
//         }

//         /* ---------------------- DOCKER LOGIN ------------------------------ */
//         stage('Login to Nexus Registry') {
//             steps {
//                 container('dind') {
//                     sh '''
//                         echo "Logging into Nexus..."
//                         docker login $REGISTRY -u admin -p Changeme@2025
//                     '''
//                 }
//             }
//         }

//         /* ---------------------- PUSH IMAGE ------------------------------- */
//         stage('Push to Nexus') {
//             steps {
//                 container('dind') {
//                     sh '''
//                         echo "Tagging image..."
//                         docker tag $IMAGE:$VERSION $REGISTRY/$IMAGE:$VERSION

//                         echo "Pushing image..."
//                         docker push $REGISTRY/$IMAGE:$VERSION || {
//                             echo "Retrying push..."
//                             sleep 5
//                             docker push $REGISTRY/$IMAGE:$VERSION
//                         }
//                     '''
//                 }
//             }
//         }

//         /* ---------------------- DEPLOY TO K8S ----------------------------- */
//         stage('Deploy to Kubernetes') {
//             steps {
//                 container('kubectl') {
//                     sh """
//                         echo "Deploying RedNet to Kubernetes namespace 2401069..."
                        
//                         # 🔥 Replace placeholder IMAGE_TAG inside deployment.yaml
//                         sed -i "s/IMAGE_TAG/$VERSION/g" k8s/deployment.yaml

//                         kubectl apply -f k8s/deployment.yaml -n 2401069

//                         echo "Checking rollout..."
//                         kubectl rollout status deployment/rednet-deployment -n 2401069
//                     """
//                 }
//             }
//         }
//     }
// }


pipeline {
    agent {
        kubernetes {
            yaml '''
apiVersion: v1
kind: Pod
spec:
  containers:

  - name: node
    image: node:18
    command: ["cat"]
    tty: true

  - name: sonar-scanner
    image: sonarsource/sonar-scanner-cli
    command: ["cat"]
    tty: true

  - name: kubectl
    image: bitnami/kubectl:latest
    command: ["cat"]
    tty: true
    securityContext:
      runAsUser: 0
      readOnlyRootFilesystem: false
    env:
      - name: KUBECONFIG
        value: /kube/config
    volumeMounts:
      - name: kubeconfig-secret
        mountPath: /kube/config
        subPath: kubeconfig

  - name: dind
    image: docker:24.0-dind
    securityContext:
      privileged: true
    args:
      - "--storage-driver=overlay2"
      - "--insecure-registry=nexus-service-for-docker-hosted-registry.nexus.svc.cluster.local:8085"
    env:
      - name: DOCKER_TLS_CERTDIR
        value: ""
    volumeMounts:
      - name: docker-storage
        mountPath: /var/lib/docker

  volumes:
    - name: kubeconfig-secret
      secret:
        secretName: kubeconfig-secret

    - name: docker-storage
      emptyDir: {}
'''
        }
    }

    environment {
        REGISTRY = "nexus-service-for-docker-hosted-registry.nexus.svc.cluster.local:8085"
        IMAGE    = "2401069/rednet"
        VERSION  = "v${BUILD_NUMBER}"
    }

    stages {

        /* ------------------------- DOCKER BUILD --------------------------- */
        stage('Build Docker Image') {
            steps {
                container('dind') {
                    sh '''
                        echo "Waiting for Docker daemon..."
                        timeout 30 sh -c 'until docker info > /dev/null 2>&1; do sleep 2; done'

                        echo "Building Docker image..."
                        docker build -t $IMAGE:$VERSION .
                    '''
                }
            }
        }

        /* ------------------------- SONARQUBE ------------------------------ */
        stage('SonarQube Analysis') {
            steps {
                container('sonar-scanner') {
                    sh '''
                        sonar-scanner \
                          -Dsonar.projectKey=2401069_rednet \
                          -Dsonar.sources=. \
                          -Dsonar.host.url=http://my-sonarqube-sonarqube.sonarqube.svc.cluster.local:9000 \
                          -Dsonar.login=sqp_23bc67fb7f5ada4327208dd40e2f16bea7840893
                    '''
                }
            }
        }

        /* ---------------------- DOCKER LOGIN & PUSH ----------------------- */
        stage('Push to Nexus') {
            steps {
                container('dind') {
                    sh '''
                        echo "Logging into Nexus..."
                        docker login $REGISTRY -u admin -p Changeme@2025

                        echo "Tagging image..."
                        docker tag $IMAGE:$VERSION $REGISTRY/$IMAGE:$VERSION

                        echo "Pushing image..."
                        docker push $REGISTRY/$IMAGE:$VERSION
                    '''
                }
            }
        }

        /* ---------------------- DEPLOY TO K8S ----------------------------- */
        stage('Deploy to Kubernetes') {
            steps {
                container('kubectl') {
                    sh """
                        echo "Deploying RedNet to Kubernetes namespace 2401069..."
                        
                        export IMAGE_TAG=$VERSION
                        envsubst < k8s/deployment.yaml | kubectl apply -f - -n 2401069

                        echo "Waiting for deployment..."
                        kubectl rollout status deployment/rednet-deployment -n 2401069 --timeout=5m
                    """
                }
            }
        }
    }
}