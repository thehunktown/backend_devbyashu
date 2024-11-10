- Write sql query to get the second highest salary among all employees?
```
SELECT MAX(salary) as seondHighest from employee where < (SELECT max(salary) from emplaoyee);
```

- There are multiple ways to get the second highest salary among all employees.
```
SELECT name, salary, DENSE_RANK() OVER (ORDER BY salary DESC) AS dense_rank
FROM employees;
SELECT name, salary, ROW_NUMBER() OVER (ORDER BY salary DESC) AS row_num
FROM employees;
```
# note - DENSE_RANK assigns a rank to each row within a partition, without leaving gaps in rank when there are ties. (1, 2, 2, 3.)
# note - ROW_NUMBER assigns a unique sequential number to each row in a result set, starting at 1 for each partition.

- Write sql query to find max salary and department name from each department.
```
SELECT department, MAX(salary) as maxsalary FROM employee_records GROUP BY department;
```

- Write sql query to find records in table a that are not in table b without using not in operator.
```
SELECT a.* FROM a LEFT JOIN b ON a.id = b.id WHERE b.id IS NULL;
```
# What is the result of following query?
- Write sql query to find employees that have same name and email.
```
SELECT name, email FROM employee_record GROUP BY HAVING COUNT(*) > 1;
SELECT * FROM employees WHERE (name, email) IN (SELECT name, email GROUP BY name, email HAVING count(*) > 1);
```
# note - HAVING filters groups based on a condition, usually with aggregate functions like COUNT, SUM, etc.
- Write sql query to find max salary from each department.
```
SELECT department, MAX(salary) as maxsalary FROM employee_records GROUP BY department;
```
- Write sql query to get the nth highest salary among all employees.
```
WITH rankSalaries AS ( SELECT salary, ROW_NUMBER() OVER (ORDER BY salary DESC) AS rank FROM employee_records) SELECT salary FROM rankSalaries WHERE rank = n;
```
# note - Common Table Expressions (CTEs) are temporary result sets that can be referenced within 

- How can you find 10 employees with odd number as employee id?
```
SELECT * FROM employee_records WHERE employee_id % 2 != 0 LIMIT 10;
```

- Write sql query to get the names of employees whose date of birth is between 01/01/1990 to 31/12/2000.
```
SELECT name FROM employee_records WHERE date_of_birth BETWEEN '1990-01-01' AND '2000-12-31';
```

- Write sql query to get the quarter from date.
```
SELECT EXTRACT(QUARTER FROM date) FROM employee_records;
```
# note - EXTRACT function is used to extract a specific part of a date/time value.

- Write query to find employees with duplicate email.
```
SELECT name FROM employee_recods GROUP BY email BY HAVING COUNT(*) > 1;
````
- Write a query to find all employee whose name contains the word "rich", regardless of case.
```
SELECT * FROM employee_records WHERE name LIKE "%rich%";
```

- Is it safe to use rowid to locate a record in oracle sql queries?
```
No
```

- What are the reasons for denormalizing the data?
```
Reduces the need for JOIN operations, speeding up frequently accessed queries. that  Optimizes data retrieval for reporting, enhancing real-time analytics and reducing data processing time.
```

- What is the feature in sql for writing if and else statements?
```
SELECT 
    column1,
    column2,
    CASE 
        WHEN condition1 THEN result1
        WHEN condition2 THEN result2
        ELSE result_default
    END AS alias_name
FROM 
    table_name;

```
- What is the difference between delete and truncate in sql?
```
    | Feature                 | `DELETE`                                                | `TRUNCATE`                                               |
|-------------------------|---------------------------------------------------------|----------------------------------------------------------|
| **Purpose**             | Removes specific rows or all rows in a table            | Removes all rows from a table                            |
| **Where Clause**        | Supports `WHERE` clause to filter rows                  | Does not support `WHERE`; deletes all rows               |
| **Transaction Support** | DML operation; can be rolled back if within a transaction | DDL operation; cannot be rolled back (in some databases) unless wrapped in a transaction |
| **Locking**             | Row-level locking                                       | Table-level locking                                      |
| **Performance**         | Slower, especially for large tables, as it removes rows one by one | Faster, as it deallocates entire data pages              |
| **Triggers**            | Activates any `DELETE` triggers defined                 | Does not activate `DELETE` triggers                      |
| **Auto-increment Reset**| Keeps the current auto-increment counter value          | Resets the auto-increment counter in many systems        |

