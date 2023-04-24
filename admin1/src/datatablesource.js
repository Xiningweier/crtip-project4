export const userColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "用户",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img ||  "https://i.ibb.co/MBtjqXQ/no-avatar.gif"} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "邮箱",
    width: 230,
  },

  {
    field: "country",
    headerName: "国家",
    width: 100,
  },
  {
    field: "city",
    headerName: "城市",
    width: 100,
  },
  {
    field: "phone",
    headerName: "手机号",
    width: 100,
  },
  {
    field: "isAdmin",
    headerName: "管理员",
    width: 100,
  }
  
];

//temporary data
export const hotelColumns = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "name",
    headerName: "名称",
    width: 150,
  },
  {
    field: "type",
    headerName: "类型",
    width: 100,
  },
  {
    field: "title",
    headerName: "小标题",
    width: 230,
  },
  {
    field: "city",
    headerName: "城市",
    width: 100,
  },
];

export const roomColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  
  {
    field: "title",
    headerName: "名称",
    width: 230,
  },
  {
    field: "desc",
    headerName: "详情",
    width: 200,
  },
  {
    field: "price",
    headerName: "价格",
    width: 100,
  },
  {
    field: "maxPeople",
    headerName: "人数",
    width: 100,
  },
  {
    field: "roomNumbers",
    headerName: "房间号",
    width: 500,
   
    renderCell: (params) => (
      <ul className="flex">
        {params.value.map((a, index) => (
          <li key={index}>{a.number}:{a._id} ,<ul className="flex"><li key={index}>{a.unavailableDates}</li></ul></li>
          

        ))}
      </ul>
    ),
    type:'string',
  },
  
  
  
  
];
export const contactColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  
  {
    field: "email",
    headerName: "邮箱",
    width: 230,
  },

  {
    field: "ph",
    headerName: "手机号",
    width: 100,
  }
];

export const confirmbColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  
  {
    field: "bid",
    headerName: "房间ID",
    width: 230,
  },

  {
    field: "sdate",
    headerName: "开始日期",
    width: 150,
  },
  {
    field: "edate",
    headerName: "终止日期",
    width: 150,
  },{
    field: "un",
    headerName: "用户名",
    width: 150,
  },{
    field: "ue",
    headerName: "邮箱",
    width: 150,
  },{
    field: "rn",
    headerName: "房间号",
    width: 150,
  }
  ,{
    field: "hn",
    headerName: "酒店名称",
    width: 150,
  } 
];

export const allroomColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  
  {
    field: "title",
    headerName: "Title",
    width: 230,
  },

  {
    field: "price",
    headerName: "Price",
    width: 150,
  },
  {
    field: "maxPeople",
    headerName: "Max People Allowed",
    width: 150,
  },{
    field: "desc",
    headerName: "Description",
    width: 150,
  },{
    field: "roomNumbers",
    headerName: "Rooms",
    width: 150,
  }
  
  
];