from django.shortcuts import render
from django.http import JsonResponse
from datetime import datetime

def energy_data(request):
    # Mock data (adjust as needed)
    data = {
        "total_consumption": [
            {"timestamp": "2025-01-01", "value": 1200},
            {"timestamp": "2025-01-02", "value": 1250},
        ],
        "top_consumers": [
            {"name": "Factory A", "consumption": 500},
            {"name": "Building B", "consumption": 300},
            {"name": "Office C", "consumption": 200},
        ]
    }
    return JsonResponse(data)