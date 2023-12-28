import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import NavbarHeader from './Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Banner from './Banner';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

function App() {
  const [photo,setPhoto]=useState([])
  const [currentPage,setCurrentPage]=useState(0)
  const [postPerPage,setPostPerPage]=useState(4)
  console.log(currentPage,postPerPage);

    // useEffect(()=>{
    //   fetch('https://api.tvmaze.com/shows/1/episodes')
    //   .then((res)=>{
    //     return res.json()

    //   })
    //   .then((data)=>setPhoto(data))

    // },[])
    useEffect(()=>{
      axios.get('https://api.tvmaze.com/shows/1/episodes')
      .then((res)=>{
        setPhoto(res.data)
      })
    },[])

    const navigate=useNavigate()
      
    const handleClick=(value)=>{
      console.log(value);
      navigate(`/CardDetails/${value}`)

    }
    
    let pages=[1,2,3,4,5,6,7,8]
    const handleNextPage=(value)=>{
      setCurrentPage(value*5)
      setPostPerPage((value*5)+4)
    }

  return (
    <div className="App">
      <NavbarHeader />
      <Banner/>

      
      <Container>
        <h1 className='text-center mb-4'>Movies List</h1>
      <Row>
        

        {
        photo.map((photo,i)=>{
          return (i>=currentPage && i<=postPerPage)?
          
            <Col className='mb-2'>
            <div>
          

            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src={photo.image.medium} />
              <Card.Body className='bg-light'>
                <Card.Title className='text-center text-danger'>{photo.name}</Card.Title>
                <Card.Text>
                  <p> <i class="bi bi-star-fill text-warning"></i> {photo.rating.average}</p>
                  <p>Season:{photo.season}</p>
                 <p>Date:{photo.airdate}</p> 
                 <p>runtime:{photo.runtime}</p>
                 
                </Card.Text>
                <Button variant='danger' onClick={()=>handleClick(photo.id)}>More Details</Button>
            
              </Card.Body>
            </Card>

          
          
          </div>
          </Col>
          :""
          })
      }

        
      </Row>
    </Container>
      
      <div>
        {
          pages.map((e,i)=>{
            return (<Button className='m-2 bg-light text-dark' onClick={()=>{handleNextPage(i)}}>{e}</Button>)
          })
      
        }
      </div>
      

      
      

    </div>
  );
}

export default App;
