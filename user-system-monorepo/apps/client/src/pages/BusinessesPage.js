import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import SearchBar from "../components/SearchBar";
import BusinessCard from "../components/BusinessCard";
import { useAppSelector } from "../redux/hooks";
const BusinessesPage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const businesses = useAppSelector((state) => state.business.all); // adjust according to your slice
    const filtered = businesses.filter((b) => b.title.toLowerCase().includes(searchTerm.toLowerCase()));
    return (_jsxs("div", { children: [_jsx(SearchBar, { searchTerm: searchTerm, setSearchTerm: setSearchTerm }), _jsx("div", { style: { display: "flex", flexWrap: "wrap", justifyContent: "center" }, children: filtered.map((biz) => (_jsx(BusinessCard, { business: biz }, biz._id))) })] }));
};
export default BusinessesPage;
