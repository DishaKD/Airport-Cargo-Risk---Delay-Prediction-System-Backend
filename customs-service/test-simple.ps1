# Customs Service API Test Script

$BASE_URL = "http://localhost:5005/api/customs"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Customs Service API Testing" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Test 1: GET /api/customs (Get all records)
Write-Host "[1/6] GET /api/customs - Get All Records" -ForegroundColor Blue
Write-Host "Sending GET request to $BASE_URL" -ForegroundColor Gray
$response = Invoke-WebRequest -Uri $BASE_URL -UseBasicParsing
$data = $response.Content | ConvertFrom-Json
Write-Host "Status: $($response.StatusCode)" -ForegroundColor Green
Write-Host ($data | ConvertTo-Json -Depth 2) -ForegroundColor Yellow
$recordId = $data.data[0].id
$newRecordId = $null
Write-Host ""

# Test 2: GET /api/customs/{id} (Get by ID)
Write-Host "[2/6] GET /api/customs/{id} - Get by ID" -ForegroundColor Blue
if ($recordId) {
    Write-Host "Using record ID: $recordId" -ForegroundColor Gray
    $response = Invoke-WebRequest -Uri "$BASE_URL/$recordId" -UseBasicParsing
    $data = $response.Content | ConvertFrom-Json
    Write-Host "Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host ($data | ConvertTo-Json -Depth 2) -ForegroundColor Yellow
} else {
    Write-Host "SKIP - No record available" -ForegroundColor Yellow
}
Write-Host ""

# Test 3: POST /api/customs (Create new record)
Write-Host "[3/6] POST /api/customs - Create New Record" -ForegroundColor Blue
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
$createPayload = @{
    cargoId = "CARGO-API-TEST-$(Get-Random -Minimum 1000 -Maximum 9999)"
    notes = "API Test record - $timestamp"
    delayReason = "Testing new record creation"
} | ConvertTo-Json

Write-Host "Sending payload:" -ForegroundColor Gray
Write-Host $createPayload -ForegroundColor Gray
$response = Invoke-WebRequest -Uri $BASE_URL -Method Post -Headers @{"Content-Type"="application/json"} -Body $createPayload -UseBasicParsing
$data = $response.Content | ConvertFrom-Json
Write-Host "Status: $($response.StatusCode)" -ForegroundColor Green
Write-Host ($data | ConvertTo-Json -Depth 2) -ForegroundColor Yellow
$newRecordId = $data.data.id
Write-Host ""

# Test 4: PUT /api/customs/{id} (Update record)
Write-Host "[4/6] PUT /api/customs/{id} - Update Record" -ForegroundColor Blue
if ($newRecordId) {
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $updatePayload = @{
        clearanceStatus = "UNDER_INSPECTION"
        riskLevel = "MEDIUM"
        notes = "Updated via API test - $timestamp"
    } | ConvertTo-Json
    
    Write-Host "Using record ID: $newRecordId" -ForegroundColor Gray
    Write-Host "Sending payload:" -ForegroundColor Gray
    Write-Host $updatePayload -ForegroundColor Gray
    $response = Invoke-WebRequest -Uri "$BASE_URL/$newRecordId" -Method Put -Headers @{"Content-Type"="application/json"} -Body $updatePayload -UseBasicParsing
    $data = $response.Content | ConvertFrom-Json
    Write-Host "Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host ($data | ConvertTo-Json -Depth 2) -ForegroundColor Yellow
} else {
    Write-Host "SKIP - No new record created" -ForegroundColor Yellow
}
Write-Host ""

# Test 5: PUT /api/customs/{id}/inspect (Simulate inspection)
Write-Host "[5/6] PUT /api/customs/{id}/inspect - Simulate Inspection" -ForegroundColor Blue
if ($newRecordId) {
    $inspectPayload = @{
        clearanceStatus = "CLEARED"
        riskLevel = "LOW"
        notes = "Inspection completed successfully"
        delayReason = $null
    } | ConvertTo-Json
    
    Write-Host "Using record ID: $newRecordId" -ForegroundColor Gray
    Write-Host "Sending payload:" -ForegroundColor Gray
    Write-Host $inspectPayload -ForegroundColor Gray
    $response = Invoke-WebRequest -Uri "$BASE_URL/$newRecordId/inspect" -Method Put -Headers @{"Content-Type"="application/json"} -Body $inspectPayload -UseBasicParsing
    $data = $response.Content | ConvertFrom-Json
    Write-Host "Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host ($data | ConvertTo-Json -Depth 2) -ForegroundColor Yellow
} else {
    Write-Host "SKIP - No new record created" -ForegroundColor Yellow
}
Write-Host ""

# Test 6: DELETE /api/customs/{id} (Delete record)
Write-Host "[6/6] DELETE /api/customs/{id} - Delete Record" -ForegroundColor Blue
if ($newRecordId) {
    Write-Host "Using record ID: $newRecordId" -ForegroundColor Gray
    $response = Invoke-WebRequest -Uri "$BASE_URL/$newRecordId" -Method Delete -UseBasicParsing
    $data = $response.Content | ConvertFrom-Json
    Write-Host "Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host ($data | ConvertTo-Json -Depth 2) -ForegroundColor Yellow
} else {
    Write-Host "SKIP - No new record created" -ForegroundColor Yellow
}
Write-Host ""

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "All tests completed!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
