import axios from 'axios';

export const ownCloudAdapter = async (
  method: string,
  key: string,
  Body?: Buffer | ArrayBuffer,
) => {
  try {
    const response = await axios.request({
      method,
      url: `http://localhost:8080/remote.php/dav/files/prueba/${key}`,
      data: Body && Body,
      headers: {
        'Content-Type':
          method === 'MKCOL' ? 'application/json' : 'application/octet-stream',
        Authorization: `Basic ${Buffer.from('prueba:prueba2024').toString('base64')}`,
      },
    });

    return { status: response.status, statusText: response.statusText };
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return { status: 404, statusText: 'Not Found' };
    }
    throw error;
  }
};
