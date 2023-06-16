"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [searchedPosts, setSearchPosts] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);

  //make a call to our own next API and getch all posts
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  //filter the posts by the user input
  const filterPosts = (userinput) => {
    const regexp = new RegExp(userinput, "i");
    return posts.filter(
      (post) =>
        regexp.test(post.creator.username) ||
        regexp.test(post.tag) ||
        regexp.test(post.prompt)
    );
  };

  //get the user input
  const handleSearchChange = (e) => {
    e.preventDefault();
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    //
    setSearchTimeout(
      setTimeout(() => {
        const searchResults = filterPosts(e.target.value);
        setSearchPosts(searchResults);
      }, 500)
    );
  };

  //filter by tag
  const handleTagClick = (tag) => {
    console.log(tag);
    setSearchText(tag);

    const searchResult = filterPosts(tag);
    setSearchPosts(searchResult);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      {searchText ? (
        <PromptCardList data={searchedPosts} handleTagClick={handleTagClick} />
      ) : (
        <PromptCardList data={posts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
