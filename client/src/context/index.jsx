import React, { useContext, createContext } from 'react';

import { useAddress, useContract, useMetamask, useContractWrite, useContractRead } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { EditionMetadataWithOwnerOutputSchema } from '@thirdweb-dev/sdk';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract('0x84320673dFfdff8C3CD69CC1F8524A7a7FB2D881');
  const { mutateAsync: createCampaign, isLoading} = useContractWrite(contract, 'createCampaign');
  const { mutateAsync: donateToCampaign } = useContractWrite(contract, "donateToCampaign");
 

  const address = useAddress();
  const connect = useMetamask();

  const publishCampaign = async (form) => {
    try {
    const data = await createCampaign(
    { args: [
    address, // owner
    form.title, // title
    form.description, // description
    form.target,
    new Date(form.deadline).getTime(), // deadline,
    form.image
    ]})

      console.log("contract call success", data)
    } catch (error) {
      console.log("contract call failure", error)
    }
  }

  const getCampaigns = async () => {
    const campaigns = await contract.call('getCampaigns');

    const parsedCampaings = campaigns.map((campaign, i) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: campaign.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
      image: campaign.image,
      pId: i
    }));

    return parsedCampaings;
  }

  const getUserCampaigns = async () => {
    const allCampaigns = await getCampaigns();

    const filteredCampaigns = allCampaigns.filter((campaign) => campaign.owner === address);

    return filteredCampaigns;
  }

  const donate = async (pId, amount) => {
    
    // const data = await contract.call('donateToCampaign', pId, { value: ethers.utils.parseEther(amount)});
    try {
      const data = await donateToCampaign({ args: [pId] },{ value: ethers.utils.parseEther(amount)});
      console.info("contract call successs", data);
      return data;
    } catch (err) {
      console.error("contract call failure", err);
    }
    
  }

  const getDonations = async (pId) => {
    const  donations  = await contract.call("getDonators", [pId]);
    const numberOfDonations = donations[0].length;

    const parsedDonations = [];

    for(let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i].toString())
      })
    }

    return parsedDonations;
  }


  return (
    <StateContext.Provider
      value={{ 
        address,
        contract,
        connect,
        createCampaign: publishCampaign,
        getCampaigns,
        getUserCampaigns,
        donate,
        getDonations
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext);