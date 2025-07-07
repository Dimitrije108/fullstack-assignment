from flask import request, jsonify
import requests
from . import api_blueprint

# create route
# take in data from frontend
# route to get all products
# token sent from frontend localStorage, just passed on the backend
# upon every request process data so that:
#  1. products from "Monitori" category have their price enlarged by 10%
#  2. in product description change "brzina" to "performanse" (case-insensitive)
# filter per category
# filter by text supplied
# return JSON

@api_blueprint.route("/products")
def get_products():
	external_url = "https://zadatak.konovo.rs/"
	headers = {
		"Authorization": request.headers.get("Authorization")
	}
	# Get all params
	params = request.args
	
	try:
		response = requests.get(external_url, headers=headers)
		# Check HTTP status code
		response.raise_for_status()
		products = response.json()

		return jsonify(products)
	except requests.exceptions.RequestException as e:
		# Handle connection errors, timeouts, bad HTTP status codes
		return jsonify(error="Failed to fetch data", details=str(e)), 502
	except ValueError:
		# Handle JSON parsing errors
		return jsonify(error="Invalid JSON from external API"), 502
