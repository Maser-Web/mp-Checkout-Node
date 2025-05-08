import axios from "axios";
import { config } from "dotenv";
import { Payment, MercadoPagoConfig, Preference } from "mercadopago";

config();

// Inicializo el cliente vendedor
const client = new MercadoPagoConfig({
  accessToken: process.env.ACCESS_TOKEN_VENDEDOR,
  options: { timeout: 5000 },
});

// Instancia de Payment
const payment = new Payment(client);

/**
 * data {
    accounts_info: null,
    acquirer_reconciliation: [],
    additional_info: {
      ip_address: '152.168.125.92',
      items: [ [Object], [Object] ],
      payer: { first_name: 'FACUNDO MARTIN ZALLOCCO' },
      tracking_id: 'platform:v1-blacklabel,so:ALL,type:N/A,security:none'
    },
    authorization_code: '301299',
    binary_mode: false,
    brand_id: null,
    build_version: '3.104.0-rc-3',
    call_for_authorize_id: null,
    captured: true,
    card: {
      bin: '50317557',
      cardholder: { identification: [Object], name: 'APRO' },
      country: null,
      date_created: '2025-05-07T13:38:29.000-04:00',
      date_last_updated: '2025-05-07T13:38:29.000-04:00',
      expiration_month: 11,
      expiration_year: 2030,
      first_six_digits: '503175',
      id: null,
      last_four_digits: '0604',
      tags: [ 'credit' ]
    },
    charges_details: [
      {
        accounts: [Object],
        amounts: [Object],
        client_id: 0,
        date_created: '2025-05-07T13:38:29.000-04:00',
        id: '110731102034-001',
        last_updated: '2025-05-07T13:38:29.000-04:00',
        metadata: [Object],
        name: 'mercadopago_fee',
        refund_charges: [],
        reserve_id: null,
        type: 'fee'
      },
      {
        accounts: [Object],
        amounts: [Object],
        client_id: 0,
        date_created: '2025-05-07T13:38:29.000-04:00',
        id: '110731102034-002',
        last_updated: '2025-05-07T13:38:29.000-04:00',
        metadata: [Object],
        name: 'financing_fee',
        refund_charges: [],
        reserve_id: null,
        type: 'fee'
      }
    ],
    charges_execution_info: {
      internal_execution: {
        date: '2025-05-07T13:38:29.510-04:00',
        execution_id: '01JTNX7NY264K38HE30ZKQSQ4Y'
      }
    },
    collector_id: 2405433861,
    corporation_id: null,
    counter_currency: null,
    coupon_amount: 0,
    currency_id: 'ARS',
    date_approved: '2025-05-07T13:38:30.000-04:00',
    date_created: '2025-05-07T13:38:29.000-04:00',
    date_last_updated: '2025-05-07T13:38:30.000-04:00',
    date_of_expiration: null,
    deduction_schema: null,
    description: 'CORTADORA HORMIGON CH902 6.5HP DYN',
    differential_pricing_id: null,
    external_reference: null,
    fee_details: [
      { amount: 36.68, fee_payer: 'payer', type: 'financing_fee' },
      { amount: 8.2, fee_payer: 'collector', type: 'mercadopago_fee' }
    ],
    financing_group: null,
    id: 110731102034,
    installments: 2,
    integrator_id: null,
    issuer_id: '3',
    live_mode: true,
    marketplace_owner: null,
    merchant_account_id: null,
    merchant_number: null,
    metadata: {},
    money_release_date: '2025-05-25T13:38:30.000-04:00',
    money_release_schema: null,
    money_release_status: 'pending',
    notification_url: 'https://5304-152-168-125-92.ngrok-free.app/responseMp/webhook',
    operation_type: 'regular_payment',
    order: { id: '30835304926', type: 'mercadopago' },
    payer: {
      email: 'test_user_1294670853@testuser.com',
      entity_type: null,
      first_name: null,
      id: '2405435775',
      identification: { number: '1111111', type: 'DNI' },
      last_name: null,
      operator_id: null,
      phone: { number: null, extension: null, area_code: null },
      type: null
    },
    payment_method: {
      data: { routing_data: [Object] },
      id: 'master',
      issuer_id: '3',
      type: 'credit_card'
    },
    payment_method_id: 'master',
    payment_type_id: 'credit_card',
    platform_id: null,
    point_of_interaction: {
      application_data: { name: 'checkout-off', operating_system: null, version: 'v2' },
      business_info: {
        branch: 'Merchant Services',
        sub_unit: 'checkout_pro',
        unit: 'online_payments'
      },
      transaction_data: { e2e_id: null },
      type: 'CHECKOUT'
    },
    pos_id: null,
    processing_mode: 'aggregator',
    refunds: [],
    release_info: null,
    shipping_amount: 0,
    sponsor_id: null,
    statement_descriptor: 'Mercadopago*fake',
    status: 'approved',
    status_detail: 'accredited',
    store_id: null,
    tags: null,
    taxes_amount: 0,
    transaction_amount: 200,
    transaction_amount_refunded: 0,
    transaction_details: {
      acquirer_reference: null,
      external_resource_url: null,
      financial_institution: null,
      installment_amount: 118.34,
      net_received_amount: 191.8,
      overpaid_amount: 0,
      payable_deferral_period: null,
      payment_method_reference_id: null,
      total_paid_amount: 236.68
    }
  }
 * 
*/

