import { useState, useEffect } from 'react';
import Link from 'next/link';
import Cookies from 'universal-cookie';
import { LogoutIcon, TrashIcon } from '@heroicons/react/solid';

import Layout from '../components/Layout';
import { getAllPostsData } from '../lib/fetch';

import { GetStaticProps } from 'next';
import { POST } from '../types/types';

const cookie = new Cookies();

interface STATICPROPS {
  posts: POST[];
}

const BlogPage: React.VFC<STATICPROPS> = ({ posts }) => {
  const [hasToken, setHasToken] = useState(false);

  const logout = () => {
    cookie.remove('access_token');
    setHasToken(false);
  };

  const deletePost = async (id: number) => {
    await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}/delete-blog/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `JWT ${cookie.get('access_token')}`,
      },
    }).then((res) => {
      if (res.status === 401) {
        alert('JWT Token not valid');
      }
    });
  };
  useEffect(() => {
    if (cookie.get('access_token')) {
      setHasToken(true);
    }
  }, []);

  return (
    <Layout title="Blog">
      <p className="text-4xl mb-10">blog page</p>
      <ul>
        {posts &&
          posts.map((post) => (
            <li key={post.id}>
              <Link href={`/posts/${post.id}`}>
                <a className="cursor-pointer border-b border-gray-500 hover:bg-gray-300">
                  {post.title}
                </a>
              </Link>
              {hasToken && (
                <TrashIcon
                  className="w-6 h-6 ml-10 float-right cursor-pointer"
                  onClick={() => deletePost(post.id)}
                  data-testid={`btn-${post.id}`}
                />
              )}
            </li>
          ))}
      </ul>

      {hasToken && (
        <LogoutIcon
          className="w-6 h-6 mt-10 cursor-pointer"
          onClick={logout}
          data-testid="logout-icon"
        />
      )}
    </Layout>
  );
};

export default BlogPage;

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getAllPostsData();

  return {
    props: { posts },
    revalidate: 3,
  };
};
