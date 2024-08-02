import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { User } from '@/lib/models'
import { connectToDb } from '@/lib/utils'

export async function POST(req: Request) {
    
    // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET

    if (!WEBHOOK_SECRET) {
        throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
    }

    // Get the headers
    const headerPayload = headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");
    

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response('Error occured -- no svix headers', {
            status: 400
        })
    }

    // Get the body
    const payload = await req.json()
    const body = JSON.stringify(payload);

    // Create a new Svix instance with your secret.
    const wh = new Webhook(WEBHOOK_SECRET);

    let evt: WebhookEvent

    // Verify the payload with the headers
    try {
        evt = wh.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        }) as WebhookEvent
    } catch (err) {
        console.error('Error verifying webhook:', err);
        return new Response('Error occured', {
            status: 400
        })
    }

    // Do something with the payload
    // For this guide, you simply log the payload to the console
    const { id } = evt.data;
    const eventType = evt.type;

    if (eventType == "user.created") {
        try {
            await connectToDb()

            const newUser = new User({
                firstName: payload.data.first_name,
                lastName: payload.data.last_name,
                email: payload.data.email_addresses[0].email_address,
                userId: payload.data.id,
                avatar : payload.data.image_url
            })

            await newUser.save();
            return new Response('User created', { status: 201 })
        } catch (error) {
            console.log(error);
            return new Response('Error in establising user', {
                status : 500
            })
        }
    }
    if(eventType == "user.updated") {
        
        try {
            await connectToDb()

            const updatedUser = await User.findOneAndUpdate({userId : payload.data.id}, {
                firstName: payload.data.first_name,
                lastName: payload.data.last_name,
                avatar : payload.data.image_url
            }, {new : true});
            
            return new Response('User updated', { status: 201 })
        } catch (error) {
            console.log(error);
            return new Response('Error in establising user', {
                status : 500
            })
        }
    }

    if(eventType == "user.deleted") {
        try {
            await connectToDb()

            await User.findOneAndDelete({userId : payload.data.id});

            return new Response('User deleted', { status: 201 })
        } catch (error) {
            console.log(error);
            return new Response('Error in establising user', {
                status : 500
            })
        }
    }
   
    return new Response('', { status: 201 })
}