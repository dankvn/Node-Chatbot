const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const MetaProvider = require('@bot-whatsapp/provider/meta')
const MockAdapter = require('@bot-whatsapp/database/mock')

const flujoPrincipal = addKeyword(['hola','ole','buenas']).addAnswer('Bienvenido a tu assitente virtual ')
const flujoSegundario = addKeyword('gracias').addAnswer('de nada ')



const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flujoPrincipal, flujoSegundario])
    const { createBotDialog } = require('@bot-whatsapp/contexts/dialogflow')

    const adapterProvider = createProvider(MetaProvider, {
        jwtToken: process.env.JWTOKEN,
        numberId: process.env.NUMBER_ID,
        verifyToken: process.env.VERIFY_TOKEN,
        version: 'v16.0',
    })

    createBotDialog({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    },
    {
        location:'us-central1',
        agentID:'59746931-ba22-4312-98be-d81951f00c02',
    })
}

main()