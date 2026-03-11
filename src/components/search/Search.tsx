import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Input, Tag } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../../api/products';
import { useFiltersStore } from '../../stores/filtersStore';
import { useMemo } from 'react';

const Search = () => {
  const { data: products = [] } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.type));
    return Array.from(set).sort();
  }, [products]);

  const { searchText, setSearchText, selectedCategories, toggleCategory } =
    useFiltersStore();

  return (
    <div className="search-and-filters">
      <div className="search-bar">
        <Input
          placeholder="Buscar producto"
          prefix={<SearchOutlined className="search-input-icon" />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          allowClear
          className="search-input"
        />
      </div>
      <div className="filter-chips">
        {categories.map((cat) => {
          const active = selectedCategories.includes(cat);
          return (
            <Tag
              key={cat}
              color={active ? 'blue' : 'default'}
              onClick={() => toggleCategory(cat)}
              className="filter-chip"
            >
              {cat}
            </Tag>
          );
        })}
      </div>
    </div>
  );
};

export default Search;
