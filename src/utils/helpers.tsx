interface Helper {
  test: (body: any) => string;
}

const helpers: Helper = {
  test: (body: any): string => {
    console.log("Received argument:", body);
    const result = "ABC";
    console.log("Returning result:", result);
    return result;
  },
};

export default helpers;
