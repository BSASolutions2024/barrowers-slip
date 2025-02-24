import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='grid grid-cols content-center h-56'>
        <div className='w-50 mx-auto text-center gap-8 flex flex-col'>
            <h2>Not Found</h2>
            <p>Could not find requested resource</p>
            <Link className='btn btn-primary' href="/">Return Home</Link>
        </div>
    </div>
  )
}