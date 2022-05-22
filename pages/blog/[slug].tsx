import fs from 'fs';
import matter from 'gray-matter';
import { marked } from 'marked';

type Props = {
  meta: any;
  html: string;
}

function Post({ meta, html }: Props) {
  return (
    <div dangerouslySetInnerHTML={{ __html: html }} />
  );
}

export async function getStaticPaths() {
  const paths = fs.readdirSync('./posts').map(file => ({
    params: { slug: file.replace('.md', '') }
  }));

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params: { slug } }: any) {
  const { data: meta, content } = matter(fs.readFileSync(`./posts/${slug}.md`).toString());
  const html = marked.parse(content);

  return {
    props: {
      meta,
      html
    }
  }
}

export default Post;
