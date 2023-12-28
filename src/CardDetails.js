import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from 'react-bootstrap/Card';


function CardDetails(){
    const[card,setCard]=useState([])
    useEffect(()=>{
        axios.get('https://api.tvmaze.com/shows/1/episodes')
        .then((res)=>{
          setCard(res.data)
        })
      },[])
  
   const params= useParams()
   const item=card.find((e)=> e.id===parseInt(params.id))
   console.log(item);
    return(
        <div>
            
            <Card className="w-50 m-auto">
                <Card.Img variant="top" className='m-auto rounded-3 pt-3' style={{width:'80%'}}src={item?.image.medium} />
                <Card.Body>
                <Card.Text>
                    <h2 className="text-center text-danger">{item?.name}</h2>
                    <h4 className="text-danger">About The Movies</h4>
                    <h5>{item?.summary}</h5>
                    <p className="h6">Season : {item?.season} </p>
                    <p className="h6">Rating : <i class="bi bi-star-fill text-warning"></i> {item?.rating.average}</p>
                    <p className="h6">Release Date : {item?.airdate}</p> 
                    <p className="h6"> RunTime : <i class="bi bi-stopwatch-fill"></i> {item?.runtime} min</p>
                    <p className="h6"> Type : {item?.type}</p>
                    <p className="text-primary">{item?.url}</p>
                    
                
                </Card.Text>
                </Card.Body>
            </Card>
            

        </div>
    )
}
export default CardDetails