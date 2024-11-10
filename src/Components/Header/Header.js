import React ,{useState}from "react";
import "./style.css";
import { useDispatch } from "react-redux";
import { changeFiltersBarVisibility } from "../../redux/commonSlice";

const Header = () => {
    const [isFilterMenuVisible, setIsFilterMenuVisible] = useState(true);
  
    const dispatch= useDispatch()

    const changeFiltesVisibility= ()=>{
        setIsFilterMenuVisible(!isFilterMenuVisible)
        dispatch(changeFiltersBarVisibility())
    }

  return (
    <div className="header">
      {" "}
      <button
        onClick={changeFiltesVisibility}
       className="btn-filter"
      >
        {isFilterMenuVisible ? "Hide Filters" : "Show Filters"}
      </button>
    </div>
  );
};

export default Header;
