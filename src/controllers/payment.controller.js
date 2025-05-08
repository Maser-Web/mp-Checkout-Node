// payment.controller.js
import { config } from "dotenv";
import { MercadoPagoConfig, Payment, Preference } from "mercadopago";

//Cargo variables de entorno
config();

//Inicializo el cliente vendedor
const client = new MercadoPagoConfig({
  accessToken: 'APP_USR-7607730177948780-042513-a3834fc0d03db2e9ab072b179e718336-2405433861',  
  options: {
    timeout: 5000,
  },
});


//Función para crear una orden de cobro
export const createOrder = async(req,res)=>{

  const { usuario, carro} = req.body;
  // console.log("usuario que recibo", usuario)
  try {

    const itemsToSale = carro.map(car => ({
      title: car.car_articulo,
      quantity: Number(car.car_cantidad),
      unit_price: 100,
      currency_id: "ARS",
    }));

    // console.log("item to sale", itemsToSale)
    const payerUser = {
      name: usuario.usu_nombre,
      email: usuario.usu_email,
      // phone: usuario.usu_telefono || usuario.usu_celular,
    }
    
    let result;

    const preference = new Preference(client);
    await preference
      .create({
        body: {
          payer: payerUser,
          items: itemsToSale,
          back_urls: {
            success: "https://www.maserpruebas.com/#/pago-mercadopago?status=success",
            failure: "https://www.maserpruebas.com/#/pago-mercadopago?status=failure",
            pending: "https://www.maserpruebas.com/#/pago-mercadopago?status=pending",
          },
          auto_return: "approved",
          notification_url: 'https://faff-152-168-125-92.ngrok-free.app/responseMp/webhook'
        },
        requestOptions: {
          timeout: 5000,
        },
      })
      .then((x) => {
        result = x;
      })
      .catch((err) => {
        console.log(err);
      });

      //console.log("Pago creado: ", result);
      res.status(200).json({ url: result?.sandbox_init_point, id: result.id });


  } catch (error) {
    //console.log("error", error)
    res.status(500).json({ message: "Error al crear el pago" });
  }
}


export const success = async (req, res) => {
  try {
    const data = req.query;
    //console.log("Data del pago recibido:", data);
    //*Procesar el estado del pago en la base de datos
    res.status(200).json({
      message: "Pago realizado de forma exitosa",
      data,
    });
  } catch (error) {
    console.log("Error en el pago: ", error);
  }
};

export const failure = async (req, res) => {
  try {
    const data = req.query;
    //console.log("Data del pago recibido:", data);
  } catch (error) {
    console.log("Error en el pago: ", error);
  }
};

export const pending = async (req, res) => {
  try {
    const data = req.query;
    //console.log("Data del pago recibido:", data);
  } catch (error) {
    console.log("Error en el pago: ", error);
  }
}
