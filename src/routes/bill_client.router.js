const express = require('express');
const clients_routes = express.Router();
const client_model = require('../models/bill.client.models');

const ClientService = require('../services/bill.client.service');
const _service = new ClientService();

clients_routes.post('/bill', async (req, res) => {
  try {


    const clientSchema = client_model(req.body);
    console.log(clientSchema);
    const data = await _service.createBill(clientSchema);
    res.status(201).json({ message: data });
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

clients_routes.get('/', async (req, res, next) => {
  try {
    const data = await _service.listBill();
    res.status(200).json({ message: data });
  } catch (error) {
    next(error);
  }
});

clients_routes.get('/:billClientId', async (req, res) => {
  try {
    
    const { billClientId } = req.params;
    const data = await _service.showDetailBill(billClientId);
    res.status(200).json({ message: data });
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

clients_routes.put('/:billClientId', async (req, res) => {
  try {
    const { billClientId } = req.params;
    const { client_name, dni } = req.body;
    const data = await _service.updateBill(billClientId, client_name, dni);
    res.status(200).json({ message: data });
  } catch (error) {
    res.status(404).json({ message: data });
  }
});

clients_routes.delete('/:billClientId', async (req, res) => {
  try {
    const { billClientId } = req.params;
    const data = await _service.removeBill(billClientId);
    res.status(200).json({ message: data });
  } catch (error) {
    res.status(404).json({ message: data });
  }
});

module.exports = clients_routes;
