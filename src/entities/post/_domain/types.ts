export type PostType = {
  id: string;
  title: string;
  slug: string;
  metadata: {
    categories: any;
    image: {
      imgix_url: string;
    };
    content: string;
    author: {
      title: string;
      metadata: {
        image: {
          imgix_url: string;
        };
      };
    };
    published_date: string;
  };
};

export type PostCategory = {
  id:string;
  title: string;
  slug: string;  
}