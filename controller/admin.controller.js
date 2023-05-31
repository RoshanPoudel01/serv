import BOOKING from "../Model/BOOKING";
import Hotel from "../Model/HOTEL";
import PAYMENTLOG from "../Model/PAYMENTLOG";
import USER from "../Model/USER";
import { responseObj } from "../utils";

//All Hotels registered in the system
export const getAllHotels = async (req, res) => {
  try {
    const allHotels = await Hotel.find().populate("owner", "name")
    return res.status(200).json({
      ...responseObj,
      message: "All Hotels",
      response: {
        Hotels:allHotels,
        
      }
    })
  }catch(error){}
}


//Show All Bookings of all hotels
export const totalBookings = async (req, res) => {
  try {
    const allBookings = await BOOKING.find().populate("Hotel","name email address").populate("bookedBy","name")
    return res.status(200).json({
      ...responseObj,
      message: "All Bookings",
      response: {
        Bookings:allBookings,
      }
    })
  }
  catch(error){}
}

//show all users
export const allUsers = async (req, res) => {
    try {
        const allUser = await USER.find()
        return res.status(200).json({
            ...responseObj,
          message: "All Users",
          response: {
            Users: allUser,
          }
        })
    }catch(error){}
    
}

//show all payment log
export const allPaymentLog = async (req, res) => {
       try {
           const allPayment = await PAYMENTLOG.find().populate("Hotel", "name email address").sort({createdAt:-1})
           console.log(allPayment)
      return res.status(200).json({
      ...responseObj,
      message: "Your Payment Log",
      response: {
        Payments:allPayment,
      }
    })
    }catch(error){}
    
}


