from django.http import JsonResponse
from datetime import datetime
from .data import energy_data

def energy_data_view(request):
    # Extract query parameters
    start_date = request.GET.get('start_date')
    end_date = request.GET.get('end_date')
    energy_form = request.GET.get('energy_form')
    system_type = request.GET.get('system_type')
    name = request.GET.get('name')
    page = int(request.GET.get('page', 1))  
    page_size = int(request.GET.get('page_size', 4)) 

    # Filter total_consumption data
    filtered_total_consumption = []
    for entry in energy_data["total_consumption"]:
        entry_date = datetime.strptime(entry["timestamp"], "%Y-%m-%d")
        if (not start_date or entry_date >= datetime.strptime(start_date, "%Y-%m-%d")) and \
           (not end_date or entry_date <= datetime.strptime(end_date, "%Y-%m-%d")) and \
           (not energy_form or entry["energy_form"] == energy_form) and \
           (not system_type or entry["system_type"] == system_type) and \
           (not name or entry["name"] == name):
            filtered_total_consumption.append(entry)

    # Filter top_consumers data
    filtered_top_consumers = []
    for consumer in energy_data["top_consumers"]:
        if (not energy_form or consumer["energy_form"] == energy_form) and \
           (not system_type or consumer["system_type"] == system_type) and \
           (not name or consumer["name"] == name):
            filtered_top_consumers.append(consumer)

    # Paginate top_consumers
    start_index = (page - 1) * page_size
    end_index = start_index + page_size
    paginated_top_consumers = filtered_top_consumers[start_index:end_index]

    # Get unique names for dropdown
    unique_names = list(set(consumer["name"] for consumer in energy_data["top_consumers"]))

    return JsonResponse({
        "total_consumption": filtered_total_consumption,
        "top_consumers": paginated_top_consumers,
        "total_consumers": len(filtered_top_consumers), 
        "unique_names": unique_names 
    })