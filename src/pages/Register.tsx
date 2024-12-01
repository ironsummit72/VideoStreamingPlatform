import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { RegisterFormSchema } from "@/validations/form.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { postRegister } from "@/api/QueryFunctions";
import { CustomAxiosError } from "@/types/axios/axios";
function Register() {
  const { mutate } = useMutation({
    mutationKey: ["register"],
    mutationFn: (data: z.infer<typeof RegisterFormSchema>) =>postRegister(data),
    onSuccess(data) {
      console.log("on success ", data);
      toast({
        title: "success",
        description: data.message,
      });
    },
    onError(error:CustomAxiosError) {
      console.error(error);
      toast({
        title: "error",
        description: error.response.data.message,
        variant: "destructive",
      })
    }
  });
  const { toast } = useToast();
  const form = useForm<z.infer<typeof RegisterFormSchema>>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      username: "",
      email: "",
      firstname: "",
      lastname: "",
      password: "",
      confirmpassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof RegisterFormSchema>) {
    mutate(values);
  }
  return (
    <div className="w-full h-[80%] flex items-center justify-center">
      <Helmet>
        <title>Register</title>
      </Helmet>
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Login With Username</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your username" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter your username the which you used to register
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter your email address which you used to register
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Firstname</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Firstname" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lastname</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Lastname" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmpassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Confirm your password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full" type="submit">
                Login
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <span className="text-gray-500">
            {" "}
           Already have an account?{" "}
            <Link
              className="hover:underline text-blue-500 font-bold"
              to="/login"
            >
              Login
            </Link>
          </span>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Register;
