const BASE_URL = "https://react-mini-projects-api.classbon.com";

export const httpservicefetch = {
  get: async (endpoint: string) => {
    const response = await fetch(endpoint, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    return response.json();
  },
  post: async (endpoint: string, data: any) => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    return response.json();
  },
};

// get site data from shopfa api
export const getSystemInfo = async () => {
  const response = await httpservicefetch.get(
    "https://theme-90002.shopfa.com/api/system/info"
  );
  return response;
};
