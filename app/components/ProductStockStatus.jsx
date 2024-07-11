import React, { useState, useEffect } from 'react';

const ProductStockStatus = ({ stockStatus }) => {
  const getStockStatusStyle = (status) => {
    return status.toLowerCase() === 'out of stock' ? { color: 'red' } : { color: 'black' };
  };

  return (
    <td className='product_stock_status' style={getStockStatusStyle(stockStatus)}>
      {stockStatus}
    </td>
  );
};

export default ProductStockStatus;
