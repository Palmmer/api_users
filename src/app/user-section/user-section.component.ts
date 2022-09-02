import { Component, OnInit } from '@angular/core';
import { PostService } from '../_shared/services/post.service';

@Component({
  selector: 'app-user-section',
  templateUrl: './user-section.component.html',
  styleUrls: ['./user-section.component.scss']
})
export class UserSectionComponent implements OnInit {

  title_post = '';
  content_post = '';
  update_content = '';
  edit_content = false;
  cards: any[] = [

  ];


  constructor( private posts_services: PostService, ) { 
    this.initArray();
  }

  ngOnInit(): void {
    this.getPost();
    this.initArray();
  }

  getPost() {
    let query = {
      id: 1
    }
    this.posts_services.getPostsById(query).subscribe(res => {
      console.log(res);
      this.cards = res.posts
    })
  }

  createPost() {
   let query = {
      body: (
        {
          title: this.title_post,
          userId: 1,
          body: this.content_post,
        })
   }

   this.posts_services.addPosts(query).subscribe(res => {
   
   res.is_new_post = true;
   console.log(res);
    this.cards.unshift(res);

    this.title_post = '';
    this.content_post ='';
   })
  }

  initArray() {
    let new_cards = this.cards.map((card: any) => {
      if (card.id) {
        card['is_clicked_update'] = false;
        return card;
      }
    });
    this.cards = new_cards;
  }

  openUpdatePost(post: any) {
    this.update_content = post.title;
    post.is_clicked_update = true;
  }

  UpdatePost(post: any) {
    let query = {
      id: post.id,
      body: ({title: this.update_content})
    }

    
    if (post.is_new_post) {
      let new_array = this.cards.map((card: any) => {
        if (card.id == post.id) {
          card.title = this.update_content;
          return card;
        }
      })
    }else {
          this.posts_services.updatePosts(query).subscribe(res => {
      console.log(res);

      let new_array = this.cards.map((card: any) => {
        if (card.id == res.id) {
          card.title = res.title;
          return card;
        }
      })

    })
    }


    post.is_clicked_update = false;
  }

  deletePost(post:any) {

    if (post.is_new_post) {
      this.cards =  this.cards.filter((card: any) =>  card.id !== post.id)
     
    }else {
    this.posts_services.deletePosts({id: post.id}).subscribe(res => {
      console.log(res);
      
     this.cards =  this.cards.filter((card: any) =>  card.id !== res.id)
    })
  }
      }

}
interface CardI {
  id: number;
  title: string;
  body: string;
  is_clicked_update?: boolean;
  is_new_post?: boolean;
}