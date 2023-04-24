import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link , useLocation } from "react-router-dom";
import { useState } from "react";
import useFetch from "../../hooks/useFetch"
import { useEffect } from "react";
import axios from "axios";
const Datatable = ({columns}) => {

  // useLocation() 是React Router提供的Hook，用于获取当前路由的信息，包括路径、搜索参数和哈希值等
  const location = useLocation();
  // location.pathname 表示当前路由的路径部分，例如 /api/orders
  const path = location.pathname.split("/")[1];
  // path 变量表示从当前路径中提取出的第一个路径片段，例如 /api；
  const [list, setList] = useState([]);
  // useFetch() 是自定义的Hook，用于从指定URL获取数据，并返回获取到的数据、是否正在加载和错误信息等
  const { data, loading, error } = useFetch(`http://localhost:8800/api/${path}`);

  useEffect(()=>{

    setList(data)

  },[data])
  
  const handleDelete =async (id) => {
    try {
      await axios.delete(`http://localhost:8800/api/${path}/${id}`);
     setList(list.filter((item) => item._id !== id));
    } catch (err) {}
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "操作",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              删除
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
         {path.toUpperCase()}
        <Link to={`/${path}/new`} className="link">
          添加
        </Link>
       
      </div>
      {/* 渲染列表的代码是 <DataGrid> 组件 */}
      <DataGrid
        className="datagrid"
        // list 表示要展示的数据
        rows={list}
        // 展示的列
        columns={columns.concat(actionColumn)}
        // 每页显示的行数
        pageSize={100}
        // 示每行的高度
        rowHeight={200}
        // 可选的每页显示行数
        rowsPerPageOptions={[9]}
        // 是否显示复选框
        checkboxSelection
        // 每行的唯一标识符
        getRowId={row=>row._id}
      />
    </div>
  );
};

export default Datatable;
