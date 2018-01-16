class Http {
  // HTTP REQUEST
  async get(url) {
    const response = await fetch(url);
    let headers = response.headers.get("Content-Type");
    const result =
      headers === "text/html; charset=utf-8"
        ? await response.text()
        : await response.json();
    return result;
  }

  async post(url, data) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept:
          "application/json, text/plain, application/x-www-form-urlencoded */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    let headers = response.headers.get("Content-Type");
    const result =
      headers === "text/html; charset=utf-8"
        ? await response.text()
        : await response.json();
    return result;
  }

  async put(url, data) {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        Accept:
          "application/json, text/plain, application/x-www-form-urlencoded */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    let headers = response.headers.get("Content-Type");
    const result =
      headers === "text/html; charset=utf-8"
        ? await response.text()
        : await response.json();
    return result;
  }

  async delete(url) {
    const response = await fetch(url, {
      method: "DELETE",
      headers: { "Content-type": "application/json" }
    });
    const result = "Deleted!";
    return result;
  }
}

export const http = new Http();
