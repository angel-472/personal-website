import { error } from '@sveltejs/kit';

export async function load({ params }){
  if (!params.slug || !/^[a-z0-9\-_]+$/i.test(params.slug)) {
    throw error(400, 'Invalid slug');
  }
  const postFiles = import.meta.glob('/src/projects/*.md', { eager: true });
  const postFile = postFiles["/src/projects/" + params.slug + ".md"];
  if (!postFile) {
    throw error(404, 'Post not found');
  }
  return {
    post: postFile
  };
}