
# CRUD Operations in Node.js

This document provides an overview of CRUD (Create, Read, Update, Delete) operations in Node.js using various techniques, including TypeORM, Mongoose, and Sequelize.

## 1. TypeORM (for SQL Databases)

### Model Definition Example
```typescript
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;
}
```

### CRUD Operations

- **Create**
  - **Single Item**: 
    ```typescript
    const user = this.userRepository.create({ name: 'John', email: 'john@example.com' });
    await this.userRepository.save(user);
    ```
  - **Bulk**:
    ```typescript
    const users = this.userRepository.create([
        { name: 'Alice', email: 'alice@example.com' },
        { name: 'Bob', email: 'bob@example.com' }
    ]);
    await this.userRepository.save(users);
    ```

- **Read**
  - **Single Item**: 
    ```typescript
    const user = await this.userRepository.findOne(id);
    ```
  - **All Items**:
    ```typescript
    const users = await this.userRepository.find();
    ```

- **Update**
  - **Single Item**: 
    ```typescript
    await this.userRepository.update(id, { name: 'John Doe' });
    ```
  - **Bulk** (using `save`):
    ```typescript
    const usersToUpdate = await this.userRepository.findByIds([1, 2, 3]);
    usersToUpdate.forEach(user => {
        user.name = 'Updated Name';
    });
    await this.userRepository.save(usersToUpdate);
    ```

- **Delete**
  - **Single Item**: 
    ```typescript
    await this.userRepository.delete(id);
    ```
  - **Bulk**:
    ```typescript
    await this.userRepository.delete([1, 2, 3]);
    ```

---

## 2. Mongoose (for MongoDB)

### Model Definition Example
```javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);
```

### CRUD Operations

- **Create**
  - **Single Item**: 
    ```javascript
    const user = new User({ name: 'John', email: 'john@example.com' });
    await user.save();
    ```
  - **Bulk**:
    ```javascript
    await User.insertMany([
        { name: 'Alice', email: 'alice@example.com' },
        { name: 'Bob', email: 'bob@example.com' }
    ]);
    ```

- **Read**
  - **Single Item**: 
    ```javascript
    const user = await User.findById(id);
    ```
  - **All Items**:
    ```javascript
    const users = await User.find();
    ```

- **Update**
  - **Single Item**: 
    ```javascript
    await User.findByIdAndUpdate(id, { name: 'John Doe' });
    ```
  - **Bulk**:
    ```javascript
    await User.updateMany({ /* filter criteria */ }, { $set: { name: 'Updated Name' } });
    ```

- **Delete**
  - **Single Item**: 
    ```javascript
    await User.findByIdAndDelete(id);
    ```
  - **Bulk**:
    ```javascript
    await User.deleteMany({ /* filter criteria */ });
    ```

---

## 3. Sequelize (for SQL Databases)

### Model Definition Example
```javascript
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql' // or 'postgres', 'sqlite', etc.
});

class User extends Model {}
User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING
}, { sequelize, modelName: 'user' });
```

### CRUD Operations

- **Create**
  - **Single Item**: 
    ```javascript
    const user = await User.create({ name: 'John', email: 'john@example.com' });
    ```
  - **Bulk**:
    ```javascript
    await User.bulkCreate([
        { name: 'Alice', email: 'alice@example.com' },
        { name: 'Bob', email: 'bob@example.com' }
    ]);
    ```

- **Read**
  - **Single Item**: 
    ```javascript
    const user = await User.findByPk(id);
    ```
  - **All Items**:
    ```javascript
    const users = await User.findAll();
    ```

- **Update**
  - **Single Item**: 
    ```javascript
    await User.update({ name: 'John Doe' }, { where: { id } });
    ```
  - **Bulk**:
    ```javascript
    await User.update({ name: 'Updated Name' }, { where: { /* filter criteria */ } });
    ```

