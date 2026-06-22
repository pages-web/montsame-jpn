"use client";

import { useState } from "react";
import { useQuery } from "@apollo/client/react";
import EditorialPicks from "./EditorialPicks";
import DevelopmentProjects from "./Development/DevelopmentProjects";
import CultureAndVideo from "./CultureAndVideo";
import RightSidebar from "../News/RightSidebar";
import MongolianNews from "./Images/MongolianNews";
import VideoSection from "./VideoSection";
import NextNewsBlock from "./NextNewsBlock";
import queries from "@/app/graphql/cms/queries";

const VIDEO_CATEGORY_ID = "shWOTAdbQ28nRM0BKjobx";

export default function NewsSection() {
  const { data, loading } = useQuery(queries.cmsPostList, {
    variables: { categoryIds: [VIDEO_CATEGORY_ID], sortField: "createdAt", sortDirection: "DESC", status: "published" },
  });

  const posts = (data as any)?.cpPostList?.posts || [];
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="w-full bg-[#f5f6f8] py-2 sm:py-2 lg:py-3">
      <div className="container-wide">
        <div className="py-2">
          <div className="pb-0">
            <div className="flex flex-col lg:flex-row gap-3 lg:gap-8">
              <main className="flex-1 min-w-0 pr-6 lg:pr-4 border-r border-gray-300">
                <EditorialPicks />
                <DevelopmentProjects />
                <CultureAndVideo />
                <MongolianNews />
              </main>
              <RightSidebar />
            </div>
            <div className="flex flex-col lg:flex-row gap-2 lg:gap-8 mt-4">
              <div className="flex-1 min-w-0">
                <VideoSection
                  posts={posts}
                  loading={loading}
                  activeIndex={activeIndex}
                  onSelect={setActiveIndex}
                />
              </div>
              <div className="w-full lg:w-[280px] shrink-0 mt-10">
                <NextNewsBlock
                  posts={posts}
                  activeIndex={activeIndex}
                  onSelect={setActiveIndex}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
