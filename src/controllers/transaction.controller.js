import { logErrorEvent } from "../events/logging.event";
import DetailRepository from "../repositories/trx-detail.repository";
import TrxFoodBeverageRepository from "../repositories/trx-food-beverage.repository";

const detailRepository = new DetailRepository();
const trxFoodBeverageRepository = new TrxFoodBeverageRepository();

export const trxBooking = async (req, res, detailService) => {
  try {
    const result = await detailService
      .setRepository(detailRepository)
      .bookingServ(req.body);
    return res.status(200).json(result);
  } catch (err) {
    logErrorEvent.emit("CONTROLLER", err, res);
  }
};
export const trxUpdateBooking = async (req, res, detailService) => {
  try {
    const result = await detailService
      .setRepository(detailRepository)
      .updateBookingServ(req.body);
    return res.status(200).json(result);
  } catch (err) {
    logErrorEvent.emit("CONTROLLER", err, res);
  }
};
export const trxFoodBeverage = async (req, res, trxFoodBeverageService) => {
  try {
    const result = await trxFoodBeverageService
      .setRepository(trxFoodBeverageRepository)
      .orderFood(req.body);
    return res.status(200).json(result);
  } catch (err) {
    logErrorEvent.emit("CONTROLLER", err, res);
  }
};
