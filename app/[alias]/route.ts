import getCollection, { urls_collection } from '@/mongodb';

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const alias = url.pathname.split('/').pop();

        const collection = await getCollection(urls_collection);
        const urlData = await collection.findOne({ alias });

        if (!urlData) {
            return Response.redirect(new URL('/', request.url));
        }

        return Response.redirect(urlData.longUrl);
        
    } catch (error) {
        console.error(error)
        return new Response('Internal server error', { status: 500 });
    }
}