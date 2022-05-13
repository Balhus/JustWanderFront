import React, { useState } from "react";
import "./SearchBar.css";
import { FaSearch } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

function SearchBar({ clear, filteredData, handleFilter, wordEntered }) {
    return (
        <>

            {wordEntered.length === 0 ? (
                <FaSearch />
            ) : (
                <AiOutlineClose id="clearBtn" onClick={clear} />
            )}
            <input
                type="text"
                placeholder="Búsqueda por nombre"
                value={wordEntered}
                onChange={handleFilter}
            />

        </>

    );
}

export default SearchBar;