```
- What is the difference between ddl and dml commands in sql?
```
DDL: CREATE, ALTER, DROP, TRUNCATE, RENAME	
DML: SELECT, INSERT, UPDATE, DELETE, MERGE
```

- Why do we use escape characters in sql queries?
```
escape characters are used to handle special characters within strings and to format queries correctly, especially when dealing with values that might otherwise interfere with SQL syntax.
```
- What is the difference between primary key and unique key in sql?
```
| Feature                     | `PRIMARY KEY`                                       | `UNIQUE KEY`                                         |
|-----------------------------|-----------------------------------------------------|------------------------------------------------------|
| **Uniqueness**              | Ensures unique values across the column(s)          | Ensures unique values across the column(s)           |
| **Nullability**             | Does not allow `NULL` values                        | Allows a single `NULL` value (in most RDBMS)         |
| **Purpose**                 | Identifies each row uniquely and enforces entity integrity | Ensures uniqueness without serving as the primary row identifier |
| **Index Type**              | Creates a clustered index by default (in most databases) | Creates a non-clustered index by default             |
| **Allowed Per Table**       | Only one primary key per table                      | Multiple unique keys can be defined on a table       |
| **Usage**                   | Typically used for the main identifier of each row | Used when uniqueness is required, but not as a primary identifier |

```
- What is the difference between inner join and outer join in sql?
```
| Feature                     | `INNER JOIN`                                         | `OUTER JOIN`                                            |
|-----------------------------|------------------------------------------------------|
```
- What is the difference between left outer join and right outer join?
```
---------------------------------------------------------|
| **Definition**              | Returns only the matching rows from both tables     | Returns matched rows and includes unmatched rows        |
| **Types**                   | Only one type (`INNER JOIN`)                        | Three types: LEFT OUTER JOIN, RIGHT OUTER JOIN, FULL OUTER JOIN |
| **Returned Rows**           | Only rows where there is a match in both tables     | Rows from one or both tables, even if there's no match  |
| **Use Case**                | Used when only interested in matched records        | Used when all records from one or both tables are needed |
```
- What is the datatype of rowid?
```
a hexadecimal
```
- What is the difference between where clause and having clause?
```
| Feature                     | `WHERE` Clause                                      | `HAVING` Clause                                      |
|-----------------------------|-----------------------------------------------------|------------------------------------------------------|
| **Purpose**                 | Filters rows before grouping (used to filter records before any aggregation is done) | Filters groups after the `GROUP BY` clause (used to filter aggregated data) |
| **Used with**               | Used with individual rows (no aggregation)         | Used with groups created by `GROUP BY` clause        |
| **Applies To**              | Columns in the tables (direct filtering of rows)   | Aggregate functions like `SUM()`, `COUNT()`, `AVG()`, etc. |
| **Execution Order**         | Executed before the `GROUP BY` and `HAVING` clauses | Executed after the `GROUP BY` and aggregation        |
| **Can Filter Aggregates?**  | No, only raw data (before aggregation)             | Yes, can filter based on aggregate functions         |
| **Common Usage**            | Filtering specific rows based on column values     | Filtering data based on aggregated results, e.g., after grouping |

```

- How will you calculate the number of days between two dates in mysql?
```

