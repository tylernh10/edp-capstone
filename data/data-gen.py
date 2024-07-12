# Generating JSON data to be uploaded to MongoDB
import names
import random
from uuid import uuid1
import string
import math
import json

USER_OUTPUT_PATH = "users.json"
EMPLOYEE_OUTPUT_PATH = "employees.json"

EMPLOYEE_NUMS = [1, 1, 3, 5, 10, 20, 50, 100, 1000, 200]

job_roles = [
    "Chief Executive Officer",
    "Chief Technology Officer",
    "Director of Engineering",
    "Engineering Manager",
    "Project Manager",
    "Technical Lead",
    "Senior Software Engineer",
    "Software Engineer",
    "Junior Developer",
    "Intern"
]

work_locations = [
    "New York City",
    "San Francisco",
    "San Jose",
    "Los Angeles",
    "San Diego",
    "Chicago",
    "Philadelphia",
    "Dallas",
    "Houston",
    "Phoenix",
    "Hartford"
]

def get_password(num_chars):
    characters = string.ascii_letters + string.digits
    password = ''.join(random.choice(characters) for i in range(num_chars))
    return password

# Generate random data for users and employees
# job_roles and work_locations are in sorted ascending order based on seniority and location COL
# Therefore, we can generate "realistic" salary data corresponding to these factors
def generate_data():
    users, employees = [], []
    for i, num_employees in enumerate(EMPLOYEE_NUMS):
        job_role = job_roles[i]
        for _ in range(num_employees):
            first, last = names.get_first_name(), names.get_last_name()
            phone = f"({random.randint(100, 999)}) {random.randint(100, 999)}-{random.randint(1000, 9999)}"
            work_location_idx = random.randint(0, len(work_locations) - 1)
            work_location = work_locations[work_location_idx]

            user_id = str(uuid1())
            
            user = {
                "user_id": user_id,
                "username": first.lower() + last.lower() + str(random.randint(0, 1000)),
                "password": get_password(16)
            }
            
            starting_salary = math.floor(60000 * ((10 - i) / 2) * (1 + work_location_idx / 10))
            employee = {
                "user_id": user_id,
                "first_name": first,
                "last_name": last,
                "phone_number": phone,
                "job_role": job_role,
                "work_location": work_location,
                "salary": random.randint(starting_salary, starting_salary + 20000),
                "direct_reports": [i for i in range(3)]
            }

            users.append(user)
            employees.append(employee)
    
    return users, employees

if __name__ == "__main__":
    users, employees = generate_data()

    with open(USER_OUTPUT_PATH, "w") as f:
        f.write(json.dumps(users))

    with open(EMPLOYEE_OUTPUT_PATH, "w") as f:
        f.write(json.dumps(employees))