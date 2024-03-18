"use client"

import Image from "next/image";
import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://aochmttjnwxqdmbjowmi.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)


async function getBooks() {
    let { data, error } = await supabase
        .from('books')
        .select('name, author, isbn')

    if (error) throw error
    console.log(data)
    return data
    }

export default function Home() {
    
  const [names, setNames] = useState(null);
  const [authors, setAuthors] = useState(null);
  const [isbn, setIsbn] = useState(null);

  useEffect(() => {
    async function fetchBooks() {
      const data  = await getBooks();
    
      const names = data.map((book) => book.name);
      const authors = data.map((book) => book.author);
      const isbn = data.map((book) => book.isbn);

      setNames(names);
      setAuthors(authors);
      setIsbn(isbn);

      console.log(names, authors, isbn);
    }

    fetchBooks();
  }, []);

  return (
   <main>
   <Table>
  <TableCaption>Your favorite books</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="">Name</TableHead>
      <TableHead className="">Author</TableHead>
      <TableHead className="">ISBN</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {names && names.map((name, index) => (
        <TableRow key={index}>
            <TableCell>{name}</TableCell>
            <TableCell>{authors[index]}</TableCell>
            <TableCell>{isbn[index]}</TableCell>
        </TableRow>
        ))
    }
    
     </TableBody>
</Table>

   </main>
  );
}
