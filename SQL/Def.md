### 1. ACID Properties

#### In-Depth Notes

ACID is an acronym that describes the four essential properties of a reliable database transaction: **Atomicity, Consistency, Isolation, and Durability**. These properties guarantee that database transactions are processed reliably, even in the event of errors, power failures, or other mishaps. They are the bedrock of Online Transaction Processing (OLTP) systems.

*   **A - Atomicity ("All or Nothing")**
    *   **Concept:** A transaction is an indivisible, atomic unit of work. It must either complete entirely or not at all. There is no partial completion. If any part of the transaction fails, the entire transaction is rolled back, and the database is left in the state it was in before the transaction started.
    *   **Real-World Analogy:** A bank transfer from Account A to Account B. This involves two operations: debiting A and crediting B. Atomicity ensures that if the credit to B fails for any reason (e.g., system crash after the debit), the debit from A is also reversed (rolled back). The money is never "lost in transit."
    *   **Implementation:** Usually managed by a transaction manager using mechanisms like logs.

*   **C - Consistency ("State Remains Valid")**
    *   **Concept:** A transaction brings the database from one valid state to another valid state. It doesn't guarantee the correctness of the data itself (that's the application's job), but it guarantees that the transaction will not violate any of the database's defined rules, such as constraints, triggers, or cascades.
    *   **Example:** If a column has a `UNIQUE` constraint, a transaction that tries to insert a duplicate value will be rolled back, ensuring the database remains in a consistent state (i.e., uniqueness is maintained). Similarly, if Account A has $100, a transaction to withdraw $200 would violate a `CHECK (balance >= 0)` constraint and fail, keeping the database consistent.

*   **I - Isolation ("Transactions Don't Interfere")**
    *   **Concept:** Concurrent execution of transactions results in a system state that would be obtained if transactions were executed serially (one after another). Each transaction is "isolated" from others until it is committed. This prevents issues like dirty reads, non-repeatable reads, and phantom reads.
    *   **Real-World Analogy:** Two people trying to book the last available seat on a flight. Isolation ensures that only one person's transaction successfully commits and gets the seat. The other person's transaction will fail or see that the seat is no longer available, preventing a double booking.
    *   **Implementation:** Achieved through locking mechanisms (e.g., row-level, table-level locks) and multi-version concurrency control (MVCC). Different *isolation levels* (e.g., Read Uncommitted, Read Committed, Repeatable Read, Serializable) offer different trade-offs between concurrency and consistency.

*   **D - Durability ("Committed Data is Saved Permanently")**
    *   **Concept:** Once a transaction has been successfully committed, it will remain so, even in the event of a system failure (e.g., power outage, crash). The changes are permanently recorded.
    *   **Implementation:** Achieved through mechanisms like database write-ahead logs (WAL). Before changes are made to the database files on disk, they are first written to a log. If the system crashes, the database can use this log to "replay" and complete any committed transactions that weren't fully written to disk, ensuring durability.

#### Interview Questions

*   **Beginner:**
    *   What does ACID stand for?
    *   Can you explain each of the four ACID properties in one sentence?
    *   Give me a real-world example of why Atomicity is important.
*   **Intermediate:**
    *   How do transactions relate to ACID properties?
    *   Explain the difference between Atomicity and Durability. They sound similar. (A: Atomicity is about the all-or-nothing nature of a single transaction's operations. Durability is about the permanence of a *committed* transaction's results after a system failure).
    *   How does a database typically enforce Durability? (A: Write-ahead logging).
    *   What are some problems that the Isolation property prevents? (A: Dirty reads, non-repeatable reads, phantom reads).
