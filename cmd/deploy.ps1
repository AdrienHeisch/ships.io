$confirmation = Read-Host "Deploy the 'deploy' branch to heroku ? (y/n) "
if ($confirmation -eq "y") {
    Exit
}

Invoke-Expression $PSScriptRoot"\build.ps1"

$currentBranch = (git rev-parse --abbrev-ref HEAD)

Set-Location (Get-Item $PSScriptRoot).Parent.FullName
git checkout deploy
Remove-Item -Path ".\*" -Recurse -Exclude ".\dist" ".\Procfile" ".\package.json" ".\package-lock.json" ".\cmd"
Move-Item -Path ".\dist\*" -Destination ".\"

git reset --hard origin/master

git checkout $currentBranch

Remove-Item -Path ".\cmd" -Recurse -Force