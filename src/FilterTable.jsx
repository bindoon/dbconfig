/* eslint no-underscore-dangle: 0 */
import React, { Component } from 'react';
import { Table, Pagination } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import IceLabel from '@icedesign/label';
import axios from 'axios';

import FilterForm from './Filter';

export default class EnhanceTable extends Component {
  static displayName = 'EnhanceTable';

  static defaultProps = {};

  constructor(props) {
    super(props);

    // 请求参数缓存
    this.queryCache = {};
    this.state = {
      filterFormValue: {},
      tableData: {
        list: [],
        columns: [],
        total: 100,
        pageSize: 10,
        currentPage: 1,
      }
    };
  }

  componentWillMount() {
    this.queryCache.page = 1;
    this.fetchData();
  }

  fetchData = () => {
    console.log(this.props)
    const id = this.props.match.params.id || 1;
    axios.get(`http://127.0.0.1:7001/api/dbconfig/${id}`).then(response => {
      this.setState({
        tableData: response.data.data
      })
    })
  };

  renderTitle = (value, index, record) => {
    return (
      <div style={styles.titleWrapper}>
        <span style={styles.title}>{record.title}</span>
      </div>
    );
  };

  editItem = (record, e) => {
    e.preventDefault();
    // TODO: record 为该行所对应的数据，可自定义操作行为
  };

  renderOperations = (value, index, record) => {
    return (
      <div
        className="filter-table-operation"
        style={styles.filterTableOperation}
      >
        <a
          href="#"
          style={styles.operationItem}
          target="_blank"
          onClick={this.editItem.bind(this, record)}
        >
          解决
        </a>
        <a href="#" style={styles.operationItem} target="_blank">
          详情
        </a>
        <a href="#" style={styles.operationItem} target="_blank">
          分类
        </a>
      </div>
    );
  };

  renderStatus = (value) => {
    return (
      <IceLabel inverse={false} status="default">
        {value}
      </IceLabel>
    );
  };

  changePage = (currentPage) => {
    this.queryCache.page = currentPage;

    this.fetchData();
  };

  filterFormChange = (value) => {
    this.setState({
      filterFormValue: value,
    });
  };

  filterTable = () => {
    // 合并参数，请求数据
    this.queryCache = {
      ...this.queryCache,
      ...this.state.filterFormValue,
    };
    this.fetchData();
  };

  resetFilter = () => {
    this.setState({
      filterFormValue: {},
    });
  };

  render() {
    
    const { filterFormValue, tableData } = this.state;

    return (
      <div className="filter-table">
        <IceContainer title="内容筛选">
          <FilterForm
            value={filterFormValue}
            onChange={this.filterFormChange}
            onSubmit={this.filterTable}
            onReset={this.resetFilter}
          />
        </IceContainer>
        <IceContainer>
          <Table
            dataSource={tableData.list}
            isLoading={tableData.__loading}
            className="basic-table"
            style={styles.basicTable}
            hasBorder={false}
          >
            {tableData.columns.map((column) => {
              if (column.name) {
                return <Table.Column title={column.title} dataIndex={column.name} key={column.name}/>
              } else {
                return <Table.Column title={column.title} cell={()=>{
                  let props = {};
                  try {
                    props = JSON.parse(column.cfg);
                  } catch(e) {
                    console.log(e)
                  }
                  console.log(props, column)
                  return <span {...props}/>
                }} />
              }
            })}
          </Table>
          <div style={styles.paginationWrapper}>
            <Pagination
              current={tableData.currentPage}
              pageSize={tableData.pageSize}
              total={tableData.total}
              onChange={this.changePage}
            />
          </div>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  filterTableOperation: {
    lineHeight: '28px',
  },
  operationItem: {
    marginRight: '12px',
    textDecoration: 'none',
    color: '#5485F7',
  },
  titleWrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  title: {
    marginLeft: '10px',
    lineHeight: '20px',
  },
  paginationWrapper: {
    textAlign: 'right',
    paddingTop: '26px',
  },
};
