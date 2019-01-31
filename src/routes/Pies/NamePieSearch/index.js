import { Button, Input } from "antd";
import PropTypes from "prop-types";
import React from "react";

const NamePieSearch = ({
  dataIndex,
  setSelectedKeys,
  selectedKeys,
  onSearch
}) => {
  return (
    <div style={{ padding: 8 }}>
      <Input
        placeholder={`Search ${dataIndex}`}
        value={selectedKeys[0]}
        onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
        onPressEnter={onSearch(selectedKeys)}
        style={{ width: 188, marginBottom: 8, display: "block" }}
      />
      <Button
        type="primary"
        onClick={onSearch(selectedKeys)}
        icon="search"
        size="small"
        style={{ marginRight: 8 }}
      >
        Search
      </Button>
      <Button
        onClick={() => {
          setSelectedKeys([]);
          onSearch("");
        }}
        size="small"
      >
        Reset
      </Button>
    </div>
  );
};

NamePieSearch.propTypes = {
  dataIndex: PropTypes.string.isRequired,
  setSelectedKeys: PropTypes.func.isRequired,
  selectedKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSearch: PropTypes.func.isRequired
};

export default NamePieSearch;
