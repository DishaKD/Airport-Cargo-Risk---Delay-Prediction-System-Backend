# Customs Service API Test Script (PowerShell)
# Tests all 6 endpoints with sample data

$BASE_URL = "http://localhost:5005/api/customs"
$HEALTH_URL = "http://localhost:5005/health"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Customs Service API Testing" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Helper function to print test results
function Print-TestResult {
    param(
        [string]$TestName,
        [string]$Status,
        [object]$Response
    )
    
    if ($Status -eq "PASS") {
        Write-Host "✓ $TestName" -ForegroundColor Green
    } else {
        Write-Host "✗ $TestName" -ForegroundColor Red
    }
    
    Write-Host "Response:" -ForegroundColor Gray
    Write-Host ($Response | ConvertTo-Json -Depth 3) -ForegroundColor Gray
    Write-Host ""
}

# Wait for server to be ready
Write-Host "[1/8] Waiting for server to be ready..." -ForegroundColor Blue
$retries = 0
$maxRetries = 30
while ($retries -lt $maxRetries) {
    try {
        $response = Invoke-WebRequest -Uri $HEALTH_URL -UseBasicParsing
        if ($response.StatusCode -eq 200) {
            Write-Host "✓ Server is ready" -ForegroundColor Green
            break
        }
    } catch {
        # Server not ready yet
    }
    
    if ($retries -eq $maxRetries - 1) {
        Write-Host "✗ Server did not start" -ForegroundColor Red
        exit 1
    }
    
    $retries++
    Start-Sleep -Seconds 1
}
Write-Host ""

# Test 1: GET /api/customs (Get all records)
Write-Host "[2/8] Test 1: GET /api/customs (Get All Records)" -ForegroundColor Blue
try {
    $response = Invoke-WebRequest -Uri $BASE_URL -UseBasicParsing
    $data = $response.Content | ConvertFrom-Json
    
    Write-Host "Response:" -ForegroundColor Gray
    Write-Host ($data | ConvertTo-Json) -ForegroundColor Gray
    
    if ($data.success -eq $true) {
        Write-Host "✓ PASS" -ForegroundColor Green
        if ($data.data -and $data.data.Count -gt 0) {
            $recordId = $data.data[0].id
            Write-Host "Found $(($data.data).Count) records. Using ID: $recordId" -ForegroundColor Gray
        }
    } else {
        Write-Host "✗ FAIL" -ForegroundColor Red
    }
} catch {
    Write-Host "✗ FAIL - $($_.Exception.Message)" -ForegroundColor Red
    $data = $null
}
Write-Host ""

# Test 2: GET /api/customs/{id} (Get by ID)
Write-Host "[3/8] Test 2: GET /api/customs/{id} (Get by ID)" -ForegroundColor Blue
if ($recordId) {
    try {
        $response = Invoke-WebRequest -Uri "$BASE_URL/$recordId" -UseBasicParsing
        $getByIdData = $response.Content | ConvertFrom-Json
        
        Write-Host "Response:" -ForegroundColor Gray
        Write-Host ($getByIdData | ConvertTo-Json) -ForegroundColor Gray
        
        if ($getByIdData.success -eq $true) {
            Write-Host "✓ PASS" -ForegroundColor Green
        } else {
            Write-Host "✗ FAIL" -ForegroundColor Red
        }
    } catch {
        Write-Host "✗ FAIL - $($_.Exception.Message)" -ForegroundColor Red
    }
} else {
    Write-Host "✗ SKIP - No record ID available" -ForegroundColor Yellow
}
Write-Host ""

