
# Database Design Notes

## Duplicacy in Databases

### Problem
Duplicacy in databases can lead to inefficiencies and data integrity issues. Duplicacy may occur at:
- **Row Level Duplicacy**: Entire rows of data are repeated, leading to redundant entries.
- **Column Level Duplicacy**: Information is stored in multiple columns unnecessarily, which can result in redundancy and increased storage requirements.

These duplicacies cause issues known as:
- **Insertion Anomaly**: Problems arise when adding new data due to duplicacy or unnecessary dependencies.
- **Deletion Anomaly**: Unintended data loss occurs when deleting data from a table.
- **Update Anomaly**: Updating duplicated data becomes difficult as it requires multiple updates across the database.

### Examples of Anomalies

#### Insertion Anomaly
Consider a `Students` table with columns `Student_ID`, `Student_Name`, and `Course`. If a new course must be added but there is no student enrolled yet, an `Insertion Anomaly` occurs as we may need to leave certain fields empty or create incomplete entries.

| Student_ID | Student_Name | Course     |
|------------|--------------|------------|
| 1          | Raj          | Math       |
| 2          | Priya        | Science    |
| NULL       | NULL         | History    |  ← Issue: no student for History course

#### Deletion Anomaly
If a student `Priya` (Student_ID = 2) is deleted from the table, we lose information about her `Science` course as well. Thus, deletion of one data point inadvertently deletes related information, leading to `Deletion Anomaly`.

| Student_ID | Student_Name | Course     |
|------------|--------------|------------|
| 1          | Raj          | Math       |
| 2          | Priya        | Science    | ← If deleted, information about Science course is lost

#### Update Anomaly
In a table where a teacher’s name is stored multiple times (one entry per course), changing the teacher’s name for one course doesn’t reflect in all entries, leading to inconsistent data. For example, changing `Mr. Sharma` to `Dr. Sharma` would require multiple updates.

| Course_ID | Course_Name | Teacher     |
|-----------|-------------|-------------|
| 101       | Math        | Mr. Sharma  |
| 102       | Science     | Mr. Sharma  | ← Needs update to Dr. Sharma
| 103       | English     | Ms. Kapoor  |

---

## 1st Normal Form (1NF)

### Problem
1NF solves the problem of unorganized data and repeating groups in a table. It ensures that each column contains atomic values, and each column stores values of a single type.

### Solution
In 1NF, we organize data so that every field contains only a single value.

### Example
Suppose we have a `Students` table:

| Student_ID | Name       | Courses                |
|------------|------------|------------------------|
| 1          | Raj        | Math, Science          |
| 2          | Priya      | Math, English, Science |

This table is not in 1NF because `Courses` column contains multiple values. 

To convert it to 1NF:

| Student_ID | Name       | Course     |
|------------|------------|------------|
| 1          | Raj        | Math       |
| 1          | Raj        | Science    |
| 2          | Priya      | Math       |
| 2          | Priya      | English    |
| 2          | Priya      | Science    |

---

## 2nd Normal Form (2NF)

### Problem
2NF eliminates partial dependency where non-prime attributes depend on only a part of a composite primary key. It helps reduce data redundancy further.

### Solution
To achieve 2NF, ensure the table is in 1NF and that no non-prime attribute is partially dependent on any candidate key.

### Example
Consider a `Student_Courses` table:

| Student_ID | Course_ID | Student_Name | Course_Name | Teacher     |
|------------|-----------|--------------|-------------|-------------|
| 1          | 101       | Raj          | Math        | Mr. Sharma  |
| 1          | 102       | Raj          | Science     | Dr. Verma   |
| 2          | 101       | Priya        | Math        | Mr. Sharma  |
| 2          | 103       | Priya        | English     | Ms. Kapoor  |

This table is not in 2NF because `Student_Name` depends only on `Student_ID`, and `Course_Name` & `Teacher` depend only on `Course_ID`.

In 2NF, we split the table:

1. **Students Table**

| Student_ID | Student_Name |
|------------|--------------|
| 1          | Raj          |
| 2          | Priya        |

2. **Courses Table**

| Course_ID | Course_Name | Teacher     |
|-----------|-------------|-------------|
| 101       | Math        | Mr. Sharma  |
| 102       | Science     | Dr. Verma   |
| 103       | English     | Ms. Kapoor  |

3. **Enrollment Table** (Links Students and Courses)

| Student_ID | Course_ID |
|------------|-----------|
| 1          | 101       |
| 1          | 102       |
| 2          | 101       |
| 2          | 103       |

---

## Functional Dependency

### Problem
Functional dependency ensures data integrity by establishing relationships between attributes so that data is uniquely identifiable.

### Solution
Define dependencies such that knowing a certain attribute allows us to uniquely identify other related attributes.

### Example
In a `Students` table:

| Roll_Number | Name       | Class |
|-------------|------------|-------|
| 1           | Raj        | 10th  |
| 2           | Priya      | 10th  |

`Roll_Number -> Name` means knowing `Roll_Number` uniquely determines `Name`.

---

## Closure of Attribute Sets

### Problem
Closure helps in finding all attributes functionally determined by a given set of attributes. It’s essential in identifying candidate keys.

### Solution
For a given attribute set, use known functional dependencies to find all attributes determined by it.

### Example
Given dependencies:
- `A -> B`
- `B -> C`

To find closure of `{A}`, we can derive `{A, B, C}`.

---

This document summarizes key concepts in database normalization and design with examples to illustrate how normalization steps reduce redundancy and ensure data integrity.
