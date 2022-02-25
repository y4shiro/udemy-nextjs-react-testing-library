import Link from 'next/link';

import { ChevronDoubleLeftIcon } from '@heroicons/react/solid';
import Layout from '../../components/Layout';
import { getAllPostIds, getPostData } from '../../lib/fetch';

import { GetStaticProps, GetStaticPaths } from 'next';
import { POST } from '../../types/Types';

const PostDetail: React.VFC<POST> = ({ id, title, body }) => {
  return (
    <Layout title={title}>
      <p className="m-4">
        {'ID : '}
        {id}
      </p>
      <p className="mb-4 text-xl font-bold">{title}</p>
      <p className="mx-10 mb-12">{body}</p>

      <Link href="/blog-page" passHref>
        <div className="flex cursor-pointer mt-12">
          <ChevronDoubleLeftIcon className="h-6 w-6 mr-3" />
          <a data-testid="back-blog">Back to blog-page</a>
        </div>
      </Link>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllPostIds();

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const post = await getPostData(ctx.params.id as string);

  return {
    props: {
      ...post,
    },
  };
};

export default PostDetail;
