# Once you generate data using data_gen.py, use this script to upload data to MongoDB
# There are no prerequisites for this script besides having MongoDB installed

import pymongo
import json

def upload_data(collection_name, json_file=None):
    if not json_file:
        json_file = f"{collection_name}.json"
    
    with open(json_file) as f:
        data = json.load(f)
    
    client = pymongo.MongoClient("mongodb://localhost:27017/")
    db = client["enterprise_directory"]
    
    db[collection_name].drop()
    collection = db[collection_name]
    collection.insert_many(data)

    client.close()

if __name__ == '__main__':
    upload_data("users")
    upload_data("employees")