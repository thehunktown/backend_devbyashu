```
CREATE TABLE projects (
    project_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_name VARCHAR(100),
    project_code VARCHAR(20) UNIQUE,
    department_id UUID,
    department_name VARCHAR(50),
    lead_employee_id UUID,
    lead_employee_name VARCHAR(100),
    start_date DATE,
    end_date DATE,
    status VARCHAR(20),
    budget DECIMAL(15, 2),
    cost_to_date DECIMAL(15, 2),
    estimated_completion_date DATE,
    priority VARCHAR(10),
    description TEXT,
    client_name VARCHAR(100),
    client_contact VARCHAR(50),
    total_employees_involved INT,
    location VARCHAR(50),
    technologies_used VARCHAR(255),
    comments TEXT
);
```
```
INSERT INTO projects (
    project_name, project_code, department_id, department_name, lead_employee_id, lead_employee_name, 
    start_date, end_date, status, budget, cost_to_date, estimated_completion_date, priority, description, 
    client_name, client_contact, total_employees_involved, location, technologies_used, comments
) VALUES 
('AI Chatbot Development', 'PROJ001', gen_random_uuid(), 'Engineering', gen_random_uuid(), 'Alice Johnson', 
 '2023-01-15', '2023-12-20', 'In Progress', 150000.00, 100000.00, '2023-12-15', 'High', 
 'Developing an AI-powered chatbot for customer service', 'TechCorp', 'techcorp@example.com', 
 10, 'New York', 'Python, TensorFlow, NLP', 'On track with milestone completion'),

('HR Management System', 'PROJ002', gen_random_uuid(), 'HR', gen_random_uuid(), 'Robert Brown', 
 '2022-03-10', '2023-06-30', 'Completed', 120000.00, 115000.00, '2023-06-25', 'Medium', 
 'Develop a comprehensive HR management system', 'HR Solutions', 'hrsolutions@example.com', 
 8, 'San Francisco', 'Java, MySQL, Spring Boot', 'Completed ahead of schedule'),

('E-commerce Website Redesign', 'PROJ003', gen_random_uuid(), 'Marketing', gen_random_uuid(), 'Emily Clarke', 
 '2023-05-01', '2023-11-01', 'In Progress', 90000.00, 60000.00, '2023-10-25', 'High', 
 'Redesign the e-commerce platform for a modern UI', 'ShopEase', 'shopease@example.com', 
 12, 'Austin', 'JavaScript, React, Node.js', 'Testing phase initiated'),

('Inventory Management System', 'PROJ004', gen_random_uuid(), 'Finance', gen_random_uuid(), 'Michael Chen', 
 '2022-11-01', '2023-08-01', 'Completed', 130000.00, 125000.00, '2023-07-28', 'High', 
 'Automated inventory tracking and reporting', 'RetailPro', 'retailpro@example.com', 
 15, 'Seattle', 'Python, Django, PostgreSQL', 'Implementation phase successful'),

('Sales Dashboard', 'PROJ005', gen_random_uuid(), 'Sales', gen_random_uuid(), 'Linda Martinez', 
 '2023-04-15', '2023-10-15', 'In Progress', 70000.00, 45000.00, '2023-10-10', 'Medium', 
 'Create a dashboard to track sales KPIs', 'SalesHub', 'saleshub@example.com', 
 7, 'Chicago', 'JavaScript, D3.js, MongoDB', 'Milestone 3 completed'),

('Mobile Banking App', 'PROJ006', gen_random_uuid(), 'Engineering', gen_random_uuid(), 'Thomas Lee', 
 '2023-02-01', '2024-01-31', 'In Progress', 200000.00, 120000.00, '2024-01-25', 'High', 
 'Develop a secure mobile banking application', 'BankNet', 'banknet@example.com', 
 20, 'Los Angeles', 'Kotlin, Swift, Firebase', 'User authentication module completed'),

('Customer Feedback System', 'PROJ007', gen_random_uuid(), 'Customer Service', gen_random_uuid(), 'Anna White', 
 '2023-03-15', '2023-12-15', 'In Progress', 65000.00, 30000.00, '2023-12-10', 'Low', 
 'System to collect and analyze customer feedback', 'FeedBack Inc.', 'feedbackinc@example.com', 
 5, 'Denver', 'Python, Flask, MySQL', 'Survey module in testing'),

('Payroll System Upgrade', 'PROJ008', gen_random_uuid(), 'Finance', gen_random_uuid(), 'James Wilson', 
 '2022-09-01', '2023-03-01', 'Completed', 50000.00, 45000.00, '2023-02-28', 'Medium', 
 'Upgrading payroll system with new tax laws', 'PayrollPros', 'payrollpros@example.com', 
 4, 'Miami', 'PHP, Laravel, SQLite', 'Successful completion on schedule'),

('Corporate Website Overhaul', 'PROJ009', gen_random_uuid(), 'Marketing', gen_random_uuid(), 'Sandra Parker', 
 '2023-06-01', '2023-12-01', 'In Progress', 80000.00, 55000.00, '2023-11-30', 'Medium', 
 'Redesign and update corporate website', 'BizMedia', 'bizmedia@example.com', 
 6, 'Boston', 'HTML, CSS, WordPress', 'Design phase ongoing');

```

