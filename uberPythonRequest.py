from bs4 import BeautifulSoup
import requests
import time

url = 'https://m.uber.com/go/product-selection?drop[0]={"addressLine1":"Pontifical Catholic University of Peru","addressLine2":"Av. Universitaria 1801, San Miguel","id":"ChIJpUAI1BLJBZERLobll7e_oNc","latitude":-12.0687255,"longitude":-77.0781351,"provider":"google_places"}&marketing_vistor_id=a2c32609-c942-4056-b657-119ddcb7ec9b&pickup={"addressLine1":"Las Cascadas 355","addressLine2":"Lima","id":"ChIJ1QYXhRPHBZERPjlBPHPL_EY","latitude":-12.1005893,"longitude":-76.94766369999999,"provider":"google_places"}&uclick_id=cacfe4c7-76b8-47b2-9814-34319f9b8dd0'

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
}

response = requests.get(url, headers=headers)

if response.status_code == 200:
    time.sleep(5)
    html_content = response.text
    print(html_content)
    soup = BeautifulSoup(html_content, 'html.parser')
    title = soup.title.string
    print('Título:', title)
else:
    print('Error al realizar la solicitud:', response.status_code)