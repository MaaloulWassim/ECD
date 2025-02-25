from django.urls import path
from .views import energy_data

urlpatterns = [
    path('energy/', energy_data, name='energy-data'),
]