# Test 3: POST /api/customs (Create new record)
Write-Host "[4/8] Test 3: POST /api/customs (Create New Record)" -ForegroundColor Blue
try {
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $createPayload = @{
        cargoId = "CARGO-TEST-$(Get-Random -Minimum 1000 -Maximum 9999)"
        notes = "Test record created at $timestamp"
        delayReason = "Testing new record creation"
    } | ConvertTo-Json
    
    Write-Host "Payload:" -ForegroundColor Gray
    Write-Host $createPayload -ForegroundColor Gray
    
    $response = Invoke-WebRequest -Uri $BASE_URL -Method Post `
        -Headers @{"Content-Type"="application/json"} `
        -Body $createPayload `
        -UseBasicParsing
    
    $createData = $response.Content | ConvertFrom-Json
    
    Write-Host "Response:" -ForegroundColor Gray
    Write-Host ($createData | ConvertTo-Json) -ForegroundColor Gray
    
    if ($createData.success -eq $true) {
        Write-Host "✓ PASS" -ForegroundColor Green
        $newRecordId = $createData.data.id
        Write-Host "Created record with ID: $newRecordId" -ForegroundColor Gray
    } else {
        Write-Host "✗ FAIL" -ForegroundColor Red
    }
} catch {
    Write-Host "✗ FAIL - $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# Test 4: PUT /api/customs/{id} (Update record)
Write-Host "[5/8] Test 4: PUT /api/customs/{id} (Update Record)" -ForegroundColor Blue
if ($newRecordId) {
    try {
        $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
        $updatePayload = @{
            clearanceStatus = "UNDER_INSPECTION"
            riskLevel = "MEDIUM"
            notes = "Updated via API test at $timestamp"
        } | ConvertTo-Json
        
        Write-Host "Payload:" -ForegroundColor Gray
        Write-Host $updatePayload -ForegroundColor Gray
        
        $response = Invoke-WebRequest -Uri "$BASE_URL/$newRecordId" -Method Put `
            -Headers @{"Content-Type"="application/json"} `
            -Body $updatePayload `
            -UseBasicParsing
        
        $updateData = $response.Content | ConvertFrom-Json
        
        Write-Host "Response:" -ForegroundColor Gray
        Write-Host ($updateData | ConvertTo-Json -Depth 3) -ForegroundColor Gray
        
        if ($updateData.success -eq $true) {
            Write-Host "✓ PASS" -ForegroundColor Green
        } else {
            Write-Host "✗ FAIL" -ForegroundColor Red
        }
    } catch {
        Write-Host "✗ FAIL - $($_.Exception.Message)" -ForegroundColor Red
    }
} else {
    Write-Host "✗ SKIP - No new record ID" -ForegroundColor Yellow
}
Write-Host ""

# Test 5: POST /api/customs/{id}/inspect (Simulate inspection)
Write-Host "[6/8] Test 5: POST /api/customs/{id}/inspect (Simulate Inspection)" -ForegroundColor Blue
if ($newRecordId) {
    try {
        $inspectPayload = @{
            clearanceStatus = "CLEARED"
            riskLevel = "LOW"
            notes = "Inspection completed successfully"
            delayReason = $null
        } | ConvertTo-Json
        
        Write-Host "Payload:" -ForegroundColor Gray
        Write-Host $inspectPayload -ForegroundColor Gray
        
        $response = Invoke-WebRequest -Uri "$BASE_URL/$newRecordId/inspect" -Method Post `
            -Headers @{"Content-Type"="application/json"} `
            -Body $inspectPayload `
            -UseBasicParsing
        
        $inspectData = $response.Content | ConvertFrom-Json
        
        Write-Host "Response:" -ForegroundColor Gray
        Write-Host ($inspectData | ConvertTo-Json -Depth 3) -ForegroundColor Gray
        
        if ($inspectData.success -eq $true) {
            Write-Host "✓ PASS" -ForegroundColor Green
        } else {
            Write-Host "✗ FAIL" -ForegroundColor Red
        }
    } catch {
        Write-Host "✗ FAIL - $($_.Exception.Message)" -ForegroundColor Red
    }
} else {
    Write-Host "✗ SKIP - No new record ID" -ForegroundColor Yellow
}
Write-Host ""

# Test 6: DELETE /api/customs/{id} (Delete record)
Write-Host "[7/8] Test 6: DELETE /api/customs/{id} (Delete Record)" -ForegroundColor Blue
if ($newRecordId) {
    try {
        $response = Invoke-WebRequest -Uri "$BASE_URL/$newRecordId" -Method Delete `
            -Headers @{"Content-Type"="application/json"} `
            -UseBasicParsing
        
        $deleteData = $response.Content | ConvertFrom-Json
        
        Write-Host "Response:" -ForegroundColor Gray
        Write-Host ($deleteData | ConvertTo-Json) -ForegroundColor Gray
        
        if ($deleteData.success -eq $true) {
            Write-Host "✓ PASS" -ForegroundColor Green
        } else {
            Write-Host "✗ FAIL" -ForegroundColor Red
        }
    } catch {
        Write-Host "✗ FAIL - $($_.Exception.Message)" -ForegroundColor Red
    }
} else {
    Write-Host "✗ SKIP - No new record ID" -ForegroundColor Yellow
}
Write-Host ""

# Summary
Write-Host "[8/8] Test Summary" -ForegroundColor Blue
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "All tests completed!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
