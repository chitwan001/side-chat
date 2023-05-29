import { useState } from 'react';
import { LoginBody, METHOD, ResponseType, userType } from '../../types';
import { makeRequest } from '../../utils';
import { useOutletContext } from 'react-router-dom';

export default function NewChat() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState<userType[]>([]);
  const getResults = async (searchTerm: string) => {
    setSearchTerm(searchTerm);
    const {
      response,
      displaySuccessMessage,
    }: {
      response: ResponseType<userType[]> | null;
      displaySuccessMessage: () => void;
    } = await makeRequest(
      METHOD.POST,
      'user/getUserByName',
      {
        name: searchTerm,
      },
      {},
      null,
      null
    );
    console.log(response);

    if (response.success === true) {
      setSearchResult(response.data?.body || []);
    }
  };
  return (
    <div className="top-0 left-0 grid absolute w-full h-full bg-gray-400/30">
      <div className="grid grid-rows-[auto_1fr] place-self-center w-[400px] h-[300px] bg-white">
        <div className="grid h-[80px] p-[10px] font-bold text-lg place-content-center">
          New Chat
        </div>
        <div className="grid w-full  rounded-l-lg rounded-r-lg">
          <div className="grid gap-[2px] w-full h-fit max-h-[200px]">
            <label className="mx-3">
              <input
                onChange={(e) => getResults(e.target.value)}
                className=" p-4 bg-gray-100  transition duration-200 focus:outline-none focus:ring-2 w-full"
                placeholder="Search by email..."
              />
            </label>
            {searchTerm !== '' ? (
              <div className="grid bg-gray-100 mx-3 max-h-full overflow-y-scroll">
                <div className="grid gap-[5px] px-3 h-fit">
                  {searchResult.length > 0 ? (
                    searchResult.map((user, id) => (
                      <div className="grid grid-cols-[auto_1fr] gap-[10px]">
                        <div className="h-[30px] w-[30px] bg-gray-100 rounded-full overflow-hidden place-content-center"></div>
                        <div className="grid">
                          <div className="grid m-[20px]">
                            {user?.firstName + ' ' + user?.lastName}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="grid place-content-center p-[20px] text-sm text-gray-500 font-bold">
                      User not found please check entered mail
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
