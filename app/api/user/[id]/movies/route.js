import Movie from "@models/Movie";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params, searchParams}) => {
    const page = request.nextUrl.searchParams.get("page") || 1;
    const itemsPerPage = 8;
    const startIndex = (page - 1) * itemsPerPage;
    try {
        await connectToDB()
        const movies = await Movie.find({ creator: params.id }).populate("creator")
        .skip(startIndex)
        .limit(itemsPerPage)
        .exec();

        const totalMovies = await Movie.countDocuments().exec();
        const totalPages = Math.ceil(totalMovies / itemsPerPage);

        return new Response(JSON.stringify({ movies, totalPages }), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch movies created by user", { status: 500 })
    }
} 