```
- What are the different types of triggers in mysql?
- What are the differences between heap table and temporary table in mysql?
- What is a heap table in mysql?
- What is the difference between blob and text data type in mysql?
- What will happen when auto increme on an integer column reaches max value in mysql?
- What are the advantages of mysql as compared with oracle db?
- What are the disadvantages of mysql?
- What is the difference between char and varchar datatype in mysql?
- What is the use of i am a dummy flag in mysql?
- How can we get current date and time in mysql?
- What is the difference between timestamp in unix and mysql?
- How will you limit a mysql query to display only top 10 rows?
- What is automatic initialization and updating for timestamp in a mysql table?
- How can we get the list of all the indexes on a table?
- What is savepoint in mysql?
- What is the difference between rollback to savepoint and release savepoint?
- How will you search for a string in mysql column?
- How can we find the version of the mysql server and the name of the current database by select query?
- What is the use of ifnull operator in mysql?
- How will you check if a table exists in mysql?
- How will you see the structure of a table in mysql?
- What are the objects that can be created by create statement in mysql?
- How will you see the current user logged into mysql connection?
- What is the difference between batch and interactive modes of mysql?
- How can we get a random number between 1 and 100 in mysql?
- What does sql in mysql stand for?
- What does a mysql database contain?
- How can you interact with mysql?
- What is mysql database queries?
- What are some common mysql commands?
- How do you create a database in mysql?
- How do you create a table using mysql?
- How do you insert data into mysql?
- How do you remove a column from a database?
- How to create an index in mysql?
- How to delete data from a mysql table?
- How do you view a database in mysql?
- What are the numeric data types in mysql?
- What are the string data types in mysql?
- What are the temporal data types in mysql?
- What is blob in mysql?
- How to add users in mysql?
- What is mysql views?
- How do you create and execute views in mysql?
- What is mysql triggers?
- How many triggers are possible in mysql?
- What is the mysql server?
- What are the mysql clients and utilities?
- Can you explain the logical architecture of mysql?
- What is scaling in mysql?
- What is sharding in sql?
- What are transaction storage engines in mysql?
- What is mysql?
- What are some advantages of using mysql?
- What do you mean by databases?
- Query to find second highest marks of a student?
- Query to find duplicate rows in table?
- What is the query to fetch first record from student table?
- What is the query to fetch last record from student table?
- What is query to display first 4 records from student table?
- What is query to display last 3 records from student table?
- What is query to display nth record from student table?
- How to get 3 highest marks from student table?
- How to display odd rows in student table?
- How to display even rows in student table?
- How can i create table with same structure of student table?
- Select all records from student table whose name is a and b.
- What is ddl and dml and dcl?
- How do you get the number of rows affected by query?
- If the value in the column is repeatable and how do you find out unique values?
- How do you return hundred books starting from 25th?
- You wrote search engine that should retrieve 10 results at a time but at the same time you do like to know how many - - rows there are total.
- How would you write a query to select all teams that won either 2 and 4 and 6 or 8 games?
- How would you select all users whose phone number is null?
- How do you find out which auto increment was assigned on the last insert?
- On executing delete statement i keep getting the error about foreign key constraint failing so what do i do?
- When would you use order by in delete statement?
- How can you see all indexes defined for a table?
- How would you delete column?
- How would you change a table to innodb?
- How do you concatenate strings in mysql?
- How do you get a portion of string?
- What is the difference between char length and length?
- How do you convert string to utf-8?
- How do you get month from timestamp?
- How do you offload the time and date handling to mysql?
- How do you add three minutes to a date?
- What"s the difference between unix timestamps and mysql timestamps?
- How do you convert between unix timestamps and mysql timestamps?
- What are enums used for in mysql?
- How are enums and sets represented internally?
- How do you start and stop mysql on windows?
- How do you start mysql on linux?
- Explain the difference between mysql and mysql interfaces in php?
- What"s the default port for mysql server?
- What does tee command do in mysql?
- Can you save your connection settings to a conf file?
- How do you change a password for an existing user via mysqladmin?
- Use mysqldump to create a copy of the database?
- Have you ever used mysql administrator and mysql query browser?
- What are some good ideas regarding user security in mysql?
- Explain the difference between myisam static and myisam dynamic?
- What does myisamchk do?
- Explain advantages of innodb over myisam?
- Explain advantages of myisam over innodb?
- What are heap tables in mysql?
- How do you control the max size of a heap table?
- What are csv tables?
- Explain federated tables?
- What is serial data type in mysql?
- What happens when the column is set to auto increment and you reach the maximum value for that table?
- Explain the difference between bool, tinyint and bit?
- Explain the difference between float, double and real?
- What happens if a table has one column defined as timestamp?
- But what if you really want to store the timestamp data, such as the publication date of the article?
- Explain data type timestamp default current_timestamp on update current_timestamp?
- What does timestamp on update current_timestamp data type do?
- If i created a column with data type varchar(3), what would i expect to see in mysql table?
- General information about mysql.
- Why use mysql?
- How mysql optimizes distinct?
- How mysql optimizes limit?
- Mysql speed of delete queries ?
- What is the difference between mysql_fetch_array and mysql_fetch_object?
- What are the different table present in mysql?
- What is primary key?
- What is foreign key?
- What is index?
- What is join?
- What is union?
- What is isam?
- What is innodb?
- What is bdb berkeleydb?
- What is csv?
- What is transaction?
- What is commit?
- What is rollback?
- How many groups of data types?
- What is the differences between char and nchar?
- How to escape special characters in sql statements?
- How to concatenate two character strings?
- How to enter characters as hex numbers?
- How to enter boolean values in sql statements?
- How to convert numeric values to character strings?
- How to use in conditions?
- How to use like conditions?
- How to present a past time in hours and minutes and seconds?
- How to add a new column to an existing table in mysql?
- How to delete an existing column in a table?
- How to rename an existing column in a table?
- How to rename an existing table in mysql?
- How to create a table index in mvsql?
- How to get a list of indexes of an existing table?
- How to drop an existing index in mysql?
- How to drop an existing view in mysql?
- How to create a new view in mysql?
- How to increment dates by 1111 mysql?
- Explain what is a database?
- Explain what is dbms?
- Explain what is rdbms?
- What are the popular database management systems in it industry?
- Explain what is sql?
- Explain what is table in a database?
- Explain what is a field in a database and record in a database?
- What is the use of nvl function?
- Explain what is a column in a table?
- What are the different types of sql commands?
- What are the different ddl commands in sql?
- What are the different dml commands in sql?
- What are the different dcl commands in sql?
- What are the different tcl commands in sql?
- Explain what is an index?
- Explain what is a view?
- Explain what is a subquery ?
- What is the difference between rename and alias?
- What is a join?
- What are the different types of joins?
- What are sql constraints?
- What are the constraints available in sql?
- What is a unique key and primary key and foreign key?
- What is the difference between unique and primary key constraints?
- What is a null value?
- What is normalization?
- What is stored procedure?
- What is a trigger?
- List out the acid properties and explain?
- What is the difference between delete, truncate and drop command?
- What is the difference between having and where clause?
- What are aggregate functions in sql?
- What are string functions in sql?
- Explain the working of sql privileges?
- How many types of privileges are available in sql?
- What is sql injection?
- What is the difference between clustered and non-clustered indexes?
- What is relationship and how many types of relationship are there?
- What is collation?
- What is database white box testing and black box testing?
- What are the advantages of views?
- What is schema?
- What is the difference between sql and mysql?
- What is sql sandbox in sql server?
- What are the steps to take to improve performance of a poor performing query?
- What is a deadlock and what is a live lock?
- What is blocking and how would you troubleshoot it?
- Explain the different types of backups available in sql server.
- What is database isolation in sql server?
- What is a schema in sql server 2005? explain how to create a new schema in a database?
- Explain how to create a scrollable cursor with the scroll option.
- Explain how to create a dynamic cursor with the dynamic option?
- What are database files and filegroups?
- Describe in brief databases and sql server databases architecture.
- What are the steps to improve the performance of a query?
- How would you use the sp_ functions to identify the blocking problems?
- What are the different types of backups?
- What are the different levels of isolation?
- How can you start the sql server in the single user mode and the minimal configuration mode?
- How can you know that statistics should be updated?
- What is replication in sql server?
- Can we initiate a external com object from within sql?
- What is a schema? how is it useful in sql servers?
- What is write ahead log?
- What is the use of check points in the transaction logs?
- What is a column with identity?
- What are scrollable cursors? how are they created?
- What is raid and how does it help storage of databases?
- How can you identify the version number of the sql server installed?
- What is the use of cascade constraints?
- What is the function of a odbc manager ?
- What are the different types of indexes available in sql server?
- What is the difference between clustered and non-clustered index?
- What are the high-availability solutions in sql server?
- What is denormalization and when would you go for it?
- How do you implement one-to-one, one-to-many and many-to-many relationships while designing tables?
- What is the difference between a primary key and a unique key?
- What are user defined datatypes and when you should go for them?
- What is bit datatype and what is the information that can be stored inside a bit column?
- Define candidate key and alternate key and composite key.
- What is a transaction and what are acid properties?
- Explain different isolation levels?
- What type of index will get created after executing the above statement?
- Differences between active and active or active and passive cluster configurations?
- What is lock escalation?
- What is the difference between delete table and truncate table commands?
- What are constraints?
- Whar is an index and what are the types of indexes and how many clustered indexes can be created on a table?
- How to restart sql server in single user mode and how to start sql server in minimal configuration mode?
- What are statistics under what circumstances they go out of date and how do you update them?
- If there is significant change in the key values in the index?
- What is database replicaion and what are the different types of replication you can set up in sql server?
- What are the components of physical database structure of oracle database?
- What are the components of logical database structure of oracle database?
- What is a tablespace?
- What is system tablespace and when is it created?
- Explain the relationship among database and tablespace and data file.
- What is schema?
- What are schema objects?
- Can objects of the same schema reside in different tablespaces?
- Can a tablespace hold objects from different schemes?
- What is oracle table?
- What is an oracle view?
- What is partial backup?
- What is mirrored on line redo log?
- What is full backup?
- Can a view based on another view?
- Can a tablespace hold objects from different schemes?
- Can objects of the same schema reside in different tablespaces?
- What is the use of control file?
- Do view contain data?
- What are the referential actions supported by foreign key integrity constraint?
- What are the type of synonyms?
- What is an index segment?
- What are the different type of segments?
- What are clusters?
- What is an integrity constrains?
- What is an index?
- What is an extent?
- What is a view?
- What is table?
- Can a view based on another view?
- What are the advantages of views?
- What is an oracle sequence?
- What is a synonym?
- What are the types of synonyms?
- What is a private synonym?
- What is a public synonym?
- What are synonyms used for?
- What is an oracle index?
- How are the index updates?
- What is rollback segment?
- What are the characteristics of data files?
- How to define data block size?
- What does a control file contain?
- What is difference between unique constraint and primary key constraint?
- What is index cluster?
- When does a transaction end?
- How does one create a new database?
- What database block size should i use?
- What are the different approaches used by optimizer in choosing an execution plan?
- What does rollback do?
- What is cost based approach to optimization?
- What does commit do?
- Define transaction?
- What is read only transaction?
- What is a deadlock?
- What is a schema?
- What is a cluster key?
- What is parallel server?
- What is cluster?
- What is an index and how it is implemented in oracle database?
- What is a database instance?
- What is the use of analyze command?
- What is default tablespace?
- What are the system resources that can be controlled through profile?
- What is tablespace quota?
- What are the different levels of auditing?
- What is statement auditing?
- What are the database administrators utilities avaliable?
- How can you enable automatic archiving?
- What are roles and how can we implement roles?
- What are roles?
- What are the uses of roles?
- What is privilege auditing?
- What is object auditing?
- What is auditing?
- Where are my tempfiles?
- How do i find used or free space in a temporary tablespace?
- What is a profile?
- How will you enforce security using stored procedures?
- How does one get the view definition of fixed views or tables?
- What are the dictionary tables used to monitor a database spaces?
- What is user account in oracle database?
- What is dynamic data replication?
- What is two phase commit?
- How can you enforce referential integrity in snapshots?
- What is a snapshot?
- What is the mechanism provided by oracle for table replication?
- What are the various type of snapshots?
- Describe two phases of two phase commit?
- What is snapshot log?
- What are the benefits of distributed options in databases?
- What are the options available to refresh snapshots?
- What is a snapshot log?
- What is distributed database?
- How can we reduce the network traffic?
- Differentiate simple and complex and snapshots?
- What are the built-ins used for sending parameters to forms?
- Is the after report trigger fired if the report execution fails?
- Does a before form trigger fire when the parameter form is suppressed?
- What is sga?
- What is a shared pool?
- What is mean by program global area?
- What is a data segment?
- What are the factors causing the reparsing of sql statements in sga?
- Does a view contain data?
- What is trigger associated with the timer?
- What are the triggers associated with image items?
- What are the different windows events activated at runtimes?
- When do you use data parameter type?
- What is difference between open_form and call_form?
- What is new_form built in?
- What is the difference when flex mode is mode on and when it is off?
- What is the difference when confine mode is on and when it is off?
- What are visual attributes?
- What are the vbx controls?
- What is the use of transactional triggers?
- How do you create a new session while open a new form?
- What are the ways to monitor the performance of the report?
- Explain about horizontal and vertical tool bar canvas views?
- What is the purpose of the product order option in the column property sheet?
- What is the use of image_zoom built-in?
- What is a timer?
- What are the two phases of block coordination?
- What are most common types of complex master-detail relationships?
- What is a text list?
- What is term?
- What is use of term?
- What is pop list?
- What is the maximum no. of chars the parameter can store?
- what are the default extensions of the files created by library module?
- How do you display console on a window?
- What are the coordination properties in a master-detail relationship?
- What are the different parameter types?
- What are the types of calculated columns available?
- Explain about stacked canvas views?
- What is the difference between show_editor and edit_textitem?
- What are the different file extensions that are created by oracle reports?
- What is the basic data structure that is required for creating an lov?
- What is the maximum allowed length of record group column?
- Which parameter can be used to set read level consistency across multiple queries?
- What are the different types of record groups?
- From which designation is it preferred to send the output to the printed?
- What is difference between post database commit and post-form commit?
- With which function of summary item is the compute at options required?
- What are parameters?
- What are the three types of user exits available?
- How many windows in a form can have console?
- Is it possible to modify an external query in a report which contains it?
- Does a grouping done for objects in the layout editor affect the grouping done in the data model editor?
- If a break order is set on a column would it affect columns which are under the column?
- Can you pass data parameters to forms?
- Is it possible to link two groups inside a cross products after the cross products group has been created?
- What are the different modals of windows?
- What are modal windows?
- What is the advantage of the library?
- What is lexical reference? how can it be created?
- What is system.coordination_operation?
- What is synchronize?
- What use of command line parameter cmd file?
- What is a text_io package?
- What is forms_ddl?
- What are the built-ins used for processing rows?
- What are the built-ins used for getting cell values?
- At least how many set of data must a data model have before a data model can be based on it?
- To execute row from being displayed that still use column in the row which property can be used?
- What is the remove on exit property?
- What is a difference between pre-select and pre-query?
- What are the built-ins used for finding object id function?
- Any attempt to navigate programmatically to disabled form in a call_form stack is allowed?
- How can a break order be created on a column in an existing group? what are the various sub events a mouse double click event involves?
- What is the use of place holder column? what are the various sub events a mouse double click event involves?
- What are the built-ins used for creating and deleting groups?
- What are the different types of delete details we can establish in master-details?
- Where is the external query executed at the client or the server?
- Where is a procedure return in an external pl/sql library executed at the client or at the server?
- What is coordination event?
- What is the difference between ole server & ole container?
- What is an object group?
- What is the difference between the conventional and direct path loader?
- How does one load multi-line records?
- Why is where clause faster than group filter or format trigger?
- Difference between substr and instr?
- What is rman?
- What are two parts of procedure?
- What are the datatypes available in plsql?
- What is overloading of procedures?
- What is master detail relationship?
- How many number of columns a record group can have?