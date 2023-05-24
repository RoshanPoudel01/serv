import BOOKING from "../Model/BOOKING";
import Hotel from "../Model/HOTEL";
import PAYMENTLOG from "../Model/PAYMENTLOG";
import USER from "../Model/USER";
import { responseObj } from "../utils";
const stripe = require("stripe")(
  "sk_test_51N2DKlBDe5c2rfDAZlaYAUJWD6ORem7RLEZFoDAZcKyPx55mSltZ2L2KrgeHboSO7hr7pSzcO1OpvGVhdosoeEDW00VrQx4XTO"
);

const calculatePrice = async (req, res) => {
  const { check_in_date, check_out_date, hotel_id } = req.body;

  if (!check_in_date || !check_out_date || !hotel_id) {
    return res.status(400).json(responseObj);
  }
  const getHotel = await Hotel.findById(hotel_id);
  // console.log(getHotel)
  if (!getHotel) {
    return res.status(400).json({
      ...responseObj,
      message: "Hotel doesnot exist",
    });
  }

  //Convert String to date an calculate date difference
  const start_date = new Date(check_in_date);
  const end_date = new Date(check_out_date);
  const dateDiff = (end_date - start_date) / (1000 * 60 * 60 * 24);
  if (dateDiff < 1) {
    return res.status(400).json({
      ...responseObj,
      message: "Unable to process",
    });
  }
  // console.log(dateDiff)

  const totalPrice = dateDiff * getHotel?.price;
  return totalPrice;
  // console.log(totalPrice)
};

export const showPrice = async (req, res) => {
  const calculacted = await calculatePrice(req, res);
  try {
    return res.status(201).json({
      ...responseObj,
      message: "Hotel Price Has Been Caluklated",
      response: {
        totalPrice: calculacted,
      },
    });
  } catch (error) {}
};
export const bookHotel = async (req, res) => {
  const calculacted = await calculatePrice(req, res);
  try {
  const { check_in_date, check_out_date, hotel_id } = req.body;

    const findUser = await USER.findById(req.user._id);

    const getHotel = await Hotel.findById(hotel_id);

    const checkout_session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: calculacted*100,
            product_data: {
              name: getHotel?.name,
            },
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      customer_email: findUser?.email,
      success_url: `http://localhost:3000/success?id=${hotel_id}`,

      cancel_url: `http://localhost:3000/failure?id=${hotel_id}`,
    });
    const paymentInitaite = new PAYMENTLOG({
      transaction_id: checkout_session?.id,
      Hotel: hotel_id,
      amount: calculacted,
      paid: false,
      User: req.user._id,
      transaction_detail: checkout_session,
    });

      await paymentInitaite.save();
      



      
    await USER.findByIdAndUpdate(req.user._id, {
      stripeSession: { ...checkout_session, hotelId: hotel_id,check_out_date,check_in_date },
    }).exec();

    return res.status(201).json({
      ...responseObj,
      message: "Payment Link genetated",
      response: {
        totalPrice: calculacted,
        session: checkout_session?.id,
      },
    });
  } catch (error) {}
};
export const checkPaymentStatus = async (req, res) => {
  try {
    const hotelId = req.query.id;

    if (!hotelId) {
      return res.status(400).json({
        ...responseObj,
        message: "Hotel doesnot exist",
      });
    }
    const getHotel = await Hotel.findById(hotelId);
    if (!getHotel) {
      return res.status(400).json({
        ...responseObj,
        message: "Hotel doesnot exist",
      });
    }
   
    //   const findPaymentLog = await PAYMENTLOG.find({ User: req.user._id, Hotel: hotelId })

    const findUser = await USER.findById(req.user._id);
    if (!getHotel) {
      return res.status(400).json({
        ...responseObj,
        message: "Hotel doesnot exist",
      });
    }
    if (findUser?.stripeSession?.hotelId !== hotelId) {
      return res.status(400).json({
        ...responseObj,
        message: "Please Contact to Customer Support",
      });
    }
    const session = await stripe.checkout.sessions.retrieve(
      findUser?.stripeSession?.id
    );
    if (!session) {
      return res.status(400).json({
        ...responseObj,
        message: "Please Contact to Customer Support",
      });
    }
    const { cancel_url, payment_status,amount_total } = session;
    console.log(payment_status);
    if (payment_status === "unpaid") {
      return res.status(400).json({
        ...responseObj,
        message: "Payment not recevied",
        cancleurl: cancel_url,
      });
    }
    //paid now
      const findPaymentLog = await PAYMENTLOG.findOneAndUpdate({ transaction_id: session.id },
          {
            paid: true,
            transaction_detail: session
          }, { new: true })
      
       const paymentInitaite = new BOOKING({
           Hotel: hotelId,
           bookedBy: req.user._id,
           paid: true,
           amount: amount_total,
           check_in_date:findUser?.stripeSession?.check_in_date,
           check_out_date:findUser?.stripeSession?.check_out_date
       });
       
       await paymentInitaite.save();
       console.log(findPaymentLog)
      
        const resetSession = await USER.findByIdAndUpdate(req.user._id, {
        stripeSession: {}
    },{ new: true });
    return res.status(201).json({
      ...responseObj,
      message: "Congrannnnn",
      response: {
        bookingdata:findPaymentLog
      },
    });
  } catch (error) {
    return res.status(400).json({
      ...responseObj,
      message: "Something went wrong",
    });
  }

  // if (!getHotel) {
  //         return res.status(400).json({
  //             ...responseObj,
  //             message:"Hotel doesnot exist"
  //         })

  //     }
};

export const bookingHistory = async (req, res) => {
  const bookings = await BOOKING.find({bookedBy:req?.user?._id}).populate("Hotel","name email address");
  
  try {
    return res.status(201).json({
      ...responseObj,
      message: "your history has been fetch succeffully",
      response: {
        Hotels: bookings,
      },
    });
  } catch (error) {}
};
