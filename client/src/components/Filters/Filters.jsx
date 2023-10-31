import React from 'react';

const Filters = ({
  selectedDataSource,
  handleDataSourceChange,
  handleFilter,
  handleOrderName,
  handleOrder,
  temperaments,
}) => {
  return (
    <div>
      <select
        value={selectedDataSource}
        onChange={handleDataSourceChange}
        className="Order"
      >
        <option value="API">API</option>
        <option value="DB">DB</option>
      </select>

      <select onChange={handleFilter} className="Order">
        <option value="">Temperaments</option>
        {temperaments.map((temperament, index) => (
          <option key={index} value={temperament}>
            {temperament}
          </option>
        ))}
      </select>

      <select onChange={handleOrderName} className="Order">
        <option>Order</option>
        <option value="A">Z-A</option>
        <option value="B">A-Z</option>
      </select>

      <select onChange={handleOrder} className="Order">
        <option>Weight</option>
        <option value="A">Less (-)</option>
        <option value="B">More (+)</option>
      </select>
    </div>
  );
};

export default Filters;
