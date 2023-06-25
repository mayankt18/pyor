from flask import Flask, request
from flipside_util import get_data_from_flipside
from coingecko_api import get_ethereum_data
import json
from flask_cors import CORS
from datetime import datetime
from flask_crontab import Crontab



app = Flask(__name__)
CORS(app)
crontab = Crontab(app)


@crontab.job(minute="0", hour="24")
def fetch_data_from_coingecko():
    """Logic that retrieves the data on a daily basis"""
    get_ethereum_data()


@app.route('/data')
def get_data():
    """Obtain the response from flipside and format it"""
    response = get_data_from_flipside()
    response = response.json()
    records = json.loads(response).get('records')
    response = []
    for record in records:
        date_object = datetime.strptime(record.get('day'), '%Y-%m-%dT%H:%M:%S.%fZ')
        formatted_date = date_object.strftime('%Y-%m-%d')
        value = record.get('transaction_count')
        response.append({"time": formatted_date, "value": value})  
    return response
    

@app.route('/ethereum-data')
def ethereum_endpoint():
    """Takes the days argument and returns ethereum data from coingecko"""
    args = request.args
    days = args.get('days')
    if days==None:
        days = 365
    return get_ethereum_data(days)

@app.route('/')
def hello_world():
    return 'server running!'

if __name__=="__main__":
    app.run(debug=True, host="0.0.0.0", port=8000)