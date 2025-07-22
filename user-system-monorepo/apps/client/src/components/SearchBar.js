import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { InputBase, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
const SearchBar = ({ searchTerm, setSearchTerm }) => {
    return (_jsxs(Box, { sx: {
            display: "flex",
            alignItems: "center",
            backgroundColor: "#f1f1f1",
            padding: "4px 8px",
            borderRadius: 2,
            width: "100%",
            maxWidth: 400,
        }, children: [_jsx(SearchIcon, {}), _jsx(InputBase, { placeholder: "\u05D7\u05E4\u05E9 \u05E2\u05E1\u05E7...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), fullWidth: true, inputProps: { "aria-label": "search business" } })] }));
};
export default SearchBar;
