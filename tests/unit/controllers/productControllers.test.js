const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const productController = require('../../../models/productModel');

const mockProducts = [
	{
		"id": 1,
		"name": "Martelo de Thor"
	},
	{
		"id": 2,
		"name": "Traje de encolhimento"
	},
	{
		"id": 3,
		"name": "Escudo do Capitão América"
	}
]

describe()