"use client";

import MovieForm from "@components/form/MovieForm";
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useSession } from "next-auth/react";
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const MovieCreate = () => {
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

  const onSubmit = async (values) => {
    const { title, year } = values;

    if (!acceptedFiles[0]) {
      toast.error("Please upload your image.");
      return;
    }

    setIsSubmitting(true)
    try {
      const data = new FormData()
      data.set('image', acceptedFiles[0])
      data.set('title', title)
      data.set('year', year)
      data.set('userId', session?.user.id)

      const res = await fetch('/api/movie', {
        method: 'POST',
        body: data,
      })
      // handle the error
      if (res.ok) {
        form.reset();
        setAcceptedFiles([]);
        toast.success("Movie created success!");
      } else { 
        toast.error("Failed to create movie. Please check any required fields.");
      }
    } catch (error) {
      toast.error("Failed to create movie. Please try again later.");
    } finally {
      setIsSubmitting(false)
    }
  };
  
  return (
    <div className="container mx-auto">
      <MovieForm 
        type='Create'
        form={form}
        submitting={submitting}
        acceptedFiles={acceptedFiles}
        setAcceptedFiles={setAcceptedFiles}
        handleSubmit={onSubmit}
      />
    </div>
  )
}

export default MovieCreate;