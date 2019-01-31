import { message, Table } from "antd";
import React from "react";
import createUrl, { getPie } from "../../apis";
import NamePieSearch from "./NamePieSearch";

export default class Pies extends React.Component {
  state = {
    loading: true,
    pies: [],
    keyword: "",
    pagination: {
      showSizeChanger: true,
      current: 1,
      total: 1,
      pageSizeOptions: ["5", "10", "15"],
      defaultPageSize: 5
    },
    stores: []
  };

  componentDidMount() {
    Promise.resolve(this.fetch(this.state.pagination, undefined, {}));
  }

  onSearch = value => () => {
    this.setState(
      prevState => ({
        keyword: value,
        pagination: { ...prevState.pagination, current: 1 }
      }),
      () => {
        Promise.resolve(this.fetch(this.state.pagination, undefined, {}));
      }
    );
  };

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys }) => (
      <NamePieSearch
        selectedKeys={selectedKeys}
        setSelectedKeys={setSelectedKeys}
        onSearch={this.onSearch}
        dataIndex={dataIndex}
      />
    )
  });

  fetch = (pagination, _, sorter) => {
    this.setState({
      loading: true
    });
    return getPie(pagination.current, pagination.pageSize, this.state.keyword, {
      ...(sorter &&
        sorter.order && {
          _order: sorter.order === "ascend" ? "asc" : "desc",
          _sort: sorter.field
        })
    })
      .then(res => {
        // get the stores corresponding with the pies
        const savedStoreId = this.state.stores.map(store => store.id);
        const storeIds = Array.from(
          new Set(res.results.map(item => item.storeId))
        );

        // get a set of needed store ids
        const storePromises = storeIds
          .filter(storeId => !savedStoreId.includes(storeId))
          .map(storeId => {
            return fetch(createUrl("stores/" + storeId)).then(res =>
              res.json()
            );
          });

        return Promise.all(storePromises)
          .then(values => {
            this.setState(prevState => ({
              pies: [...res.results],
              loading: false,
              pagination: {
                ...pagination,
                total: Number(res.totalItems)
              },
              stores: [...prevState.stores, ...values]
            }));
          })
          .catch(err => {
            // logging error or something
            this.setState({ loading: false });
            message.error("Failed to fetch data");
          });
      })
      .catch(err => {
        // logging error or something
        this.setState({ loading: false });
        message.error("Failed to fetch data");
      });
  };

  tableColumns = [
    {
      title: "Pie Name",
      dataIndex: "displayName",
      render: name => name,

      sorter: true,
      ...this.getColumnSearchProps("displayName")
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      sorter: true,
      render: quantity => quantity
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: true,
      render: (_, record) => record.priceString
    },
    {
      title: "Pie Of The Day",
      dataIndex: "isPieOfTheDay",
      sorter: true,
      render: isPieOfTheDay => (isPieOfTheDay ? "Yes" : "No")
    },
    {
      title: "Store Rating",
      dataIndex: "rating",
      render: (_, record) =>
        this.state.stores.find(store => store.id === record.storeId).rating
    },
    {
      title: "Store Address",
      dataIndex: "address",
      render: (_, record) =>
        this.state.stores.find(store => store.id === record.storeId).address
    }
  ];

  render() {
    return (
      <React.Fragment>
        <Table
          columns={this.tableColumns}
          rowKey={record =>
            record.displayName +
            record.priceString +
            record.quantity +
            record.storeId
          }
          dataSource={this.state.pies}
          pagination={this.state.pagination}
          onChange={this.fetch}
          loading={this.state.loading}
        />
      </React.Fragment>
    );
  }
}
