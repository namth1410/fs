const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const payOS = require("./utils/payos");
const db = require("./firebase");

const app = express();
const PORT = process.env.PORT || 3030;
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", express.static("public"));
app.use("/payment", require("./controllers/payment-controller"));
app.use("/order", require("./controllers/order-controller"));

app.get("/user", async (req, res) => {
  const userId = req.query.userId;
  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    const userInfoCollection = db.collection("userInfo");
    const userDoc = await userInfoCollection.doc(userId).get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(userDoc.data());
  } catch (error) {
    console.error("Error getting user info:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/update-firebase", async (req, res) => {
  const { amount, userId, id, orderCode } = req.body;

  if (!amount || !userId) {
    return res.status(400).send("Amount and userId are required");
  }

  const parsedAmount = Number(amount);
  if (isNaN(parsedAmount) || parsedAmount <= 0) {
    return res.status(400).send("Amount must be a positive number");
  }

  try {
    const userInfoCollection = db.collection("userInfo");
    const userDoc = await userInfoCollection.doc(userId).get();

    if (!userDoc.exists) {
      return res.status(404).send("User not found");
    }

    let paymentLinkInformation;
    try {
      paymentLinkInformation = await payOS.getPaymentLinkInformation(id);
    } catch (error) {
      console.error("Error fetching payment link information:", error);
      return res.status(500).send("Error fetching payment link information");
    }
    if (
      paymentLinkInformation.id.toString() !== id.toString() ||
      paymentLinkInformation.orderCode.toString() !== orderCode.toString()
    ) {
      return res.status(400).send("Id or orderCode incorrect");
    }

    // Check if orderCode already exists in Payments collection
    const paymentsCollection = db.collection("Payments");
    const orderCodeDoc = await paymentsCollection
      .where("orderCode", "==", orderCode)
      .get();

    if (!orderCodeDoc.empty) {
      return res.status(400).send("OrderCode already exists");
    }

    await db.runTransaction(async (transaction) => {
      const userDocRef = userInfoCollection.doc(userId);
      const userDoc = await transaction.get(userDocRef);

      const currentAmount = Number(userDoc.data().UserMoney) || 0;
      if (isNaN(currentAmount)) {
        throw new Error("Current user money is not a valid number");
      }

      const newAmount = currentAmount + parsedAmount;

      transaction.update(userDocRef, { UserMoney: newAmount });

      const paymentsCollection = db.collection("Payments");
      transaction.set(paymentsCollection.doc(), {
        userId: userId,
        orderCode: orderCode,
        amount: parsedAmount,
      });
    });

    res.status(200).send("User amount updated successfully");
  } catch (error) {
    console.error("Error updating amount:", error);
    res.status(500).send("Internal server error");
  }
});

app.post("/create-payment-link", async (req, res) => {
  const YOUR_DOMAIN = `${process.env.PAYOS_HOST}`;
  const { amount, userId } = req.body;
  const body = {
    orderCode: Number(String(Date.now()).slice(-6)),
    amount: amount,
    description: "Thanh toan don hang",
    returnUrl: `${YOUR_DOMAIN}/success.html?userId=${userId}&amount=${amount}`,
    cancelUrl: `${YOUR_DOMAIN}/cancel.html?userId=${userId}`,
  };

  try {
    const paymentLinkResponse = await payOS.createPaymentLink(body);
    res.json({
      checkoutUrl: paymentLinkResponse.checkoutUrl,
    });
  } catch (error) {
    console.error(error);
    res.send("Something went error");
  }
});

app.listen(PORT, function () {
  console.log(`Server is listening on port ${PORT}`);
});