*   **Advanced:**
    *   Describe the different SQL transaction isolation levels. What are the trade-offs for each?
    *   Is it possible for a system to be ACID-compliant without being slow? How do modern databases manage this? (A: MVCC, optimistic vs. pessimistic locking, efficient logging).
    *   Can a NoSQL database be ACID compliant? (A: Some are, some aren't. Many prioritize Availability and Partition Tolerance (from the CAP theorem) and offer "eventual consistency" instead. However, some NoSQL databases like MongoDB now offer multi-document ACID transactions).

---

### 2. Normalization

#### In-Depth Notes

**Normalization** is the process of organizing columns and tables in a relational database to minimize data redundancy and improve data integrity. The main goal is to isolate data so that additions, modifications, and deletions of a field can be made in just one table and then propagated through the rest of the database via defined relationships.

**Key Goals:**
*   Eliminate Redundant Data.
*   Reduce Data Modification Issues (Insert, Update, Delete Anomalies).
*   Improve Data Integrity.
*   Simplify Queries.

**Normal Forms (NF):**

*   **First Normal Form (1NF):**
    *   **Rule:** The table must have a primary key, and each cell must hold a single, atomic value. No repeating groups or multivalued columns.
    *   **Example:**
        *   *Non-1NF:* `(id, name, phone_numbers)` where `phone_numbers` is `'123, 456'`.
        *   *1NF:* Create a separate table `PhoneNumbers (person_id, phone_number)`.

*   **Second Normal Form (2NF):**
    *   **Rule:** Must be in 1NF, and all non-key attributes must be fully functionally dependent on the *entire* primary key. This rule applies to tables with composite primary keys.
    *   **Example:**
        *   *Non-2NF:* `(student_id, course_id, student_name, grade)` where PK is `(student_id, course_id)`. Here, `student_name` depends only on `student_id`, not the full key.
        *   *2NF:* Split into `Students(student_id, student_name)` and `Enrollment(student_id, course_id, grade)`.

*   **Third Normal Form (3NF):**
    *   **Rule:** Must be in 2NF, and there should be no transitive dependencies. A transitive dependency is when a non-key attribute depends on another non-key attribute.
    *   **Example:**
        *   *Non-3NF:* `(student_id, student_name, department_id, department_name)`. Here, `department_name` depends on `department_id`, which in turn depends on `student_id`. (student_id -> department_id -> department_name).
        *   *3NF:* Split into `Students(student_id, student_name, department_id)` and `Departments(department_id, department_name)`.

*   **Boyce-Codd Normal Form (BCNF):**
    *   A stricter version of 3NF. For any dependency A -> B, A must be a superkey. This handles certain rare anomalies that 3NF doesn't.

**Denormalization:** The intentional violation of normalization rules, typically to improve read performance by adding redundant data, thus reducing the need for expensive joins. It's a trade-off: improved query speed for increased storage and a higher risk of data inconsistencies.

#### Interview Questions

*   **Beginner:**
    *   What is normalization? Why do we do it?
    *   What are the main goals of normalization?
    *   Explain what "atomic value" means in the context of 1NF.
*   **Intermediate:**
    *   Explain the difference between 2NF and 3NF with an example.
    *   What is a transitive dependency?
    *   What are insert, update, and delete anomalies? Give an example of one.
    *   When would you consider denormalization? What are the pros and cons?
*   **Advanced:**
    *   What is the difference between 3NF and BCNF? Give an example of a table that is in 3NF but not in BCNF.
    *   Explain the concept of functional dependency. How does it relate to normalization?
    *   How does normalization affect database performance for read-heavy vs. write-heavy workloads? (A: Normalization is good for writes as you update in one place. It can be slower for reads due to joins. Denormalization is the reverse).

---

### 3. Constraints

#### In-Depth Notes

**Constraints** are rules enforced on data columns in a table. They are used to limit the type of data that can go into a table, ensuring the accuracy and reliability of the data. If an action violates a constraint, the action is aborted.

*   **NOT NULL:** Ensures that a column cannot have a `NULL` value.
*   **UNIQUE:** Ensures that all values in a column (or a set of columns) are different from one another. A table can have many `UNIQUE` constraints. Most systems allow one `NULL` value in a `UNIQUE` column.
*   **PRIMARY KEY (PK):** A combination of `NOT NULL` and `UNIQUE`. It uniquely identifies each record in a table. A table can have only one Primary Key.
*   **FOREIGN KEY (FK):** Uniquely identifies a record in *another* table, creating a link between the two. It enforces *referential integrity*, meaning a value in the FK column must exist in the PK column of the referenced table.
*   **CHECK:** Ensures that all values in a column satisfy a specific condition.
    *   *Example:* `CREATE TABLE Products (Price DECIMAL(10,2) CHECK (Price > 0));`
*   **DEFAULT:** Provides a default value for a column when no value is specified during an `INSERT`.
    *   *Example:* `CREATE TABLE Orders (OrderDate DATE DEFAULT GETDATE());`

#### Interview Questions

*   **Beginner:**
    *   What is a constraint in SQL?
    *   What is the difference between a Primary Key and a Unique constraint? (A: PK cannot have NULLs, only one PK per table. Unique can have one NULL, multiple Unique constraints per table).
    *   What does a Foreign Key do?
*   **Intermediate:**
    *   What is referential integrity? Which constraint enforces it?
    *   Can a Foreign Key column contain `NULL` values? If so, what does that signify? (A: Yes. It signifies that the record is not related to any record in the parent table, e.g., an employee who has not been assigned a department yet).
    *   Give an example of when you would use a `CHECK` constraint.
*   **Advanced:**
    *   What happens if you try to delete a record from a parent table that is referenced by a child table's foreign key? (A: It depends on the `ON DELETE` rule: `NO ACTION`/`RESTRICT` (default, throws error), `CASCADE` (deletes child records), `SET NULL` (sets FKs to NULL), `SET DEFAULT`).
    *   Can a single constraint apply to multiple columns? (A: Yes, these are composite constraints, e.g., `PRIMARY KEY(col1, col2)` or `UNIQUE(col1, col2)`).

---

### 4. Relationships

#### In-Depth Notes

Relationships define how tables are connected to each other, based on their keys.

*   **One-to-One (1:1):**
    *   **Concept:** Each record in Table A can be linked to one, and only one, record in Table B, and vice-versa.
    *   **Example:** A `Users` table and a `UserProfiles` table. Each user has exactly one profile.
    *   **Implementation:** The primary key of one table is a foreign key in the other table, and that FK column has a `UNIQUE` constraint.

*   **One-to-Many (1:M):**
    *   **Concept:** The most common relationship. One record in Table A can be linked to many records in Table B, but a record in Table B can be linked to only one record in Table A.
    *   **Example:** A `Customers` table and an `Orders` table. One customer can have many orders, but each order belongs to only one customer.
    *   **Implementation:** The primary key of the "one" side (Table A, `Customers.CustomerID`) is placed as a foreign key in the "many" side (Table B, `Orders.CustomerID`).

*   **Many-to-Many (M:M):**
    *   **Concept:** A record in Table A can be linked to many records in Table B, and a record in Table B can also be linked to many records in Table A.
    *   **Example:** A `Students` table and a `Courses` table. A student can enroll in many courses, and a course can have many students.
    *   **Implementation:** This requires a third table, known as a **junction table** or **linking table**. This table holds the primary keys of both Table A and Table B as foreign keys.
    *   *Example Table:* `Student_Courses (student_id, course_id)`. The primary key of this junction table is often a composite of `(student_id, course_id)`.

#### Interview Questions

*   **Beginner:**
    *   Describe the three types of database relationships.
    *   Give a real-world example for each type of relationship.
*   **Intermediate:**
    *   How do you implement a many-to-many relationship in a SQL database?
    *   What is a junction table? What does it typically contain?
    *   In a one-to-many relationship between `Departments` and `Employees`, which table would contain the foreign key? (A: The `Employees` ("many") table would contain a `DepartmentID` foreign key).

---

### 5. Joins

#### In-Depth Notes

**JOINs** are used in SQL to combine rows from two or more tables based on a related column between them.

*   **INNER JOIN:** Returns only the records that have matching values in both tables. This is the intersection of the two tables.
*   **LEFT (OUTER) JOIN:** Returns all records from the left table, and the matched records from the right table. If there is no match, the columns from the right table will have `NULL` values.
    *   *Use Case:* Find all customers and any orders they may have placed. Customers with no orders will still be listed.
*   **RIGHT (OUTER) JOIN:** Returns all records from the right table, and the matched records from the left table. If there is no match, the columns from the left table will have `NULL` values. It's the reverse of a LEFT JOIN.
*   **FULL (OUTER) JOIN:** Returns all records when there is a match in either the left or the right table. It combines the functionality of LEFT and RIGHT joins. If there's no match, the missing side's columns are `NULL`.
*   **CROSS JOIN:** Returns the Cartesian product of the two tables—i.e., every row from the first table is combined with every row from the second table.
    *   *Syntax:* `FROM table1 CROSS JOIN table2` or simply `FROM table1, table2`.
*   **SELF JOIN:** A regular join, but the table is joined with itself. This is used when a table has a recursive relationship.
    *   *Example:* An `Employees` table where one column is `EmployeeID` and another is `ManagerID` (which is also an EmployeeID). A self-join can be used to list each employee next to their manager's name.

#### Interview Questions

*   **Beginner:**
    *   What is a JOIN? Why do we need them?
    *   Explain the difference between an INNER JOIN and a LEFT JOIN.
    *   Which join would you use to find all students and the courses they are enrolled in, including students who haven't enrolled in any course? (A: LEFT JOIN from Students to Enrollments).
*   **Intermediate:**
    *   What's the difference between a FULL OUTER JOIN and a LEFT JOIN?
    *   How would you find records that are in one table but *not* in another? (A: A LEFT JOIN where the right table's key IS NULL. `... LEFT JOIN B ON A.id = B.id WHERE B.id IS NULL`).
    *   What is a CROSS JOIN and when might it be useful? (A: Generating test data, creating combinations of items).
    *   Explain a SELF JOIN with a practical example.
*   **Advanced:**
    *   What happens to performance when you join on a non-indexed column? (A: Performance degrades significantly as the database must perform a full table scan instead of using an index to look up matches).
    *   What is the difference between putting a filter condition in the `ON` clause versus the `WHERE` clause for an OUTER join? (A: For OUTER joins, conditions in the `ON` clause are applied *before* the join, while `WHERE` clause conditions are applied *after* the join. This can change the result set. For INNER joins, it makes no difference).

---

### ... [Continuing to next sections]

This response is getting long. Let's continue in the same structured format.

---

### 6. 3-Schema Architecture

#### In-Depth Notes

The **3-Schema Architecture** is a framework for database design that separates the user's view of the database from the physical representation. Its primary goal is to provide **data independence**.

*   **Internal Schema (or Physical Level):**
    *   **What it is:** Describes how the data is physically stored on the storage device. It deals with data structures, file organization, storage allocation, access paths (indexes), etc.
    *   **Concerns:** Low-level details like B-Trees, hashing, and disk block allocation.
    *   **Goal:** Optimize performance and storage.

*   **Conceptual Schema (or Logical Level):**
    *   **What it is:** The unified, community view of the database. It describes the structure of the entire database for all users. It defines the entities, attributes, relationships, and constraints.
    *   **Concerns:** What data is stored and what relationships exist. This is the level at which database administrators and designers work.
    *   **Example:** The `CREATE TABLE` statements for all tables in a schema.

*   **External Schema (or View Level):**
    *   **What it is:** Describes the part of the database that a specific user group is interested in, hiding the rest of the database. A single database can have multiple external schemas (views).
    *   **Concerns:** Presenting data to users in a customized and secure way. Simplifies access for end-users.
    *   **Example:** A `VIEW` that shows only the names and departments of employees, hiding their salaries.

**Data Independence:** The key benefit.
*   **Logical Data Independence:** The ability to modify the conceptual schema without having to change the external schemas (e.g., adding a new column to a table shouldn't break an existing view that doesn't use that column).
*   **Physical Data Independence:** The ability to modify the internal schema without having to change the conceptual schema (e.g., changing the storage structure from a hash file to a B-Tree shouldn't require you to redefine the tables).

#### Interview Questions

*   **Beginner:**
    *   What are the three levels of the 3-schema architecture?
    *   What is the main purpose of this architecture? (A: Data independence).
*   **Intermediate:**
    *   Explain the difference between logical and physical data independence. Give an example of each.
    *   Which level would a DBA be most concerned with? Which level would a business analyst interact with? (A: DBA - all, but especially Conceptual and Internal. Analyst - External/View level).
*   **Advanced:**
    *   How does the 3-schema architecture relate to the concept of a `VIEW` in SQL? (A: A SQL VIEW is a direct implementation of an External Schema).

---

### 7. Indexing

#### In-Depth Notes

An **index** is a special lookup table that the database search engine can use to speed up data retrieval operations. It's analogous to the index at the back of a book. Instead of scanning every page (a full table scan), you look up the term in the index and go directly to the page number.

**How it works:**
*   An index is a data structure (commonly a **B-Tree**) that stores the values of the indexed column(s) and a pointer (e.g., rowid) to the corresponding record on disk.
*   When a `WHERE` clause is used on an indexed column, the database can use the index to find the location of the matching rows quickly, avoiding a slow, full scan of the entire table.

**Types of Indexes:**

*   **Clustered Index:**
    *   Determines the physical order of data in a table. The leaf nodes of the clustered index contain the actual data pages.
    *   Because it dictates physical storage order, a table can have **only one** clustered index.
    *   The Primary Key is, by default, often a clustered index.

*   **Non-Clustered Index:**
    *   Has a structure separate from the data rows. The leaf nodes of a non-clustered index contain pointers to the data rows.
    *   A table can have **multiple** non-clustered indexes.
    *   This is like a traditional book index; it points you to the location of the data, but the book's content itself isn't ordered by the index terms.

**Trade-offs:**
*   **Pros:** Dramatically speeds up `SELECT` queries with `WHERE` clauses and `JOIN` operations.
*   **Cons:**
    *   Slows down data modification operations (`INSERT`, `UPDATE`, `DELETE`) because the index must also be updated.
    *   Takes up additional disk space.

#### Interview Questions

*   **Beginner:**
    *   What is a database index? Why is it useful?
    *   What is the main drawback of having indexes?
*   **Intermediate:**
    *   Explain the difference between a clustered and a non-clustered index.
    *   Why can a table have only one clustered index but many non-clustered indexes?
    *   On what kind of columns should you create an index? (A: Columns frequently used in `WHERE` clauses, `JOIN` conditions, and `ORDER BY` clauses).
*   **Advanced:**
    *   What is a covering index? (A: An index that contains all the columns needed to satisfy a query, so the database doesn't need to look up the data in the table itself).
    *   When should you *not* create an index? (A: On small tables, columns with low cardinality (e.g., a gender column with only 'M', 'F', 'O'), or columns that are very frequently updated).
    *   What is a B-Tree and why is it a good data structure for database indexes? (A: It's a self-balancing tree that keeps data sorted and allows for efficient insertion, deletion, and search (logarithmic time). It's also optimized for disk-based storage systems).

---

### 8. Aggregate & 9. Scalar Functions

#### In-Depth Notes

**Functions** in SQL perform an operation and return a value. They are broadly categorized into Aggregate and Scalar functions.

**Aggregate Functions:**
*   **Concept:** Operate on a set of rows and return a single summary value. They are commonly used with the `GROUP BY` clause.
*   **Common Functions:**
    *   `COUNT()`: Counts the number of rows. `COUNT(*)` counts all rows; `COUNT(column)` counts non-NULL values in that column.
    *   `SUM()`: Calculates the sum of a numeric column.
    *   `AVG()`: Calculates the average of a numeric column.
    *   `MIN()`: Returns the minimum value in a column.
    *   `MAX()`: Returns the maximum value in a column.

**Scalar Functions:**
*   **Concept:** Operate on a single input value and return a single output value for each row.
*   **Common Functions:**
    *   **String Functions:** `UPPER()`, `LOWER()`, `SUBSTRING()`, `LEN()` or `LENGTH()`.
    *   **Numeric Functions:** `ROUND()`, `CEILING()`, `FLOOR()`, `ABS()`.
    *   **Date Functions:** `GETDATE()` or `NOW()`, `DATEPART()`, `DATEDIFF()`.
    *   **Conversion Functions:** `CAST()`, `CONVERT()`.

#### Interview Questions

*   **Beginner:**
    *   What is the difference between an aggregate function and a scalar function?
    *   Give me an example of three aggregate functions and three scalar functions.
*   **Intermediate:**
    *   What is the difference between `COUNT(*)` and `COUNT(column_name)`? (A: `COUNT(*)` counts all rows, `COUNT(column_name)` counts only rows where `column_name` is not NULL).
    *   Can you use an aggregate function in a `WHERE` clause? Why or why not? (A: No. `WHERE` filters rows before aggregation happens. You must use the `HAVING` clause to filter on the result of an aggregate function).

---

### 10. SQL Queries & Logical Order of Operations

This is a broad topic, but a key area for interviews is the **logical processing order** of a `SELECT` statement. The syntax is written in one order, but the database engine executes it in another.

**Syntactical Order:**
`SELECT ... FROM ... WHERE ... GROUP BY ... HAVING ... ORDER BY`

**Logical Execution Order:**

1.  **`FROM` & `JOIN`:** Determines the working set of data.
2.  **`WHERE`:** Filters individual rows from the working set.
3.  **`GROUP BY`:** Groups the remaining rows into sets based on common values.
4.  **`HAVING`:** Filters the *groups* created by `GROUP BY`.
5.  **`SELECT`:** Selects the final columns and evaluates expressions/functions.
6.  **`DISTINCT`:** Removes duplicate rows from the result.
7.  **`ORDER BY`:** Sorts the final result set.
8.  **`LIMIT` / `TOP`:** Restricts the number of rows returned.

#### Interview Questions (Classic Query Challenges)

*   Write a query to find the second-highest salary in the `Employees` table.
    ```sql
    -- Common solution using a subquery/CTE
    WITH RankedSalaries AS (
        SELECT Salary, DENSE_RANK() OVER (ORDER BY Salary DESC) as rank_num
        FROM Employees
    )
    SELECT Salary FROM RankedSalaries WHERE rank_num = 2;

    -- Simpler solution using OFFSET
    SELECT Salary FROM Employees ORDER BY Salary DESC LIMIT 1 OFFSET 1;
    ```
*   Write a query to find all employees who do not have a manager. (Assume `ManagerID` is `NULL` for top-level employees).
    ```sql
    SELECT * FROM Employees WHERE ManagerID IS NULL;
    ```
*   Write a query to find all departments that have more than 5 employees.
    ```sql
    SELECT d.DepartmentName
    FROM Departments d
    JOIN Employees e ON d.DepartmentID = e.DepartmentID
    GROUP BY d.DepartmentName
    HAVING COUNT(e.EmployeeID) > 5;
    ```
*   Explain the logical processing order of the query above.

---

### 11. Foreign Key, Primary Key, and Unique Key

*This is a deeper dive into topics covered under Constraints.*

#### In-Depth Notes

| Feature | Primary Key (PK) | Unique Key (UK) | Foreign Key (FK) |
| :--- | :--- | :--- | :--- |
| **Purpose** | Uniquely identifies each record in a table. | Ensures all values in a column/set of columns are unique. | Creates a link between tables and enforces referential integrity. |
| **Allows NULLs?** | **No.** | **Yes**, typically one `NULL` value is allowed (varies by RDBMS). | **Yes.** A `NULL` FK means the record isn't linked to a parent record. |
| **Number per Table** | **Only one.** | **Many.** | **Many.** |
| **Index** | Automatically creates a unique index (often clustered). | Automatically creates a unique index (non-clustered by default). | Often beneficial to create an index manually for performance, but not automatic. |
| **Relation to other tables**| Is what a Foreign Key in another table points to. | Can be pointed to by a Foreign Key (less common). | Points to a Primary Key (or a Unique Key) in another table. |

#### Interview Questions

*   **Beginner:**
    *   What's a primary key? What's a foreign key?
*   **Intermediate:**
    *   What are the main differences between a Primary Key and a Unique Key?
    *   Can a Foreign Key reference a column that is not a Primary Key? (A: Yes, it can reference a column with a Unique constraint).
    *   Why is it a good idea to create an index on a foreign key column? (A: To speed up join operations and to improve performance of cascading updates/deletes).

---

### 12. Closure (in context of Functional Dependencies)

#### In-Depth Notes

This is a more advanced, theoretical topic from relational database theory, central to normalization algorithms.

*   **Functional Dependency (FD):** A relationship where the value of one set of attributes (the determinant) determines the value of another set of attributes. We write this as **X → Y** ("X determines Y").
    *   *Example:* In a `Students` table, `{student_id} → {student_name, email}`. Given a `student_id`, you can determine the student's name and email.

*   **Closure of a set of Attributes (denoted as X⁺):**
    *   **Concept:** Given a set of attributes X and a set of functional dependencies F, the closure of X (X⁺) is the set of all attributes that can be functionally determined by X.
    *   **How to find it:** Start with X⁺ = X. Repeatedly go through the given dependencies F. If a dependency A → B exists and A is already a subset of X⁺, then add B to X⁺. Repeat until no more attributes can be added.
    *   **Example:**
        *   Dependencies (F): `{ A → B, B → C, CD → E }`
        *   Find the closure of {A}, written as {A}⁺:
            1.  Start: {A}⁺ = {A}
            2.  From A → B, since A is in {A}⁺, add B. Now {A}⁺ = {A, B}
            3.  From B → C, since B is in {A}⁺, add C. Now {A}⁺ = {A, B, C}
            4.  Cannot use CD → E because D is not in {A}⁺.
            5.  Final result: **{A}⁺ = {A, B, C}**

*   **Why it's important:** Closure is used to find candidate keys for a table and to check for compliance with normal forms (like BCNF). A set of attributes K is a superkey if its closure (K⁺) contains all attributes of the table.

#### Interview Questions

*   **Advanced/Academic:**
    *   What is a functional dependency?
    *   What is the closure of a set of attributes?
    *   Given the relations R(A, B, C, D) and the functional dependencies { A → B, B → C }, what is the closure of {A}? (A: {A, B, C}).
    *   How can you use the concept of closure to find a candidate key for a table? (A: A set of attributes K is a candidate key if its closure is all the attributes in the relation, and no subset of K has this property).

---

### 13. GROUP BY & 14. HAVING

#### In-Depth Notes

*   **`GROUP BY` Clause:**
    *   **Purpose:** Used with aggregate functions (`COUNT`, `SUM`, `AVG`, etc.) to group rows that have the same values in specified columns into summary rows.
    *   **How it works:** It collapses multiple rows into a single summary row. The `SELECT` statement can then only include the columns listed in the `GROUP BY` clause and aggregate functions.
    *   **Example:** `SELECT DepartmentID, AVG(Salary) FROM Employees GROUP BY DepartmentID;` This returns one row for each department, showing the average salary for that department.

*   **`HAVING` Clause:**
    *   **Purpose:** Used to filter the *results* of a `GROUP BY` clause. It applies a filter condition to the groups, not the individual rows.
    *   **The Key Difference:** `WHERE` filters rows *before* aggregation, `HAVING` filters groups *after* aggregation.
    *   **Example:** `SELECT DepartmentID, AVG(Salary) FROM Employees GROUP BY DepartmentID HAVING AVG(Salary) > 50000;` This first groups employees by department and calculates the average salary, and *then* it keeps only those groups (departments) where the calculated average is over 50,000.

#### Interview Questions

*   **Beginner:**
    *   What does the `GROUP BY` clause do?
    *   What is the purpose of the `HAVING` clause?
*   **Intermediate:**
    *   **What is the primary difference between the `WHERE` clause and the `HAVING` clause?** (This is a classic and very common question).
    *   Can you use a `HAVING` clause without a `GROUP BY` clause? (A: Technically yes in some SQL dialects, where it acts like a `WHERE` clause, but this is non-standard and bad practice. The correct answer in an interview context is that `HAVING` requires `GROUP BY`).
    *   Write a query that finds product categories where the total number of products in that category is greater than 10. (This requires `GROUP BY` and `HAVING`).

---

### 15. Transactions

*This relates directly to the ACID properties.*

#### In-Depth Notes

A **transaction** is a sequence of operations performed as a single logical unit of work. All operations in a transaction must succeed for the transaction to be successful. If any operation fails, the entire transaction fails.

**Transaction Control Language (TCL) commands:**

*   **`BEGIN TRANSACTION` (or `START TRANSACTION`):** Marks the beginning of a transaction.
*   **`COMMIT`:** Saves all the changes made in the transaction to the database permanently. This ends the transaction successfully.
*   **`ROLLBACK`:** Undoes all the changes made in the transaction since `BEGIN TRANSACTION`. This is used when an error occurs.
*   **`SAVEPOINT name`:** Sets a point within a transaction to which you can later roll back. This allows for partial rollbacks within a larger transaction.
*   **`ROLLBACK TO SAVEPOINT name`:** Rolls back the transaction to the specified savepoint without rolling back the entire transaction.

**Importance:** Transactions are the mechanism through which databases achieve Atomicity and Consistency. They ensure that the database is always in a stable state.

#### Interview Questions

*   **Beginner:**
    *   What is a database transaction?
    *   What is the difference between `COMMIT` and `ROLLBACK`?
*   **Intermediate:**
    *   How do transactions enable the 'A' (Atomicity) in ACID?
    *   What is a savepoint and why would you use it?
*   **Advanced:**
    *   What is a "long-running transaction" and why can it be problematic? (A: It can hold locks for a long time, blocking other processes and reducing concurrency).
    *   What happens if the system crashes right after a `COMMIT` command is issued but before the data is written to the main database file? (A: The Durability property ensures the change is not lost. The database recovery process will use the transaction log (WAL) to complete the write).

---

### 16. DML, DDL, DCL

#### In-Depth Notes

These are sub-languages of SQL used to manage different aspects of the database.

*   **DDL - Data Definition Language:**
    *   **Purpose:** Used to define and manage the database schema and objects. These commands are typically auto-committed (cannot be rolled back).
    *   **Commands:**
        *   `CREATE`: To create databases, tables, views, indexes, etc.
        *   `ALTER`: To modify the structure of existing database objects.
        *   `DROP`: To permanently delete database objects.
        *   `TRUNCATE`: To quickly remove all records from a table (cannot be rolled back, does not fire `DELETE` triggers).
        *   `RENAME`: To rename an object.

*   **DML - Data Manipulation Language:**
    *   **Purpose:** Used for accessing and manipulating data within the schema objects. These operations can be rolled back if they are part of a transaction.
    *   **Commands:**
        *   `SELECT`: To retrieve data from the database.
        *   `INSERT`: To insert new data into a table.
        *   `UPDATE`: To modify existing data in a table.
        *   `DELETE`: To remove records from a table.

*   **DCL - Data Control Language:**
    *   **Purpose:** Used to control access rights and permissions on the database.
    *   **Commands:**
        *   `GRANT`: To give a user access privileges.
        *   `REVOKE`: To take away access privileges from a user.

*   **TCL - Transaction Control Language:**
    *   **Purpose:** Manages transactions within the database.
    *   **Commands:** `COMMIT`, `ROLLBACK`, `SAVEPOINT`.

#### Interview Questions

*   **Beginner:**
    *   What is the difference between DDL and DML? Give examples for each.
    *   Is `SELECT` a DML statement? (A: Yes, it manipulates data by retrieving it).
*   **Intermediate:**
    *   **What is the difference between `DELETE`, `TRUNCATE`, and `DROP`?** (A classic, essential question).
        *   **`DELETE`:** DML, removes rows one by one, can have a `WHERE` clause, fires `DELETE` triggers, can be rolled back. Slower.
        *   **`TRUNCATE`:** DDL, removes all rows by deallocating data pages, cannot have a `WHERE` clause, does not fire triggers, cannot be rolled back (in most systems). Faster.
        *   **`DROP`:** DDL, removes the entire table structure and data permanently.
    *   Why can't you `ROLLBACK` a `TRUNCATE` command? (A: Because it is a DDL command, which is auto-committed).
*   **Advanced:**
    *   How would you give a specific user read-only access to a single table? (A: `GRANT SELECT ON TableName TO UserName;`).