const register = async (username, email, password) => {
  const response = await fetch('http://localhost:5000/api/register', {
    method: 'POST',
    body: JSON.stringify({ username, email, password }),
    headers: {
      'Content-Type': 'application/json',
      mode: 'cors',
    },
  });
  return await response.json();
};

const login = async (username, email, password) => {
  const response = await fetch('http://localhost:5000/api/login', {
    method: 'POST',
    body: JSON.stringify({ username, email, password }),
    headers: {
      'Content-Type': 'application/json',
      mode: 'cors',
    },
  });

  return await response.json();
};

const fetchMessages = async () => {
  const response = await fetch('http://localhost:5000/api/messages');
  return await response.json();
};

const fetchMessage = async (messageId) => {
  const response = await fetch(
    `http://localhost:5000/api/messages/${messageId}`,
  );
  return await response.json();
};

const token =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Inp6b2dyZGlhbm8iLCJlbWFpbCI6ImFobWVkYWxpcmV6azUwNTBAZ21haWwuY29tIiwidXNlcklkIjoiNjIxY2U4YTVmNGIwNWZjMTMzOGFlZWY2In0.twryDqVeQMqkxHT_GMK85x5UnW-l-BxZTpkXMxPsHU0ZPpN7i_gPZLCdS-kWNgC_HdQqium9jOk4TBad209ugsXXe8163TK8QikvJCyjJXRI_IqpY8vhnMaRroJVAClgguMwF7KxjG79Swt5q8fIZxex6fnh1XTZP0_XTJltwqBtXZE0XDi3VC6kXVCrPnQ_L-my-4g3TdzkOdw083ZJ7iD4rV3fY6Ys_J5qYKWQeql1kf_siMKDePe7YgnjNpAwMMiAi2Ef11lR3nGM9d5zV6waMiaT3n8JRLMr9aAuHOxOJ2QABCI8aE-Mbt0PXW0AWiYrrjcC0T9YMaAUb2TNX76x4PmfrTPEjLi6cJhYcYdkXazpfL45zxomHtEAW9wsUmbaIuIzEFDhj3S3n0v-aFNVb5FOASLDJ6eHm_ynVDtipFPR7kU-pbFtY2jr2FJFhmZt3XXe0ty7Z934e5bnKP5N-xV7aXU_wWSNsw8Cp9OvdywvXIPFX1xJmMTBB-LHD-zc10L4bSz9MVkoOOHvovdNJ-9PvGqYWxP1jEjL8vYa1Gsg3XqanDtT-hEOz7vgSmHZ0Lh9Jepw-hvmPuu3odnZVeaegNijcFw86nI2oTsPrMx_g1N-8YMWEZh_hdSkCSLxnpTot93n8-ijkfYugE-DA5MPr8-jKrgRACowrxg';

const createMessage = async (username, content) => {
  const response = await fetch('http://localhost:5000/api/messages', {
    method: 'POST',
    body: JSON.stringify({ username, content }),
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      mode: 'cors',
    },
  });
  return await response.json();
};

const updateMessage = async (messageId, username, content) => {
  const response = await fetch(
    `http://localhost:5000/api/messages/${messageId}`,
    {
      method: 'PUT',
      body: JSON.stringify({ username, content }),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        mode: 'cors',
      },
    },
  );
  return await response.json();
};

const deleteMessage = async (messageId, username) => {
  const response = await fetch(
    `http://localhost:5000/api/messages/${messageId}`,
    {
      method: 'DELETE',
      body: JSON.stringify({ username }),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        mode: 'cors',
      },
    },
  );
  return await response.json();
};

const guestBookApi = {
  register,
  login,
  fetchMessages,
  fetchMessage,
  createMessage,
  deleteMessage,
  updateMessage,
};

export default guestBookApi;
