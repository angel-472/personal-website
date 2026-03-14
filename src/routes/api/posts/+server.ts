import { json } from '@sveltejs/kit';

export async function GET() {
  const posts = await getPosts();
  return json(posts);
}

async function getPosts() {
  let posts = [];
  const paths = import.meta.glob('/src/posts/*.md', { eager: true });
  for (const path in paths) {
    const post: any = paths[path];
    const metadata = post.metadata;
    if(metadata.published){
      posts.push({
        ...metadata,
        slug: path.split('/').at(-1)?.replace('.md', '')
      });
    }
  }
  posts = posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return posts;
}