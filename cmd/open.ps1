# You can set your browser here.
$browser = "chrome"

Write-Output "Opening $($browser.Substring(0,1).ToUpper() + $browser.Substring(1).ToLower()) tab..."
Start-Process $browser "http://localhost:8080/"