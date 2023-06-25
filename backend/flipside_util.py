from flipside import Flipside
import json

def get_data_from_flipside():

    flipside = Flipside("f66dcccb-9799-4ef1-a9bd-5312cd0d98bb", "https://api-v2.flipsidecrypto.xyz")

    sql = """SELECT DATE_TRUNC('day', block_timestamp) AS day, 
    COUNT(*) AS transaction_count 
    FROM optimism.core.fact_transactions 
    WHERE block_timestamp >= DATEADD(year, -1, GETDATE()) 
    GROUP BY 1 
    ORDER BY 1;
    """

    """Run the query against Flipside's query engine and await the results"""
    query_result_set = flipside.query(sql)
    # query_result_set = json.loads(str(query_result_set))
    # return query_result_set.get('records')
    return query_result_set