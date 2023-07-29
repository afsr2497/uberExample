import time
import pyautogui

# Abre una nueva pestaña
pyautogui.hotkey('ctrl', 't')
time.sleep(1)  # Espera un segundo para que se abra la pestaña

# Escribe la URL en la barra de direcciones y presiona Enter
pyautogui.typewrite('https://m.uber.com/go/product-selection?drop%5B0%5D=%7B%22addressLine1%22%3A%22Pontifical%20Catholic%20University%20of%20Peru%22%2C%22addressLine2%22%3A%22Av.%20Universitaria%201801%2C%20San%20Miguel%22%2C%22id%22%3A%22ChIJpUAI1BLJBZERLobll7e_oNc%22%2C%22latitude%22%3A-12.0687255%2C%22longitude%22%3A-77.0781351%2C%22provider%22%3A%22google_places%22%7D&marketing_vistor_id=a2c32609-c942-4056-b657-119ddcb7ec9b&pickup=%7B%22addressLine1%22%3A%22Las%20Cascadas%20355%22%2C%22addressLine2%22%3A%22Lima%22%2C%22id%22%3A%22ChIJ1QYXhRPHBZERPjlBPHPL_EY%22%2C%22latitude%22%3A-12.1005893%2C%22longitude%22%3A-76.94766369999999%2C%22provider%22%3A%22google_places%22%7D&uclick_id=cacfe4c7-76b8-47b2-9814-34319f9b8dd0')
pyautogui.press('enter')
time.sleep(2)  # Espera dos segundos para que se cargue la página

# Cierra la pestaña actual
pyautogui.hotkey('ctrl', 'w')