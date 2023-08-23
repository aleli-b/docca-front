const { addTurno } = require("../controllers/turno.controller");
require("dotenv").config({ path: "./.env" });
const bodyParser = require("body-parser");
const mercadopago = require("mercadopago");
const { User } = require("../db");
const axios = require("axios");
const { setPago } = require("../controllers/pagos.controller");
const MpAccessToken = process.env.MpAccessToken;
mercadopago.configure({
  access_token: MpAccessToken,
});
const { BACK_URL, CORS_DOMAIN } = process.env;

async function setPreferences(req, res) {
  const { doctor, user, turno } = req.body;
  let preference = {
    items: [
      {
        title: "Consulta medica",
        unit_price: Number(doctor.price),
        quantity: 1,
        currency_id: "ARS",
      },
    ],
    external_reference: `${turno}_${user.id}_${doctor.id}`,
    back_urls: {
      success: `${BACK_URL}/feedback`,
      failure: `${BACK_URL}/feedback`,
      pending: CORS_DOMAIN,
    },
    binary_mode: true,
    auto_return: "approved",
  };
  mercadopago.preferences
    .create(preference)
    .then((response) => res.status(200).send({ response }))
    .catch((error) => {res.status(400).send({ error: error.message }); console.log(error)});
}

//Esta función se encarga de crear el id de Referencia para que se genere el checkout de MP
async function setPreferencesSubscription(req, res) {
  const { user, price } = req.body;

  let preference = {
    items: [
      {
        title: "Subscripción",
        unit_price: Number(price),
        quantity: 1,
        currency_id: "ARS",
      },
    ],
    external_reference: user.id,
    back_urls: {
      success: `${BACK_URL}/feedbackSubscription`,
      failure: `${BACK_URL}/feedbackSubscription`,
      pending: "",
    },
    binary_mode: true,
    auto_return: "approved",
  };

  mercadopago.preferences
    .create(preference)
    .then((response) => res.status(200).send({ response }))
    .catch((error) => res.status(400).send({ error: error.message }));
}

async function feedback(req, res) {
  try {
    let dataPay = {
      Payment: req.query.payment_id,
      Status: req.query.status,
      MerchantOrder: req.query.merchant_order_id,
      ExternalReference: req.query.external_reference,
    };
    references = dataPay.ExternalReference.split("_");
    const userData = {
      date: references[0],
      userId: references[1],
      doctorId: references[2],
      paymentId: dataPay.Payment,
    };
    if (dataPay.Status === "approved") {
      try {
        const turnoId = await addTurno(userData);
        setPago(userData, turnoId);
        res.redirect(CORS_DOMAIN);
      } catch (error) {
        console.error(error);
        res.send("Turno no reservado");
      }
    } else {
      res.redirect(CORS_DOMAIN);
    }
  } catch (error) {
    console.error(error);
    return res.send("Ocurrio un error");
  }
}
async function feedbackSubscription(req, res) {
  try {
    let dataPay = {
      Payment: req.query.payment_id,
      Status: req.query.status,
      MerchantOrder: req.query.merchant_order_id,
      ExternalReference: req.query.external_reference,
    };
    const user = await User.findByPk(dataPay.ExternalReference);
    if (dataPay.Status === "approved") {
      await user.update({ subscription: true });
      res.redirect(CORS_DOMAIN);
    } else {
      res.redirect(CORS_DOMAIN);
    }
  } catch (error) {
    console.error(error);
    return res.send("El ID no existe");
  }
}

module.exports = {
  setPreferences,
  feedback,
  setPreferencesSubscription,
  feedbackSubscription,
};
