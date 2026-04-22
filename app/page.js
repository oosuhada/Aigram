'use client';

import React, { useState } from "react";
import Feed from "../src/components/Feed.jsx";
import SuggestedPeople from "../src/components/SuggestedPeople.jsx";

export default function Home() {
  return (
    <div className="flex w-full mt-4 md:mt-10 px-0 justify-center">
      <div className="flex w-full max-w-[1300px] md:gap-6 justify-center mx-auto mb-20 md:mb-0 px-2 md:px-0">
        <div className="w-full md:flex-1 max-w-[935px] min-w-0">
          <Feed />
        </div>
        <div className="hidden xl:flex w-[320px] flex-shrink-0">
          <SuggestedPeople />
        </div>
      </div>
    </div>
  );
}
