import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from './prisma';

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: 'test',
  },
  providers: [
    CredentialsProvider({
      // 登录按钮显示 (e.g. "Sign in with Credentials")
      name: 'Sign in',
      // credentials 用于配置登录页面的表单
      credentials: {
        phone: {
          label: '手机号',
          type: 'text',
          placeholder: '请输入手机号',
        },
        password: {
          label: '密码',
          type: 'password',
          placeholder: '请输入密码',
        },
      },
      async authorize(credentials) {
        console.log(credentials);
        const maybeUser = await prisma.user.findFirst({
          where: {
            phone: credentials?.phone,
          },
        });

        if (maybeUser) {
          // 返回的对象将保存才JWT 的用户属性中
          return maybeUser as any;
        } else {
          // 如果返回null，则会显示一个错误，建议用户检查其详细信息。
          return null;
          // 跳转到错误页面，并且携带错误信息 http://localhost:3000/api/auth/error?error=用户名或密码错误
          //throw new Error("用户名或密码错误");
        }
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          randomKey: token.randomKey,
        },
      };
    },
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
          randomKey: u.randomKey,
        };
      }
      return token;
    },
  },
};
