export const Coupons = [
        {
            "id": 1,
            "code": "SAVE10",
            "type": "percentage",
            "value": 10,
            "description": "10% off your order",
            "minimumOrder": 50,
            "expiryDate": "2024-12-31",
            "isActive": true,
            "usageLimit": 100,
            "usedCount": 0
        },
        {
            "id": 2,
            "code": "FLAT20",
            "type": "fixed",
            "value": 20,
            "description": "$20 off your order",
            "minimumOrder": 100,
            "expiryDate": "2024-11-30",
            "isActive": true,
            "usageLimit": 50,
            "usedCount": 0
        },
        {
            "id": 3,
            "code": "FREESHIP",
            "type": "shipping",
            "value": 0,
            "description": "Free shipping on your order",
            "minimumOrder": 25,
            "expiryDate": "2024-10-31",
            "isActive": true,
            "usageLimit": 200,
            "usedCount": 0
        }
    ]
