import { Box, IconButton, Typography, Button, Input } from "@mui/material";
import { Refresh, Edit, Delete } from "@mui/icons-material";
import Table from "@/components/table/Table";
import { useEffect, useState } from "react";
import axios from "axios";

//services
import { categoryService } from "@/services/category-service";

import type { Category, CategoryDataTable } from "@/types/categoryDataTable";

import SimpleSnackbar from "@/components/alert/SimpleSnackbar";
import EditItemDrawer from "@/components/editdrawer/EditItemDrawer";
import AlertEditModal from "@/components/alert/ModalItemEditor";
import AddItemBut from "@/components/Fab/AddItemBut";

type actionType = "CREATE" | "EDIT" | "DELETE"

function CategoryPage(){

  const [tableData, setTableData] = useState<CategoryDataTable>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [categoryNewName, setCategoryNewName] = useState<string>("");

  //snack states
  const [ snackOpen, setSnackOpen] = useState(false);
  const [reqMessage, setReqMessage] = useState("");

  //Item drawer Editor
  const [openEditDrawer, setOpenEditDrawer] = useState(false);

  //Modal
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const [modalActionType, setModalActionType] = useState<actionType | null>(null);

  const openEditModal = () => {
    setModalActionType("EDIT");
    handleOpenModal();
  }

  const openDeleteModal = () => {
    setModalActionType("DELETE");
    handleOpenModal();
  }

  const openCreateModel = () => {
    setModalActionType("CREATE");
    handleOpenModal();
  }

  const openEditDrawerFunc = (data: Category) => {
    setSelectedCategory(data);
    console.log("TA CLICANDO!?");
    setOpenEditDrawer(true);
  }

  const closeEditDrawerFunc = () => {
    setSelectedCategory(null);
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

      handleCloseModal();
      closeEditDrawerFunc();

      console.log(result);
    }catch(error){
      if(axios.isAxiosError(error)){
        setReqMessage(error.response?.data?.message);
        handleCloseModal();
        setSnackOpen(true);
        console.error(error.response?.data);
        return;
      }
      console.error(error);
    }
  }

  const handleEdit = async (categoryId: string) => {

    try{
      await categoryService.editCategory(categoryId, categoryNewName);

      setTableData((currentData) =>
        currentData.map((category) =>
          category._id === categoryId
            ? { ...category, name: categoryNewName}
            : category
        )
      );
      
      setReqMessage("Categoria Alterada com sucesso!");
      setSnackOpen(true);
      setCategoryNewName("");
      handleCloseModal();
      closeEditDrawerFunc();
    }catch(error){
      if(axios.isAxiosError(error)){

        setCategoryNewName("");

        if(error.response?.data?.message[0] === "name should not be empty"){
          setReqMessage("Categoria nao pode ter nome vazio...");
          handleCloseModal();
          setSnackOpen(true);
          console.error(error.response?.data);
          return;
        }

        setReqMessage(error.response?.data?.message);
        handleCloseModal();
        setSnackOpen(true);
        console.error(error.response?.data);
        return;
      }
      setCategoryNewName("");
      console.error(error);
    }

  }

  const handleCreateCategory = async (categoryName: string) => {
    try{
      const result = await categoryService.createCategory(categoryName);

      setTableData((currentData) => [
        ...currentData,
        result
      ]);

      setReqMessage("Categoria Criada com sucesso!");
      setSnackOpen(true);

      setCategoryNewName("");

      handleCloseModal();
    }catch(error){
      if(axios.isAxiosError(error)){
        setReqMessage(error.response?.data?.message);
        setCategoryNewName("");
        handleCloseModal();
        setSnackOpen(true);
        console.error(error.response?.data);
        return;
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
              <Box>
                <Typography
                  sx={{
                    fontSize: 22
                  }}
                >
                  {category.name}
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
          <Box sx={{
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
              "& .optPanel":{
                display: 'flex',
                justifyContent: 'center',
                gap:10,
              }

            }}
          >
            <Typography sx={{fontSize: 32}}>Categoria</Typography>
            <Box>
              <Typography sx={{fontSize: 24}}>name:</Typography>
              <Typography className="content">{selectedCategory?.name}</Typography>
            </Box>
            <Box>
              <Typography sx={{fontSize: 24}}>ID:</Typography>
              <Typography className="content">{selectedCategory?._id}</Typography>
            </Box>
            <Box className="optPanel">
              <IconButton onClick={openEditModal}>
                <Edit/>
              </IconButton>
              <IconButton onClick={openDeleteModal}>
                <Delete/>
              </IconButton>
            </Box>
          </Box>
        )}
      />
      <AlertEditModal
        openModal={openModal} 
        handleCloseModal={handleCloseModal}
        actionRender={
          () => {
            switch(modalActionType){
              case "EDIT":
                return(
                  <Box className="actionModalBox">
                    <Typography className="titleModal">EDIT</Typography>
                    <Typography>Novo Nome:</Typography>
                    <Input placeholder="Insira o novo nome..." value={categoryNewName} onChange={(e) => {setCategoryNewName(e.target.value)}}/>
                    <Box className="butBox">
                      <Button className="butAction" onClick={() => handleEdit(selectedCategory!._id)}>Confirmar</Button>
                      <Button className="butAction" onClick={handleCloseModal} sx={{color: 'red'}}>Cancelar</Button>
                    </Box>
                  </Box>
                );
              case "DELETE":
                return(
                  <Box className="actionModalBox">
                    <Typography className="titleModal">DELETE?</Typography>
                    <Typography>Tem Certeza que deseja DELETAR a categoria?</Typography>
                    <Box className="butBox">
                      <Button className="butAction" onClick={() => handleDelete(selectedCategory!._id)}>Confirmar</Button>
                      <Button className="butAction" onClick={handleCloseModal} sx={{color: 'red'}}>Cancelar</Button>
                    </Box>
                  </Box>
                );
              case "CREATE":
                return(
                  <Box className="actionModalBox">
                    <Typography className="titleModal">CREATE</Typography>
                    <Typography>Nova Categoria</Typography>
                    <Input placeholder="Insira a nova categoria" value={categoryNewName} onChange={(e) => {setCategoryNewName(e.target.value)}}/>
                    <Box className="butBox">
                      <Button className="butAction" onClick={() => handleCreateCategory(categoryNewName)}>Confirmar</Button>
                      <Button className="butAction" onClick={handleCloseModal} sx={{color: 'red'}}>Cancelar</Button>
                    </Box>
                  </Box>
                );
              default:
                return null;
            }
          }
        }
      />
      <AddItemBut openCreateModal={openCreateModel}/>
    </Box>
  );
}

export default CategoryPage;