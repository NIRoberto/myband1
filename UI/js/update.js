let updatess = document.querySelector('.add-new-post #formm');
let updateinfo =document.querySelector('.update .update-section');
 postinfo =(doc)=> {
   updatess.innerHTML =`
       <div class="ele">
    Title       </div>  <div class="ele">
    <input type="text" id="title" placeholder="" name ="title" value="${doc.data().title}">       </div>  <div class="ele">
    Sub-body       </div>  <div class="ele">
    <textarea name="subbody" id="textarea" cols="30" rows="3">  ${doc.data().subbody}</textarea>      </div>   <div class="ele">
    
    Body       </div>  <div class="ele">
    <textarea name="body" id="textarea" cols="30" rows="9">${doc.data().body}</textarea>       </div>  <div class="ele">
     Image        </div>  <div class="ele">
    <input type="file" id="file"  placeholder="image">      </div>  <div class="ele"><br> 
    <a href="javascript:updates('${doc.id}')" class="updatess">update</a>       </div>   <div class="ele">
          </div>
     `;


}
updatesss = (id) => {
window.location.href='/UI/admin post/post/update.html';
}
db.collection("blog")
  .get()
  .then((querySnapshotss) => {
    querySnapshotss.forEach((doc) => {
postinfo(doc);

    });
  });
let put = document.querySelector('#formm');
updates=(id)=>{
// To update age and favorite color:
 put.addEventListener("click", (e) => {
    e.preventDefault();
   db.collection("blog").doc(id).update({
     title: put.title.value,
     body: put.body.value,
     subbody: put.subbody.value,

    
   }).then(() => {
     alert("update has succefful done");
     window.location.href = '/UI/admin post/post/all.html';

   }).catch((error) => {
     alert(error.message);
   });
     put.title.value="",
    put.body.value="",
    put.subbody.value=""
 })
}