- **Delete**
  - **Single Item**: 
    ```javascript
    await User.destroy({ where: { id } });
    ```
  - **Bulk**:
    ```javascript
    await User.destroy({ where: { /* filter criteria */ } });
    ```

---

## Summary of Techniques

| Technique    | Operation      | Function                                         | Description                                       |
|--------------|----------------|--------------------------------------------------|---------------------------------------------------|
| **TypeORM**  | Create         | `create()` / `save()` / `bulkCreate()`          | Insert single or multiple records into the DB.    |
|              | Read           | `findOne()` / `find()`                           | Retrieve single or all records from the DB.       |
|              | Update         | `update()` / `save()`                            | Update single or multiple records in the DB.      |
|              | Delete         | `delete()` / `deleteMany()`                      | Remove single or multiple records from the DB.     |
| **Mongoose** | Create         | `save()` / `insertMany()`                        | Insert single or multiple records into MongoDB.    |
|              | Read           | `findById()` / `find()`                          | Retrieve single or all records from MongoDB.      |
|              | Update         | `findByIdAndUpdate()` / `updateMany()`          | Update single or multiple records in MongoDB.      |
|              | Delete         | `findByIdAndDelete()` / `deleteMany()`          | Remove single or multiple records from MongoDB.     |
| **Sequelize**| Create         | `create()` / `bulkCreate()`                      | Insert single or multiple records into the DB.     |
|              | Read           | `findByPk()` / `findAll()`                       | Retrieve single or all records from the DB.       |
|              | Update         | `update()`                                       | Update single or multiple records in the DB.      |
|              | Delete         | `destroy()`                                      | Remove single or multiple records from the DB.     |

## 4. Knex.js (SQL Query Builder)
# Specification:
`Knex.js` is a flexible SQL query builder compatible with various SQL databases. It provides methods for constructing SQL queries dynamically.
# Use Cases:
Ideal for applications that need raw SQL flexibility while maintaining structured queries.
Suitable for complex applications requiring raw SQL queries with parameter binding.

Methods:

# Creating Records
Single Entry:
```
await knex('my_table').insert({ field1: 'value1', field2: 'value2' });
```
Multiple Entries:
```
await knex('my_table').insert([{ field1: 'value1' }, { field1: 'value2' }]);
```

# Reading Records
Single Entry:
```const entry = await knex('my_table').where({ field1: 'value1' }).first();
```

Multiple Entries:
```
const entries = await knex('my_table').where({ field1: 'value1' });
```
# Updating Records
Single Entry:
```
await knex('my_table').where({ field1: 'value1' }).update({ field2: 'new_value' });
```
Multiple Entries:
```
await knex('my_table').where({ field1: 'value1' }).update({ field2: 'new_value' });
```

# Deleting Records
Single Entry:
```
await knex('my_table').where({ field1: 'value1' }).del();
```
Multiple Entries:
```
await knex('my_table').where({ field1: 'value1' }).del();
```

### 5. Raw SQL Queries with `mysql` or `pg` Libraries

# Specification
The `mysql` or `pg` libraries allow you to execute raw SQL statements directly. This method is flexible and lets you perform highly customized queries without ORM restrictions.

# Use Cases
- Suitable for applications with complex or optimized SQL queries.
- Ideal when the application needs direct control over SQL without ORM abstraction.

# Pool Definition and How It Works
A **pool** in this context refers to a *connection pool* that manages multiple database connections efficiently. Instead of creating a new connection for every single query, a pool maintains a set of open connections that can be reused for multiple queries. This improves performance, especially in applications with high query loads.

# How Pool Works
- A connection pool initializes a specified number of connections to the database and keeps them open.
- When a query is made, it uses an available connection from the pool instead of creating a new one.
- Once the query is complete, the connection is returned to the pool to be reused.
- This reduces the overhead of establishing a new connection each time and helps handle multiple concurrent database requests.

