import Link from 'next/dist/client/link';

import Layout from '../../components/Layout';
import { getAllPostIds, getPostData } from '../../lib/fetch';

import { GetStaticProps, GetStaticPaths } from 'next';
import { POST } from '../../types/types';
import { ChevronDoubleLeftIcon } from '@heroicons/react/solid';

const PostDetail: React.VFC<POST> = ({
  title,
  content,
  username,
  tags,
  created_at,
}) => {
  return (
    <Layout title={title}>
      <div>
        {tags &&
          tags.map((tag, i) => (
            <span
              key={tag.id}
              className={`px-2 py-2 m-1 text-white rounded ${
                i === 0
                  ? 'bg-blue-500'
                  : i === 1
                  ? 'bg-gray-500'
                  : i === 2
                  ? 'bg-green-500'
                  : i === 3
                  ? 'bg-yellow-500'
                  : i === 4
                  ? 'bg-indigo-500'
                  : 'bg-gray-300'
              }`}
            >
              {tag.name}
            </span>
          ))}
      </div>
      <p className="m-10 text-xl font-bold">{title}</p>
      <p className="mx-10 mb-12">{content}</p>
      <p>{created_at}</p>
      <p className="mt-3">{`by ${username}`}</p>

      <Link href="/">
        <div className="flex cursor-pointer mt-12">
          <ChevronDoubleLeftIcon className="w-6 h-6 mr-3" />
          <a data-testid="back-blog">Back to blog-page</a>
        </div>
      </Link>
    </Layout>
  );
};

export default PostDetail;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllPostIds();

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const post = await getPostData(ctx.params.id as string);

  return {
    props: {
      ...post,
    },
    revalidate: 3,
  };
};
