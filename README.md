# SIMPLE E-COMMERCE (NODEJS, EXPRESS, REACT and MONGODB)

### DESCRIPTION:
This e-commerce project is made with Node.js, Express, React and MongoDB.\
There are there parts in this project frontend, backend and admin. The admin part is for seller to manage their products.

---

### THE PROBLEMS I MET AND WHAT I LEARN:
1. monogoose built-in validator and custom error messages (backend/model/User.js)
[Ref](https://mongoosejs.com/docs/validation.html)
2. Cookie being saved on postman but not in web and send the cookie to backend:\
Solution 1:\
using `axios` package at frontend.\
Solution 2:\
using `cors` package at backend.\
option of cors `{ credentials: true }`, option of fetch `{ credentials: 'include' }`
3. To recieve cookie and verify cookie at backend:\
using `cookie-parser` package
4. the order of router is important\
for example:\
`router('/:id', ...);  router('/collection', ...);`
5. Cannot directly modify the data from mongodb\
(In Mongoose, documents retrieved from the database are instances of Mongoose models)\
To modify the data should convert them to plain JavaScript objects.\
`.toObject()` (backend/controllers/user.js line: 67)

---

### App Preview
<table width="100%"> 
<tr>
<td width="50%">      
    &nbsp; 
    <br>
    <p align="center">Shopping Page</p>
    <img src="">
    </td> 
<td width="50%">
    <br>
    <p align="center">Cart Page</p>
    <img src="">  
</td>
</table>