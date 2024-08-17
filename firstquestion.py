from flask import Flask, jsonify, request
import requests

app = Flask(__name__)

# Configuration
WINDOW_SIZE = 10
numbers_window = []

# Helper function to fetch numbers from the third-party server
def fetch_numbers(number_id):
    url = f"http://thirdpartyapi.com/numbers/{number_id}"
    try:
        response = requests.get(url, timeout=0.5)  # 500ms timeout
        if response.status_code == 200:
            return list(set(response.json()))  # Ensure uniqueness
    except requests.Timeout:
        return []  # Return empty list on timeout
    return []

# Helper function to calculate the average
def calculate_average(numbers):
    return sum(numbers) / len(numbers) if numbers else 0

# REST API Endpoint
@app.route('/numbers/<string:number_id>', methods=['GET'])
def get_numbers(number_id):
    if number_id not in ['p', 'f', 'e', 'r']:
        return jsonify({"error": "Invalid number ID"}), 400

    # Previous state of the window
    previous_state = numbers_window.copy()

    # Fetch numbers from the third-party server
    received_numbers = fetch_numbers(number_id)

    # Update the numbers_window with unique numbers and manage the window size
    for num in received_numbers:
        if num not in numbers_window:
            if len(numbers_window) >= WINDOW_SIZE:
                numbers_window.pop(0)  # Remove the oldest number
            numbers_window.append(num)

    # Calculate the average
    avg = calculate_average(numbers_window)

    # Current state of the window
    current_state = numbers_window.copy()

    # Prepare the response
    response = {
        "windowPrevState": previous_state,
        "windowCurrState": current_state,
        "numbers": received_numbers,
        "avg": round(avg, 2)
    }

    return jsonify(response), 200

if __name__ == '__main__':
    app.run(debug=True)
