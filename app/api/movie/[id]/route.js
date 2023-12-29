import Movie from "@models/Movie";
import { connectToDB } from "@utils/database";
import { writeFile } from 'fs/promises'

export const GET = async (request, { params }) => {
    try {
        await connectToDB();
        const movie = await Movie.findById(params.id).populate("creator");
        return new Response(JSON.stringify(movie), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch movie.", { status: 500 });
    }
}

export const PATCH = async (request, { params }) => {
    const data = await request.formData()
    const image = data.get('image')
    const title = data.get('title')
    const year = data.get('year')

    try {
        await connectToDB();

        // Find the existing movie by ID
        const existingMovie = await Movie.findById(params.id);

        if (!existingMovie) {
            return new Response("Movie not found", { status: 404 });
        }

        // Update the prompt with new data
        existingMovie.title = title;
        existingMovie.year = year;

        if (image) {
            const bytes = await image.arrayBuffer()
            const buffer = Buffer.from(bytes)
            const timestamp = new Date().getTime();

            const path = `public/tmp/${timestamp}_${image.name}`
            await writeFile(path, buffer)
            console.log(`open ${path} to see the uploaded file`)

            existingMovie.image = `/tmp/${timestamp}_${image.name}`;
        }

        await existingMovie.save();

        return new Response("Successfully updated the Movie", { status: 200 });
    } catch (error) {
        return new Response("Error Updating Movie", { status: 500 });
    }
};