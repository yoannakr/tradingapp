import styled from "styled-components";
import { Table as AntdTable, TableProps as AntdTableProps } from "antd";

export type { AntdTableProps };

export const Table = styled(AntdTable)<AntdTableProps<any>>`
  .ant-table table {
    background-color: #16191e;
    color: grey;
  }
  .ant-table-cell {
    white-space: nowrap;
    padding-left: 2em;
  }
  .ant-table-selection-column {
    display: none;
  }
  .ant-table-body::-webkit-scrollbar {
    display: none;
  }
  .ant-table-tbody > tr.ant-table-row-selected > td {
    background-color: rgb(43, 49, 57);
  }
  .ant-table-tbody > tr > td {
    border: none;
  }
  && tbody > tr:hover > td {
    background: rgb(43, 49, 57);
  }
`;
