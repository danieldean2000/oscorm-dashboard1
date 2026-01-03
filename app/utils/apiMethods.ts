type RequestData = Record<string, any>;

export const post = async (url: string, data: RequestData) => {
  try {
    const response = await fetch("/api/proxy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url,        // backend URL
        method: "POST",
        body: data, // POST data
      }),
    });

    return await response.json();
  } catch (error: any) {
    console.error("POST API error:", error);
    throw error;
  }
};


export const get = async (url: string) => {
  try {
    const response = await fetch(`/api/proxy?url=${encodeURIComponent(url)}`);
    return await response.json();
  } catch (error: any) {
    console.error("GET API error:", error);
    throw error;
  }
};

export const put = async (url: string, data: RequestData) => {
  try {
    const response = await fetch("/api/proxy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url,        // backend URL
        method: "PUT",
        body: data, // PUT data
      }),
    });

    return await response.json();
  } catch (error: any) {
    console.error("PUT API error:", error);
    throw error;
  }
};

export const del = async (url: string) => {
  try {
    const response = await fetch("/api/proxy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url,        // backend URL
        method: "DELETE",
      }),
    });

    return await response.json();
  } catch (error: any) {
    console.error("DELETE API error:", error);
    throw error;
  }
};

export const postFormData = async (url: string, formData: FormData) => {
  try {
    // Create new FormData for proxy
    const proxyFormData = new FormData();
    proxyFormData.append("url", url);
    proxyFormData.append("method", "POST");
    
    // Append all form data fields
    for (const [key, value] of formData.entries()) {
      proxyFormData.append(key, value);
    }

    const response = await fetch("/api/proxy", {
      method: "POST",
      body: proxyFormData,
    });

    return await response.json();
  } catch (error: any) {
    console.error("POST FormData API error:", error);
    throw error;
  }
};

export const putFormData = async (url: string, formData: FormData) => {
  try {
    // Create new FormData for proxy
    const proxyFormData = new FormData();
    proxyFormData.append("url", url);
    proxyFormData.append("method", "PUT");
    
    // Append all form data fields
    for (const [key, value] of formData.entries()) {
      proxyFormData.append(key, value);
    }

    const response = await fetch("/api/proxy", {
      method: "POST",
      body: proxyFormData,
    });

    return await response.json();
  } catch (error: any) {
    console.error("PUT FormData API error:", error);
    throw error;
  }
};

export const patch = async (url: string, data: RequestData) => {
  try {
    const response = await fetch("/api/proxy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url,        // backend URL
        method: "PATCH",
        body: data, // PATCH data
      }),
    });

    return await response.json();
  } catch (error: any) {
    console.error("PATCH API error:", error);
    throw error;
  }
};