"use client";

import MovieForm from "@components/form/MovieForm";
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useSession } from "next-auth/react";
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const MovieEdit = ({ params }) => {
  const { data: session } = useSession();
  const [movie, setMovie] = useState({ title: "", year: "", image: "" });
  const [submitting, setIsSubmitting] = useState(false);
  const [acceptedFiles, setAcceptedFiles] = useState([]);
  
  const FormSchema = z.object({
    title: z.string().min(1, 'Title is required').max(100),
    year: z.string().min(1, 'Year is required').max(4),
  });
  
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: movie.title,
      year: movie.year,
      image: movie.image
    },
  });

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/movie/${params?.id}`);
      const data = await response.json();
  
      setMovie(data);

      form.reset({
        title: data.title,
        year: data.year,
      });
    };
  
    if (params?.id) fetchPosts();
  }, [params.id]);


  const onSubmit = async (values) => {
    const { title, year } = values;

    setIsSubmitting(true)
    try {
      const data = new FormData()
      if (acceptedFiles[0]) {
        data.set('image', acceptedFiles[0])
      }
      data.set('title', title)
      data.set('year', year)

      const res = await fetch(`/api/movie/${params.id}`, {
        method: 'PATCH',
        body: data,
      })
      // handle the error
      if (res.ok) {
        toast.success("Movie updated success!");
      } else { 
        toast.error("Failed to update movie. Please check any required fields.");
      }
    } catch (error) {
      toast.error("Failed to update movie. Please try again later.");
    } finally {
      setIsSubmitting(false)
    }
  };
  return (
    <div className="container mx-auto">
      <MovieForm 
        type='Edit'
        form={form}
        submitting={submitting}
        acceptedFiles={acceptedFiles}
        setAcceptedFiles={setAcceptedFiles}
        handleSubmit={onSubmit}
      />
    </div>
  )
}

export default MovieEdit;