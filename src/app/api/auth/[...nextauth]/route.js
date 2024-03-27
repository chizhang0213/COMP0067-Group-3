import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'utils/axios';
import { v4 as uuidv4 } from 'uuid';


export let users = [
 {
   id: 1,
   name: 'Jone Doe',
   email: 'info@codedthemes.com',
   password: '123456'
 }
];


export const authOptions = {
 secret: process.env.NEXTAUTH_SECRET_KEY,
 providers: [
   CredentialsProvider({
     id: 'login',
     name: 'login',
     credentials: {
       email: { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter Email' },
       password: { name: 'password', label: 'Password', type: 'password', placeholder: 'Enter Password' }
     },
     async authorize(credentials) {
       try {
         const user = await axios.post('/api/account/login', {
           password: credentials?.password,
           email: credentials?.email
         });


         if (user) {
           user.data.user['accessToken'] = user.data.serviceToken;
           return user.data.user;
         }
       } catch (e) {
         const errorMessage = e?.response.data.message;
         throw new Error(errorMessage);
       }
     }
   }),
   CredentialsProvider({
     id: 'register',
     name: 'Register',
     credentials: {
       firstname: { name: 'firstname', label: 'Firstname', type: 'text', placeholder: 'Enter Firstname' },
       lastname: { name: 'lastname', label: 'Lastname', type: 'text', placeholder: 'Enter Lastname' },
       email: { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter Email' },
       company: { name: 'company', label: 'Company', type: 'text', placeholder: 'Enter Company' },
       password: { name: 'password', label: 'Password', type: 'password', placeholder: 'Enter Password' }
     },
     async authorize(credentials) {
       try {
         const user = await axios.post('/api/account/register', {
           firstName: credentials?.firstname,
           lastName: credentials?.lastname,
           company: credentials?.company,
           password: credentials?.password,
           email: credentials?.email
         });


         if (user) {
           users.push(user.data);
           return user.data;
         }
       } catch (e) {
         const errorMessage = e?.response.data.message;
         throw new Error(errorMessage);
       }
     }
   }),
   // UCL API provider configuration integrated within CredentialsProvider
   CredentialsProvider({
     id: "uclapi",
     name: "UCL API",
     credentials: {
       grant_type: { name: 'grant_type', type: 'text' }
     },
     async authorize(credentials) {
     },
     token: {
       url: "https://uclapi.com/oauth/token",
       async request(context) {
         const tokens = await makeTokenRequest(context);
         return { tokens };
       },
     },
     userinfo: {
       url: "https://uclapi.com/oauth/user/data",
       async request(context) {
         return await makeUserInfoRequest(context);
       },
     },
     clientId: process.env.UCL_API_CLIENT_ID,
     clientSecret: process.env.UCL_API_CLIENT_SECRET,
     async profile(profile) {
       const dbUser = await db.user.findUnique({
         where: { email: profile.email },
       });
       if (!dbUser) {
         return null;
       } else {
         return {
           id: uuidv4(),
           name: profile.full_name,
           email: profile.email,
         };
       }
     }
   })
 ],
 callbacks: {
   jwt: async ({ token, user, account }) => {
     if (user) {
       token.accessToken = user.accessToken;
       token.id = user.id;
       token.provider = account?.provider;
     }
     return token;
   },
   session: ({ session, token }) => {
     if (token) {
       session.id = token.id;
       session.provider = token.provider;
       session.token = token;
     }
     return session;
   }
 },
 session: {
   strategy: 'jwt',
   maxAge: Number(process.env.NEXT_APP_JWT_TIMEOUT)
 },
 jwt: {
   secret: process.env.NEXT_APP_JWT_SECRET
 },
 pages: {
   signIn: '/login',
   newUser: '/register'
 },
 // The functions makeTokenRequest and makeUserInfoRequest defined here
 functions: {
   makeTokenRequest: async (context) => {
     const response = await fetch(
       `${context.provider.token.url}?code=${context.params.code}&client_id=${context.client.client_id}&client_secret=${context.client.client_secret}`
     );
     const data = await response.json();
     return data;
   },
   makeUserInfoRequest: async (context) => {
     const response = await fetch(
       `${context.provider.userinfo.url}?client_secret=${context.client.client_secret}&token=${context.tokens.access_token}`
     );
     const data = await response.json();
     return data;
   }
 }
};


const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

