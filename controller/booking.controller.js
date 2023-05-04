import Hotel from "../Model/HOTEL"
import USER from "../Model/USER";
import { responseObj } from "../utils";
import stripe  from "stripe";

const calculatePrice = async (req, res) => {
    const { check_in_date, check_out_date, hotel_id } = req.body;

    if (!check_in_date || !check_out_date || !hotel_id) {
        return res.status(400).json(responseObj)
    }
    const getHotel =await Hotel.findById(hotel_id)
    console.log(getHotel)
    if (!getHotel) {
        return res.status(400).json({
            ...responseObj,
            message:"Hotel doesnot exist"
        })
        
    }


//Convert String to date an calculate date difference
    const start_date = new Date(check_in_date)
    const end_date = new Date(check_out_date)
    const dateDiff = (end_date - start_date)/(1000*60*60*24)
    if (dateDiff < 1) {
         return res.status(400).json({
            ...responseObj,
            message:"Unable to process"
        })
        
    }
    console.log(dateDiff)

    const totalPrice = dateDiff * getHotel?.price
    return totalPrice
    // console.log(totalPrice)
    
        
}


export const showPrice = async(req, res) => {
    const calculacted = await calculatePrice(req, res)
    try {
      
        return res.status(201).json({
            ...responseObj,
         message: "Hotel Price Has Been Caluklated",
         response: {
                "totalPrice":calculacted
            }
        })
    } catch (error) {
        
    }
}
export const bookHotel = async(req, res) => {
    const calculacted = await calculatePrice(req, res)
    try {
    const { check_in_date, check_out_date, hotel_id } = req.body;


    const getHotel =await Hotel.findById(hotel_id)
        const Stripe = stripe(process.env.STRIPE_SECRET_KEY)
        console.log(Stripe)
        const session = await Stripe.checkout.session.create({
            payment_method_types: ["card"],
            line_items: [{
                name: getHotel?.name,
                amount: calculacted,
                currency: 'usd',
                quantity:1
            }],
            success_url: "google.com",
            cancel_url:"youtube.com"
        })
        console.log(session)
        await USER.findByIdAndUpdate("644fc03b6a5c847f442bbf5b", {
            stripeSession: session
            
        }).exec();
        
        return res.status(201).json({
            ...responseObj,
         message: "Hotel Price Has Been Caluklated",
         response: {
             "totalPrice": calculacted,
             "session":session
            }
        })
    } catch (error) {
        
    }
}