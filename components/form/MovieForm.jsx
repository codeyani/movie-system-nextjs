"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../ui/form';
import { useDropzone } from 'react-dropzone';

import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

const MovieForm = ({ form, type, submitting, acceptedFiles, setAcceptedFiles, handleSubmit}) => {
  const router = useRouter();

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (file) => {
      setAcceptedFiles(file);
    },
  });

  return (
    <div className="flex flex-col">
      <h1 className="text-white text-left">{type === 'Create' ? 'Create a new movie' : 'Edit'}</h1>
        <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className='w-full'>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-32">
            <div {...getRootProps()} className="bg-drop-image border-dashed border-2 border-white flex flex-col items-center justify-center">
              <input {...getInputProps()} />
              {acceptedFiles.length === 0 && (
                <>
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <g>
                        <path d="M18 15V18H6V15H4V18C4 19.1 4.9 20 6 20H18C19.1 20 20 19.1 20 18V15H18ZM17 11L15.59 9.59L13 12.17V4H11V12.17L8.41 9.59L7 11L12 16L17 11Z" fill="white"/>
                      </g>
                    </svg>
                  </div>
                  <div className="text-white mt-2">
                    <p>Drop as image here</p>
                  </div>
                </>
              )}
              {acceptedFiles.length > 0 && (
                <div className="mt-2">
                  <img src={URL.createObjectURL(acceptedFiles[0])} alt="Dropped Image" className="max-h-full" />
                </div>
              )}
            </div>
            <div>
                <div className='space-y-2'>
                  <FormField
                    control={form.control}
                    name='title'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder='Title' {...field} />
                        </FormControl>
                        <FormMessage className="mt-2 text-red-400"/>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='year'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="mt-6 xl:w-56 sm:w-full"
                            placeholder='Publishing year'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="mt-2 text-red-400"/>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex">
                  <Button type="button" variant="secondary" className='h-14 mt-16' onClick={() => router.push('/')}>
                    Cancel
                  </Button>
                  <Button className='h-14 mt-16 ml-2' type='submit' disabled={submitting}>
                    Submit
                  </Button>
                </div>
              </div>  
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default MovieForm;