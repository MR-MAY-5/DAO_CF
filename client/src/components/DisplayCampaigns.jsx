import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../context";
import FundCard from "./FundCard";
import { loader } from "../assets";
import { daysLeft } from "../utils";

const DisplayCampaigns = ({ title, isLoading, campaigns }) => {
  const navigate = useNavigate();
  // const remainingDays = campaigns.map((campaign) =>
  //   daysLeft(campaign.deadline)
  // );
  // const { filteredData } = useStateContext();
  // const [filteredCampaigns, setFilteredCampaigns] = useState([]);
  // useEffect(() => {
  //   fetchedData();
  // });
  // const fetchedData = async () => {
  //   const data = await filteredData();
  //   setFilteredCampaigns(data);
  // };
  const handleNavigate = (campaign) => {
    const days = daysLeft(campaign.deadline)
    if (days === "Expired") {
      return;
    } else {
      navigate(`/campaign-details/`, { state: campaign });
    }
  };

  return (
    <div>
      <h1 className="font-epilogue font-semibold text-[18px] text-black dark:text-white text-left">
        {title} ({campaigns.length})
      </h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <img
            src={loader}
            alt="loader"
            className="w-[100px] h-[100px] object-contain"
          />
        )}

        {!isLoading && campaigns.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            You have not created any campigns yet
          </p>
        )}
        {!isLoading && campaigns.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            No results found
          </p>
        )}

        {!isLoading &&
          campaigns.length > 0 &&
          campaigns.map((campaign) => (
            // <div key={campaign.pId}>
            //   {remainingDays[campaign.pId] != "Expired" ? (
            //     <FundCard
            //       key={campaign.pId}
            //       {...campaign}
            //       handleClick={() => handleNavigate(campaign)}
            //     />
            //   ) : (
            //     <FundCard
            //       key={campaign.pId}
            //       {...campaign}
            //       handleClick={() => handleNavigate(campaign)}
            //     />
            //   )}
            // </div>
            <FundCard
              key={campaign.pId}
              {...campaign}
              handleClick={() => handleNavigate(campaign)}
              page="Home"
            />
          ))}
      </div>
    </div>
  );
};

export default DisplayCampaigns;
