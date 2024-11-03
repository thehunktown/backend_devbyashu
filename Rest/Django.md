
# CRUD Operations in Django

This document provides an overview of CRUD (Create, Read, Update, Delete) operations in Django, including the use of Django ORM for SQL databases and Django with NoSQL databases (using Django REST Framework with MongoDB).

## 1. SQL Databases (Using Django ORM)

### Model Definition Example
```python
from django.db import models

class User(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
```

### Create the database table
Run the following commands to create and apply migrations:
```bash
python manage.py makemigrations
python manage.py migrate
```

### CRUD Operations

- **Create**
  - **Single Item**: 
    ```python
    user = User.objects.create(name='John', email='john@example.com')
    ```
  - **Bulk**:
    ```python
    User.objects.bulk_create([
        User(name='Alice', email='alice@example.com'),
        User(name='Bob', email='bob@example.com')
    ])
    ```

- **Read**
  - **Single Item**: 
    ```python
    user = User.objects.get(id=1)  # Raises DoesNotExist if not found
    ```
  - **All Items**:
    ```python
    users = User.objects.all()
    ```
  - **Filter Items**:
    ```python
    users = User.objects.filter(name='John')
    ```

- **Update**
  - **Single Item**: 
    ```python
    user = User.objects.get(id=1)
    user.name = 'John Doe'
    user.save()
    ```
  - **Bulk**:
    ```python
    User.objects.filter(name='John').update(name='John Doe')
    ```

- **Delete**
  - **Single Item**: 
    ```python
    user = User.objects.get(id=1)
    user.delete()
    ```
  - **Bulk**:
    ```python
    User.objects.filter(name='John').delete()
    ```

## 2. NoSQL Databases (Using MongoDB with Django)

To use MongoDB with Django, you typically use the `djongo` or `mongoengine` package. Below are examples using `mongoengine`.

### Model Definition Example (using MongoDB with `mongoengine`)

```python
from mongoengine import Document, StringField

class User(Document):
    name = StringField(required=True)
    email = StringField(required=True)
```

### CRUD Operations

- **Create**
  - **Single Item**: 
    ```python
    user = User(name='John', email='john@example.com')
    user.save()
    ```
  - **Bulk**:
    ```python
    User.objects.insert([
        User(name='Alice', email='alice@example.com'),
        User(name='Bob', email='bob@example.com')
    ])
    ```

- **Read**
  - **Single Item**: 
    ```python
    user = User.objects.get(id='id_of_user')  # Raises DoesNotExist if not found
    ```
  - **All Items**:
    ```python
    users = User.objects.all()
    ```
  - **Filter Items**:
    ```python
    users = User.objects(name='John')
    ```

- **Update**
  - **Single Item**: 
    ```python
    user = User.objects.get(id='id_of_user')
    user.update(name='John Doe')
    ```
  - **Bulk**:
    ```python
    User.objects(name='John').update(set__name='John Doe')
    ```

- **Delete**
  - **Single Item**: 
    ```python
    user = User.objects.get(id='id_of_user')
    user.delete()
    ```
  - **Bulk**:
    ```python
    User.objects(name='John').delete()
    ```

---

## Summary of CRUD Operations in Django

| Database Type | Operation | Function                                     | Description                                       |
|---------------|-----------|----------------------------------------------|---------------------------------------------------|
| **SQL**       | Create    | `create()` / `bulk_create()`                | Insert single or multiple records into the DB.    |
|               | Read      | `get()` / `all()` / `filter()`              | Retrieve single or all records from the DB.       |
|               | Update    | `save()` / `update()`                       | Update single or multiple records in the DB.      |
|               | Delete    | `delete()`                                   | Remove single or multiple records from the DB.     |
| **NoSQL**     | Create    | `save()` / `insert()`                       | Insert single or multiple records into MongoDB.    |
|               | Read      | `get()` / `all()` / `filter()`              | Retrieve single or all records from MongoDB.      |
|               | Update    | `update()` / `set__<field_name>`           | Update single or multiple records in MongoDB.      |
|               | Delete    | `delete()`                                   | Remove single or multiple records from MongoDB.     |


## 3. Raw SQL Queries
# Specification:
Executes raw SQL queries using `raw()` method or `connection.cursor()`.
Offers the ability to write complex queries that may be difficult or inefficient to express with the ORM.
# Best Use Cases:
When performance is critical and specific SQL features are required.
For legacy systems where existing SQL queries need to be integrated.
# Single Entry:

```
from django.db import connection

with connection.cursor() as cursor:
    cursor.execute("INSERT INTO myapp_mymodel (field1, field2) VALUES (%s, %s)", ['value1', 'value2'])

```
# Multiple Entries:
```
with connection.cursor() as cursor:
    cursor.executemany("INSERT INTO myapp_mymodel (field1, field2) VALUES (%s, %s)", [
        ['value1', 'value2'],
        ['value3', 'value4'],
    ])
```

## 4. QuerySet API
# Specification:
Provides a high-level API for querying and manipulating the database.
Supports filtering, ordering, aggregating, and chaining operations.
# Best Use Cases:
When building complex queries that require filtering and aggregation.
For operations that need to handle large datasets efficiently with lazy loading.

