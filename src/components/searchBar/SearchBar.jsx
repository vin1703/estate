import React, { useState } from "react";
import "./searchBar.scss";
import { Link } from "react-router-dom";

const types = ['buy','rent'];

function SearchBar() {
    const [query,setQuery] = useState({
        type:'buy',
        city : "",
        minPrice:0,
        maxPrice:10000000
    })

    const switchType = (val) =>{
        setQuery(prev=>({...prev,type:val}));
    }
    const handleChange = e =>{
      e.preventDefault();
      setQuery((prev)=>({...prev,[e.target.name]:e.target.value}))
    }
  return (
    <div className="searchBar">
      <div className="type">
        {types?.map((type)=>(
            <button className={query.type===type?"active":""} key={type} onClick={()=>switchType(type)}>{type}</button>
        ))}
        
      </div>
      <form>
        <input type="text" name="city" placeholder="city" onChange={handleChange} />
        <input
          type="number"
          min={0}
          max={10000000}
          name="minPrice"
          placeholder="Min Price"
          onChange={handleChange}
        />
        <input
          type="number"
          min={0}
          max={10000000}
          name="maxPrice"
          placeholder="Max Price"
          onChange={handleChange}
        />
        <Link to={`/list?type=${query.type}&city=${query.city}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}`}>
        <button>
            <img src="/search.png" alt="" />
        </button>
        </Link>
      </form>
    </div>
  );
}

export default SearchBar;
