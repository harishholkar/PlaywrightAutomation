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
                bat 'npx playwright test'
            }
        }
    }

    post {

        always {
            echo 'Archiving Playwright report...'

            archiveArtifacts artifacts: 'playwright-report/**',
                               allowEmptyArchive: true,
                               fingerprint: true
        }

        success {
            echo 'Build executed successfully.'
        }

        failure {
            echo 'Build failed. Please check the console logs.'
        }
    }
}