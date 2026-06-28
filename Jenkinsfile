pipeline {
    agent any

    stages {

        stage('Checkout Code') {
            steps {
                echo 'Downloading latest code from GitHub...'
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing npm packages...'
                bat 'npm ci'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                echo 'Installing Playwright browsers...'
                bat 'npx playwright install'
            }
        }

        stage('Run Automation Tests') {
            steps {
                echo 'Executing Playwright tests...'
                bat 'npm run apiTests'
            }
        }
    }

    post {

        always {
            publishHTML([
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright Report'
            ])
        }

        success {
            echo 'Build executed successfully.'
        }

        failure {
            echo 'Build failed. Please check the console logs.'
        }
    }
}