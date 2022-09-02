import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post-users',
  templateUrl: './post-users.component.html',
  styleUrls: ['./post-users.component.scss']
})
export class PostUsersComponent implements OnInit {
  content_post = '';
  update_content = '';
  edit_content = false;
  cards: CardI[] = [

  ];


  constructor( private posts_services: PostService,) {
  
   }

  ngOnInit(): void {
    this.getAllPosts();
    this.initArray();
  }

  getAllPosts() {
    this.posts_services.getAllPosts().subscribe(res => {
      console.log(res.posts);
      this.cards = res.posts;
      
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

    this.posts_services.updatePosts(query).subscribe(res => {
      console.log(res);

      let new_array = this.cards.map((card: any) => {
        if (card.id == res.id) {
          card.title = res.title;
          return card;
        }
      })

    })
    post.is_clicked_update = false;
  }

  deletePost(post:any) {
this.posts_services.deletePosts({id: post.id}).subscribe(res => {
  console.log(res);
  
 this.cards =  this.cards.filter((card: any) =>  card.id !== res.id)
})
  }


}

interface CardI {
  id: number;
  title: string;
  body: string;
  is_clicked_update?: boolean;
}