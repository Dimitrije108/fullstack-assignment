from flask import request, jsonify
import requests
from . import api_blueprint

@api_blueprint.route("/data")
def get_data():
	external_url = "https://zadatak.konovo.rs/"
	response = requests.get(external_url, params=request.args)

	try:
		return jsonify(response.json())
	except ValueError:
		return jsonify(error="Invalid JSON from external API"), 502
