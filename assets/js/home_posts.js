$(document).ready(function(){
  // method to submit the form data for new post using Ajax
  let createPost = function () {
    let newPostForm = $("#new-post-form");

    newPostForm.submit(function (e) {
      e.preventDefault();
      $.ajax({
        type: "post",
        url: "/posts/create",
        data: newPostForm.serialize(),
        success: function (data) {
          console.log(data.data);
          let newPost = newPostDom(data.data.post);          
          $("#post-list-container>ul").prepend(newPost);
          console.log($(".delete-post-button", newPost));
          deletePost($(" .delete-post-button", newPost));

          new Noty({
            theme:'relax',
            text:'Post created',
            type:'success',
            layout:'topRight',
            timeout:1500
          }).show();
        },
        error: function (error) {
          console.log(error.responseText);
        }
      });
    });
  }

  //method to create a post in DOM
  let newPostDom = function (post) {
    return $(`<li id="post-${post._id}">
        <p>
          <small>
            <a class='delete-post-button'href="/posts/destroy/${post._id}">X</a>
          </small>
          ${post.content}
          <br />
          <small> ${post.user.name} </small>
        </p>
        <div class="post-comments">
            <form id='post-${post._id}-comments-form' action="/comments/create" method="POST">
              <input type="text" name="content"placeholder="Type here to add comment..." required>
              <input type="hidden" name="post" value="${post._id}">
              <input type="submit" value="Add comment">
            </form>
            <div class="post-comments-list">
              <ul id="post-comments-${post._id}">
              
              </ul>
              
            </div>
        </div>
      </li>`)
  }

  // method to delete a post from DOM
  let deletePost = function (deleteLink) {
    console.log(deleteLink);
    console.log($(deleteLink).prop("href"));
    $(deleteLink).click(function (e) {
      e.preventDefault();
      console.log(e);
      $.ajax({
        type: "get",
        url: $(deleteLink).prop("href"),
        success: function (data) {
          console.log(data.data.post_id);
          $(`#post-${data.data.post_id}`).remove();
          new Noty({
            theme:'relax',
            text:'Post deleted',
            type:'success',
            layout:'topRight',
            timeout:1500
          }).show();
        },
        error: function (error) {
          console.log(error.responseText);
        },
      });
    });
  }
  let convertPostsToAjax = function(){
    $('#post-list-container>ul>li').each(function(self){
        // let self = $(this);
        deletePost($(' .delete-post-button', self));

        // get the post's id by splitting the id attribute
        // let postId = self.prop('id').split("-")[1]
        // new PostComments(postId);
    });
}
  convertPostsToAjax();
  createPost();
})