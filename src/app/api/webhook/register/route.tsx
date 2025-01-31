import { headers } from 'next/headers'
import {Webhook} from 'svix'
import { WebhookEvent } from '@clerk/nextjs/server'
import prisma from '@/lib/prisma'

export async function POST(req:Request) {
        const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET

        if(!WEBHOOK_SECRET){
            throw new Error("Please add webhook secret in .env!")
        }

        const headerPayload = headers()

        const svix_id=headerPayload.get("svix-id")
        const svix_timestamp=headerPayload.get("svix-timestamp")
        const svix_signature=headerPayload.get("svix-signature")

        if(!svix_id || !svix_signature || !svix_timestamp){
            return new Response("Error - No Svix headers")
        }

        const payload = req.json()
        const body =JSON.stringify(payload)

        const wh = new Webhook(WEBHOOK_SECRET)

        let evt:WebhookEvent;
        
        try {
            evt = wh.verify(body,{
                "svix-id":svix_id,
                "svix-timestamp":svix_timestamp,
                "svix-signature":svix_signature
            }) as WebhookEvent
        } catch (error) {
            console.log("Error Verifying webhook",error);
            return new Response("Error while verifying webhook",{status:400})
        }

        const eventType = evt.type

        if(eventType == 'user.created'){
            try {
                const {email_addresses,primary_email_address_id,first_name,image_url} = evt.data

                const primaryEmail = email_addresses.find(
                    (email)=>email.id === primary_email_address_id
                )

                if(!primaryEmail){
                    return new Response("No primary email address found!",{status:400})
                }

                const newUser=await prisma.user.create({
                    data:{
                        id:evt.data.id,
                        name:first_name!,
                        email:primaryEmail.email_address,
                        profilePicture:image_url,
                    }
                })
                console.log("USer created",newUser);
            } catch (error) {
                console.log("Error while creating user in db",error);
            }
        }

        return new Response("Webhook recieved!",{status:200})
}