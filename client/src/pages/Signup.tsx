import { createRef, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { generateNewAvatar } from '../utils/generateAvatar';
import {
  METHOD,
  ModifiedSignupObject,
  ResponseType,
  SignupObject,
} from '../types';
import { makeRequest } from '../utils';
import { Link, useOutletContext } from 'react-router-dom';

export default function Signup() {
  const [formData, setFormData] = useState<SignupObject>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    seed: '',
    stripe: '',
    backgroundColor: '',
  });
  const updateFormData = (updatedObject: ModifiedSignupObject) => {
    setFormData({ ...formData, ...updatedObject });
  };
  const [showPassword, setshowPassword] = useState(false);
  const { addError } = useOutletContext<any>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const nextButtonRef = createRef<HTMLButtonElement>();
  const avatarCallback = () => {
    generateNewAvatar().then(({ seed, stripe, randomColor, avatar }) => {
      updateFormData({ seed, stripe, backgroundColor: randomColor });
    });
  };
  useEffect(() => {
    avatarCallback();
  }, []);

  const formSubmit = (data: ModifiedSignupObject, e: any) => {
    e.preventDefault();
    //API CALL
  };
  const onError = (errors: any, e: any) => {
    e.preventDefault();
    console.log(errors);
  };

  return (
    <div className="grid w-[500px] bg-gray-50 dark:bg-gray-400 rounded-md shadow-[rgba(0,_0,_0,_0.16)_0px_1px_4px] place-self-center">
      <div className="px-[30px] pt-[30px] grid grid-flow-row gap-[5px]">
        <div className="font-extrabold text-black text-xl">
          Signup to Side-Chat
        </div>
        <div className="grid grid-cols-[auto_1fr] gap-1 text-sm">
          <div className="text-[#4444449e] font-thin">
            Already have an account?
          </div>
          <Link to={'/login'}>
            <div className="text-[#1C64F2] font-medium">Log in.</div>
          </Link>
        </div>
      </div>
      <form
        className="grid mx-[20px] my-[20px]"
        onSubmit={handleSubmit(formSubmit, onError)}
      >
        <div className="grid">
          <div className="grid grid-flow-row lg:grid-flow-col lg:gap-[15px]">
            <div className="grid grid-rows-[auto_1fr] gap-[7px] mb-[10px]">
              <div className="grid text-gray-700 font-bold text-sm">
                First Name
              </div>
              <input
                type="text"
                id="firstName"
                {...register('firstName', {
                  required: true,
                })}
                placeholder="John"
                value={formData.firstName}
                onChange={(e) => {
                  updateFormData({ firstName: e.target.value });
                }}
                spellCheck={false}
                className={`text-sm  rounded-md border dark:border dark:border-gray-300 bg-[#F9FAFB] dark:bg-gray-300 outline-[#1C64F2] dark:outline-purple-900 p-[10px] ${
                  errors.firstName ? 'border-red-700' : ''
                }`}
              />
            </div>
            <div className="grid grid-rows-[auto_1fr] gap-[7px] mb-[10px]">
              <div className="grid text-gray-700 font-bold text-sm">
                Last Name
              </div>
              <input
                type="text"
                id="lastName"
                {...register('lastName', {
                  required: true,
                })}
                placeholder="Doe"
                value={formData.lastName}
                onChange={(e) => {
                  updateFormData({ lastName: e.target.value });
                }}
                spellCheck={false}
                className={`text-sm  rounded-md border dark:border dark:border-gray-300 bg-[#F9FAFB] dark:bg-gray-300 outline-[#1C64F2] dark:outline-purple-900 p-[10px] ${
                  errors.lastName ? 'border-red-700' : ''
                }`}
              />
            </div>
          </div>
          <div className="grid grid-rows-[auto_1fr] gap-[7px] mb-[10px]">
            <div className="grid grid-cols-[auto_1fr] gap-[5px] text-gray-700 font-bold text-sm">
              Email
            </div>
            <div className="grid grid-cols-[1fr_auto]">
              <input
                type="email"
                id="email"
                {...register('email', {
                  required: true,
                })}
                placeholder="johndoe@gmail.com"
                value={formData.email}
                onChange={(e) => {
                  updateFormData({ email: e.target.value });
                }}
                spellCheck={false}
                className={`text-sm  rounded-md border dark:border dark:border-gray-300 bg-[#F9FAFB] dark:bg-gray-300 outline-[#1C64F2] dark:outline-purple-900 p-[10px] ${
                  errors.email ? 'border-red-700' : ''
                }`}
              />
            </div>
          </div>
          {/* {otpURI != '' ? (
            <div className="grid grid-rows-[auto_1fr] gap-[7px] mb-[10px]">
              <div className="grid grid-cols-[auto_1fr] gap-[5px] text-gray-700 font-bold text-sm">
                Enter OTP
              </div>
              <div className="grid grid-cols-[auto_1fr]">
                <input
                  type="text"
                  id="otp"
                  placeholder="XXXXXX"
                  value={userOtp}
                  onChange={(e) => {
                    setUserOtp(e.target.value);
                  }}
                  spellCheck={false}
                  className={`text-sm w-[100px] text-center rounded-md border bg-[#F9FAFB] dark:bg-gray-300 outline-[#1C64F2] dark:outline-purple-900 p-[10px]`}
                />
                <div className="w-[80px] grid place-content-center ">
                  <SendOTPButton
                    onClick={verifyUserOTP}
                    disabled={!verifyOTP()}
                    text="Verify"
                    className={`w-fit h-fit ${
                      verifyOTP()
                        ? 'text-green-500 cursor-pointer'
                        : 'text-gray-400 cursor-not-allowed'
                    }`}
                  />
                </div>
              </div>
            </div>
          ) : (
            ''
          )} */}
          {/* <div className="grid grid-rows-[auto_1fr] gap-[7px] mb-[10px]">
                <div className="grid grid-cols-[auto_1fr] gap-[5px] text-gray-700 font-bold text-sm">
                    Phone Number
                    <div className="grid group relative border border-[#1C64F2] text-[#1C64F2] cursor-pointer rounded-full w-[17px] h-[17px] text-xs self-center place-content-center">
                        ?
                        <FormInfo className="left-[25px] -top-[300%] w-[170px] lg:w-[300px]" title="Why we require your phone?" description="We require your phone to provide alerts about your scheduled meetings on WhatsApp."/>
                    </div>
                </div>
                <div className="grid grid-cols-[1fr_auto]">
                    <input type="text" name="phno" id="phno" placeholder="1234567890" required onBlur={(e)=>{alterRedBorderToInvalidPhone(e)}} spellCheck={false} className="border rounded-md bg-[#F9FAFB] dark:bg-gray-300 outline-[#1C64F2] dark:outline-purple-900 p-[10px]" />
                </div>
            </div> */}
          <div className="grid grid-rows-[auto_1fr] gap-[7px] mb-[10px]">
            <div className="grid text-gray-700 font-bold text-sm">Password</div>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="•••••••••"
              {...register('password', {
                required: true,
                pattern: {
                  value: /[A-Za-z0-9](?!.*\s).{8,}$/,
                  message: 'Required',
                },
              })}
              spellCheck={false}
              value={formData.password}
              onChange={(e) => {
                updateFormData({ password: e.target.value });
              }}
              className={`text-sm  rounded-md border dark:border dark:border-gray-300 bg-[#F9FAFB] dark:bg-gray-300 outline-[#1C64F2] dark:outline-purple-900 p-[10px] ${
                errors.password ? 'border-red-700' : ''
              }`}
            />
          </div>
          <div className="grid grid-flow-col mb-[10px]">
            <div className="grid grid-cols-[auto_1fr] gap-[8px] place-self-start">
              <input
                type="checkbox"
                name="showpass"
                checked={showPassword}
                onChange={() => {
                  setshowPassword(!showPassword);
                }}
                id="showpass"
                className=" outline-[#1C64F2] dark:outline-purple-900 border dark:border dark:border-gray-300 border-gray-300 bg-[#F9FAFB] dark:bg-gray-300 w-[15px] rounded-md"
              />
              <div className="text-sm text-black  font-medium">
                Show Password
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-flow-col mx-[20px] mb-[20px]">
          <button
            ref={nextButtonRef}
            className={`grid cursor-pointer disabled:bg-[#698dd4] disabled:cursor-default hover:bg-[#1654cf] place-self-end font-extrabold px-[40px] place-content-center py-[10px] text-white bg-[#1C64F2] dark:bg-purple-900 w-[120px] rounded-md`}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
