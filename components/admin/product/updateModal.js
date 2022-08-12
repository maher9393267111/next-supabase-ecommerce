import React, { useRef, useState ,useEffect } from "react";
import {
  Box,
  Grid,
  GridItem,
  Textarea,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import {
  Button,
  FormLabel,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalBody,
  FormControl,
  ModalFooter,
  Input,
  ModalCloseButton,
  Heading,
  Image,
  Text,
  Select
} from "@chakra-ui/react";

import {fetchProductById, fetchCategories , updateProduct } from '../../../helper/functions'
import {useglobal} from '../../../context'
 
const ProductsModal = ({isOpen, onOpen, onClose }) => {
   // const { isOpen, onOpen, onClose } = useDisclosure()
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState('')
    const nameRef = React.useRef(null)
    const quantityRef = React.useRef(null)
  const priceRef = React.useRef(null)
    const categoryRef = React.useRef(null)

    const {  setProductid ,productid} = useglobal()

const [product, setProduct] = useState({})


const handlesubmit = (e) => {

    e.preventDefault()
    console.log('submit')
    console.log('initialRef',nameRef.current.value)
    console.log('quantityRef',quantityRef.current.value)
    console.log('categoryRef',category)
    console.log('initialRef',priceRef.current.value)

const productobject ={
    name: nameRef.current.value,
    quantity: quantityRef.current.value,
    price: priceRef.current.value,
    category: category,
    id: productid
}


    updateProduct(productobject)


}


useEffect(() => {

    fetchProductById(productid).then(res => {
console.log('productid is 🔘🔘----->',res)
setProduct(res)
    })
 
    fetchCategories().then(res => {
        setCategories(res)
    })



},[productid])



    return (
      <>
    
  
        <Modal
          initialFocusRef={nameRef}
          finalFocusRef={quantityRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Update Product {product?.name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Product name</FormLabel>
                <Input ref={nameRef} placeholder=' name' />
              </FormControl>
  
              <FormControl mt={4}>
                <FormLabel>price</FormLabel>
                <Input ref ={priceRef} placeholder={product?.price}  />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>quantity</FormLabel>
                <Input ref ={quantityRef} placeholder={product?.quantity}  />
              </FormControl>



              <FormControl mt={4}>
                <FormLabel>category </FormLabel>
                <Select
               
               onChange={(e) => setCategory(e.target.value)}
                placeholder='select category' size='xs' >
<option value={product?.category?.id} key=""> {product?.category?.name}</option>

{categories?.filter(category => category.id !== product?.category?.id)?.map(category => (

<option value={category?.id} key={category?.name}>{category?.name}</option>

))}




                    </Select>
              </FormControl>


              

            </ModalBody>
  
           


            <ModalFooter>
              <Button
              onClick={ handlesubmit }
              colorScheme='blue' mr={3}>
                Update
              </Button>
              <Button onClick={onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }

    export default ProductsModal;