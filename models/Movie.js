// models/User.js
import { Schema, model, models } from 'mongoose';

const MovieSchema = new Schema({
  title: { 
    type: String,
    required: [true, 'Title is required!'],
  },
  year: { 
    type: String, 
    required: [true, 'Year is required!'],
  },
  image: {
    type: String,
    required: [true, 'Image is required!'],
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Movie = models.Movie || model("Movie", MovieSchema);

export default Movie;