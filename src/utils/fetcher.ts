import axios, { Method } from 'axios';

interface Fetcher {
  url: string;
  method: Method;
  body?: any;
  params?: any;
}

const fetcher = async ({
  url,
  method,
  body,
  params,
}: Fetcher): Promise<any> => {
  try {
    const response = await axios({
      url,
      method,
      data: body,
      params: params,
    });
    return { data: response.data, error: null };
  } catch (err) {
    return { data: null, error: err };
  }
};

export default fetcher;
