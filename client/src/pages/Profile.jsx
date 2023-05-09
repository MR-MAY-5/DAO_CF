import React, { useState, useEffect } from 'react'

import { DisplayCampaigns } from '../components';
import { useStateContext } from '../context'
import FundCard from '../components/FundCard';
import { loader } from '../assets';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const navigate = useNavigate();
  const { address, contract, getUserCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getUserCampaigns();
    setCampaigns(data);
    setIsLoading(false);
  }

  useEffect(() => {
    if(contract) fetchCampaigns();
  }, [address, contract]);

  const handleNavigate = (campaign) => {
    navigate(`/payment`, { state: campaign })
  }

  return (
    <div>
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">All Campaigns ({campaigns.length})</h1>

<div className="flex flex-wrap mt-[20px] gap-[26px]">
  {isLoading && (
    <img src={loader} alt="loader" className="w-[100px] h-[100px] object-contain" />
  )}

  {!isLoading && campaigns.length === 0 && (
    <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
      You have not created any campigns yet
    </p>
  )}
  {!isLoading && campaigns.length > 0 && campaigns.map((campaign) => <FundCard 
    key={campaign.pId}
    {...campaign}
    handleClick={() => handleNavigate(campaign)}
  />)}
  
</div>
    </div>
  )
}

export default Profile