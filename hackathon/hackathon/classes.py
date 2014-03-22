import json

class Meter:
	def __init__(self, id, url):
		self.mRID = id
		self.url = url

	def to_json(self):
		return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True)