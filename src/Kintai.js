import './App.css';
import './Kintai.css';
// import { listItems } from './graphql/queries';
// import { createItem as createItemMutation, deleteItem as deleteItemMutation } from './graphql/mutations';
// import { updateItem as updateItemMutation } from './graphql/mutations';

import React, { useState  } from 'react';
//import React, { useEffect } from 'react';

// import { API, Storage } from 'aws-amplify';
// import { withAuthenticator} from '@aws-amplify/ui-react';
// import { AmplifySignOut } from '@aws-amplify/ui-react';
//import 'bootstrap/dist/css/bootstrap.min.css';
//import Button from 'react-bootstrap/Button';
//import Card from 'react-bootstrap/Card';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function Kintai() {
  const [items, setItems] = useState([]);
  // const [formData, setFormData] = useState(initialFormState);
  const rowsPerPage = 5
  const [page, setPage] = React.useState(0);
  const [inputid, setInputid] = React.useState('');
  const [userid, setUserid] = React.useState('');

  // useEffect(() => {
  //   fetchItems();
  // }, []);

  //async function fetchItems(useid) {
  async function fetchItems() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    //var raw = JSON.stringify({"UserID": "99117"});
    var raw = JSON.stringify({"UserID": inputid});
    var requestOptions = {method: 'POST', headers: myHeaders, body: raw, redirect: 'follow' };
    fetch("https://el2gjqf1n3.execute-api.ap-northeast-1.amazonaws.com/dev", requestOptions)
    .then(response => response.text())
    .then(async(response) => {
      const apiData = JSON.parse(response);
        setItems(apiData);
        setUserid(inputid);
      })
    .catch(error => console.log('error', error));
    //alert(response);
  }

  function createData() {
    var date='';
    var inTime='';
    var outTime='';
    var remarks='';
    var rows=[];
    var count=0;
    items.map(item => {
      if(item.Date!==date){
        if(date!==''){
          rows.push({date,inTime,outTime,remarks});
        }
        date=item.Date;
        inTime='';
        outTime='';
        remarks='';
      }
      if(item.TrxCode==='IN'){
        inTime=item.Time;
        remarks=item.Remarks
      } else {
        outTime=item.Time;
      }
      count=count+1;
      if(count===items.length){
        rows.push({date,inTime,outTime,remarks});
      }
    });
    return rows;
  }
  const rows = createData();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChange = (event) => {
    setInputid(event.target.value);
  };

  return (
    <Box sx={{ width: '90%', mx: 'auto'}}>
      <Stack spacing={2} direction="row">
        <TextField id="inputid" label="UserID" value={inputid} size="small" sx={{backgroundColor:'white'}} onChange={handleChange} variant="outlined" />
        <Button variant="contained" disableElevation onClick={() => {fetchItems()}}>検索</Button>
      </Stack>
      <Paper elevation={0} sx={{ my: 2}}>
        <Typography
          sx={{ flex: '1 1 100%',px: 2, py: 2 }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {userid}の記録
        </Typography>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>日付</TableCell>
                <TableCell>出勤時刻</TableCell>
                <TableCell>退勤時刻</TableCell>
                <TableCell>備考</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(page*rowsPerPage, page*rowsPerPage+rowsPerPage).map((row) => (
                <TableRow
                  key={row.date}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.date}
                  </TableCell>
                  <TableCell>{row.inTime}</TableCell>
                  <TableCell>{row.outTime}</TableCell>
                  <TableCell>{row.remarks}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPageOptions={[5]}
        />
      </Paper>
    </Box>
  );

  // return (
  //   <div className="mt-5 mb-5 container-fluid AppBg0">

  //     <div style={{marginTop: 100,marginBottom: 30}}>
  //       {
  //         items.map(item => (
  //           <Card key={item.id}>
  //           <Card.Body className="AppBg1">
  //                 <div>{item.Date}</div>         
  //           </Card.Body>
  //           </Card>
  //         ))
  //       }
  //     </div>

  //     {/* <AmplifySignOut /> */}
  //   </div>
  // );
}

//export default withAuthenticator(Kintai);
export default Kintai;
