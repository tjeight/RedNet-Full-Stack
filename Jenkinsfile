pipeline {
    agent any

environment {
    SSH_CREDENTIALS = 'aws-ssh-key'         // use the credential id you added in Jenkins
    DEPLOY_USER = "ubuntu"
    DEPLOY_HOST = "http://100.27.254.8/" // replace with actual public IP (or use Jenkins credential/param)
    APP_DIR = "/home/ubuntu/rednet-app"
    CONTAINER_NAME = "rednet_nextjs"
    ENV_PATH = "/home/ubuntu/rednet-app/.env.production"
}


    stages {

        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Send Code to EC2') {
            steps {
                sshagent([SSH_CREDENTIALS]) {
                    sh """
                        ssh -o StrictHostKeyChecking=no $DEPLOY_USER@$DEPLOY_HOST '
                            mkdir -p $APP_DIR
                        '
                        rsync -avz --exclude=node_modules --exclude=.next --delete ./ $DEPLOY_USER@$DEPLOY_HOST:$APP_DIR
                    """
                }
            }
        }

        stage('Build Docker Image & Deploy on EC2') {
            steps {
                sshagent([SSH_CREDENTIALS]) {
                    sh """
                        ssh -o StrictHostKeyChecking=no $DEPLOY_USER@$DEPLOY_HOST '
                            cd $APP_DIR

                            echo "Building Docker image on EC2..."
                            docker build -t $CONTAINER_NAME .

                            echo "Stopping old container..."
                            docker stop $CONTAINER_NAME || true
                            docker rm $CONTAINER_NAME || true

                            echo "Starting new container..."
                            docker run -d \
                                --name $CONTAINER_NAME \
                                --env-file $ENV_PATH \
                                -p 3000:3000 \
                                $CONTAINER_NAME
                        '
                    """
                }
            }
        }
    }

    post {
        success {
            echo "🚀 Deployment complete!"
        }
        failure {
            echo "❌ Deployment failed!"
        }
    }
}
