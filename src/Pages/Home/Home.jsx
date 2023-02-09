import React, { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllCountries, filterCountries } from "../../slices/countrySlice";
import CountryCard from "../../components/CountryCard/CountryCard";
import { PacmanLoader } from "react-spinners";
import { myContext } from "../../App";
import Header from "../../components/Header/Header";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  TextField,
} from "@mui/material";
import { search } from "../../slices/countrySlice";
import { paginate } from "../../utils/utils";
// import { searching } from "../../utils/utils";

const Home = () => {
  const dispatch = useDispatch();
  const [region, setRegion] = useState("All");
  const { dark } = useContext(myContext);
  const [pageSize , setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1)

  const { countries, loading, error } = useSelector((state) => state.countries);
  // const [region, setRegion] = useState("")
  // const [currentPage, setCurrentPage] = useState(1)
  // const [pageSize, setPageSize] = useState(10)

  useEffect(() => {
    dispatch(fetchAllCountries());
  }, []);

  const handleFilterChange = (e) => {
    setCurrentPage(1)
    setRegion(e.target.value);
    dispatch(filterCountries({ keyword: e.target.value }));
  };
  const handlePageChange = (e, value) => {
    setCurrentPage(value)
  }
  const handleSearchChange = (e) => {
   setCurrentPage(1);
   setRegion("All")
    let keyword = e.target.value;
    dispatch(search({ countries: countries, keyword: keyword }));
  };

  let paginatedResults = countries && paginate(countries, currentPage-1, pageSize);

  // const handleFilterChange = (e) => {
  //   setCurrentPage(1)
  //   setRegion(e.target.value)
  //   dispatch(filterCountries({keyword : e.target.value}));
  // }

  // const paginatedResult = countries && paginate(countries, currentPage-1, pageSize)
  return (
    <>
      {/* Spinner start */}
      {!loading && !countries && error && (
        <div
          style={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1 style={{ color: "red", opacity: "0.7" }}>{error}</h1>
        </div>
      )}
      {!error && !countries && loading && (
        <div
          style={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <PacmanLoader color="rgb(20, 19, 19)" size={40} />
        </div>
      )}
      {/* Spinner end */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          paddingInline: "40px",
          gap: "5px",
          marginTop: "50px",
        }}
      >
        <TextField
          id="outlined-basic"
          label="Search"
          variant="outlined"
          size="normal"
          margin="none"
          onChange={handleSearchChange}
          sx={{ width: "40%" }}
        />
        <FormControl sx={{ width: "20%" }}>
          <InputLabel id="demo-simple-select-label">Region</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={region}
            label="Region"
            onChange={handleFilterChange}
          >
            <MenuItem value={"All"}>All</MenuItem>
            <MenuItem value={"Asia"}>Asia</MenuItem>
            <MenuItem value={"Africa"}>Africa</MenuItem>
            <MenuItem value={"Europe"}>Europe</MenuItem>
            <MenuItem value={"Americas"}>Americas</MenuItem>
            <MenuItem value={"Oceania"}>Oceania</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div
        className="country-wrapper"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "5px",
          marginTop: "50px",
        }}
      >
        {!loading &&
          !error &&
          paginatedResults &&
          paginatedResults.map((country) => (
            <CountryCard key={country.name} country={country} />
          ))}
      </div>
      <div style={{paddingBlock : "30px" , display : "flex", justifyContent : "center"}}>
        {!loading && !error && countries && (
          <Pagination color="primary" count={countries ? Math.ceil(countries.length / pageSize) : 0} page={currentPage} onChange={handlePageChange} />
        )}
      </div>
    </>
  );
};

export default Home;

{
  /* <div style={{display : "flex" , justifyContent : "center", marginBlock : "40px"}}>
      <Pagination count={countries ? Math.ceil(countries.length / pageSize) : 0} color="primary" page={currentPage} onChange={handlePageChange} />
      </div> */
}

{
  /* <FormControl sx={{ minWidth: 300 }}>
          <InputLabel id="demo-simple-select-label">Region</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={region}
            label="Region"
            onChange={handleFilterChange}
          >
            <MenuItem value={"All"}>All</MenuItem>
            <MenuItem value={"Africa"}>Africa</MenuItem>
            <MenuItem value={"Asia"}>Asia</MenuItem>
            <MenuItem value={"Europe"}>Europe</MenuItem>
            <MenuItem value={"Americas"}>Americas</MenuItem>
          </Select>
        </FormControl> */
}
