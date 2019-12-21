import RoomRepository from "../repositories/room.repository";
import HeaderRepository from "../repositories/trx-header.repository";

const roomRepository = new RoomRepository();
const headerRepository = new HeaderRepository();

export default class DetailService {
  setRepository(repo) {
    this.repo = repo;
    return this;
  }

  async bookingServ(body) {
    let header;
    console.log(body);
    let room = await roomRepository.findRoomByRoomCode(body.roomCode);
    let countHeader = await headerRepository.findAll();
    console.log(room[0]);
    var newDate = new Date();
    var year = newDate.getFullYear();
    var month = "" + (newDate.getMonth() + 1);
    var day = "" + newDate.getDate();
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    var date = year + "-" + month + "-" + day;
    let noTrx =
      year +
      "" +
      month +
      "" +
      day +
      "" +
      room[0].hotel.hotelCode +
      "" +
      (countHeader + 1);
    header = {
      hotelId: room[0].hotel.idHotel,
      noTrx: noTrx,
      userDetailId: body.idUserDetail
    };
    await headerRepository.addTrx(header);

    let checkIn = getDayOfYear(body.dateCheckIn);
    let checkOut = getDayOfYear(body.dateCheckOut);
    let dayCheck = checkOut - checkIn;

    const detail = {
      trxNo: noTrx,
      trxDate: date,
      dateCheckIn: body.dateCheckIn,
      dateCheckOut: body.dateCheckOut,
      roomId: room[0].idRoom,
      totalCost: room[0].type.roomCost * dayCheck
    };
    // console.log(detail);
    return await this.repo.addTrx(detail);
  }
}

const getDayOfYear = date => {
  var now = new Date(date);
  var start = new Date(now.getFullYear(), 0, 0);
  var diff = now - start;
  var oneDay = 1000 * 60 * 60 * 24;
  var day = Math.floor(diff / oneDay);
  return day;
};
