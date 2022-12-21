import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { SiApostrophe } from "react-icons/si";

import { client } from "../client";
import { feedQuery, searchQuery } from "../utils/data";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";

const Feed = () => {
  const [loading, setLoading] = useState(false);
  const [pins, setPins] = useState(null);
  const { categoryId } = useParams();

  useEffect(() => {
    setLoading(true);

    if (categoryId) {
      const query = searchQuery(categoryId);

      client.fetch(query).then((data) => {
        setPins(data);
        setLoading(false);
        console.log(data);
      });
    } else {
      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
        console.log(data);
      });
    }
  }, [categoryId]);

  if (loading)
    return <Spinner message="We are adding new ideas to your feed!" />;

  if (!pins?.length) {
    return (
      <div className="flex flex-col justify-center font-bold items-center mt-3">
        <div className="mb-5">
          <SiApostrophe fontSize={50} color={"green"} />
        </div>
        <p>No Post Found</p>
      </div>
    );
  }

  return <div>{pins && <MasonryLayout pins={pins} />}</div>;
};

export default Feed;
