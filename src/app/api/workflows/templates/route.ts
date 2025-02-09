import { db } from "@/lib/db"
 
export async function GET(request: Request) {
 const data = await db.nodeTemplate.findMany();
 
  return new Response(JSON.stringify({ data }), {
    status: 200,
    headers: { 'Set-Cookie': `token=1234567890` },
  })
}