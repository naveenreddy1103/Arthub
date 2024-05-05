"use client";

import { categories } from "@data";
import WorkList from "./WorkList";
import { useEffect, useState } from "react";
import "@styles/Categories.scss";
import "@styles/globals.css";
import Loader from "./Loader";
import { Button } from "@mui/material";

const Feed = () => {
  const [limit, setLimit] = useState(12);
  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState("All");

  const [workList, setWorkList] = useState([]);
  const [displayedCards, setDisplayedCards] = useState([]);

  const getWorkList = async () => {
    const response = await fetch(`/api/work/list/${selectedCategory}`);
    const data = await response.json();
    setWorkList(data);

    setDisplayedCards(data.slice(0, 12));
    setLoading(false);
  };

  useEffect(() => {
    getWorkList();
  }, [selectedCategory]);

  const showMoreFn = () => {
    visibleCards(workList);
  };

  const visibleCards = (list) => {
    if (limit >= workList.length) return;

    let startIndex =
      displayedCards.length - 1 < 0 ? 0 : displayedCards.length - 1;

    const newCards = list.slice(startIndex + 1, limit + 12);

    setDisplayedCards([...displayedCards, ...newCards]);
    setLimit((prev) => prev + 12);
  };
  // console.log(showCards)
  // console.log(limit)
  // console.log(displayedCards)

  return loading ? (
    <Loader />
  ) : (
    <>
      <div className="categories">
        {categories?.map((item, index) => (
          <p
            onClick={() => setSelectedCategory(item)}
            className={`${item === selectedCategory ? "selected" : ""}`}
            key={index}
          >
            {item}
          </p>
        ))}
      </div>

      <WorkList data={displayedCards ? displayedCards : []} />

      <div>
        <Button
          variant="contained"
          className="show-more-btn"
          onClick={showMoreFn}
        >
          Show More
        </Button>
      </div>
    </>
  );
};

export default Feed;
