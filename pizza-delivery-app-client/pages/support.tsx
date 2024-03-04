import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import axios from "axios";

const SupportPage = () => {
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  useEffect(() => {
    if (user) {
      setEmail(user.emailAddresses[0].emailAddress);
    }
  }, [user]);
  const handleSubmit = async () => {
    const divElement = document.getElementById("topic_select_div");
    const selectElement = divElement?.getElementsByTagName("select")[0];
    const topic = selectElement?.value;
    if (!email || !question || !topic) {
      setLoading(true);
      toast.error("Please fill all the fields.");
      setTimeout(() => {
        setLoading(false);
        toast.dismiss();
      }, 2000);
      return;
    } else {
      toast.success("We Will Get Back To You Soon");
    }
  };
  return (
    <section className="max-w-screen-xl mx-auto mt-20 sm:mt-24 md:mt-28 lg:mt-36 flex justify-center items-center">
      <NextSeo
        title="Pizza Theater - Support"
        description="Get support from Pizza Theater."
        canonical="https://pizza-theater.vercel.app/"
        openGraph={{
          url: "https://pizza-theater.vercel.app/",
          title: "Pizza Theater",
          description:
            "Pizza Theater is an AI powered language learning platform that helps you learn faster.",
          siteName: "Pizza Theater",
        }}
      />
      <Card className="lg:md:sm:w-3/4 w-full p-5 font-Anta">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold mb-4">Support Request</h1>
        </div>
        <div>
          <form className="w-full" onSubmit={(e) => e.preventDefault()}>
            <div className="grid w-full items-center gap-1.5 py-4">
              <Label htmlFor="username">
                <span className="flex items-center space-x-1">
                  <p>Username</p>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="cursor-help" size={12} />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="font-Annapura">
                          Your support request is linked to your account&apos;s
                          username.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </span>
              </Label>
              <Input
                type="text"
                id="username"
                value={user?.username as string}
                disabled
                className="cursor-not-allowed"
              />
            </div>
            <div className="grid w-full items-center gap-1.5 py-4">
              <Label htmlFor="email">
                <span className="flex items-center space-x-1">
                  <p>Email</p>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="cursor-help" size={12} />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-center font-Annapura">
                          This is the email you used to sign up.
                          <br />
                          Change it here incase you wish to hear back to another
                          email.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </span>
              </Label>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div
              id="topic_select_div"
              className="grid w-full items-center gap-1.5 py-4"
            >
              <Label htmlFor="topic">Topic</Label>
              <Select>
                <SelectTrigger className="">
                  <SelectValue placeholder="Select a case" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="content">Problem With Content</SelectItem>
                  <SelectItem value="bug">Security Bug</SelectItem>
                  <SelectItem value="feature">Feature Request</SelectItem>
                  <SelectItem value="question">Questions/Feedback</SelectItem>
                  <SelectItem value="privacy">Privacy Concerns</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid w-full items-center gap-1.5 py-4">
              <Label htmlFor="message-2">Your Message</Label>
              <Textarea
                rows={5}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Type your message here."
                id="message-2"
                className="font-Annapura"
              />
            </div>
            <div className="grid w-full items-center gap-1.5 py-4">
              <Button disabled={loading} onClick={handleSubmit}>
                Send
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </section>
  );
};

export default SupportPage;
