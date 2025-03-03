
from django.test import TestCase, Client
from django.urls import reverse
from datetime import datetime
from rest_framework.test import APITestCase

class EnergyDataAPITest(APITestCase):
    def setUp(self):
        self.url = reverse('energy_data')  # Ensure your URL name matches in urls.py
    
    # test to insure that we get correct data response upon filtering
    def test_response_structure(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn('total_consumption', data)
        self.assertIn('top_consumers', data)
        self.assertIn('total_consumers', data)
        self.assertIn('unique_names', data)
    
    #test for filtering by date 
    def test_filtering_by_date(self):
        response = self.client.get(self.url, {'start_date': '2024-01-01', 'end_date': '2024-02-01'})
        data = response.json()
        for entry in data['total_consumption']:
            entry_date = datetime.strptime(entry['timestamp'], "%Y-%m-%d")
            self.assertTrue(datetime(2024, 1, 1) <= entry_date <= datetime(2024, 2, 1))
    
    #testing the pagination
    def test_pagination(self):
        response = self.client.get(self.url, {'page': 1, 'page_size': 2})
        data = response.json()
        self.assertLessEqual(len(data['top_consumers']), 2)
