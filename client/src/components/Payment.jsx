import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useStateContext } from "../context";
import CustomButton from "./CustomButton";


const Payments = () => {
  const { state } = useLocation();
  const [amount,setAmount] = useState()
  const {contract,address} = useStateContext();
  const handleWithdrew = async () => {
    const data = await getWithdraw(state.PId);
    setAmount(data)
    }

  
  return (
    <div>
      <div className="flex-1">
        <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
          Withdraw
        </h4>
        <br></br>
        <div className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px] gap-[20px]">
          <p className="font-epilogue fount-medium text-[20px] leading-[30px] text-center text-[#808191] ">
            Withdraw the campaign
          </p>
          <p className="font-epilogue fount-medium text-[20px] leading-[30px] text-center text-[#808191]">
           owner: {state.owner}
          </p>
          <p className="font-epilogue fount-medium text-[20px] leading-[30px] text-center text-[#808191]">
           Raised of: {state.target}
          </p>
          <p className="font-epilogue fount-medium text-[20px] leading-[30px] text-center text-[#808191]">
           Amount Collected: {state.amountCollected}
          </p>


        

            <CustomButton
              btnType="button"
              title="Withdraw Campaign"
              styles="w-full bg-[#8c6dfd]"
              handleClick={handleWithdrew}
            />
          </div>
        </div>
      </div>
  );
};

export default Payments;