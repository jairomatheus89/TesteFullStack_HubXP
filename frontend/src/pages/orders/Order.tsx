import { useState, useEffect } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { Refresh } from "@mui/icons-material";
import { orderService } from "@/services/order-service";
import axios from "axios";
import type { Order, OrderDataTable } from "@/types/ordersDataTable";

import SimpleSnackbar from "@/components/alert/SimpleSnackbar";
import Table from "@/components/table/Table";
import EditItemDrawer from "@/components/editdrawer/EditItemDrawer";

function OrderPage(){

  const [tableData, setTableData] = useState<OrderDataTable>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  //snack states
  const [ snackOpen, setSnackOpen] = useState(false);
  const [reqMessage, setReqMessage] = useState("");

  //Item drawer Editor
  const [openEditDrawer, setOpenEditDrawer] = useState(false);

  const loadCategories = async () => {
    const result = await orderService.getAllOrders();
    setTableData(result);
  }

  useEffect(() => {
    const firstLoad = async () => {
      loadCategories();
    }
    firstLoad();
  }, []);


  const openEditDrawerFunc = (data: Order) => {
    setSelectedOrder(data);
    setOpenEditDrawer(true);
  }

  const closeEditDrawerFunc = () => {
    setSelectedOrder(null);
    setOpenEditDrawer(false);
  };

  return(
    <Box
      sx={{
        display:'flex',
        flexDirection: 'column',
        flexGrow: 1,
        minHeight: 0,
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          display:'flex',
          justifyContent: 'center',
          fontSize: 30,
          width: '100%',
        }}
      >
        Order
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          minHeight: 0,
          width: '100%',
          overflow: 'hidden'
        }}
      >
        <Table<Order>
          data={tableData}
          openEditDrawer={openEditDrawerFunc}
          renderItem={
            (order) => (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: 200,

                }}
              >
                <Typography
                  sx={{
                    fontSize: 20
                  }}
                >
                  {order.date}
                </Typography>
                <Box>
                  {order.products.map((product) => (
                    <Typography key={product._id}>
                      {product.name}
                    </Typography>
                  ))}
                </Box>
                <Typography
                  sx={{
                    borderTop: '1px solid',
                    borderTopColor: 'currentColor',
                    fontSize: 18
                  }}
                >
                  {order.total.toLocaleString("pt-BR",{style: 'currency', currency: 'BRL'})}
                </Typography>
              </Box>
            )
          } 
        />
      </Box>
      <Box>
        <IconButton onClick={() => loadCategories()}>
          <Refresh/>
        </IconButton>
      </Box>
      <SimpleSnackbar
        open={snackOpen}
        message={reqMessage}
        onClose={() => setSnackOpen(false)}
      />
      <EditItemDrawer
        open={openEditDrawer}
        onClose={closeEditDrawerFunc}
        renderItem={() => (
          <Box 
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              width: '100%',
              padding: 2,
              "& .content":{
                padding: 1,
                borderRadius: 2,
                backgroundColor: (theme) => theme.palette.mode === 'light'
                  ? 'rgba(100, 100, 100, 0.4)'
                  : 'rgba(0, 0, 0, 0.4)'
              },
              "& .contentBox":{

              },
              "& .contentTitle":{
                display:'flex'
              },
              "& .optPanel":{
                display: 'flex',
                justifyContent: 'center',
                gap:10,
              }

            }}
          >
            <Typography sx={{fontSize: 32}}>Order</Typography>

            <Box className="contentBox">
              <Box className="contentTitle">
                <Typography sx={{fontSize: 24}}>Date:</Typography>
              </Box>
              <Typography className="content">{selectedOrder?.date}</Typography>
            </Box>

            <Box className="contentBox">
              <Box className="contentTitle">
              </Box>
            </Box>

            <Box className="contentBox">
              <Box className="contentTitle">
              </Box>

              <Box className="content" sx={{display:'flex', color: 'red'}}>
              </Box>
            </Box>

            <Box className="contentBox">
              <Box className="contentTitle">
              </Box>
            </Box>
            <Box className="contentBox">
            </Box>
          </Box>
        )}
      />
    </Box>
  );
}

export default OrderPage;