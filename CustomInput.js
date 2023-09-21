import { Text, Input, Button } from "native-base";

export default function CustomInput({ text }) {
  return (
    <>
      <Text>{text}</Text>
      <Input mx="3" placeholder="Input" w="100%" />
      <Button>Click me</Button>
    </>
  );
}
