import { useState, useEffect } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { Refresh } from "@mui/icons-material";
import { productService } from "@/services/product-service";
import axios from "axios";
import type { Product, ProductDataTable } from "@/types/productDataTable";

import SimpleSnackbar from "@/components/alert/SimpleSnackbar";
import Table from "@/components/table/Table";

function ProductPage(){

  const [tableData, setTableData] = useState<ProductDataTable>([]);

  //snack states
  const [ snackOpen, setSnackOpen] = useState(false);
  const [reqMessage, setReqMessage] = useState("");

  const loadCategories = async () => {
    const result = await productService.getAllProducts();
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
        Products
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          minHeight: 0,
          width: '100%',
          overflow: 'hidden'
        }}
      >
        <Table<Product>
          data={tableData}
          renderItem={
            (product) => (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  overflow: 'hidden',
                  minHeight: 200
                }}
              >
                <Typography
                  sx={{
                    fontSize: 20
                  }}
                >
                  {product.name}
                </Typography>
                <Typography
                  sx={{
                    width: '100%',
                    borderTop: '1px solid',
                    borderTopColor: 'currentColor'
                  }}
                >
                  {product.description.length > 100
                    ? `${product.description.slice(0, 100)}...`
                    : product.description
                  }
                </Typography>
                <Box
                  sx={{
                    color: 'red'
                  }}
                >
                  {
                    product.categoryIds.map((category) => (
                      <Typography key={category._id}>
                        {category.name}
                      </Typography>
                    ))
                  }
                </Box>
                <Typography
                  sx={{
                    borderTop: '1px solid',
                    borderTopColor: 'currentColor',
                    fontSize: 18
                  }}
                >
                  {product.price.toLocaleString("pt-BR",{style: 'currency', currency: 'BRL'})}
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

export default ProductPage;