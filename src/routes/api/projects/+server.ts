import { json } from '@sveltejs/kit';

export async function GET() {
  const posts = await getProjects();
  return json(posts);
}

async function getProjects() {
  let posts = [];
  const paths = import.meta.glob('/src/projects/*.md', { eager: true });  
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
  posts = posts.sort((a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime());
  return posts;
}