# Example of Pool Creation with `mysql2`
```javascript
const mysql = require('mysql2');
const pool = mysql.createPool({
  host: 'localhost',
  user: 'your_user',
  password: 'your_password',
  database: 'your_database',
  waitForConnections: true,
  connectionLimit: 10,  // Maximum number of connections in the pool
  queueLimit: 0
});
```

# Creating Records
Single entry
```
await pool.query('INSERT INTO my_table (field1, field2) VALUES (?, ?)', ['value1', 'value2']);
```
Multiple Entries:
```
const sql = 'INSERT INTO my_table (field1, field2) VALUES ?';
const values = [['value1', 'value2'], ['value3', 'value4']];
await pool.query(sql, [values]);

```

# Reading Records
Single entry
``` 
const [rows] = await pool.query('SELECT * FROM my_table WHERE field1 = ?', ['value1']);
const entry = rows[0];
```
Multiple Entries:
```
const [rows] = await pool.query('SELECT * FROM my_table WHERE field1 = ?', ['value1']);
```
# Updating Records
single entry
```
await pool.query('UPDATE my_table SET field2 = ? WHERE field1 = ?', ['new_value', 'value1']);
```
Multiple Entries:
```
await pool.query('UPDATE my_table SET field2 = ? WHERE field1 = ?', ['new_value', 'value1']);
```

# Deleting Records
Single Entry:
```
await pool.query('DELETE FROM my_table WHERE field1 = ?', ['value1']);
```
Multiple Entries:
```
await pool.query('DELETE FROM my_table WHERE field1 = ?', ['value1']); 
```

### 6. Model Methods

# Specification
Model methods refer to functions defined within a model that encapsulate database operations related to that model. They provide an interface for interacting with the database and can include both static and instance methods.

# Use Cases
Encapsulates the database interaction logic related to specific models.
Promotes code reusability and separation of concerns.

# Creating a New Model Instance

Single Entry:
```
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  async save() {
    const result = await pool.query('INSERT INTO users (name, email) VALUES (?, ?)', [this.name, this.email]);
    this.id = result.insertId; // Assigns the ID to the instance
  }
}

```

Multiple entry:
```
class User {
  static async bulkCreate(users) {
    const sql = 'INSERT INTO users (name, email) VALUES ?';
    const values = users.map(user => [user.name, user.email]);
    const result = await pool.query(sql, [values]);
    return result.affectedRows; // Returns the number of affected rows
  }
}

```
 ### 7 Signals (or Event Emitters) [EventEmitter with Lifecycle Hooks]
# Specification
In Node.js, signals can be implemented using the EventEmitter class from the events module. This allows different parts of the application to communicate with each other via events.

# Use Cases
Enables decoupling of different parts of an application.
Facilitates handling asynchronous operations by listening for events.

```
// Install and Import EventEmitter:

const EventEmitter = require('events');
const eventEmitter = new EventEmitter();


// Define and Emit Events:
/* For example, creating an event when a user is saved.
*/
// Event Listener for 'userCreated'
eventEmitter.on('userCreated', (user) => {
    console.log('New user created:', user);
});

// Emitting an Event
const newUser = { name: 'John', age: 30 };
eventEmitter.emit('userCreated', newUser);

// Attach Events to Model Actions:
/*Using events with Mongoose for pre and post hooks:*/
userSchema.post('save', function(doc) {
    eventEmitter.emit('userCreated', doc);
});
```

### 8. Migrations
# Specification
In Node.js, migrations manage and version database schema changes. Tools like Sequelize and Knex.js provide migration utilities, allowing you to apply, rollback, and track schema changes in a controlled manner.

# Use Cases
Essential for applications with multiple environments (e.g., development, staging, production).
Helpful for tracking and maintaining schema changes over time.
Methods
# Example with Sequelize Migrations
Creating a Migration:
```
npx sequelize-cli migration:generate --name add_column_to_users
npx knex migrate:make add_column_to_users
```
This command generates a migration file in the migrations folder.

