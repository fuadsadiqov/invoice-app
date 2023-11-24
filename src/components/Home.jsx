import React from "react";
import Header from './Header'
import Main from './Main'

export default function Home() {
  return (
    <div className="flex flex-1 flex-col mx-4 items-center w-[46rem] justify-center">
      <Header />
      <Main />
    </div>
  );
}
