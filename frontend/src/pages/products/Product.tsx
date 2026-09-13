import { useState, useEffect } from "react";
import { Box, Typography, IconButton, Input, Button } from "@mui/material";
import { Refresh, Edit, Delete } from "@mui/icons-material";
import { productService } from "@/services/product-service";
import { categoryService } from "@/services/category-service";
import axios from "axios";

import type { Product, ProductDataTable, ProductCategory } from "@/types/productDataTable";
import type { Category } from "@/types/categoryDataTable";

import SimpleSnackbar from "@/components/alert/SimpleSnackbar";
import Table from "@/components/table/Table";
import EditItemDrawer from "@/components/editdrawer/EditItemDrawer";
import AlertEditModal from "@/components/alert/ModalItemEditor";
import ItemsAccordion from "@/components/accordion/ItemsAccordion";

type actionType = "CREATE" | "EDIT" | "DELETE";
type atributeType = "NAME" | "DESCRIPTION" | "CATEGORIE" | "PRICE";

function ProductPage(){

  const [tableData, setTableData] = useState<ProductDataTable>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalActionType, setModalActionType] = useState<actionType | null>(null);
  const [atributeEdit, setAtributeEdit] = useState<atributeType | null>(null);
  const [allCategories, setAllCategories] = useState<Category[] | null>(null);
  //const [newCategoryIds, setNewCategoryIds] = useState<Category[] | null>(null);

  //new atributesEdit
  const [newProductName, setNewProductName] = useState<string>("");
  const [newProductDesc, setNewProductDesc] = useState<string>("");
  const [newProductPrice, setNewProductPrice] = useState<number | null>(null);

  //snack states
  const [ snackOpen, setSnackOpen ] = useState(false);
  const [ reqMessage, setReqMessage ] = useState("");

  //Item drawer Editor
  const [openEditDrawer, setOpenEditDrawer] = useState(false);

  //Modal
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setExpandAccordion(false);
    setOpenModal(false);
  }

  //Accordion
  const [expandAccordion, setExpandAccordion] = useState(false);

  useEffect(() => {
    if(!expandAccordion) return;

    const fetchCategories = async () => {
      const result = await categoryService.getAllCategories();

      setAllCategories(result);
      console.log(result);
    }

    fetchCategories();

  }, [expandAccordion]);

  const handleExpandAccordion = async () => {
    setExpandAccordion(prev => !prev);
  }

  const closeEditDrawerFunc = () => {
    setSelectedProduct(null);
    setOpenEditDrawer(false);
  };

  const openEditModalName = () => {
    setModalActionType("EDIT");
    setAtributeEdit("NAME");
    handleOpenModal();
  }
  const openEditModalDescription = () => {
    setModalActionType("EDIT");
    setAtributeEdit("DESCRIPTION");
    handleOpenModal();
  }
  const openEditModalCategorie = () => {
    setModalActionType("EDIT");
    setAtributeEdit("CATEGORIE");

    console.log(selectedProduct!.categoryIds);

    handleOpenModal();
  }
  const openEditModalPrice = () => {
    setModalActionType("EDIT");
    setAtributeEdit("PRICE");
    handleOpenModal();
  }

  const handleEditName = async (productId: string) => {
    try{
      const result = await productService.patchProductName(productId, newProductName);
      console.log(result?.status);
      setReqMessage(result?.status);
      setSelectedProduct(prev => {
        if(!prev) return null;

        return{
          ...prev,
          name: newProductName
        }
      });

      setSnackOpen(true);
      handleCloseModal();
    } catch (error){
      if(axios.isAxiosError(error)){
        setReqMessage(error?.response?.data?.message[0]);
        console.error(error?.response?.data?.message[0]);
        setSnackOpen(true);
        return;
      }
      console.error(error)
    } finally{
      setNewProductName("");
    }
  }

  const handleEditDesc = async (productId: string) => {
    try{
      const result = await productService.patchProductDesc(productId, newProductDesc);
      console.log(result?.status);
      setReqMessage(result?.status);
      setSelectedProduct(prev => {
        if(!prev) return null;

        return{
          ...prev,
          description: newProductDesc
        }
      });

      setSnackOpen(true);
      handleCloseModal();
    } catch (error){
      if(axios.isAxiosError(error)){
        setReqMessage(error?.response?.data?.message[0]);
        console.error(error?.response?.data?.message[0]);
        setSnackOpen(true);
        return;
      }
      console.error(error)
    } finally{
      setNewProductDesc("");
    }
  }

  const handleEditCategories = async (productId: string, categoryIds: ProductCategory[]) => {

    const categoryIdsStrings = categoryIds.map(category => category._id);

    try{
      const result = await productService.patchProductCategories(productId, categoryIdsStrings);
      console.log(result?.status);
      setReqMessage(result?.status);
      setSelectedProduct(prev => {
        if(!prev) return null;

        return{
          ...prev,
          categoryIds: categoryIds
        }
      });

      setTableData(prev =>
        prev.map(product =>
          product._id === productId
          ? {
              ...product,
              categoryIds: categoryIds
            }
          : product
        )
      );

      setSnackOpen(true);
      handleCloseModal();

    }catch(error){
      if(axios.isAxiosError(error)){
        console.error(error);
        return;
      }
      console.error(error);
    }
  }

  const handleEditPrice = async (productId: string) => {
    console.log(newProductPrice);
    try{
      if(newProductPrice === null || !Number.isFinite(newProductPrice)){
        setReqMessage("Preço nao pode ser nulo");
        setSnackOpen(true);
        return;
      };
      const result = await productService.patchProductPrice(productId, newProductPrice);
      console.log(result?.status);
      setReqMessage(result?.status);
      setSelectedProduct(prev => {
        if(!prev) return null;

        return{
          ...prev,
          price: newProductPrice
        }
      });
      setSnackOpen(true);
      handleCloseModal();
    } catch (error){
      if(axios.isAxiosError(error)){
        setReqMessage(error?.response?.data?.message[0]);
        console.error(error?.response?.data?.message[0]);
        setSnackOpen(true);
        return;
      }
      console.error(error)
    } finally{
      setNewProductPrice(null);
    }
  }


  const openDeleteModal = () => {
    setModalActionType("DELETE");
    handleOpenModal();
  }

  const openEditDrawerFunc = (data: Product) => {
    setSelectedProduct(data);
    setOpenEditDrawer(true);
  }

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
          openEditDrawer={openEditDrawerFunc}
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
            <Typography sx={{fontSize: 32}}>Product</Typography>
            <Box className="contentBox">
              <Box className="contentTitle">
                <Typography sx={{fontSize: 24}}>Name:</Typography>
                <IconButton onClick={openEditModalName}>
                  <Edit/>
                </IconButton>
              </Box>
              <Typography className="content">{selectedProduct?.name}</Typography>
            </Box>
            <Box className="contentBox">
              <Box className="contentTitle">
                <Typography sx={{fontSize: 24}}>Description:</Typography>
                <IconButton onClick={openEditModalDescription}>
                  <Edit/>
                </IconButton>
              </Box>
              <Typography className="content">{selectedProduct?.description}</Typography>
            </Box>
            <Box className="contentBox">
              <Box className="contentTitle">
                <Typography sx={{fontSize: 24}}>Categories:</Typography>
                <IconButton onClick={openEditModalCategorie}>
                  <Edit/>
                </IconButton>
              </Box>
              <Box className="content" sx={{display:'flex', color: 'red'}}>
                {
                  selectedProduct?.categoryIds.map((category, index) =>
                  <Typography key={category._id}>
                    {index > 0 && (
                      <Box component="span" sx={{ mx: 1 }}>
                        -
                      </Box>
                    )}
                    {category.name}
                  </Typography>
                )}
              </Box>
            </Box>
            <Box className="contentBox">
              <Box className="contentTitle">
                <Typography sx={{fontSize: 24}}>Price:</Typography>
                <IconButton onClick={openEditModalPrice}>
                  <Edit/>
                </IconButton>
              </Box>
              <Typography className="content">{selectedProduct?.price.toLocaleString('pt-BR', {style:'currency', currency:'BRL'})}</Typography>
            </Box>
            <Box className="contentBox">
              <Typography sx={{fontSize: 24}}>ID:</Typography>
              <Typography className="content">{selectedProduct?._id}</Typography>
            </Box>
            <Box className="optPanel">
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
                    {
                      (() => {
                        switch(atributeEdit){
                          case "NAME":
                            return(
                              <Box>
                                <Typography >NAME</Typography>
                                <Input placeholder="Insira o novo nome" value={newProductName} onChange={(e) => setNewProductName(e.target.value)}/>
                                <Box className="butBox">
                                  <Button className="butAction" onClick={() => handleEditName(selectedProduct!._id)}>Confirmar</Button>
                                  <Button className="butAction" onClick={handleCloseModal} sx={{color: 'red'}}>Cancelar</Button>
                                </Box>
                              </Box>
                            );
                          case "DESCRIPTION":
                            return(
                              <Box>
                                <Typography >DESCRIPTION</Typography>
                                <Input placeholder="Insira a nova descrição" value={newProductDesc} onChange={(e) => setNewProductDesc(e.target.value)}/>
                                <Box className="butBox">
                                  <Button className="butAction" onClick={() => handleEditDesc(selectedProduct!._id)}>Confirmar</Button>
                                  <Button className="butAction" onClick={handleCloseModal} sx={{color: 'red'}}>Cancelar</Button>
                                </Box>
                              </Box>
                            );
                          case "CATEGORIE":
                            return(
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "center",
                                  gap:1,
                                  width: "100%"
                                }}
                              >
                                <Typography >CATEGORIES:</Typography>
                                <Box
                                  sx={{
                                    display:'flex',
                                    flexDirection:'column',
                                    gap:1,
                                    padding: 1,
                                    borderRadius: 1,
                                    width: "100%",
                                    maxHeight:200,
                                    overflowY: 'auto',

                                    "& .categoryBox":{
                                      display:'flex',
                                      backgroundColor: (theme) => theme.palette.mode === 'light'
                                      ? 'rgba(100, 100, 100, 0.4)'
                                      : 'rgba(0, 0, 0, 0.4)',
                                      justifyContent:'space-between',
                                      alignItems:'center',
                                      borderRadius: 1,
                                      padding: 1
                                    }
                                  }}
                                >
                                  {
                                    selectedProduct?.categoryIds.map((category) =>
                                      <Box className="categoryBox" key={category._id}>
                                        <Typography>{category.name}</Typography>
                                        <IconButton
                                          onClick={() => {
                                            setSelectedProduct(prev => ({
                                              ...prev!,
                                              categoryIds: prev!.categoryIds.filter(item => item._id !== category._id)
                                            }));
                                            console.log(selectedProduct.categoryIds);
                                          }}
                                        >
                                          <Delete/>
                                        </IconButton>
                                      </Box>
                                    )
                                  }
                                </Box>
                                <ItemsAccordion
                                  expand={expandAccordion}
                                  expandHandle={handleExpandAccordion}
                                  renderItem={
                                    () => {
                                      return(
                                        allCategories?.map((category, index) => 
                                          <Box key={index} sx={{ bgcolor: 'gray'}}>
                                            <Typography>{category.name}</Typography>
                                          </Box>
                                        )
                                      );
                                    }
                                  }
                                />
                                <Box className="butBox">
                                  <Button className="butAction" onClick={() => handleEditCategories(selectedProduct!._id, selectedProduct!.categoryIds)}>Confirmar</Button>
                                  <Button className="butAction" onClick={handleCloseModal} sx={{color: 'red'}}>Cancelar</Button>
                                </Box>
                              </Box>
                            );
                          case "PRICE":
                            return(
                              <Box>
                                <Typography >PRICE</Typography>
                                <Input placeholder="Insira o novo preço" inputProps={{ min: 0 }} value={newProductPrice ?? ""} onChange={(e) => setNewProductPrice(e.target.value === "" ? null : Number(e.target.value))}/>
                                <Box className="butBox">
                                  <Button className="butAction" onClick={() => handleEditPrice(selectedProduct!._id)}>Confirmar</Button>
                                  <Button className="butAction" onClick={handleCloseModal} sx={{color: 'red'}}>Cancelar</Button>
                                </Box>
                              </Box>
                            );
                          default:
                            return;
                        }
                      })()
                    }
                  </Box>
                );
              case "DELETE":
                return(
                  <Box className="actionModalBox">
                    <Typography className="titleModal">DELETE?</Typography>
                    
                  </Box>
                );
              case "CREATE":
                return(
                  <Box className="actionModalBox">
                    <Typography className="titleModal">CREATE</Typography>
                    
                  </Box>
                );
              default:
                return null;
            }
          }
        }
      />
    </Box>
  );
}

export default ProductPage;