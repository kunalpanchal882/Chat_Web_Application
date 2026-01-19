import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Login from "./authentication/Login";
import Signup from "./authentication/Signup"; 

export function TabsDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6 ">
      <Tabs defaultValue="login" >
        <TabsList>
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Sing-up</TabsTrigger>
        </TabsList>

        {/* Login */}
        <TabsContent value="login" >
          <Login/>
        </TabsContent>

        {/* sign-up */}
        <TabsContent value="signup">
         <Signup/>
        </TabsContent>
      </Tabs>
    </div>
  );
}
