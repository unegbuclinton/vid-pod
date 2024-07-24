"use client";

import React from "react";
import VdButton from "../button/VdButton";
import VdIcon from "../vidIcons/VidIcons";
import Image from "next/image";
import { links } from "@/app/libs/jsondata/sidebarlinks";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import ActionItems from "../actionItems/ActionItems";

const Sidebar = () => {
  const searchParams = useSearchParams();
  let searchParamsString = searchParams.toString();
  if (searchParamsString.endsWith("=")) {
    searchParamsString = searchParamsString.slice(0, -1);
  }

  const currentUrl = searchParamsString;
  return (
    <aside className="bg-bgPrimary border-lightestGrey w-[270px] overflow-auto border-r p-6">
      <VdButton buttonStyles="mb-4">Create an episode</VdButton>
      <div className="border-lightestGrey mb-8 flex w-full items-center rounded-lg border px-3 py-3">
        <Image
          alt="image-ceo"
          src={"/ceo-img.png"}
          width={100}
          height={100}
          className="mr-2 h-8 w-8 object-cover"
        />
        <p className="text-lighterGrey mr-1 text-sm font-bold">
          The Diary Of A CEO
        </p>
        <span>
          <VdIcon iconName="arrowDownIcon" />
        </span>
      </div>
      <ul className="px-5">
        {links.map(({ icon, title, url }, index) => (
          <li key={index}>
            <Link
              href={`?${url}`}
              className={`${currentUrl === url ? "text-dark" : "text-lighterGrey"} hover:text-dark mb-8 flex cursor-pointer items-center gap-4 font-bold`}
            >
              <span>
                <VdIcon iconName={icon} />
              </span>
              {title}
            </Link>
          </li>
        ))}
      </ul>

      <Image
        alt="graph"
        src={"/graph.png"}
        layout="responsive"
        width={100}
        height={100}
        className="my-40 h-auto w-full object-cover"
      />
      <ActionItems />
    </aside>
  );
};

export default Sidebar;
