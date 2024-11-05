# Database Views - Overview and Example

## What is a View in SQL?
A **View** is a virtual table in SQL, defined by a query. It allows you to abstract and simplify complex data structures, hide sensitive data, and enhance security by showing only specific columns or records. Views are particularly useful for data abstraction and making frequently used complex queries more manageable.

## Why Use Views?
Views solve several problems in databases, including:
1. **Data Abstraction**: Hide sensitive or unnecessary columns from certain users.
2. **Simplification of Complex Queries**: Simplifies access to complex joins or filters by encapsulating them in a view.
3. **Data Consistency and Reusability**: Reusable structure that centralizes commonly-used queries.
4. **Access Control**: Limits user access to specific columns or filtered data.

## Creating a View

### Syntax
```sql
CREATE VIEW view_name AS
SELECT column1, column2, ...
FROM table_name
WHERE condition;
```
**view_nam**e: The name of the view.
**SELECT column1, column2, ...**: Columns to be included in the view.
**table_name**: Source table for data in the view.
**WHERE condition**: Optional condition for filtering data.

Example
Suppose we have an Employees table with columns id, name, department, salary, and age. To create a view that shows only name and department, we can write:

```
CREATE VIEW EmployeeView AS
SELECT name, department
FROM Employees;
```
Now, accessing EmployeeView will return only the name and department columns, hiding sensitive information like salary.

## Rules for Creating Views
**Unique Name**: Ensure the view name is unique within the database to avoid conflicts.
**Column Names**: Use aliases if using calculated fields or aggregate functions to clarify column names.

```
CREATE VIEW DepartmentSalary AS
SELECT department, AVG(salary) AS avg_salary
FROM Employees
GROUP BY department;
```

**Read-Only by Default**: Most views are read-only, especially if they involve joins, aggregates, or calculations.
**Data Integrity**: A view is dependent on its underlying tables; modifications to these tables (like renaming columns) may break the view.
**Performance Impact**: Complex views with multiple joins or aggregations can impact database performance, especially on large datasets.
**Permissions**: Assign permissions to views as needed to control access to specific data.

```
GRANT SELECT ON EmployeeView TO manager_role;
```

**Avoid ORDER BY Clause:** Avoid using ORDER BY in views; instead, use it when retrieving data from the view.
```
SELECT * FROM EmployeeView ORDER BY name;
```
**WITH CHECK OPTION**: Ensures that any modifications through the view adhere to the view’s WHERE clause.
```
CREATE VIEW HighSalaryEmployees AS
SELECT name, salary
FROM Employees
WHERE salary > 50000
WITH CHECK OPTION;
```

using view in django
# Step 1: Set Up the Model (Optional)
In Django, you can create a model for the view if it has a stable structure, allowing you to use Django's ORM.

```
from django.db import models

class EmployeeView(models.Model):
    name = models.CharField(max_length=100)
    department = models.CharField(max_length=100)

    class Meta:
        managed = False  # No migrations for this model as it's a view
        db_table = 'EmployeeView'  # Use the name of your database view

```
# Step 2: Query the View in a View Function
In Django views, query the model as if it were a regular table.

```
# views.py
from django.http import JsonResponse
from .models import EmployeeView

def employee_list(request):
    employees = EmployeeView.objects.all()
    data = list(employees.values())  # Convert to list of dictionaries
    return JsonResponse(data, safe=False)

```
# Step 3: Map the URL
Map the view function in your urls.py.
```
# urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('employees/', views.employee_list, name='employee_list'),
]
```

## Alternative: Using Raw SQL in Django
If you don’t want to define a model, you can use raw SQL in Django.
``` 
from django.db import connection
from django.http import JsonResponse

def employee_list_raw(request):
    with connection.cursor() as cursor:
        cursor.execute("SELECT * FROM EmployeeView")
        columns = [col[0] for col in cursor.description]
        results = [dict(zip(columns, row)) for row in cursor.fetchall()]
    return JsonResponse(results, safe=False)

```