# Filtering and Querying
Single Entry:
```
instance = MyModel.objects.filter(field1='value1').first()
```
Multiple Entries:
```instances = MyModel.objects.filter(field1='value1')
```
# Chaining Methods
Multiple Entries:
```instances = MyModel.objects.filter(field1='value1').exclude(field2='value2').order_by('field3')
```
## 5. Manager Methods
# Specification:
Custom managers allow the encapsulation of query logic.
Defined by creating a subclass of models.Manager.
# Best Use Cases:
When specific business logic needs to be reused across multiple queries.
For encapsulating frequently used query patterns.

# Custom Manager

Define in models.py:

```
from django.db import models

class MyModelManager(models.Manager):
    def custom_query(self):
        return self.filter(field1='value1')

class MyModel(models.Model):
    field1 = models.CharField(max_length=100)
    field2 = models.CharField(max_length=100)
    objects = MyModelManager()

```
Usage:

Single Entry:
```
instance = MyModel.objects.custom_query().first()
```
Multiple Entries:
```
instances = MyModel.objects.custom_query()
```

## 6. Model Methods

# Specification:
Methods can be added directly to models for business logic or data manipulation.
Allows for custom behavior that relates to the data in the model.
# Best Use Cases:
When the logic pertains specifically to a model's data and should be encapsulated with it.
For creating reusable methods that can be called on model instances.
# Define Methods:
```
class MyModel(models.Model):
    field1 = models.CharField(max_length=100)

    def my_method(self):
        return self.field1.upper()

```
Single Entry:

```
instance = MyModel.objects.get(id=1)
result = instance.my_method()
```

## 7. Signals

# Specification:
Allows decoupled applications to get notified when certain actions occur (e.g., saving, deleting).
Uses built-in signals such as `pre_save`, `post_save`, and `pre_delete`.
# Best Use Cases:
For triggering actions automatically without tightly coupling components.
When implementing event-driven architectures within Django applications.

# Define Signal:

```
from django.db.models.signals import post_save
from django.dispatch import receiver

@receiver(post_save, sender=MyModel)
def my_signal(sender, instance, created, **kwargs):
    if created:
        print(f'Created: {instance}')

```

## 8. Migrations
# Specification:
Handles schema changes over time through version-controlled migration files.
Provides commands to apply, rollback, or check the status of migrations.
# Best Use Cases:
When evolving database schemas in a collaborative environment.
For maintaining database consistency across different environments (development, staging, production).

Creating Migrations:
```
python manage.py makemigrations
```
Applying Migrations:
```
python manage.py migrate
```

## 9. Database Transactions

# Specification:
Provides methods to manage database transactions to ensure data integrity.
Supports atomic() context manager for grouping multiple database operations.
# Best Use Cases:
When performing multiple operations that must either all succeed or all fail.
For ensuring data consistency in complex multi-step processes.

using transactions
```
from django.db import transaction

with transaction.atomic():
    instance1 = MyModel(field1='value1')
    instance1.save()
    instance2 = MyModel(field1='value2')
    instance2.save()
```

## 10. Database Routers
# Specification:
Customizes how queries are directed to specific databases.
Allows for sharding or routing to read/write replicas.
# Best Use Cases:
For applications requiring multiple databases (e.g., multi-tenant architectures).
When specific models or queries need to be isolated from others.

Define a Router:

```
class MyAppRouter:
    def db_for_read(self, model, **hints):
        return 'my_database'

    def db_for_write(self, model, **hints):
        return 'my_database'

```
## 11. Caching

# Specification:
Caches database queries to improve performance.
Uses backends like Redis or Memcached for storing cache data.

# Best Use Cases:
When high-performance applications need to reduce database load.
For read-heavy applications where data doesn't change frequently.

```
from django.core.cache import cache

# Set cache
cache.set('my_key', 'my_value', timeout=60)

# Get cache
value = cache.get('my_key')

```

### 12.  database Association
# A one-to-one association in Django is created using the OneToOneField.

```
# models.py
from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField()

# Creating records
user = User.objects.create(username='Alice')
profile = Profile.objects.create(user=user, bio='Hello!')

```
# In Django, a one-to-many relationship is represented using a ForeignKey.

```
# models.py
class Post(models.Model):
    title = models.CharField(max_length=100)

class Comment(models.Model):
    post = models.ForeignKey(Post, related_name='comments', on_delete=models.CASCADE)
    content = models.TextField()

# Creating records
post = Post.objects.create(title='My First Post')
Comment.objects.create(post=post, content='Great post!')

```

# A many-to-many association means that records in one table can be associated with multiple records in another table and vice versa.
A Student can enroll in many Courses, and a Course can have many Students.

```
# models.py
class Student(models.Model):
    name = models.CharField(max_length=100)

class Course(models.Model):
    title = models.CharField(max_length=100)
    students = models.ManyToManyField(Student, related_name='courses')

# Creating records
student = Student.objects.create(name='Alice')
course = Course.objects.create(title='Math 101')
course.students.add(student)

```