import { writeFile } from 'fs/promises'
import Movie from '@models/Movie';
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
  const data = await request.formData()
  const image = data.get('image')
  const title = data.get('title')
  const year = data.get('year')
  const user_id = data.get('userId')

  if (!image) {
    return new Response(JSON.stringify({ message: 'Failed to create new movie.' }), { status: 422 });
  }

  const bytes = await image.arrayBuffer()
  const buffer = Buffer.from(bytes)
  const timestamp = new Date().getTime();

  // With the file data in the buffer, you can do whatever you want with it.
  // For this, we'll just write it to the filesystem in a new location
  const path = `public/tmp/${timestamp}_${image.name}`
  await writeFile(path, buffer)
  console.log(`open ${path} to see the uploaded file`)
  
  await connectToDB();
  await Movie.create({
    title: title,
    year: year,
    image: `/tmp/${timestamp}_${image.name}`,
    creator: user_id
  }); 

  return new Response(JSON.stringify({ message: 'Movie created success.' }), { status: 201 });
}