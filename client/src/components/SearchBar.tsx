// src/components/SearchBar.tsx
import React from "react";
import { InputBase, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#f1f1f1",
        padding: "4px 8px",
        borderRadius: 2,
        width: "100%",
        maxWidth: 400,
      }}
    >
      <SearchIcon />
      <InputBase
        placeholder="חפש עסק..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        fullWidth
        inputProps={{ "aria-label": "search business" }}
      />
    </Box>
  );
};

export default SearchBar;
