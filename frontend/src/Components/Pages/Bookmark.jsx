import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Left from '../LeftNav/LeftNav'
import Right from '../RightParts/right';
import { Heading, Button, SkeletonCircle, Box, Skeleton } from '@chakra-ui/react'
import PostCard from '../midPart/component/PostCard';

// async function getlikedPosts() {
//   console.log("nigga")
//   const response = await fetch("http://localhost:5000/getAllPosts").catch((err) => {
      
//       console.log(err);
//   });
//   const temp = await fetch(`http://localhost:5000/getUser`,{
//         headers: {
          
//           'token': localStorage.getItem('token')
//         }
//       });

//   let data = await response.json();
//   //let data2 = await temp.json();
//   return {data,temp}
// }
async function getlikedPosts() {
  try {
    
    const response = await fetch("http://localhost:5000/getAllPosts");

    if (!response.ok) {
      throw new Error("Error fetching posts");
    }
    let token=localStorage.getItem('token');
    let temp = await fetch(`http://localhost:5000/getUser`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            token
          }
    });

    if (!temp.ok) {
      throw new Error("Error fetching user");
    }

    const data = await response.json();
    const userData = await temp.json();
    console.log(data);
    return { data, userData };
  } catch (err) {
    console.log(err);
    return null;
  }
}


function Bookmark() {
  const [likedPosts, setlikedPosts] = React.useState([]);
  //const [empty,setEmpty]=React.useState(false);
  const [isLoadingPosts, setIsLoadingPosts] = React.useState(false);
  const navigate = useNavigate();

  
  
//   useEffect(() => {
//     setIsLoadingPosts(true);
    
//     getlikedPosts().then((response) => {
//       const {data,temp}=response;
//       console.log(temp)
//       const results = data.filter(post => {
//         if (data.length===0) return data
//         return post.likes.includes(temp._id);
//       })
//     setlikedPosts(response);
//     setIsLoadingPosts(false);
//     });    
// }, []);
useEffect(() => {
  setIsLoadingPosts(true);

  getlikedPosts().then((response) => {
    const { data, temp } = response;
    console.log(temp);
    const likedPosts = data.filter((post) => post.likes.includes(temp._id));

    setlikedPosts(likedPosts);
    setIsLoadingPosts(false);
  }).catch((error) => {
    console.log(error);
    setIsLoadingPosts(false);
  });
}, []);


  return (
    <>
    <Left />
    <Right />
    <div style={{marginLeft:"17%", marginRight:"36%", marginTop:"53px", width:"47%"}}>
      <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
      <Heading style={{
                  fontFamily:
                    "sohne, 'Helvetica Neue', Helvetica, Arial, sans-serif",
                }} fontSize="42px" fontWeight={700}>Liked Posts</Heading>
      
      </div>
      <br />
      <Heading style={{
                  fontFamily:
                    "sohne, 'Helvetica Neue', Helvetica, Arial, sans-serif", cursor:"pointer"
                }} mb={2} fontSize="14px" fontWeight={400}>liked {likedPosts.length}</Heading>
      <hr style={{backgroundColor:"gray", borderColor:"gray"}} />
      <div style={{display:'flex', flexDirection:'row', justifyContent:"space-between"}}>
        {
          isLoadingPosts ? <div style={{display:"flex", flexDirection:"column", width:"100%"}}>
          <Box mt={10} style={{width:"100%", display:"flex", flexDirection:"column", gap:"10px"}}>
            <Box style={{display:"flex", flexDirection:"row",gap:"20px", width:"60%"}}>
              <SkeletonCircle size="10" />
              <Box style={{display:"flex", flexDirection:"row", gap:"20px", margin:"auto"}}>
                    <Skeleton height={18} width={120}/>
                    <Skeleton height={18} width={100}/>
                </Box>
                <Box style={{margin:"auto", marginRight:"0"}}>
                <Skeleton ml={5} height={30} width={7}/>
                </Box>
            </Box>
            <Skeleton height={30} mt={1}/>
            <Skeleton height={18} />
            <Skeleton height={18} />
            <Skeleton height={18} />
            <Box style={{display:"flex", flexDirection:"row", gap:"20px"}}>
            <Skeleton height={18} width={100}/>
            <Skeleton height={18} width={140}/>
            </Box>
          </Box>
          <Box mt={10} style={{width:"100%", display:"flex", flexDirection:"column", gap:"10px"}}>
            <Box style={{display:"flex", flexDirection:"row",gap:"20px", width:"60%"}}>
              <SkeletonCircle size="10" />
              <Box style={{display:"flex", flexDirection:"row", gap:"20px", margin:"auto"}}>
                    <Skeleton height={18} width={120}/>
                    <Skeleton height={18} width={100}/>
                </Box>
                <Box style={{margin:"auto", marginRight:"0"}}>
                <Skeleton ml={5} height={30} width={7}/>
                </Box>
            </Box>
            <Skeleton height={30} mt={1}/>
            <Skeleton height={18} />
            <Skeleton height={18} />
            <Skeleton height={18} />
            <Box style={{display:"flex", flexDirection:"row", gap:"20px"}}>
            <Skeleton height={18} width={100}/>
            <Skeleton height={18} width={140}/>
            </Box>
          </Box>
          </div> : <div>
          {
            likedPosts?.map(post => {
              return <PostCard key={post._id} post={post} />
          })
          }
          </div>
        }
      </div>
    </div>
    {/* {
      deletedPost ? <Toast type='deleted' /> : null
    } */}
    </>
  )
}

export default Bookmark