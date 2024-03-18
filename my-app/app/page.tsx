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

const supabaseUrl: string = 'https://aochmttjnwxqdmbjowmi.supabase.co'
const supabaseKey: string = process.env.NEXT_PUBLIC_SUPABASE_KEY || ''
const supabase = createClient(supabaseUrl, supabaseKey)

interface Book {
  name: string;
  author: string;
  isbn: string;
}

async function getBooks(): Promise<Book[]> {
    let { data, error } = await supabase
        .from('books')
        .select('name, author, isbn')

    if (error) throw error
    console.log(data)
    return data || []
}

export default function Home() {
  const [names, setNames] = useState<string[] | null>(null);
  const [authors, setAuthors] = useState<string[] | null>(null);
  const [isbn, setIsbn] = useState<string[] | null>(null);

  useEffect(() => {
    async function fetchBooks() {
      const data: Book[] = await getBooks();
    
      const names: string[] = data.map((book) => book.name);
      const authors: string[] = data.map((book) => book.author);
      const isbn: string[] = data.map((book) => book.isbn);

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
            <TableCell>{authors ? authors[index] : ''}</TableCell>
            <TableCell>{isbn ? isbn[index] : ''}</TableCell>
        </TableRow>
        ))
    }
    
     </TableBody>
</Table>

   </main>
  );
}

