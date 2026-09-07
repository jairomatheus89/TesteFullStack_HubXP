import { useState, useEffect } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { Refresh } from "@mui/icons-material";
import { orderService } from "@/services/order-service";
import axios from "axios";
import type { Order, OrderDataTable } from "@/types/ordersDataTable";

import SimpleSnackbar from "@/components/alert/SimpleSnackbar";
import Table from "@/components/table/Table";

function OrderPage(){

  const [tableData, setTableData] = useState<OrderDataTable>([]);

  //snack states
  const [ snackOpen, setSnackOpen] = useState(false);
  const [reqMessage, setReqMessage] = useState("");

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
    </Box>
  );
}

export default OrderPage;