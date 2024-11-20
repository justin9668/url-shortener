import getCollection, { urls_collection } from '@/mongodb';

export async function POST(request: Request) {
    try {
        const { longUrl, alias } = await request.json();
        const collection = await getCollection(urls_collection);
        const exists = await collection.findOne({ alias });
        
        if (exists) {
            return new Response('This alias is already taken', { status: 400 });
        }
        
        await collection.insertOne({ longUrl, alias });
        const shortUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${alias}`;
        return new Response(shortUrl, { status: 200 });
        
    } catch (error) {
        console.log(error)
        return new Response('Internal server error', { status: 500 });
    }
}