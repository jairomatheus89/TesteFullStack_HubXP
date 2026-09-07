import { Box, IconButton, Typography } from "@mui/material";
import { Refresh } from "@mui/icons-material";
import Table from "@/components/table/Table";
import { useEffect, useState } from "react";
import axios from "axios";

//services
import { categoryService } from "@/services/category-service";

import type { Category, CategoryDataTable } from "@/types/categoryDataTable";

import SimpleSnackbar from "@/components/alert/SimpleSnackbar";
import EditItemDrawer from "@/components/editdrawer/EditItemDrawer";

function CategoryPage(){

  const [tableData, setTableData] = useState<CategoryDataTable>([]);

  //snack states
  const [ snackOpen, setSnackOpen] = useState(false);
  const [reqMessage, setReqMessage] = useState("");

  //Item drawer Editor
  const [openEditDrawer, setOpenEditDrawer] = useState(false);

  const openEditDrawerFunc = () => {
    setOpenEditDrawer(true);
  }

  const closeEditDrawerFunc = () => {
    setOpenEditDrawer(false);
  };

  const loadCategories = async () => {
    const result = await categoryService.getAllCategories();
    setTableData(result);
  }

  const handleDelete = async (categoryId: string) => {

    try{
      const result = await categoryService.deleteCategory(categoryId);

      setTableData((currentData) => 
        currentData.filter((category) => category._id !== categoryId)
      );

      setReqMessage(result?.status);
      setSnackOpen(true);

      console.log(result);
    }catch(error){
      if(axios.isAxiosError(error)){
        setReqMessage(error.response?.data?.message);
        setSnackOpen(true);
        console.error(error.response?.data);
      }
      console.error(error);
    }
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
        Categories
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          minHeight: 0,
          width: '100%',
          overflow: 'hidden'
        }}
      >
        <Table<Category>
          data={tableData}
          openEditDrawer={openEditDrawerFunc}
          renderItem={
            (category) => (
              <Typography
                sx={{
                  fontSize: 22
                }}
              >
                {category.name}
              </Typography>
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
      <EditItemDrawer open={openEditDrawer} onClose={closeEditDrawerFunc}/>
    </Box>
  );
}

export default CategoryPage;