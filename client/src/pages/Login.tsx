import { useForm } from 'react-hook-form';
import { useAuth } from '../context/auth-context';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { setToken } from '../axiosDefault';
import { LoginBody, METHOD, ResponseType } from '../types';
import { makeRequest } from '../utils/requestWrap';
import InputSubmit from '../components/Buttons/InputSubmit';
import { useEffect } from 'react';
export default function Login() {
  const { user, setUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { addError } = useOutletContext<any>();
  const navigate = useNavigate();
  const { setButtonLoading, SubmitButton } = InputSubmit();
  const formSubmit = async (data: any, e: any) => {
    e.preventDefault();
    const {
      response,
      displaySuccessMessage,
    }: {
      response: ResponseType<LoginBody> | null;
      displaySuccessMessage: () => void;
    } = await makeRequest(
      METHOD.POST,
      'auth/login',
      data,
      {},
      addError,
      setButtonLoading
    );
    if (response.success) {
      if (setUser) {
        if (response.data) {
          setUser(response.data.body.token);
          setToken(response.data.body.token);
          setButtonLoading(false);
        }
        navigate('/h');
      }
    }
  };
  const onError = (errors: any, e: any) => {
    e.preventDefault();
    console.log(errors);
  };
  useEffect(() => {
    addError({ data: { message: 'This is a login error' }, success: true });
  }, []);
  return (
    <div className="grid place-self-center w-[400px]">
      <div className="grid w-[90%] lg:w-full h-fit lg:self-center lg:place-self-auto place-self-center grid-flow-row bg-white dark:bg-slate-300 rounded-md shadow-[rgba(0,_0,_0,_0.16)_0px_1px_4px]">
        <div className="px-[30px] pt-[30px] grid grid-flow-row gap-[5px]">
          <div className="font-extrabold text-black text-xl">
            Welcome back to Side-Chat
          </div>
          <div className="grid grid-cols-[auto_1fr] gap-1 text-sm">
            <div className="text-[#4444449e] font-thin">
              Don't have an account?
            </div>
            <Link to={'/signup'}>
              <div className="text-[#1C64F2] dark:text-purple-900 font-medium">
                Sign up.
              </div>
            </Link>
          </div>
        </div>
        <div className="grid grid-flow-row p-[30px]">
          <form
            onSubmit={handleSubmit(formSubmit, onError)}
            className="grid grid-flow-row"
          >
            <div className="grid grid-rows-[auto_1fr] gap-[5px] pb-[20px]">
              <div className="font-medium tracking-wider text-sm leading-5 text-black">
                Email
              </div>
              <input
                type="email"
                {...register('email', {
                  required: true,
                })}
                className={`text-sm outline-[#1C64F2] dark:outline-purple-900 border border-gray-300 dark:border dark:border-gray-300 bg-[#F9FAFB] rounded-md p-[10px] ${
                  errors.email ? 'border-red-700' : ''
                }`}
                id="email"
                placeholder="Enter your email"
              />
            </div>
            <div className="grid grid-rows-[auto_1fr] gap-[5px] pb-[20px]">
              <div className="font-medium tracking-wider text-sm leading-5 text-black">
                Password
              </div>
              <input
                type="password"
                {...register('password', {
                  required: true,
                })}
                className={`text-sm outline-[#1C64F2] dark:outline-purple-900 border dark:border dark:border-gray-300 border-gray-300 bg-[#F9FAFB] rounded-md p-[10px] ${
                  errors.password ? 'border-red-700' : ''
                }`}
                placeholder="•••••••"
              />
            </div>
            <div className="grid grid-flow-col gap-[5px] pb-[20px]">
              <div className="grid grid-cols-[auto_1fr] gap-[9px] place-content-start">
                <input
                  type="checkbox"
                  name="remember"
                  id="remember"
                  className="border border-gray-300 bg-[#F9FAFB] w-[15px] rounded-md"
                />
                <div className="tracking-wide text-gray-500 text-sm">
                  Remember me
                </div>
              </div>
              <div className="grid place-content-end text-[#1C64F2] dark:text-purple-900 text-sm font-semibold">
                Forgot password?
              </div>
            </div>
            <SubmitButton
              className="grid grid-flow-col py-[10px] place-content-center font-semibold text-sm rounded-md cursor-pointer hover:bg-[#164fc1] text-white bg-[#1C64F2] dark:bg-purple-900 disabled:bg-[#5283e7] disabled:cursor-not-allowed"
              text="Sign in to your account"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