export const webhookController = async (req, res) => {
  console.log("entra aca como papa")

  try {
    const body = req.body;

    console.log( "Webhook recibido:", body);

    if (body.type && body.type == 'payment') {
      console.log("------------ entro aca -----------------")
      const paymentId = body.data.id;

      console.log(`Consultando pago con ID: ${paymentId}`);

      try {
        const paymentInfo = await new Payment(client).get({ id: paymentId });

        // const paymentInfo = await axios.get(`https://api.mercadopago.com/v1/payments/${paymentId}`,{
        //   headers:{
        //     'Content-Type': 'application/json',
        //     'Authorization': `Bearer ${process.env.ACCESS_TOKEN_VENDEDOR}`
        //   }
        // })
        
        console.log("data", paymentInfo)

        /**
         * aca cuando procesa y obtiene info del pago, en base al estado se deberia modificar en el registro
         * que se registro antes de redireccionarlo al pago en el front. es decir en base a lo que se reciba
         * de la consulta de la orden se guardarn el id de la orden de pago, el nuevo estado, etc.
         */

        // Aquí podrías guardar la info del pago en tu DB si querés

        return res.status(200).json({ message: "Webhook processed (payment)" });
      } catch (err) {
        console.error("Error al obtener información del pago:", err);
        return res.status(404).json({ message: "Pago no encontrado o token incorrecto" });
      }
    }
    // else if(body.resource && body.topic && body.topic == "merchant_order"){
    //   try {
        
    //     const code = body.resource.split('/').pop()

    //     const responseOrder = await axios.get('https://api.mercadopago.com/merchant_orders/'+code,{
    //       headers:{
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer ${process.env.ACCESS_TOKEN_VENDEDOR}`
    //       }
    //     });
    //     console.log("response", responseOrder.data);

    //     /**
    //      * aca cuando procesa y obtiene info del pago, en base al estado se deberia modificar en el registro
    //      * que se registro antes de redireccionarlo al pago en el front. es decir en base a lo que se reciba
    //      * de la consulta de la orden se guardarn el id de la orden de pago, el nuevo estado, etc. en caso de que
    //      * sea correcto y aprobado el pago se le deberia finalizar el carrito. con los datos del usuario que tengamos.
    //      */

    //   } catch (error) {
    //     console.error("Info payment merchant", error)
    //   }
    // }

    // Si no es un webhook de tipo "payment" o no tiene ID
    res.status(200).json({ message: "Webhook recibido sin acción necesaria" });
  } catch (error) {
    console.error("Error general en el webhook:", error);
    res.status(500).json({ message: "Error al procesar el webhook" });
  }
};
