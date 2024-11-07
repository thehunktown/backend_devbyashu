Stored Procedure - Imagine a stored procedure as a recipe jo humare database ke liye ek predefined set of instructions store karta hai. Yeh SQL commands ka ek group hota hai, jo database mein save kiya ja sakta hai aur jab chahein tab run kiya ja sakta hai. It works as a reusable function or shortcut jo complex tasks ko quickly aur easily handle karne mein madad karta hai. So, stored procedure is like an SQL “function” jo repeatedly execute ho sakta hai without rewriting all commands every time.

Definition: Ek stored procedure predefined SQL statements ka set hota hai jo database mein store kiya jaata hai aur baad mein run ho sakta hai.
Purpose: Repeated tasks ko automate karna aur coding ka effort aur time bachana.

## Problem(s) it Solves
Core Problem: Jab aapko frequently kuch complex SQL operations karne hote hain (jaise tables ko join karna, multiple conditions check karna), toh baar-baar wahi commands likhna boring aur error-prone ho sakta hai.
Related Problems: Data validation karna, logging tasks, aur multiple tables mein data modification karna.
Example Scenario:

Socho ek online store hai aur owner ko pata lagana hai kin customers ne pichle mahine mein orders diye hain. Yeh kaam bar-bar karna tedious hai! Ek stored procedure likh ke owner easily monthly orders ka data nikaal sakte hain by just calling the stored procedure once.


##  Scope & Boundaries
Where it’s Most Effective: Stored procedures tab kaam aati hain jab koi bhi repetitive task ya complex operation baar-baar perform karna ho. Jaise reporting, data validation, aur heavy data manipulation.
Limitations: Stored procedures ka performance degrade ho sakta hai agar bohot heavy processing mein aa jaye ya agar usme bohot zyada logical operations hain. Aise cases mein alternate approaches, jaise individual SQL queries ya server-side scripting (Node.js, Python) zyada effective ho sakti hain.
Alternatives: Complex logic ke liye business logic ko server-side code mein rakhna, ya functions aur views ka use karna.
## Industry-Standard Use Cases
# Use Cases:

Data Retrieval and Reporting: Monthly sales reports, user activity tracking.
Data Modification: Bulk data update, batch processing for invoices or orders.
Security Operations: Sensitive data ko retrieve karna aur unauthorized access se bachana.
Advanced/Specific Use Case: Financial systems mein stored procedures daily balance calculations aur interest calculations ke liye automate tasks aur ensure consistency mein kaam aati hain.

# Best Practices & Standards
KISS (Keep It Simple and Short): Stored procedures ko short aur specific purpose ke liye likhna best hai. Complex procedures ko breakdown karke multiple stored procedures mein divide kar sakte hain.
Parameterization: User inputs ke liye parameters use karna to make stored procedures more versatile.
Error Handling: Proper error handling dalna taaki jab bhi stored procedure run ho aur kuch issue aaye, toh woh handle ho aur process fail na ho.
Avoiding Nested Procedures: Excessive nesting se readability aur performance pe impact ho sakta hai.
Socho ki ek chef apne restaurant mein naye dish recipes daily likh ke nahi banata – wo ek recipe book bana leta hai. Har baar naye instructions likhne ki jagah, chef stored recipe ko open karke directly cook kar sakta hai. Similarly, ek stored procedure database ke andar ek aisi recipe hai jo predefined hai, aur jo baar-baar run ho sakti hai without redefining each step. Chef aur stored procedure dono hi time aur effort bachaate hain, right? Bas ye hi hai stored procedure ka magic!



# Example 1: Simple Stored Procedure
Imagine you have a table called Employees with columns like EmployeeID, FirstName, and LastName. We want to create a stored procedure that returns all records from the Employees table.
```
CREATE PROCEDURE GetAllEmployees
AS
BEGIN
    SELECT EmployeeID, FirstName, LastName
    FROM Employees;
END;
```
# Explanation Here:

