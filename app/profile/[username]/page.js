import React from "react";
import Profile from "../../../src/views/Profile.jsx";
import { mockUsers } from "../../../src/data/mockUsers";
import { extractProfileMetadata } from "../../../lib/extract-content";

export async function generateMetadata({ params }) {
  const user = mockUsers[params.username];
  if (!user) return { title: "Profile Not Found" };

  const { title, description, openGraph } = extractProfileMetadata(user);

  return {
    title,
    description,
    openGraph
  };
}

export default function ProfilePage({ params }) {
  return (
    <div className="w-full">
      <Profile />
    </div>
  );
}
