from urllib.parse import urlparse, unquote
import requests
import time
from bs4 import BeautifulSoup

url = 'https://ride.guru/estimate/Pontificia%20Universidad%20Cat%C3%B3lica%20del%20Per%C3%BA%20-%20PUCP,%20Av.%20Universitaria%201801,%20San%20Miguel,%20Lima%20Province%2015088,%20Peru/La%20Rambla,%20Av.%20Brasil%20cdra.%207,%20Lima,%20Lima%20Province%2015083,%20Peru#fare-comparison'

decoded_url = unquote(url)

print(decoded_url)

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
}

response = requests.get(url, headers=headers)

if response.status_code == 200:
    time.sleep(5)
    html_content = response.text
    soup = BeautifulSoup(html_content, 'html.parser')
    elements = soup.find_all(class_="ng-binding")
    for element in elements:
        print(element.text)
else:
    print('Error al realizar la solicitud:', response.status_code)