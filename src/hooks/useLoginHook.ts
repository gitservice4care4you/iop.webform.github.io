// 'use client'
// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';

// interface LoginData {
//     email: string;
//     password: string;
// }

// interface LoginResponse {
//     token: string;
//     // Add any other response data you expect from the login API
// }

// const useLogin = () => {
//     const [isLogin, setIsLogin] = useState<boolean>(false);
//     const router = useRouter();
//     const [isLoading, setIsLoading] = useState<boolean>(false);
//     const [error, setError] = useState<string | null>(null);

//     const login = async (loginData: LoginData) => {
//         setIsLoading(true);
//         setError(null);

//         try {
//             const response = await fetch('/api/login', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(loginData),
//             });

//             if (!response.ok) {
//                 setIsLogin(true);
//                 throw new Error('Failed to login');
//             }

//             const data: LoginResponse = await response.json();
//             // Save the token or perform any other necessary actions
//             localStorage.setItem('token', data.token);
//             router.push('/dashboard'); // Redirect to the dashboard page
//         } catch (error) {
//             setError('An error occurred during login');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     useEffect(() => {
//         // Check if the user is already logged in
//         const token = localStorage.getItem('token');
//         if (token) {
//             router.push('/dashboard'); // Redirect to the dashboard page if the user is already logged in
//         }
//     }, [router]);

//     return { isLoading, isLogin, error, login };
// };

// export default useLogin;