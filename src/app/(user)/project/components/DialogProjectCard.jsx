"use client";

import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  submitConnectionAction,
  testConnectionAction,
} from "@/services/projectAction";
import { useToast } from "@/hooks/use-toast";
import { PlusIcon } from "lucide-react";

const formSchema = z.object({
  connectionName: z.string().min(1, "Connection name is required"),
  databaseType: z.enum(["sqlserver", "postgresql", "mysql"], {
    required_error: "Please select a database type",
  }),
  host: z.string().min(1, "Host is required"),
  port: z.string().regex(/^\d+$/, "Port must be a number"),
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
  database: z.string().min(1, "Database name is required"),
  schema: z.string().optional(),
  sslMode: z
    .enum(["disable", "require", "verify-ca", "verify-full"])
    .optional(),
});

export default function DialogDemo() {
  const [step, setStep] = useState(1);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const { toast } = useToast();
  const [schema, setSchema] = useState([]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      connectionName: "",
      databaseType: undefined,
      host: "",
      port: "",
      username: "",
      password: "",
      database: "",
      schema: undefined,
      sslMode: undefined,
    },
  });

  const onSubmit = async (data) => {
    setIsConnecting(true);
    toast({
      title: "Success",
      variant : "success",
      description: "Project Created Successfully",
    });
    console.log(data);
    try {
      const result = await submitConnectionAction(data);
      if (result.success) {
        setIsConnected(true);
        toast({
          title: "Success",
          description: result.message,
        });
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
    setIsConnecting(false);
  };

  const handleNext = () => {
    form.trigger(["connectionName", "databaseType"]).then((isValid) => {
      if (isValid) setStep(2);
    });
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleTestConnection = async () => {
    setIsTesting(true);
    try {
      const data = form.getValues();
      const result = await testConnectionAction(data);
      if (result.success) {
        setIsConnected(true);
        setSchema(result.responseData.schemas);
        
        toast({
          title: "Success",
          variant: "success",
          description: "Connection test successful!",
        });
      } else {
        toast({
          title: "Error",
          description: "Connection test failed. Please check your details.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred during the connection test.",
        variant: "destructive",
      });
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className=" bg-primary1 text-white font-medium capitalize hover:text-white hover:bg-primary1 hover:bg-opacity-80 rounded-sm px-5 py-3 ">
          Create new project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {step === 1 && (
              <div className="grid gap-4 py-4">
                <FormField
                  control={form.control}
                  name="connectionName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Connection name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter connection name" {...field} />
                      </FormControl>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="databaseType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Database type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select database type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="sqlserver">SQL Server</SelectItem>
                          <SelectItem value="postgresql">PostgreSQL</SelectItem>
                          <SelectItem value="mysql">MySQL</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />
              </div>
            )}
            {step === 2 && (
              <div className="grid gap-6 py-4 lg:grid-cols-2 2xl:grid-cols-1">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="host"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Host</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter host" {...field} />
                        </FormControl>
                        <FormMessage className="text-[10px]" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="port"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Port</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter port" {...field} />
                        </FormControl>
                        <FormMessage className="text-[10px]" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter username" {...field} />
                        </FormControl>
                        <FormMessage className="text-[10px]" />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Enter password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-[10px]" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="database"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Database</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter database name" {...field} />
                        </FormControl>
                        <FormMessage className="text-[10px]" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="schema"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Choose schema</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          disabled={!isConnected}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Choose your schema" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {schema && schema.length > 0 ? (
                              schema.map((item, index) => (
                                <SelectItem key={index} value={item}>
                                  {item}
                                </SelectItem>
                              ))
                            ) : (
                              <SelectItem value="no-schema" disabled>
                                No schema available
                              </SelectItem>
                            )}
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-[10px]" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}
            <DialogFooter className="flex justify-between w-full sm:justify-between">
              <div>
                {step === 2 && (
                  <Button
                    type="button"
                    onClick={handleTestConnection}
                    disabled={isTesting}
                    className="bg-primary1 hover:opacity-50 px-6 hover:bg-primary1 text-xs"
                  >
                    {isTesting ? "Testing..." : "Test Connection"}
                  </Button>
                )}
              </div>
              <div className="flex gap-2">
                {step === 2 && (
                  <Button
                    type="button"
                    className="text-xs"
                    variant="outline"
                    onClick={handleBack}
                  >
                    Back
                  </Button>
                )}
                {step === 1 ? (
                  <Button
                    type="button"
                    onClick={handleNext}
                    className="bg-primary1 hover:opacity-50 px-6 hover:bg-primary1 text-xs"
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={isConnecting || !isConnected}
                    className="bg-primary1 hover:opacity-50 px-6 hover:bg-primary1 text-xs"
                  >
                    {isConnecting
                      ? "Connecting..."
                      : isConnected
                      ? "Connected"
                      : "Connect"}
                  </Button>
                )}
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
