import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
  VStack,
} from "@chakra-ui/react";

function useOutsideClick(ref,callback) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref,callback]);
}

const ContactForm = () => {
  const alertRef = useRef();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({mode: "onChange"});

  const [alert, setAlert] = useState({
    show: false,
    status: "error",
    message: "",
  });

  const onSubmit = async (data) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`Server responded with status code ${res.status}`);
      }

      const result = await res.json();

      if (result.success) {
        reset();
        setAlert({ show: true, status: "success", message: result.message });
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error(error);
      setAlert({ show: true, status: "error", message: error.message });
    }
  };

  useOutsideClick(alertRef, () => {
    setAlert({ show: false, status: '', message: '' });
  });

  return (
    <Box p={4} maxW="sm" mx="auto">
      {alert.show && (
        <Alert status={alert.status} mb={4} ref={alertRef}>
          <AlertIcon />
          {alert.message}
        </Alert>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4}>
          <FormControl isInvalid={errors.name}>
            <FormLabel htmlFor="name" fontSize="lg">
              Name
            </FormLabel>
            <Input
              type="text"
              id="name"
              name="name"
              {...register("name", { required: "Name is required" })}
              size="lg"
              fontSize="lg"
            />
            <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.email}>
            <FormLabel htmlFor="email" fontSize="lg">
              Email
            </FormLabel>
            <Input
              type="email"
              id="email"
              name="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Email is invalid",
                },
              })}
              size="lg"
              fontSize="lg"
            />
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.message}>
            <FormLabel htmlFor="message" fontSize="lg">
              Message
            </FormLabel>
            <Textarea
              id="message"
              {...register("message", { required: "Message is required" })}
              size="lg"
              fontSize="lg"
            />
            <FormErrorMessage>{errors.message?.message}</FormErrorMessage>
          </FormControl>

          <Button type="submit" colorScheme="blue" size="lg" isDisabled={!isValid}>
            Send
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default ContactForm;
