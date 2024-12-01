import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import {
  loginFormSchemaEmail,
  loginFormSchemaUsername,
} from "@/validations/form.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { postLogin } from "@/api/QueryFunctions";
import { toast } from "@/hooks/use-toast";
import { CustomAxiosError } from "@/types/axios/axios";

function Login() {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Helmet>
        <title>Login</title>
      </Helmet>
      <Tabs defaultValue="username" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="username">Username</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
        </TabsList>
        <TabsContent value="username">
          <LoginWithUserName />
        </TabsContent>
        <TabsContent value="email">
          <LoginWithEmail />
        </TabsContent>
      </Tabs>
    </div>
  );
}
export default Login;

function LoginWithUserName() {
  const{mutate}=useMutation({
    mutationFn:(data:z.infer<typeof loginFormSchemaUsername>)=>postLogin(data),
    mutationKey:["loginwithemail"],
    onSuccess:(data)=>{
      toast({
        title:"success",
        description:data.message
      })
    },
    onError(error:CustomAxiosError){
      toast({
        title:"error",
        description:error.response.data.message,
        variant:"destructive"
      })
    }
  })
  const form = useForm<z.infer<typeof loginFormSchemaUsername>>({
    resolver: zodResolver(loginFormSchemaUsername),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  function onSubmit(values: z.infer<typeof loginFormSchemaUsername>) {
     mutate(values);
  }

  return (
    <Card>
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
            <Button className="w-full" type="submit">
              Login
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <span className="text-gray-500">
          {" "}
          Don&apos;t have an account?{" "}
          <Link
            className="hover:underline text-blue-500 font-bold"
            to="/register"
          >
            Register
          </Link>
        </span>
      </CardFooter>
    </Card>
  );
}
function LoginWithEmail() {
  const{mutate}=useMutation({
    mutationFn:(data:z.infer<typeof loginFormSchemaEmail>)=>postLogin(data),
    mutationKey:["loginwithemail"],
    onSuccess:(data)=>{
      toast({
        title:"success",
        description:data.message
      })
    },
    onError(error:CustomAxiosError){
      toast({
        title:"error",
        description:error.response.data.message,
        variant:"destructive"
      })
    }
  })
  const form = useForm<z.infer<typeof loginFormSchemaEmail>>({
    resolver: zodResolver(loginFormSchemaEmail),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  function onSubmit(values: z.infer<typeof loginFormSchemaEmail>) {
    mutate(values);
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Login With Email</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
            
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter your email" {...field} />
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
            <Button className="w-full" type="submit">
              Login
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <span className="text-gray-500">
          {" "}
          Don&apos;t have an account?{" "}
          <Link
            className="hover:underline text-blue-500 font-bold"
            to="/register"
          >
            Register
          </Link>
        </span>
      </CardFooter>
    </Card>
  );
}
