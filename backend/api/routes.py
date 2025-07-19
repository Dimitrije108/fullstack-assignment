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
		# Handle HTTP status errors
		return jsonify(error="Failed to authenticate", details=str(e)), 502
	except ValueError:
		# Handle JSON parsing errors
		return jsonify(error="Invalid JSON from external API"), 502
	
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

		for product in products:
			if product["categoryName"] == "Monitori":
				product["price"] *= 1.10

		# inside description change every "brzina" into "performanse"
		for product in products:
			if "brzina" in product["description"].lower():
				product["description"] = product["description"].replace("brzina", "performanse").replace("Brzina", "Performanse")

		return jsonify(products)
	except requests.exceptions.RequestException as e:
		status_code = getattr(e.response, "status_code", None)

		if status_code == 401:
			return jsonify(error="Unauthorized. Session may have expired."), 401
		# Handle HTTP status errors
		return jsonify(error="Failed to fetch data", details=str(e)), 502
	except ValueError:
		# Handle JSON parsing errors
		return jsonify(error="Invalid JSON from external API"), 502
