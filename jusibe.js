/*
 * Jusibe API wrapper
 * @author Eseyin Wale <@ewdave>
 */

'use strict'

var request = require('request');

Jusibe.BASE_URL = 'https://jusibe.com/smsapi';

/**
 * @param: publicKey as authenticating username
 * @param: accessToken as authenticating password
 * returns new Jusibe instance object
 */
function Jusibe(publicKey, accessToken) {
	if (!(this instanceof Jusibe)) {
		return new Jusibe(publicKey, accessToken);
	}
  if (publicKey == null || accessToken == null) {
    throw new Error('Jusibe requires a public_key and access_token')
  }

	this.username = publicKey;
	this.password = accessToken;
}

Jusibe.prototype = {

	send_sms: function(params, callback) {
		var params = params || {}

		return this._request({
			method: 'POST',
			endpoint: '/send_sms',
			body: params
		}, function(error,callback) {
      if (error) {
        return callback(error, null)
      }

      return callback(null, body);
		})
	},

	get_credits: function(callback) {

    return this._request({
      endpoint: '/get_credits'
    }, function(error, body) {
      if (error) {
        return callback(error, null)
      }

      return callback(null, body);
    })
	},

	delivery_status: function(callback) {

    return this._request({
      endpoint: '/delivery_status'
    }, function(error, body) {
      if (error) {
        return callback(error, null)
      }

      return callback(null,body);
    })
	},

	_request: function(options,callback) {
		var options = options || {};

		if (!options.method) {
			options.method = 'GET'
		}
		if (options.endpoint) {
			if (options.url = null) {
				options.url = Jusibe.BASE_URL + options.endpoint
			}
		}
		if (!options.json) {
			options.json = true;
		}
		var header, header_toBase64;
		if (this.username && this.password) {
			header = this.username + ':' + (this.password || '')
			header_toBase64 = new Buffer(header || '', 'utf8')).toString('base64')

			options.headers = {
				'Authorization': ['Basic ', header_toBase64].join(''),
				'Content-Type': 'application/json'
			}
		}

		request(options, function(error, response, body) {
			//Error from API

			return callback(error, body);
		});
	}
};

module.exports = Jusibe;
