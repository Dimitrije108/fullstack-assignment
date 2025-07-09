from flask import request, jsonify
import requests
from . import api_blueprint

# route to get all products
# token sent from frontend localStorage, just passed onto backend
# upon every request process data so that:
#  1. products from "Monitori" category have their price enlarged by 10%
#  2. in product description change "brzina" to "performanse" (case-insensitive)
# filter per category
# filter by text supplied
# return JSON

@api_blueprint.route("/products")
def get_products():
	external_url = "https://zadatak.konovo.rs/products"
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
	
@api_blueprint.route("/login", methods=["POST"])
def login():
	external_url = "https://zadatak.konovo.rs/login"
	credentials = request.get_json()
	
	try:
		response = requests.post(
			external_url, 
			json=credentials,
			headers={ "Content-Type": "application/json" }
		)
		# Check HTTP status code for errors
		response.raise_for_status()

		token = response.json()
		return jsonify(token)
	except requests.exceptions.RequestException as e:
		# Handle connection errors, timeouts, bad HTTP status codes
		return jsonify(error="Failed to authenticate", details=str(e)), 502
	except ValueError:
		# Handle JSON parsing errors
		return jsonify(error="Invalid JSON from external API"), 502