CREATE PROCEDURE is the command to create a stored procedure.
GetAllEmployees is the name of our stored procedure.
Inside the procedure, we have a SELECT statement to retrieve all employees' details.
To execute this stored procedure, you would simply run:
```
EXEC GetAllEmployees;
```
# Example 2: Complex Stored Procedure
Now, let’s create a stored procedure that retrieves employees based on specific filters. Suppose you want a procedure that can filter employees by their DepartmentID and HireDate range.
```
CREATE PROCEDURE GetFilteredEmployees
    @DepartmentID INT,
    @StartDate DATE,
    @EndDate DATE
AS
BEGIN
    SELECT EmployeeID, FirstName, LastName, DepartmentID, HireDate
    FROM Employees
    WHERE DepartmentID = @DepartmentID
      AND HireDate BETWEEN @StartDate AND @EndDate;
END;
```
# Explanation
Here:

@DepartmentID, @StartDate, and @EndDate are parameters you can pass into the procedure to filter the data.
The WHERE clause uses these parameters to only select employees in the specified department and within the hire date range.
To execute this, you might run:
```
EXEC GetFilteredEmployees @DepartmentID = 5, @StartDate = '2022-01-01', @EndDate = '2023-01-01';
```

# Example 3: Dividing a Complex Procedure into Simpler Parts
Now, let’s say we need a complex operation that does the following:

Checks if a given employee exists.
If the employee exists, updates their salary.
If they don’t exist, adds a new employee.
Instead of putting all these steps in one procedure, we can break it down into multiple procedures for better readability and maintainability.

# Part 1: Check if Employee Exists
```
CREATE PROCEDURE CheckEmployeeExists
    @EmployeeID INT,
    @Exists BIT OUTPUT
AS
BEGIN
    IF EXISTS (SELECT 1 FROM Employees WHERE EmployeeID = @EmployeeID)
        SET @Exists = 1;
    ELSE
        SET @Exists = 0;
END;
```
This procedure checks if an employee exists and returns a value (@Exists) indicating whether the employee is found.

# Part 2: Update Employee Salary
```
CREATE PROCEDURE UpdateEmployeeSalary
    @EmployeeID INT,
    @NewSalary DECIMAL(10, 2)
AS
BEGIN
    UPDATE Employees
    SET Salary = @NewSalary
    WHERE EmployeeID = @EmployeeID;
END;
```

This procedure updates an employee’s salary based on their EmployeeID.

# Part 3: Insert New Employee
```
CREATE PROCEDURE InsertNewEmployee
    @EmployeeID INT,
    @FirstName NVARCHAR(50),
    @LastName NVARCHAR(50),
    @Salary DECIMAL(10, 2),
    @DepartmentID INT
AS
BEGIN
    INSERT INTO Employees (EmployeeID, FirstName, LastName, Salary, DepartmentID)
    VALUES (@EmployeeID, @FirstName, @LastName, @Salary, @DepartmentID);
END;
```
This procedure inserts a new employee if they don’t already exist in the table.

Master Procedure
Finally, let’s create a master procedure to bring all these steps together.
```
CREATE PROCEDURE ManageEmployee
    @EmployeeID INT,
    @FirstName NVARCHAR(50),
    @LastName NVARCHAR(50),
    @Salary DECIMAL(10, 2),
    @DepartmentID INT
AS
BEGIN
    DECLARE @Exists BIT;

    -- Step 1: Check if Employee Exists
    EXEC CheckEmployeeExists @EmployeeID, @Exists OUTPUT;

    -- Step 2: Update or Insert Based on Existence
    IF @Exists = 1
    BEGIN
        EXEC UpdateEmployeeSalary @EmployeeID, @Salary;
    END
    ELSE
    BEGIN
        EXEC InsertNewEmployee @EmployeeID, @FirstName, @LastName, @Salary, @DepartmentID;
    END
END;
```

Explanation
The ManageEmployee procedure now:
Calls CheckEmployeeExists to see if the employee exists.
If they exist, it calls UpdateEmployeeSalary.
If they don’t, it calls InsertNewEmployee.
To execute this master procedure:
```
EXEC ManageEmployee @EmployeeID = 102, @FirstName = 'Ashutosh', @LastName = 'Mishra', @Salary = 50000, @DepartmentID = 5; ```

Summary

Simple Procedure: Retrieve all employees.
Complex Procedure: Retrieve employees based on multiple conditions.
Divided Complex Procedure: Breaking a task into smaller steps for readability and easier debugging.