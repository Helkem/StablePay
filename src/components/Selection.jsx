/* eslint-disable react/prop-types */
import { Select } from "antd";

const { Option } = Select;

function Selection({ setContractAddress, selectedContractAddress, options }) {
  const handleChange = (contractAddress) => {
    setContractAddress(contractAddress);
  };

  return (
    <div className='selectionSection'>
      <div className='selectionSubsection'>
        <span className='selectionHeading'>Send </span>
        <Select
          size='large'
          defaultValue={selectedContractAddress}
          style={{ minWidth: 120, width: "fit-content" }}
          onChange={handleChange}
        >
          {options.map((option) => (
            <Option key={option.contractAddress} value={option.contractAddress}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={option.imageSrc}
                  alt={option.label}
                  style={{ width: 26, marginRight: 7, marginLeft: 1 }}
                />
                {option.label}
              </div>
            </Option>
          ))}
        </Select>
      </div>
      <div className='subtext'>Send stablecoins to any ETH address</div>
    </div>
  );
}

export default Selection;
