#!/bin/bash

# CurioLife API Test Script
# This script tests all API endpoints to verify they're working

echo "=================================="
echo "CurioLife API Testing Script"
echo "=================================="
echo ""

BASE_URL="http://localhost:1337/api"

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to test an endpoint
test_endpoint() {
    local endpoint=$1
    local name=$2

    echo -n "Testing $name... "

    response=$(curl -s -w "\n%{http_code}" "$BASE_URL$endpoint")
    http_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | sed '$d')

    if [ "$http_code" -eq 200 ]; then
        echo -e "${GREEN}✓ OK${NC} (HTTP $http_code)"

        # Check if response has data array
        has_data=$(echo "$body" | grep -o '"data"' | head -1)
        if [ -n "$has_data" ]; then
            count=$(echo "$body" | grep -o '"data":\[' | wc -l)
            if [ "$count" -gt 0 ]; then
                echo "  → Response contains data array"
            fi
        fi
    else
        echo -e "${RED}✗ FAILED${NC} (HTTP $http_code)"
        echo "  Response: $body"
    fi
    echo ""
}

# Check if server is running
echo "Checking if Strapi is running..."
if curl -s -o /dev/null -w "%{http_code}" "http://localhost:1337" | grep -q "200\|302"; then
    echo -e "${GREEN}✓ Strapi is running${NC}"
    echo ""
else
    echo -e "${RED}✗ Strapi is not running${NC}"
    echo "Please start Strapi with: npm run develop"
    exit 1
fi

# Test all endpoints
echo "Testing API Endpoints:"
echo "----------------------"
echo ""

test_endpoint "/devotionals" "Devotionals API"
test_endpoint "/prayers" "Prayers API"
test_endpoint "/studies" "Studies API"
test_endpoint "/challenges" "Challenges API"

echo "=================================="
echo "Testing Complete!"
echo "=================================="
echo ""
echo -e "${YELLOW}Note:${NC} Empty data arrays are normal if no content has been created yet."
echo "To add content:"
echo "  1. Go to http://localhost:1337/admin"
echo "  2. Create and publish content"
echo "  3. Run this script again"
echo ""
echo "For detailed API examples, see: API_TESTING.md"
