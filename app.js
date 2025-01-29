const ffmpeg = require('@ffmpeg-installer/ffmpeg');
const qrcode = require('qrcode-terminal');

const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
		args: ["--no-sandbox"]
	},
    ffmpegPath: ffmpeg.path,
});

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('[WhatsApp]: ¡Conexion exitosa Camar-on!');
});

client.on('message', async message => {

    if(message.body === 'hola') {
		client.sendMessage(message.from, '*Hola soy un Bot creado por @n4ndooou, para conocer mis comandos usa [-menu]*\n\n👉 *Github: https://github.com/n4ndoooo*\n👉 *Pagina Web: https://n4ndoooo.github.io/*');
	}

    if(message.body === '-menu') {
		client.sendMessage(message.from, '*Lista de comandos:*\n\n-s (para la creacion de stickers)');
	}
    
    if(message.body === '-s') {
        if(message.hasMedia) {
            const downloaded = await message.downloadMedia()
            const buffer = Buffer.from(downloaded.data, "base64");
            switch (downloaded.mimetype) {
                case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                case "application/msword":
                case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
                case "application/vnd.ms-powerpoint":
                case "application/vnd.ms-excel":
                case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
                    const tosend = await libre.convertAsync(buffer, ".pdf", undefined)
                    const att = new MessageMedia("application/pdf", tosend.toString("base64"), downloaded.filename.split(".").slice(0, -1).join("."))

                    message.reply(att)
                    break;
                }}

                message.react("✅")

                await message.reply(downloaded, null, {
                    sendMediaAsSticker:true,
                    stickerAuthor: "🐐",
                    stickerName: "IG: n4ndooou"
                })
        } else {
            await client.sendMessage(message.from, '❌ | *Lo siento, no encontré ninguna imagen/video..*');
            message.react("❌")
        }
    }
});

client.initialize();