Running Migrations:
```
npx sequelize-cli db:migrate
npx knex migrate:latest
```
Rolling Back Migrations:
```
npx sequelize-cli db:migrate:undo
npx knex migrate:rollback

```
### 9. Database Transactions
# Specification
Database transactions in Node.js ensure atomicity of multiple operations. Using transactions means that a group of database actions either all succeed or all fail, preserving data integrity. Sequelize and Knex.js support transactions to group multiple queries.

# Use Cases
Critical when performing multiple related database operations.
Essential for financial applications, multi-step workflows, and when consistency is paramount.


# Example with Sequelize Transactions
Single Transaction:
```
const sequelize = require('./database'); // initialize Sequelize instance
await sequelize.transaction(async (t) => {
    const user = await User.create({ name: 'Alice' }, { transaction: t });
    const profile = await Profile.create({ userId: user.id, bio: 'Hello!' }, { transaction: t });
});
```
Example with Knex.js Transactions
Single Transaction:
```
const knex = require('./database'); // initialize Knex instance

await knex.transaction(async (trx) => {
    await trx('users').insert({ name: 'Alice' });
    await trx('profiles').insert({ user_id: user.id, bio: 'Hello!' });
});
```

### 10. Database Routers
# Specification
Database routers in Node.js direct database requests to specific instances based on criteria, such as request type, user, or region. This is not as common as in Django, but can be achieved with custom middleware or logic in Knex.js or Sequelize to route requests.

# Use Cases
Useful for applications needing data segregation (e.g., multi-tenancy).
Essential for sharding, load balancing, or managing read-write replicas.

Methods
 Basic Custom Router Example
 # Routing by Environment:
```
const Sequelize = require('sequelize');

const readReplica = new Sequelize('database', 'username', 'password', {
    host: 'read-replica-host',
    dialect: 'mysql'
});

const writeInstance = new Sequelize('database', 'username', 'password', {
    host: 'write-host',
    dialect: 'mysql'
});

const dbRouter = (type) => {
    return type === 'write' ? writeInstance : readReplica;
};

// Usage:
const User = dbRouter('write').define('User', { /* schema */ });
const readUser = await dbRouter('read').query('SELECT * FROM users');

```

# Multi-Tenancy Router with Knex.js
Dynamic Database Connection Selection:
``` 
const getKnexInstance = (tenantId) => {
    return require('knex')({
        client: 'mysql',
        connection: {
            host: `tenant-${tenantId}-db-host`,
            user: 'username',
            password: 'password',
            database: `tenant_${tenantId}_db`
        }
    });
};

// Usage
const knex = getKnexInstance('tenant1');
const users = await knex('users').select('*');
```


### 11. Caching
# Specification
Caching stores frequently accessed data in memory, reducing the load on the database and improving response times. Redis and Node-cache are common caching tools in Node.js. Redis is used for distributed caching, while Node-cache is often used for in-memory caching in single-instance applications.

# Use Cases
Suitable for data that is frequently read and infrequently updated.
Commonly used for session storage, configuration values, and static data.

Example with Redis
# Install Redis and Connect:
`npm install redis`
```
const redis = require('redis');
const client = redis.createClient();

client.on('error', (err) => console.error('Redis error:', err));
```

# Setting and Getting Cache Data:

Set Cache:
```
client.set('user:1', JSON.stringify({ name: 'Alice', age: 25 }), 'EX', 60); // expires in 60 seconds
```

Get Cache:
```
client.get('user:1', (err, reply) => {
    if (reply) {
        const user = JSON.parse(reply);
        console.log('Cached User:', user);
    }
});
```

Delete Cache:
```
client.del('user:1');
```

Example with Node-cache (In-Memory)
Install and Configure Node-cache:

`npm install node-cache`
```
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 60 });
```
Setting and Getting Cache Data:

Set Cache:
```
cache.set('user_1', { name: 'Alice', age: 25 });
```
Get Cache:

```
const user = cache.get('user_1');
if (user) {
    console.log('Cached User:', user);
}
```
Delete Cache:
```
cache.del('user_1');
```