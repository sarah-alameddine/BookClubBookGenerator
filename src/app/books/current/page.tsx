"use client"
import BookCollection from "../../../components/BookCollection";

export default function GeneratorPage() {
  return (<>
      <div className="min-h-screen flex flex-col bg-base-100">

        <main className="flex-1">
  <BookCollection listName="Current" />

        </main>
    </div>
  
  </>)
  
  ;
}