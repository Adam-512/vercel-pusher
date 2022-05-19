import { VercelRequest, VercelResponse } from '@vercel/node'
import Pusher from 'pusher'
export default async function getImg(req: VercelRequest, res: VercelResponse) {
    if (req.method.toLocaleLowerCase() != 'post') {
        res.status(405).end()
    }
    else {
        let body = req.body
        console.log('notify content: ', JSON.stringify(body))
        const pusher = new Pusher({
            appId: process.env.PUSHER_ID,
            key: process.env.PUSHER_KEY,
            secret: process.env.PUSHER_SCRET,
            cluster: "ap1",
            useTLS: true
        });

        await pusher.trigger("my-channel", "transfer-nws-ido", body);

        res.status(200).send(body)
    }
}