export const isValid = (props: { [key: string]: string }) => {
  for (const key in props) {
    if (props[key].length < 5) {
      return true;
    }
  }
};
