import { FilterOutlined } from '@ant-design/icons';
import { Button, Checkbox, Dropdown, Input } from 'antd';
import { useContext, useState } from 'react';
import { ProductsContext } from '../../context/ProductsContext';

const Search = () => {
  const { productsDatabase, filterByType, dynamicSearch } = useContext(ProductsContext);

  const items = productsDatabase
    .filter((item, index, self) => index === self.findIndex((t) => t.type === item.type))
    .map((item) => {
      return {
        key: item.type,
        label: (
          <Checkbox
            key={item.id}
            onChange={(e) => filterByType(e.target.checked, item.type)}
            value={item.type}
          >
            {item.type}
          </Checkbox>
        ),
      };
    });

  return (
    <div className="seach-bar">
      <Input
        placeholder="Buscar producto"
        style={{ width: '500px' }}
        onChange={(e) => dynamicSearch(e.target.value)}
      ></Input>

      <Dropdown menu={{ items }} placement="bottomLeft">
        <Button type="primary" size="middle" icon={<FilterOutlined />} />
      </Dropdown>
    </div>
  );
};

export default Search;
