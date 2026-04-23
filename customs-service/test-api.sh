#!/usr/bin/env bash

# Customs Service Test Script
# Tests all 6 endpoints with sample data

BASE_URL="http://localhost:5005/api/customs"
RESULTS_FILE="test-results.json"

echo "========================================"
echo "Customs Service API Testing"
echo "========================================"
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Track results
declare -a RESULTS

# Helper function to print test results
print_result() {
    local test_name=$1
    local status=$2
    local response=$3
    
    if [ "$status" == "✓" ]; then
        echo -e "${GREEN}${status} ${test_name}${NC}"
    else
        echo -e "${RED}${status} ${test_name}${NC}"
    fi
    echo "Response: $response"
    echo ""
}

# Wait for server to be ready
echo -e "${BLUE}[1/8] Waiting for server to be ready...${NC}"
for i in {1..30}; do
    if curl -s http://localhost:5005/health > /dev/null; then
        echo "✓ Server is ready"
        break
    fi
    if [ $i -eq 30 ]; then
        echo "✗ Server did not start"
        exit 1
    fi
    sleep 1
done
echo ""

# Test 1: GET /api/customs (Get all records)
echo -e "${BLUE}[2/8] Test 1: GET /api/customs (Get All Records)${NC}"
RESPONSE=$(curl -s -X GET "$BASE_URL" \
    -H "Content-Type: application/json")
echo "Response: $RESPONSE"
if echo "$RESPONSE" | grep -q '"success":true'; then
    echo -e "${GREEN}✓ PASS${NC}"
else
    echo -e "${RED}✗ FAIL${NC}"
fi
echo ""

# Extract first record ID for subsequent tests
RECORD_ID=$(echo "$RESPONSE" | grep -o '"id":"[^"]*' | head -1 | cut -d'"' -f4)
echo "Using record ID: $RECORD_ID"
echo ""

# Test 2: GET /api/customs/{id} (Get by ID)
echo -e "${BLUE}[3/8] Test 2: GET /api/customs/{id} (Get by ID)${NC}"
if [ ! -z "$RECORD_ID" ]; then
    RESPONSE=$(curl -s -X GET "$BASE_URL/$RECORD_ID" \
        -H "Content-Type: application/json")
    echo "Response: $RESPONSE"
    if echo "$RESPONSE" | grep -q '"success":true'; then
        echo -e "${GREEN}✓ PASS${NC}"
    else
        echo -e "${RED}✗ FAIL${NC}"
    fi
else
    echo -e "${RED}✗ SKIP - No record ID available${NC}"
fi
echo ""

# Test 3: POST /api/customs (Create new record)
echo -e "${BLUE}[4/8] Test 3: POST /api/customs (Create New Record)${NC}"
CREATE_PAYLOAD=$(cat <<EOF
{
  "cargoId": "CARGO-TEST-$(date +%s)",
  "notes": "Test record created at $(date)",
  "delayReason": "Testing new record creation"
}
EOF
)
RESPONSE=$(curl -s -X POST "$BASE_URL" \
    -H "Content-Type: application/json" \
    -d "$CREATE_PAYLOAD")
echo "Payload: $CREATE_PAYLOAD"
echo "Response: $RESPONSE"
if echo "$RESPONSE" | grep -q '"success":true'; then
    echo -e "${GREEN}✓ PASS${NC}"
    NEW_RECORD_ID=$(echo "$RESPONSE" | grep -o '"id":"[^"]*' | head -1 | cut -d'"' -f4)
else
    echo -e "${RED}✗ FAIL${NC}"
fi
echo ""

# Test 4: PUT /api/customs/{id} (Update record)
echo -e "${BLUE}[5/8] Test 4: PUT /api/customs/{id} (Update Record)${NC}"
if [ ! -z "$NEW_RECORD_ID" ]; then
    UPDATE_PAYLOAD=$(cat <<EOF
{
  "clearanceStatus": "UNDER_INSPECTION",
  "riskLevel": "MEDIUM",
  "notes": "Updated via API test at $(date)"
}
EOF
)
    RESPONSE=$(curl -s -X PUT "$BASE_URL/$NEW_RECORD_ID" \
        -H "Content-Type: application/json" \
        -d "$UPDATE_PAYLOAD")
    echo "Payload: $UPDATE_PAYLOAD"
    echo "Response: $RESPONSE"
    if echo "$RESPONSE" | grep -q '"success":true'; then
        echo -e "${GREEN}✓ PASS${NC}"
    else
        echo -e "${RED}✗ FAIL${NC}"
    fi
else
    echo -e "${RED}✗ SKIP - No new record ID${NC}"
fi
echo ""

# Test 5: POST /api/customs/{id}/inspect (Simulate inspection)
echo -e "${BLUE}[6/8] Test 5: POST /api/customs/{id}/inspect (Simulate Inspection)${NC}"
if [ ! -z "$NEW_RECORD_ID" ]; then
    INSPECT_PAYLOAD=$(cat <<EOF
{
  "clearanceStatus": "CLEARED",
  "riskLevel": "LOW",
  "notes": "Inspection completed successfully",
  "delayReason": null
}
EOF
)
    RESPONSE=$(curl -s -X POST "$BASE_URL/$NEW_RECORD_ID/inspect" \
        -H "Content-Type: application/json" \
        -d "$INSPECT_PAYLOAD")
    echo "Payload: $INSPECT_PAYLOAD"
    echo "Response: $RESPONSE"
    if echo "$RESPONSE" | grep -q '"success":true'; then
        echo -e "${GREEN}✓ PASS${NC}"
    else
        echo -e "${RED}✗ FAIL${NC}"
    fi
else
    echo -e "${RED}✗ SKIP - No new record ID${NC}"
fi
echo ""

# Test 6: DELETE /api/customs/{id} (Delete record)
echo -e "${BLUE}[7/8] Test 6: DELETE /api/customs/{id} (Delete Record)${NC}"
if [ ! -z "$NEW_RECORD_ID" ]; then
    RESPONSE=$(curl -s -X DELETE "$BASE_URL/$NEW_RECORD_ID" \
        -H "Content-Type: application/json")
    echo "Response: $RESPONSE"
    if echo "$RESPONSE" | grep -q '"success":true'; then
        echo -e "${GREEN}✓ PASS${NC}"
    else
        echo -e "${RED}✗ FAIL${NC}"
    fi
else
    echo -e "${RED}✗ SKIP - No new record ID${NC}"
fi
echo ""

echo -e "${BLUE}[8/8] Test Summary${NC}"
echo "========================================"
echo -e "${GREEN}All tests completed!${NC}"
echo "========================================"
