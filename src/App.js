import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import { useState, useEffect } from 'react';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import TextField from '@mui/material/TextField';
import ModeEditOutlineRoundedIcon from '@mui/icons-material/ModeEditOutlineRounded';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { FormControlLabel , Checkbox } from '@mui/material';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};



export default function CustomizedTables() {

  const [data, setData] = useState([])
  const [open, setOpen] = React.useState(false);

  const [name , setName] = useState("")
  const [age, setAge] = useState(0)
  const [isMarryed, setMarryed] = useState(false)
  const [isemployed, setEmployed] = useState(false)

  const [uopen, setUopen] = useState(false)
  const [addModal, setaddModal] = useState(false)

  const handleOpen = (name, age, marry, employed) => {
    setAge(age)
    setName(name)
    setMarryed(marry)
    setEmployed(employed)
    setOpen(true)
  }

  const handleUopne = ()=>{
    setUopen(true)
  }
    
  const handleUClose = ()=>{
    setUopen(false)
  }
  const handleClose = () => setOpen(false);

  function capitalizeFirstLetter(word) {
    if (!word) return ''; // Handle empty strings
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  useEffect(() => {
      axios.get('https://mocki.io/v1/a6a0fb6b-a84a-4934-b3f2-5c92cc77c44e')
      .then((res) => {
        setData(res.data)
      })
      .catch((err) => {
        console.log(err)
        setData([])
      })
  }, [])

  const removeItem = (username) => {
    setData((prevItems) => prevItems.filter((item) => item.username !== username));
  };

  const [formData, setFormData] = useState({
    userName: '',
    fullName: '',
    age: '',
    maritalStatus: false,
    isEmployed: false,
    isFounder: false,
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let d= {
      username : formData.userName,
      first_name : formData.fullName.split(' ')[0],
      last_name : formData.fullName.split(" ").pop(),
      age: formData.age,
      marital_status : (formData.maritalStatus? "married" : "unmarried"), 
      is_founder : formData.isFounder,
      is_employed : formData.isEmployed
    }
    setData([d, ...data ])
    console.log(data)
    setaddModal(false)
  };

  const [updateData, setUpdateData] = useState({
    userName: '',
    fullname: '',
    userAge: '',
    isMarried: false,
    employed: false,
    founderStatus: false,
  });

  const handleUpdateChange = (event) => {
    const { name, value, type, checked } = event.target;
    setUpdateData({
      ...updateData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleUpdateSubmit = (event) => {
    event.preventDefault();
      setData((prevUserList) =>
        prevUserList.map((user) =>
          user.username === updateData.userName
            ? { ...user, first_name: updateData.fullname, age: updateData.age, isEmployed: updateData.isEmployed, marital_status : (updateData.maritalStatus? "married" : "unmarried"), is_founder : updateData.isFounder }
            : user
        )
      );
    setUopen(false)
    };


  return (
    <TableContainer component={Paper} >
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            User Management System
          </Typography>
          <Button color="inherit" onClick={()=>setaddModal(true)}>Create User</Button>
        </Toolbar>
      </AppBar>
    </Box>
      <Table aria-label="customized table" >
        <TableHead >
          <TableRow>
            <StyledTableCell  >User Name</StyledTableCell>
            <StyledTableCell >Full Name</StyledTableCell>
            <StyledTableCell >Age</StyledTableCell>
            <StyledTableCell >Marital Status</StyledTableCell>
            <StyledTableCell >isEmployed</StyledTableCell>
            <StyledTableCell >isFounder</StyledTableCell>
            <StyledTableCell >Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {data.map((row, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell >
                {row.username}
              </StyledTableCell>
              <StyledTableCell >{row.first_name} {row.last_name}</StyledTableCell>
              <StyledTableCell >{row.age}</StyledTableCell>
              <StyledTableCell >{capitalizeFirstLetter(row.marital_status)}</StyledTableCell>
              <StyledTableCell >{row.is_employed ? "Yes" : "No"}</StyledTableCell>
              <StyledTableCell >{row.is_founder ? "Yes" : "No"}</StyledTableCell>
              <StyledTableCell >
                <RemoveRedEyeOutlinedIcon style={{ cursor: "pointer" }} onClick={(e) => { e.preventDefault(); handleOpen(`${row.first_name} ${row.last_name}`,row.age,row.marital_status,row.is_employed) }}/>&nbsp;&nbsp;
                <ModeEditOutlineRoundedIcon style={{ cursor: "pointer" }} onClick={(e) => { e.preventDefault(); handleUopne();setUpdateData({ ...updateData, userName: e.target.value, }); }}/>&nbsp;&nbsp;
                <DeleteRoundedIcon onClick={(e) => { e.preventDefault(); removeItem(row.username) }} style={{ cursor: "pointer" }} />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2>Details</h2>
          Name : <b>{name}</b> <br/>
          Age : <b>{age}</b> <br />
          Marital Status : <b>{isMarryed } </b> <br/> 
          Is Employed : <b>{isemployed ? "Yes" : "No"}</b>

        </Box>
      </Modal>
      <Modal
        open={addModal}
        onClose={()=>setaddModal(false)}
        aria-labelledby="modal-modal-title-2"
        aria-describedby="modal-modal-description-2"
      >
        <Box sx={style}>
        <Box
      component="form"
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400, margin: '0 auto' }}
      onSubmit={handleSubmit}
    >
      <TextField
        label="User Name"
        name="userName"
        value={formData.userName}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        label="Full Name"
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        label="Age"
        name="age"
        type="number"
        value={formData.age}
        onChange={handleChange}
        fullWidth
        required
      />
      <FormControlLabel
        control={
          <Checkbox
            name="maritalStatus"
            checked={formData.maritalStatus}
            onChange={handleChange}
          />
        }
        label="Marital Status"
      />
      <FormControlLabel
        control={
          <Checkbox
            name="isEmployed"
            checked={formData.isEmployed}
            onChange={handleChange}
          />
        }
        label="Is Employed"
      />
      <FormControlLabel
        control={
          <Checkbox
            name="isFounder"
            checked={formData.isFounder}
            onChange={handleChange}
          />
        }
        label="Is Founder"
      />
      <Button variant="contained" type="submit">
        Submit
      </Button>
    </Box>
        </Box>
      </Modal>
      <Modal
        open={uopen}
        onClose={handleUClose}
        aria-labelledby="modal-modal-title-1"
        aria-describedby="modal-modal-description-1"
      >
        <Box sx={style}>
        <Box
      component="form"
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400, margin: '0 auto' }}
      onSubmit={handleUpdateSubmit}
    >
      <TextField
        label="Full Name"
        name="fullname"
        value={updateData.fullname}
        onChange={handleUpdateChange}
        fullWidth
        required
      />
      <TextField
        label="Age"
        name="userAge"
        type="number"
        value={updateData.userAge}
        onChange={handleUpdateChange}
        fullWidth
        required
      />
      <FormControlLabel
        control={
          <Checkbox
            name="isMarried"
            checked={updateData.isMarried}
            onChange={handleUpdateChange}
          />
        }
        label="Marital Status"
      />
      <FormControlLabel
        control={
          <Checkbox
            name="employed"
            checked={updateData.employed}
            onChange={handleUpdateChange}
          />
        }
        label="Is Employed"
      />
      <FormControlLabel
        control={
          <Checkbox
            name="founderStatus"
            checked={updateData.founderStatus}
            onChange={handleUpdateChange}
          />
        }
        label="Is Founder"
      />
      <Button variant="contained" type="submit">
        Update
      </Button>
    </Box>       
        </Box>
      </Modal>
    </TableContainer>
  );
}
