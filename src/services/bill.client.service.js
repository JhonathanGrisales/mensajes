const billClientModel = require('../models/bill.client.models');
const boom = require('@hapi/boom');

class ClientService {
  async createBill(billClientModel) {
   billClientModel.save();
    return billClientModel;
  }
  async listBill(billClientId) {
    return billClientModel.find();
  }
  async showDetailBill(billClientId) {
    return billClientModel.findById({ _id: billClientId });
  }
  async updateBill(billClientId, client_name, dni ) {
    return billClientModel.findById({ _id: billClientId }).then(() => {
      if (!billClientId) throw Error('No encontro la factura');
      return billClientModel.updateOne({ billClientId }, { client_name, dni });
    });
  }
  async removeBill(billClientId) {
    const remove_bill = billClientModel.findById({ _id: billClientId });
    return billClientModel.deleteOne(remove_bill);
  }
}

module.exports = ClientService;
