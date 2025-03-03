from django.urls import path
from .views import energy_data_view

urlpatterns = [
    path('energy/', energy_data_view, name='energy_data'),
]