import { AxiosError } from "axios";
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { destroyCookie, parseCookies } from "nookies";
import { signOut } from "../contexts/AuthContext";

export function withSSRAuth<P = unknown>(fn: GetServerSideProps<P>) {
  return async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    let cookies = parseCookies(context);
    
    if (!cookies['odonto.token']) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        }
      }
    }
    try {
      return await fn(context)
    } catch (err) {
      destroyCookie(context, 'odonto.token')

      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      }
    }
  }
}

