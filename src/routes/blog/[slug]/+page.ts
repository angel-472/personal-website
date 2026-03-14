import { error } from '@sveltejs/kit';

export async function load({ params }){
  const postFiles = import.meta.glob('/src/posts/*.md', { eager: true });
  const postFile = postFiles["/src/posts/" + params.slug + ".md"];
  if (!postFile) {
    throw error(404, 'Post not found');
  }
  return {
    post: postFile
  };
}