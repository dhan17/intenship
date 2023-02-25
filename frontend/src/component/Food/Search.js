import React, { Fragment, useState } from "react";
import "./Search.css";
import { useNavigate } from "react-router-dom";
import Metadata from "../layout/Metadata";

const Search = (props) => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  const searchSubmitHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      navigate(`/Menu/fooditems/${keyword}`);
    } else {
      navigate("/Menu/fooditems");
    }
  };

  return (
    <Fragment>
      <Metadata title="Search 🍛" />
      <form className="searchbar" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Search fooditems..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
    </Fragment>
  );
};

export default Search;
