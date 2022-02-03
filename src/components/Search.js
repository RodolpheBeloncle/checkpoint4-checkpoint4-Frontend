import React from 'react';
import './search.css'

const Search = ({ searchQuery, setSearchQuery , onSubmit}) => {
  return (
    <form action="/" method="get" onSubmit={onSubmit}>
      <label htmlFor="header-search">
        <span className="visually-hidden">Search blog posts</span>
      </label>
      <input
        value={searchQuery}
        onChange={setSearchQuery}
        type="text"
        id="header-search"
        placeholder="Search wine matches"

      />
      <button type="submit">Search</button>
    </form>
  );
};

export default Search;
