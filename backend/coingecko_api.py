import requests

def get_ethereum_data(days=365):
    url = f'https://api.coingecko.com/api/v3/coins/zyx/market_chart?vs_currency=usd&days={days}'
    response = requests.get(url)
    data = response.json()
    return data


if __name__=="__main__":
    print(get_ethereum_data())