```
CREATE TABLE employee_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100),
    phone_number VARCHAR(15),
    address VARCHAR(255),
    city VARCHAR(50),
    state VARCHAR(50),
    country VARCHAR(50),
    postal_code VARCHAR(10),
    department VARCHAR(50),
    position VARCHAR(50),
    salary DECIMAL(10, 2),
    hire_date DATE,
    birth_date DATE,
    gender CHAR(1),
    marital_status VARCHAR(10),
    emergency_contact_name VARCHAR(50),
    emergency_contact_phone VARCHAR(15),
    status VARCHAR(20),
    notes TEXT
);

```

```
INSERT INTO employee_records (
    first_name, last_name, email, phone_number, address, city, state, country, 
    postal_code, department, position, salary, hire_date, birth_date, gender, 
    marital_status, emergency_contact_name, emergency_contact_phone, status, notes
) VALUES 
('John', 'Doe', 'john.doe@example.com', '555-1234', '123 Elm St', 'New York', 'NY', 'USA', 
 '10001', 'Engineering', 'Software Engineer', 85000.00, '2020-01-15', '1990-06-25', 'M', 
 'Single', 'Jane Doe', '555-4321', 'Active', 'Excellent performance'),

('Jane', 'Smith', 'jane.smith@example.com', '555-5678', '456 Maple Ave', 'San Francisco', 'CA', 'USA', 
 '94105', 'HR', 'HR Manager', 75000.00, '2018-03-10', '1985-11-15', 'F', 
 'Married', 'John Smith', '555-8765', 'Active', 'Reliable and efficient'),

('Michael', 'Johnson', 'michael.j@example.com', '555-8765', '789 Oak Dr', 'Austin', 'TX', 'USA', 
 '73301', 'Marketing', 'Marketing Specialist', 65000.00, '2021-07-01', '1992-02-28', 'M', 
 'Single', 'Sarah Johnson', '555-7654', 'Active', 'Creative with good ideas'),

('Emily', 'Brown', 'emily.brown@example.com', '555-2345', '321 Pine Ln', 'Seattle', 'WA', 'USA', 
 '98101', 'Sales', 'Sales Executive', 70000.00, '2019-09-20', '1988-08-14', 'F', 
 'Divorced', 'Liam Brown', '555-5432', 'Active', 'Top performer in the region'),

('Chris', 'Davis', 'chris.davis@example.com', '555-6789', '654 Birch Blvd', 'Denver', 'CO', 'USA', 
 '80203', 'Finance', 'Financial Analyst', 72000.00, '2022-05-12', '1994-03-05', 'M', 
 'Single', 'Emma Davis', '555-8761', 'Active', 'Strong analytical skills'),

('Olivia', 'Wilson', 'olivia.w@example.com', '555-3456', '987 Cedar Rd', 'Chicago', 'IL', 'USA', 
 '60605', 'Engineering', 'DevOps Engineer', 90000.00, '2017-11-05', '1989-12-22', 'F', 
 'Married', 'James Wilson', '555-6543', 'Active', 'Excellent problem-solving abilities');
```