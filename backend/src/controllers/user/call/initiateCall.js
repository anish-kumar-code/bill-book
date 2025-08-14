const axios = require("axios");
const user = require("../../../models/user");

// You can import these from env variables or config


const initiateCall = async (req, res) => {

    const KNOWLARITY_API_KEY = process.env.KNOWLARITY_API_KEY;
    const KNOWLARITY_AUTH_TOKEN = process.env.KNOWLARITY_AUTH_TOKEN;
    const KNOWLARITY_CALLER_ID = process.env.KNOWLARITY_CALLER_ID;
    const KNOWLARITY_K_NUMBER = process.env.KNOWLARITY_K_NUMBER;

    console.log(KNOWLARITY_API_KEY)

    // const userId = req.user._id;
    // const salesPerson = await user.findById(userId).select("mobileNo")
    // const salesNumber = salesPerson.mobileNo

    // console.log(userId, userMobileNo)
    // return;

    // console.log(salesNumber);
    // return;

    const { userNumber, salesNumber } = req.body;
console.log(userNumber, salesNumber)

    if (!userNumber || !salesNumber) {
        return res.status(400).json({ message: "Missing phone numbers." });
    }

    try {
        const response = await axios.post(
            "https://kpi.knowlarity.com/Basic/v1/account/call/makecall",
            {
                k_number: KNOWLARITY_K_NUMBER,
                agent_number: salesNumber,
                customer_number: userNumber,
                caller_id: KNOWLARITY_CALLER_ID,
            },
            {
                headers: {
                    authorization: KNOWLARITY_AUTH_TOKEN,
                    "x-api-key": KNOWLARITY_API_KEY,
                    "Content-Type": "application/json",
                },
            }
        );

        console.log("Knowlarity call initiated:", response.data);
        return res.status(200).json({ success: true, data: response.data });
    } catch (error) {
        console.log(error)
        console.error("Knowlarity call error:", error.response?.data || error.message);
        return res.status(500).json({ success: false, message: "Failed to initiate call" });
    }
};

module.exports = initiateCall;
