import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import BusinessCard from "../components/BusinessCard";
import { useAppSelector } from "../redux/hooks";

interface Business {
  _id: string;
  title: string;
  description: string;
  image: string;
  phone: string;
  address: string;
  likedBy?: string[];
}






const BusinessesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const businesses = useAppSelector((state: { business: { all: any; }; }) => state.business.all); // adjust according to your slice

  const filtered = businesses.filter((b: { title: string; }) =>
    b.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      {filtered.map((biz: Business) => (
  <BusinessCard key={biz._id} business={biz} />
))}

        
      </div>
    </div>
  );
};

export default BusinessesPage;
