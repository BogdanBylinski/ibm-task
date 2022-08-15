import { useState } from "react";
import "./App.css";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays } from "date-fns";
import { subDays } from "date-fns";
import "./styles/main.scss";
import { useEffect } from "react";
import HistoryTab from "./components/HistoryTab";

function App() {
  const [search, setSearch] = useState("");
  const [apiData, setApiData] = useState("no_data");
  const [dateRange, setDateRange] = useState([null, null]);
  const [dateRangeWasNotPicked, setDateRangeWasNotPicked] = useState(0);
  const [error, setError] = useState(0)
  const [startDate, endDate] = dateRange;
  const [arr, setArr] = useState();
  const resolutions = [1, 5, 15, 30, 60, "D", "W", "M"];

  const getCompanyProfileData = async () => {
    axios
      .get(
        `https://finnhub.io/api/v1/stock/profile2?symbol=${search}&token=cbqvcbqad3ibee6m62pg`
      )
      .then((data) => ( setArr(data.data)))
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
        companyName: search,
        dateRangeOne: dateRange[0].getTime()/1000,
        dateRangeTwo: dateRange[1].getTime()/1000,
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
      .then(
        (data) => (
          // setApiData(data.data),
          createObj(data.data)
          // dataStructurization(data.data),
        )
      )
      .catch((error) => console.log(error));
  };
  const createObj = (data) => {
    const arr = [];
    for (let i = 0; i < data.t.length; i++) {
      arr.push({
        date: new Date(data.t[i] * 1000).toISOString().slice(0, 10),
        value: data.v[i],
        open: data.o[i],
        closed: data.c[i],
        highest: data.h[i],
        lowest: data.l[i],
        time: new Date(data.t[i] * 1000)
          .toISOString()
          .split("T")[1]
          .slice(0, 5),
      });
    }
    setApiData(arr);
  };



  const searchInput = (e) => {
    setError(0)
    if(/[^a-z, ]/.test(e.target.value)=== true ){
      setError(1)
      return
    }
    if((e.target.value).length >=36){
      setError(2)
      return
    }
    setSearch(e.target.value);
    getCompanyProfileData();
  };
 

  
  useEffect(() => {
    if (dateRange[0] !== null && dateRange[1] !== null) {
      setDateRangeWasNotPicked(0);
    }
  }, [dateRange]);

  return (
    <div className="App">
      <div className="container">
        <div className="row errors">
          {
            error === 1?
            <div className="col-12   error">{`You can use only [a-z / A-z] and spaces " "`}</div>
            :
            ""}{

            
            error === 2?
            <div className="col-12  error">{`Max input length 35 characters`}</div>
            :
            ""
          }
          </div>
          <div className="row">
          <div className="col-12 mb-4 mt-4 col-md-6">
            <input
              className="search"
              value={search}
              onChange={(e) => searchInput(e)}
              type="text"
              name=""
              id=""
              placeholder="Search company by code"
            />
          </div>
          <div className="col-12  mt-md-4 col-md-6">
            <DatePicker
            className="datePicker"
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
              calendarStartDay={1}  
              placeholderText="Choose date range"
              includeDateIntervals={[
                {
                  start: subDays(new Date(), 365),
                  end: addDays(new Date(), 0),
                },
              ]}
              onChange={(update) => {
                setDateRange(update);
              }}
              withPortal
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12 mt-4">
            <div className="company_container">
              <div className="company_container-top">
                <div className="profile-category ">Name</div>
                <div className="profile-category">Country</div>
                <div className="profile-category">Currency</div>
                <div className="profile-category">WebSite</div>
              </div>
              <div className="company_container-bottom">
                {arr ? (
                  <>
                    <div
                      className="profile-category name"
                      onClick={() => wasDateRangePicked()}
                    >
                      {arr.name}
                    </div>
                    <div className="profile-category">{arr.country}</div>
                    <div className="profile-category">{arr.currency}</div>
                    <a
                      className="profile-web"
                      href={arr.weburl}
                      rel="noreferrer noopener"
                      target="_blank"
                    >
                      {arr.weburl
                        ? arr.weburl.split("//")[1].split("/")[0]
                        : ""}
                    </a>
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
            {
            dateRangeWasNotPicked === 1 ? (
              <div className="rangeWasNotPicked">
                You have to choose date ranges
              </div>
            ) : (
              <HistoryTab dataApi={apiData}></HistoryTab>
            )
            }
          </div>
        </div>

       
      </div>
    </div>
  );
}

export default App;
