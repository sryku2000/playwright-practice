npx playwright test --project chromium

$jsonFilePath = "C:\Users\Eason\Documents\Workspace\angular-will\playwright-demo\test-results.json"
$jsonContent = Get-Content -Raw -Path $jsonFilePath | ConvertFrom-Json
$token = ""
$message = "檢查時間: $(Get-Date)，共$($jsonContent.suites[0].specs.Count)個項目"
$url = "https://notify-api.line.me/api/notify"
$headers = @{
    "Authorization" = "Bearer $token"
}
$body = @{
    "message" = $message
}
Invoke-RestMethod -Uri $url -Method Post -Headers $headers -Body $body
foreach ($spec in $jsonContent.suites[0].specs) {
    #如果status 為 passed再將結果Write-Host出來
    if ($spec.tests[0].results[0].status -eq "passed") {
        Write-Host "Spec: $($spec.title)"
        Write-Host "Status: $($spec.tests[0].results[0].status)"
        #使用curl will send message to line notify
        $message = "$($spec.title) 可以訂了，https://bluemagpieresort.rezio.shop/zh-TW/product/Bbookingroom"
        $body = @{
            "message" = $message
        }
        Invoke-RestMethod -Uri $url -Method Post -Headers $headers -Body $body
    }
}