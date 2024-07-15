from flask import Flask, request, jsonify
import pickle
import pandas as pd

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
    "Intern",
    "Chief Communications Officer",
    "HR Director",
    "HR Associate",
    "HR Assistant"
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

job_roles.sort()
work_locations.sort()

app = Flask(__name__)

# Load the model from disk
with open('salary_predictor.pkl', 'rb') as file:
    model = pickle.load(file)

@app.route('/api/predict', methods=['POST'])
def predict():
    # Get the request data
    data = request.get_json(force=True)

    # Make prediction
    try:
        # Ensure data is sent in a dictionary
        assert isinstance(data, dict)
        job_type, work_location = data["job_type"], data["work_location"]

        job_type_bools = []
        for j in job_roles:
            job = j.split("_")[-1]
            job_type_bools.append(job.lower() == job_type.lower())
        
        work_location_bools = []
        for l in work_locations:
            location = l.split("_")[-1]
            work_location_bools.append(location.lower() == work_location.lower())
        
        # if error on client side (this is only triggered if something other than a valid entry is sent)
        if not any(job_type_bools) or not any(work_location_bools):
            return "Invalid data", 400
        
        all_cols = ["job_role_" + i for i in job_roles] + ["work_location_" + i for i in work_locations]
        df = pd.DataFrame(columns=all_cols)
        df.loc[len(df)] = job_type_bools + work_location_bools

        prediction = model.predict(df)
        return jsonify(prediction.tolist())
    except Exception as e:
        return f"Error making prediction: {e}", 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)