import {
  FormControl,
  FormLabel,
  Input,
  InputProps,
  Text,
} from "@chakra-ui/react";

interface InputBasicProps extends InputProps {
  id: string;
  onvalue: (value: any) => void;
  value: any;
  Disable?: boolean;
  label: string;
  required?: boolean;
  boxWidth?: string;
}

export default function InputBasic({
  required = false,
  onvalue,
  Disable = false,
  id,
  label,

  ...props
}: InputBasicProps) {
  const handleOnChange = (e: any) => {
    const value = e;
    onvalue(value);
  };

  return (
    <FormControl w={props.boxWidth}>
      <FormLabel
        htmlFor={id}
        fontSize="sm"
        display="flex"
        alignItems="center"
        gap={1}
      >
        {label}
        {required && (
          <Text as="span" fontSize="xs" color="red">
            Obrigatório*
          </Text>
        )}
      </FormLabel>

      <Input
        {...props}
        id={id}
        isDisabled={Disable}
        border="1px solid #b8b8b8cc"
        onChange={(e) => handleOnChange(e.target.value)}
        onBlur={(e) => handleOnChange(e.target.value)}
      />
    </FormControl>
  );
}
