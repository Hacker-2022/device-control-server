@echo off
echo Setting up GitHub repository...

REM Configure Git identity if not set
echo Please enter your GitHub email:
set /p GITHUB_EMAIL=
echo Please enter your GitHub username:
set /p GITHUB_USERNAME=

REM Set Git configuration
git config --global user.email "%GITHUB_EMAIL%"
git config --global user.name "%GITHUB_USERNAME%"

REM Initialize Git repository (only if not already initialized)
if not exist .git (
    git init
)

REM Add all files
git add .

REM Create initial commit
git commit -m "Initial commit: Device Control Server"

REM Add GitHub remote
git remote add origin https://github.com/%GITHUB_USERNAME%/device-control-server.git

REM Create main branch if it doesn't exist
git branch -M main

REM Push to GitHub
git push -u origin main

echo Setup complete! Check your GitHub repository.
pause
