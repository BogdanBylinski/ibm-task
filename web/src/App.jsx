import { useState } from "react";
import { useEffect } from "react";
import "./App.css";
import "react-datepicker/dist/react-datepicker.css";
import "./styles/main.scss";
import axios from "axios";
import ChartLine from "./components/ChartLine";
import DatePickerInput from "./components/DatePickerInput";
import ErrorsLine from "./components/ErrorsLine";
import ResultLine from "./components/ResultLine";
import SearchInput from "./components/SearchInput";

function App() {
  const [apiData, setApiData] = useState("no_data");
  const [arr, setArr] = useState();
  const [dateRange, setDateRange] = useState([null, null]);
  const [dateRangeWasNotPicked, setDateRangeWasNotPicked] = useState(0);
  const [error, setError] = useState(0);
  const [search, setSearch] = useState("");
  const [startDate, endDate] = dateRange;

  const resolutions = [1, 5, 15, 30, 60, "D", "W", "M"];

  const getCompanyProfileData = async () => {
    axios
      .get(
        `https://finnhub.io/api/v1/stock/profile2?symbol=${search}&token=cbqvcbqad3ibee6m62pg`
      )
      .then((data) => setArr(data.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getCompanyProfileData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);
  const wasDateRangePicked = () => {
    if (dateRange[0] != null && dateRange[1] != null) {
      getStocksCandlesData();
      axios.post("http://localhost:3003/log", {
        companyName: arr.name,
        companyCode: arr.ticker,
        dateRangeOne: dateRange[0].getTime() / 1000,
        dateRangeTwo: dateRange[1].getTime() / 1000,
      });
    } else {
      setDateRangeWasNotPicked(1);
    }
  };
  const getStocksCandlesData = async () => {
    let a = 0;
    if (dateRange[1].getTime() - dateRange[0].getTime() <= 604800000) {
      a = 4;
      console.log(a);
    } else if (dateRange[1].getTime() - dateRange[0].getTime() < 15778458000) {
      a = 5;
      console.log(a);
    } else if (dateRange[1].getTime() - dateRange[0].getTime() >= 15778458000) {
      a = 6;
      console.log(a);
    }

    await axios
      .get(
        `https://finnhub.io/api/v1/stock/candle?symbol=${search}&resolution=${
          resolutions[a]
        }&from=${Math.round(
          dateRange[0].getTime() / 1000
        ).toString()}&to=${Math.round(
          dateRange[1].getTime() / 1000
        ).toString()}&token=cbqvcbqad3ibee6m62pg`
      )
      .then((data) =>
        // setApiData(data.data),
        createObj(data.data)
        // dataStructurization(data.data),
      )
      .catch((error) => console.log(error));
  };
  const createObj = async (data) => {
    const obj = [];
    for (let i = 0; i < await data.t.length; i++) {
      obj.push({
        date: new Date(data.t[i] * 1000).toISOString().slice(0, 10),
        value: data.v[i],
        open: data.o[i],
        closed: data.c[i],
        highest: data.h[i],
        lowest: data.l[i],
        companyName: arr.name,
        time: new Date(data.t[i] * 1000)
          .toISOString()
          .split("T")[1]
          .slice(0, 5),
      });
    }
    setApiData(obj);
  };

  const searchInput = (e) => {
    setError(0);
    if (/[^a-z,A-Z, ]/.test(e.target.value) === true) {
      setError(1);
      return;
    }
    if (e.target.value.length >= 36) {
      setError(2);
      return;
    }
    setSearch(e.target.value);
    getCompanyProfileData();
    if(e.target.value.length===0){
      setApiData("no_data")
    }
  };

  useEffect(() => {
    if (dateRange[0] !== null && dateRange[1] !== null) {
      setDateRangeWasNotPicked(0);
    }
  }, [dateRange]);

 

  return (
    <div className="App">
      <div className="container">
        <ErrorsLine error={error}></ErrorsLine>
        <div className="row">
          <SearchInput search={search} searchInput={searchInput}></SearchInput>

          <DatePickerInput
            startDate={startDate}
            endDate={endDate}
            setDateRange={setDateRange}
          ></DatePickerInput>
        </div>
        <div className="row">
          <div className="col-12 mt-4">
            <ResultLine
              search={search}
              arr={arr}
              wasDateRangePicked={wasDateRangePicked}
            ></ResultLine>
            <ChartLine
              apiData={apiData}
              dateRangeWasNotPicked={dateRangeWasNotPicked}
              search={search}
            ></ChartLine>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
