# Energy Consumption Dashboard

A full-stack dashboard for visualizing energy consumption data, built with:
- **Backend**: Django + Django REST Framework
- **Frontend**: React + Material-UI + Recharts

## Features
- View energy consumption over time with interactive charts.
- Filter data by energy form, system type, and date range.
- Compare energy consumption between two facilities.
- Paginated list of top energy consumers.


## Usage
- Use filters to select energy form, system type, and date range.

- View energy consumption trends in the chart.

- Compare energy usage between two facilities in Compare Mode.

- Browse the list of top energy consumers.

## Setup

### Backend (Django)
1. Navigate to the `api` folder:
   ```bash
   cd api ```

   ```bash 
   pip install -r requirements.txt```

   ```bash 
   python manage.py runserver ```

- API available at http://localhost:8000/api/energy/


### Frontend (React)
1- Navigate to the frontend folder:
   ```bash
   cd frontend```

2- Install dependencies:
   ```bash
   npm install```

3- Start the app:
   ```bash 
   npm start ```
   
- Access dashboard at http://localhost:3000

